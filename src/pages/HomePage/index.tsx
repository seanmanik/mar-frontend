import { Box, Grid, Stack } from "@mui/joy";
import { useContext, useState } from "react";
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

const HomePage = () => {
  const [poolSelected, setPoolSelected] = useState("all");
  const { userToken } = useContext(AppContext);
  const account = useAccount();

  const { data } = useGetPools({ token: userToken });

  const {data: userStakedOfPoolMultiCall} = useGetUserStakedOfPoolMultiCall({
    listContractAddress: data ? data?.map(i => i.contractAddress) : [],
    userAddress: account.address as string
  })

  const {data: totalStakedOfPoolMultiCall} = useGetTotalStakedOfPoolMultiCall({
    listContractAddress: data ? data?.map(i => i.contractAddress) : [],
  })

  const addressToTokenName: { [key: string]: string } = data ? data?.reduce((s, e) => {
    s = {...s, [e.contractAddress]: e.assetName}
    return s
  }, {}) : {}

  console.log(userStakedOfPoolMultiCall, 'userStakedOfPoolMultiCall')

  return (
    <Box
      maxWidth={1420}
      paddingLeft={"20px"}
      paddingRight={"20px"}
      paddingBottom={"84px"}
      paddingTop={"44px"}
      margin={"auto"}
    >
      <Box marginBottom={2}>
        <AccountLevel />
      </Box>

      <Grid
        container
        spacing={{ xs: 1, md: 2 }}
        sx={{ flexGrow: 1, marginBottom: 2 }}
      >
        <Grid xs={12} sm={6} md={3} lg={3}>
          <StatsCard
            title="TVL"
            // value={!totalStakedOfPoolMultiCall ? [] : totalStakedOfPoolMultiCall.map(e => ({
            //   name: addressToTokenName[e.contractAddress] as string,
            //   amount: e.amount10
            // }))} 
            value={[{name: 'USDC', amount: 500000000}, {name: 'USDT', amount: 500000000}]} 
            icon={IconTotalValueStake}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3} lg={3}>
          <StatsCard title="MY STAKE" 
          // value={!userStakedOfPoolMultiCall ? [] : userStakedOfPoolMultiCall.map(e => ({
          //   name: addressToTokenName[e.contractAddress] as string,
          //   amount: e.amount10 as number
          // }))} 
          value={[{name: 'USDC', amount: 500000000}, {name: 'USDT', amount: 500000000}]} 
          
          icon={IconMyStake} />
        </Grid>
        <Grid xs={12} sm={6} md={3} lg={3}>
          <StatsCard
            title="MAR POINTS"
            value={[{name: 'MAR', amount: 500000000}]}
            icon={IconMarPoint}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3} lg={3}>
          <StatsCard
            title="PUPPY POINTS"
            value={[{name: 'PUPPY', amount: 500000000}]}
            icon={IconMarPoint}
          />
        </Grid>
      </Grid>
      <PoolsSelection
        poolSelected={poolSelected}
        setPoolSelected={setPoolSelected}
      />
      <Stack
        gap={3}
        direction="column"
        alignItems="flex-start"
        justifyContent="flex-start"
        marginTop={3}
      >
        <Grid
          container
          spacing={{ xs: 2 }}
          columns={{ xs: 2, sm: 4, md: 8, lg: 12 }}
          sx={{ flexGrow: 1 }}
          alignItems="stretch"
          width={"100%"}
        >
          {isArray(data) &&
            data.map((item) => {
              return (
                <Grid xs={2} sm={4} md={4} lg={4} key={item.tokenPoolID}>
                  <Box
                    // onClick={() => setOpenModalDeposit(index)}
                    sx={{
                      height: "calc(100% - 32px)",
                    }}
                  >
                    <TokenPoolCard
                      tvl={item.tvl}
                      tvs={0}
                      pts={0}
                      dailyReward={0}
                      yourStaked={item.depositedAmount}
                      yourDailyReward={0}
                      assetSymbol={item.assetSymbol}
                      assetName={item.assetName}
                      poolAddress={item.contractAddress}
                    />
                  </Box>
                </Grid>
              );
            })}
        </Grid>
      </Stack>
    </Box>
  );
};

export default HomePage;
