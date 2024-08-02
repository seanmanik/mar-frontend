import { Box, Divider, Grid, Stack, Typography } from "@mui/joy";
import { memo } from "react";
import TokenToIcon from "../../utils/TokenToIcon";
import { useRecoilValueLoadable } from "recoil";
import { PoolsState } from "../../state/PoolsState";
import { IPoolDetail } from "../../apis/getPools/types";
import { formatNumber } from "../../utils/numbers";
import ValueDisplay from "../ValueDisplay";

//TODO: 
export default memo(() => {
  const poolsLoadable = useRecoilValueLoadable(PoolsState)
  const isHasPoolsData = poolsLoadable.state == 'hasValue'
  const pools = isHasPoolsData ? poolsLoadable.contents as IPoolDetail[] : []

  const myPools = pools.filter((pool) => pool.depositedAmount > 0);
  const points: any = []
  myPools.forEach(e => {
    e.points.forEach(p => {
      let find = points.find((pp: any) => pp.symbol == p.symbol)
      if (find) {
        find.pointsPerDay += p.pointsPerDay
        find.points += p.points
      }
      else {
        points.push({
          name: p.name,
          symbol: p.symbol,
          points: p.points,
          pointsPerDay: p.pointsPerDay,
          calculatedAt: p.calculatedAt
        })
      }
    })
  })
  return (
    <Box>
      <Typography textAlign={"center"} level="title-sm" fontWeight={600} color="neutral" marginBottom={3}>MY DAILY REWARDS</Typography>
      {points.map((e: any) => (
        <Box key={e.symbol}>
            <ValueDisplay
              key={e.symbol}
              variant="small"
              name={e.name}
              text={(e.pointsPerDay).toLocaleString()}
              icon={TokenToIcon[e.symbol]}
              iconWidth={32}
              marginBottom={1}
            />
        </Box>
      ))}
    </Box>
  );
});
