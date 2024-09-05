import { memo, useEffect, useMemo, useState } from "react";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
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

    const pools = useRecoilValue(PoolsState)

    const [marPoints, setMarPoints] = useState<any>([])
    const [puppyPoints, setPuppyPoints] = useState<any>([])

    useEffect(() => {
        function calculate() {
            setMarPoints(pools.map(e => ({
                name: e.assetName,
                symbol: 'MAR',
                amount: (() => {
                    var v = e.points.find(p => p.symbol == 'MAR')
                    if (!v) return 0
                    return (
                        v.points + 
                        (
                            (v.pointsPerDay / 24 / 60 / 60) *
                            ((Date.now() - new Date(v.calculatedAt).getTime()) / 1000)
                        )
                    )
                })()
            })).filter(e => e.amount > 0))
    
            setPuppyPoints(pools.map(e => ({
                name: e.assetName,
                symbol: 'PUPPY',
                amount: (() => {
                    var v = e.points.find(p => p.symbol == 'MAR')
                    if (!v) return 0
                    return (
                        v.points + 
                        (
                            (v.pointsPerDay / 24 / 60 / 60) *
                            ((Date.now() - new Date(v.calculatedAt).getTime()) / 1000)
                        )
                    )
                })()
            })).filter(e => e.amount > 0))
        }
        calculate()
        let id = setInterval(calculate, 5000)
        return () => clearInterval(id)
    }, [pools])

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
                        value={marPoints}
                        icon={IconMarPoint}
                    />
                </Grid>
            )}
            {pools.length > 0 && isConnectWallet && (
                <Grid xs={12} sm={6} md={3} lg={3}>
                    <StatsCard
                        title="PUPPY POINTS"
                        isUsdValue={false}
                        value={puppyPoints}
                        icon={IconPuppyPoint}
                    />
                </Grid>
            )}
        </Grid>
    )
})