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
import { useRecoilState, useRecoilStateLoadable, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { AuthTokenState } from "../../state/AuthTokenState";
import { PoolsState } from "../../state/PoolsState";
import { IPoolDetail } from "../../apis/getPools/types";
import { PoolTVLsSelector } from "../../state/PoolTVLsSelector";
import Summary from "./Summary";

const HomePage = () => {
    const poolsLoadable = useRecoilValueLoadable(PoolsState)
    const isHasPoolsData = poolsLoadable.state == 'hasValue'
    const pools = isHasPoolsData ? poolsLoadable.contents as IPoolDetail[] : []

    const myPools = pools.filter((pool) => pool.depositedAmount > 0);
    
    return (<>{myPools.length > 0 && (
        <Stack gap={1} direction="column" alignItems="flex-start" justifyContent="flex-start" width={"100%"}>
            <Typography
                sx={{
                    fontSize: "24px",
                    fontWeight: 600,
                    color: "#ffffff",
                }}
            >
                My Pools
            </Typography>

            <Grid container spacing={{ xs: 2 }} columns={{ xs: 2, sm: 4, md: 8, lg: 12 }} sx={{ flexGrow: 1 }} alignItems="stretch" width={"100%"}>
                {myPools.map((item) => (
                    <Grid xs={2} sm={4} md={4} lg={4} key={item.tokenPoolID}>
                        <Box sx={{
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
                                tokenAddress={item.tokenAddress}

                                usdRate={{
                                    WBTC: 63217,
                                    USDT: 1.1,
                                    USDC: 1.02
                                }[item.assetSymbol] || 1}
                            />
                        </Box>
                    </Grid>
                )
                )}
            </Grid>
        </Stack>
    )}
    </>
    );
};

export default HomePage;
