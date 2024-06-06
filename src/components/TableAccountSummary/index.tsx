import { Box, Divider, Grid, Typography } from "@mui/joy";
import React, { memo } from "react";
import TokenToIcon from "../../utils/TokenToIcon";

export default memo(() => {
  const data = [
    {
      type: "erc20",
      poolName: "WETH",
      symbol: "WETH",
      stakeAmount: 200,
      stakeValue: 600000,
      marReward: 200000,
      puppyReward: 150000,
      TVL: 250000000,
    },
    {
      type: "erc20",
      poolName: "WBTC",
      symbol: "WETH",
      stakeAmount: 1,
      stakeValue: 60000,
      marReward: 100000,
      puppyReward: 50000,
      TVL: 999000000,
    },
    {
      type: "erc721",
      poolName: "Pudgy",
      symbol: "Pudgy",
      nftIds: [102],
      stakeValue: 10000,
      marReward: 120000,
      puppyReward: 150000,
      TVL: 250000000,
    },
  ];
  return (
    <Box>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid xs={2}>
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
        <Grid xs={4}>
          <Typography level="body-sm" textAlign={"center"}>
            TVL
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
      {data.map((e, i) => (
        <Box key={i}>
          <Grid container spacing={2} sx={{ flexGrow: 1 }}>
            <Grid
              xs={2}
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <img
                src={TokenToIcon[e.poolName]}
                width={16}
                style={{ marginRight: 5 }}
              />
              <Typography
                fontWeight={700}
                level="title-sm"
                textAlign={"center"}
              >
                {e.poolName}
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
                {e.type == "erc20"
                  ? `${e.stakeAmount?.toLocaleString()} ${e.symbol}`
                  : `${e.symbol} ${e.nftIds?.map((v) => `#${v}`).join(", ")}`}
              </Typography>
              <Typography
                fontWeight={700}
                level="title-sm"
                color="neutral"
                textAlign={"center"}
              >
                ${e.stakeValue.toLocaleString()}
              </Typography>
            </Grid>
            <Grid
              xs={4}
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
                {e.marReward.toLocaleString()} MAR
              </Typography>
              <Typography
                fontWeight={700}
                level="title-sm"
                textAlign={"center"}
              >
                {e.puppyReward.toLocaleString()} PUPPY
              </Typography>
            </Grid>
            <Grid
              xs={4}
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
                ${e.TVL.toLocaleString()}
              </Typography>
            </Grid>
          </Grid>
          {i < data.length - 1 && (
            <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
          )}
        </Box>
      ))}
    </Box>
  );
});
