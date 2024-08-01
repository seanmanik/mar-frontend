import { memo, useMemo } from "react";
import { useRecoilValueLoadable } from "recoil";
import { PoolsState } from "../../state/PoolsState";
import { IPoolDetail } from "../../apis/getPools/types";
import { Grid } from "@mui/joy";
import StatsCard from "../../components/StatsCard";
import { IconMarPoint, IconMyStake, IconPuppyPoint, IconTotalValueStake } from "../../icons";
import { useAccount } from "wagmi";

export default memo(() => {
    const account = useAccount();

    const isConnectWallet = useMemo(() => {
        return !!account && !!account.isConnected;
    }, [account]);

    const poolsLoadable = useRecoilValueLoadable(PoolsState)
    const isHasPoolsData = poolsLoadable.state == 'hasValue'
    const pools = isHasPoolsData ? poolsLoadable.contents as IPoolDetail[] : []

    return (
        <Grid
            container
            spacing={{ xs: 1, md: 2 }}
            sx={{ flexGrow: 1, marginBottom: 2 }}
        >
            <Grid xs={12} sm={6} md={3} lg={3}>
                <StatsCard
                    title="TVL"
                    value={
                        pools.map((e) => ({
                            name: e.assetName,
                            symbol: e.assetSymbol,
                            amount: parseInt(e.tvl.toString()) * e.usdRate
                        }))
                            .filter((e) => e.amount > 0)
                    }
                    icon={IconTotalValueStake}
                />
            </Grid>
            {pools.length > 0 && isConnectWallet && (
                <Grid xs={12} sm={6} md={3} lg={3}>
                    <StatsCard
                        title="MY STAKE"
                        value={
                            pools.map((e) => ({
                                name: e.assetName,
                                symbol: e.assetSymbol,
                                amount: e.depositedValue,
                            }))
                                .filter((e) => e.amount > 0)
                        }
                        icon={IconMyStake}
                    />
                </Grid>
            )}
            {pools.length > 0 && isConnectWallet && (
                <Grid xs={12} sm={6} md={3} lg={3}>
                    <StatsCard
                        title="MAR POINTS"
                        isUsdValue={false}
                        value={pools.map(e => ({
                            name: e.assetName,
                            symbol: 'MAR',
                            amount: (e.points.find(p => p.symbol == 'MAR') || {}).points || 0
                        })).filter(e => e.amount > 0)}
                        icon={IconMarPoint}
                    />
                </Grid>
            )}
            {pools.length > 0 && isConnectWallet && (
                <Grid xs={12} sm={6} md={3} lg={3}>
                    <StatsCard
                        title="PUPPY POINTS"
                        isUsdValue={false}
                        value={pools.map(e => ({
                            name: e.assetName,
                            symbol: 'PUPPY',
                            amount: (e.points.find(p => p.symbol == 'PUPPY') || {}).points || 0
                        })).filter(e => e.amount > 0)}
                        icon={IconPuppyPoint}
                    />
                </Grid>
            )}
        </Grid>
    )
})