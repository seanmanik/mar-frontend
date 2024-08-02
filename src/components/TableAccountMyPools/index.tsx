import { Box, Divider, Grid, Typography } from "@mui/joy";
import { memo } from "react";
import TokenToIcon from "../../utils/TokenToIcon";
import { useRecoilValueLoadable } from "recoil";
import { PoolsState } from "../../state/PoolsState";
import { IPoolDetail } from "../../apis/getPools/types";
import { formatNumber } from "../../utils/numbers";

//TODO: 
export default memo(() => {
  const poolsLoadable = useRecoilValueLoadable(PoolsState)
  const isHasPoolsData = poolsLoadable.state == 'hasValue'
  const pools = isHasPoolsData ? poolsLoadable.contents as IPoolDetail[] : []

  const myPools = pools.filter((pool) => pool.depositedAmount > 0);
  return (
    <Box>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid xs={3}>
          <Typography level="body-sm" textAlign={"center"}>
            Pool
          </Typography>
        </Grid>
        <Grid xs={2}>
          <Typography level="body-sm" textAlign={"center"}>
            My Stake
          </Typography>
        </Grid>
        <Grid xs={4}>
          <Typography level="body-sm" textAlign={"center"}>
            My Rewards
          </Typography>
        </Grid>
        <Grid xs={3}>
          <Typography level="body-sm" textAlign={"center"}>
            TVL
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
      {myPools.map((e, i) => (
        <Box key={i}>
          <Grid container spacing={2} sx={{ flexGrow: 1 }}>
            <Grid
              xs={3}
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <img
                src={TokenToIcon[e.assetSymbol]}
                width={16}
                style={{ marginRight: 5 }}
              />
              <Typography
                fontWeight={700}
                level="title-sm"
                textAlign={"center"}
              >
                {e.assetName}
              </Typography>
            </Grid>
            <Grid
              xs={2}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Typography
                fontWeight={700}
                level="title-sm"
                textAlign={"center"}
              >
                {e.depositedAmount > 0
                  ? `${e.depositedAmount?.toLocaleString()} ${e.assetSymbol}`
                  : `${e.assetSymbol} ${((e as any).nftIds || []).map((v: any) => `#${v}`).join(", ")}`}
              </Typography>
              <Typography
                fontWeight={700}
                level="title-sm"
                color="neutral"
                textAlign={"center"}
              >
                ${formatNumber(e.depositedAmount * e.usdRate * 1)}
              </Typography>
            </Grid>
            <Grid
              xs={4}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              {(e.points || []).map(e => (
                <Typography
                    key={e.name}
                    fontWeight={700}
                    level="title-sm"
                    textAlign={"center"}
                  >
                    {e.points.toLocaleString()} {e.symbol}
                  </Typography>
                ))}
            </Grid>
            <Grid
              xs={3}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Typography
                fontWeight={700}
                level="title-sm"
                textAlign={"center"}
              >
                ${formatNumber(e.tvl * e.usdRate * 1)}
              </Typography>
            </Grid>
          </Grid>
          {i < pools.length - 1 && (
            <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
          )}
        </Box>
      ))}
    </Box>
  );
});
