import { Box, CircularProgress, Grid, Stack, Typography } from "@mui/joy";
import { useContext, useMemo, useState } from "react";
import { IconMarPoint, IconMyStake, IconTotalValueStake } from "../../icons";
import AccountLevel from "../../components/AccountLevel";
import StatsCard from "../../components/StatsCard";
import PoolsSelection from "../../components/PoolsSelection";
import TokenPoolCard from "../../components/Pool/TokenPoolCard";
import { AppContext } from "../../context/AppContext";
import { useGetPools } from "../../apis/getPools";
import { isArray } from "lodash";
import { useGetUserStakedOfPoolMultiCall } from "../../apis/interactWallet/EVM/useGetUserStakedOfPoolMultiCall";
import { useAccount } from "wagmi";
import { useGetTotalStakedOfPoolMultiCall } from "../../apis/interactWallet/EVM/useGetTotalStakedOfPoolMultiCall";
import PoolsContextProvider from "../../context/PoolsContext";

const HomePage = () => {
  const [poolSelected, setPoolSelected] = useState("all");
  const { userToken } = useContext(AppContext);
  const account = useAccount();

  const isConnectWallet = useMemo(() => {
    return !!account && !!account.isConnected;
  }, [account]);

  const { 
    data, 
    refetch: refecthDataPools,
    isFetching, 
    isLoading } = useGetPools({ token: userToken });

  const {
    data: userStakedOfPoolMultiCall,
    refetch: refecthGetUserStakedOfPoolMultiCall,
    isLoading: isLoadingUserStakedOfPoolMultiCall,
  } = useGetUserStakedOfPoolMultiCall({
    listContractAddress: data ? data?.map((i) => i.contractAddress) : [],
    userAddress: account.address as string,
    userToken: userToken,
  });

  const {
    data: totalStakedOfPoolMultiCall,
    refetch: refecthGetTotalStakedOfPoolMultiCall,
    isLoading: isLoadingTotalStakedOfPoolMultiCall,
  } = useGetTotalStakedOfPoolMultiCall({
    listContractAddress: data ? data?.map((i) => i.contractAddress) : [],
    userToken: userToken,
  });

  const addressToTokenName: { [key: string]: string } = data
    ? data?.reduce((s, e) => {
        s = { ...s, [e.contractAddress]: e.assetName };
        return s;
      }, {})
    : {};

    const addressToTokenSymbol: { [key: string]: string } = data
    ? data?.reduce((s, e) => {
        s = { ...s, [e.contractAddress]: e.assetSymbol };
        return s;
      }, {})
    : {};

  const myPools = useMemo(() => {
    if (!data || !userToken) {
      return [];
    }
    return data.filter((pool) => {
      if (pool.depositedAmount > 0) return true
      const mappedPool = (userStakedOfPoolMultiCall || []).find(
        (p) => p.contractAddress === pool.contractAddress
      );

      if (mappedPool && mappedPool.amountBalance > 0) {
        return true;
      }

      return false;
    });
  }, [data, userStakedOfPoolMultiCall, userToken]);

  const otherPools = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.filter((pool) => {
      return !myPools.find(e => e.tokenPoolID == pool.tokenPoolID)
    });
  }, [data, myPools, userToken]);

  return (
    <Box
      maxWidth={1420}
      paddingLeft={"20px"}
      paddingRight={"20px"}
      paddingBottom={"84px"}
      paddingTop={"44px"}
      margin={"auto"}
    >
      {isConnectWallet && (
        <Box marginBottom={2}>
          <AccountLevel />
        </Box>
      )}

      <Grid
        container
        spacing={{ xs: 1, md: 2 }}
        sx={{ flexGrow: 1, marginBottom: 2 }}
      >
        <Grid xs={12} sm={6} md={3} lg={3}>
          <StatsCard
            title="TVL"
            value={
              !totalStakedOfPoolMultiCall
                ? []
                : totalStakedOfPoolMultiCall
                    .map((e) => ({
                      name: addressToTokenName[e.contractAddress] as string,
                      symbol: addressToTokenSymbol[e.contractAddress] as string,
                      amount: parseInt(e.amount10.toString()) * ({
                        WBTC: 63217, 
                        USDT: 1.1,
                        USDC: 1.02
                      }[addressToTokenSymbol[e.contractAddress] as string] || 1)
                    }))
                    .filter((e) => e.amount > 0)
            }
            icon={IconTotalValueStake}
          />
        </Grid>
        {userToken && (
          <Grid xs={12} sm={6} md={3} lg={3}>
            <StatsCard
              title="MY STAKE"
              value={
                !userStakedOfPoolMultiCall
                  ? []
                  : userStakedOfPoolMultiCall
                      .map((e) => ({
                        name: addressToTokenName[e.contractAddress] as string,
                        symbol: addressToTokenSymbol[e.contractAddress] as string,
                        amount: parseInt(e.amount10.toString()) * ({
                          WBTC: 63217, 
                          USDT: 1.1,
                          USDC: 1.02
                        }[addressToTokenSymbol[e.contractAddress] as string] || 1),
                      }))
                      .filter((e) => e.amount > 0)
              }
              // value={[
              //   { name: "USDC", amount: 500000000 },
              //   { name: "USDT", amount: 500000000 },
              // ]}
              icon={IconMyStake}
            />
          </Grid>
        )}
        {userToken && (
          <Grid xs={12} sm={6} md={3} lg={3}>
            <StatsCard
              title="MAR POINTS"
              isUsdValue={false}
              value={!data ? [] : data.map(e => ({
                name: e.assetName,
                symbol: 'MAR',
                amount: (e.points.find(p => p.symbol == 'MAR') || {}).points || 0
              })).filter(e => e.amount > 0)}
              icon={IconMarPoint}
            />
          </Grid>
        )}
        {userToken && (
          <Grid xs={12} sm={6} md={3} lg={3}>
            <StatsCard
              title="PUPPY POINTS"
              isUsdValue={false}
              value={!data ? [] : data.map(e => ({
                name: e.assetName,
                symbol: 'PUPPY',
                amount: (e.points.find(p => p.symbol == 'PUPPY') || {}).points || 0
              })).filter(e => e.amount > 0)}
              icon={IconMarPoint}
            />
          </Grid>
        )}
      </Grid>

      <PoolsContextProvider
        refecthGetUserStakedOfPoolMultiCall={
          refecthGetUserStakedOfPoolMultiCall
        }
        refecthGetTotalStakedOfPoolMultiCall={
          refecthGetTotalStakedOfPoolMultiCall
        }
      >
        <PoolsSelection
          poolSelected={poolSelected}
          setPoolSelected={setPoolSelected}
        />

        {isLoading 
        || isFetching 
        ? (
          <Stack
            width={"100%"}
            height={"400px"}
            alignItems="center"
            justifyContent="center"
          >
            <CircularProgress variant="soft" size="lg" />
          </Stack>
        ) : (
          <Stack
            gap={3}
            direction="column"
            alignItems="flex-start"
            justifyContent="flex-start"
            marginTop={3}
            width={"100%"}
          >
            {isArray(myPools) && myPools.length > 0 && (
              <Stack
                gap={1}
                direction="column"
                alignItems="flex-start"
                justifyContent="flex-start"
                width={"100%"}
              >
                <Typography
                  sx={{
                    fontSize: "24px",
                    fontWeight: 600,
                    color: "#ffffff",
                  }}
                >
                  My Pools
                </Typography>

                <Grid
                  container
                  spacing={{ xs: 2 }}
                  columns={{ xs: 2, sm: 4, md: 8, lg: 12 }}
                  sx={{ flexGrow: 1 }}
                  alignItems="stretch"
                  width={"100%"}
                >
                  {myPools.map((item) => {
                    return (
                      <Grid xs={2} sm={4} md={4} lg={4} key={item.tokenPoolID}>
                        <Box
                          sx={{
                            height: "calc(100% - 32px)",
                          }}
                        >
                          <TokenPoolCard
                            tvl={item.tvl}
                            tvs={0}
                            pts={0}
                            dailyReward={1}
                            yourStaked={item.depositedAmount}
                            assetSymbol={item.assetSymbol}
                            assetName={item.assetName}
                            poolAddress={item.contractAddress}
                            poolId={item.tokenPoolID}
                            points={item.points}

                            usdRate={{
                              WBTC: 63217, 
                              USDT: 1.1,
                              USDC: 1.02
                            }[item.assetSymbol] || 1}
                          />
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>
              </Stack>
            )}

            {isArray(otherPools) && otherPools.length > 0 && (
              <Stack
                gap={1}
                direction="column"
                alignItems="flex-start"
                justifyContent="flex-start"
                width={"100%"}
              >
                <Typography
                  sx={{
                    fontSize: "24px",
                    fontWeight: 600,
                    color: "#ffffff",
                  }}
                >
                  All Pools
                </Typography>

                <Grid
                  container
                  spacing={{ xs: 2 }}
                  columns={{ xs: 2, sm: 4, md: 8, lg: 12 }}
                  sx={{ flexGrow: 1 }}
                  alignItems="stretch"
                  width={"100%"}
                >
                  {otherPools.map((item) => {
                    return (
                      <Grid xs={2} sm={4} md={4} lg={4} key={item.tokenPoolID}>
                        <Box
                          sx={{
                            height: "calc(100% - 32px)",
                          }}
                        >
                          <TokenPoolCard
                            tvl={item.tvl}
                            tvs={0}
                            pts={0}
                            usdRate={{
                              WBTC: 63217, 
                              USDT: 1.1,
                              USDC: 1.02
                            }[item.assetSymbol] || 1}
                            dailyReward={0}
                            yourStaked={item.depositedAmount}
                            assetSymbol={item.assetSymbol}
                            assetName={item.assetName}
                            poolAddress={item.contractAddress}
                            poolId={item.tokenPoolID}
                            points={item.points}
                          />
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>
              </Stack>
            )}
          </Stack>
        )}    
      </PoolsContextProvider>
    </Box>
  );
};

export default HomePage;
