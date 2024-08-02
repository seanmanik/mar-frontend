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
  return (
    <Box>
      <Typography textAlign={"center"} level="title-sm" fontWeight={600} color="neutral" marginBottom={3}>MY DAILY REWARDS</Typography>
      {myPools.map((e, i) => (
        <Box key={i}>
          {(e.points || []).map(e => (
              <ValueDisplay
                key={e.symbol}
                variant="small"
                name={e.name}
                text={(e.pointsPerDay).toLocaleString()}
                icon={TokenToIcon[e.symbol]}
                iconWidth={32}
                marginBottom={1}
              />
            ))}
        </Box>
      ))}
    </Box>
  );
});
