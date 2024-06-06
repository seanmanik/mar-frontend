import { Box, Divider, Stack, Typography } from "@mui/joy";
import React, { memo } from "react";
import {
  KeyboardDoubleArrowDown,
  KeyboardDoubleArrowUp,
} from "@mui/icons-material";
import TokenToIcon from "../../utils/TokenToIcon";

export default memo(() => {
  const data = [
    {
      createdAt: new Date().toISOString(),
      type: "withdraw",
      tokenType: "erc20",
      poolName: "USDT",
      symbol: "USDT",
      stakeAmount: 2000,
      stakeValue: 2000,
    },
    {
      createdAt: new Date().toISOString(),
      type: "deposit",
      tokenType: "erc20",
      poolName: "WETH",
      symbol: "WETH",
      stakeAmount: 2000,
      stakeValue: 2000,
    },
    {
      createdAt: new Date().toISOString(),
      type: "withdraw",
      tokenType: "erc20",
      poolName: "USDT",
      symbol: "USDT",
      stakeAmount: 2000,
      stakeValue: 2000,
    },
    {
      createdAt: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000),
      type: "withdraw",
      tokenType: "erc721",
      poolName: "Pudgy",
      symbol: "Pudgy",
      nftIds: [123, 441],
      stakeValue: 2000,
    },
  ];

  return (
    <Box>
      {data.map((e, i) => (
        <Box key={i}>
          {i == 0 ? (
            <Typography color="neutral" fontSize={14} marginTop={0}>
              {new Date(e.createdAt).toLocaleDateString()}
            </Typography>
          ) : new Date(e.createdAt).toLocaleDateString() !=
            new Date(data[i - 1].createdAt).toLocaleDateString() ? (
            <Typography color="neutral" fontSize={14} marginTop={2}>
              {new Date(e.createdAt).toLocaleDateString()}
            </Typography>
          ) : (
            <></>
          )}
          <Stack
            direction={"row"}
            marginBottom={2}
            marginTop={2}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Stack direction={"row"}>
              <img
                src={TokenToIcon[e.poolName]}
                width={40}
                style={{ marginRight: 10 }}
              />
              <Box>
                <Typography level="title-sm" fontWeight={600}>
                  {e.type == "withdraw" ? "Withdraw funds" : "Deposit funds"}
                </Typography>
                <Typography level="body-sm" color="neutral">
                  {e.symbol}
                </Typography>
              </Box>
            </Stack>
            <Stack direction={"row"}>
              <Box>
                <Typography level="title-sm" fontWeight={600}>
                  {/* {e.stakeAmount.toLocaleString()} {e.symbol} */}
                  {e.tokenType == "erc20"
                    ? `${e.stakeAmount?.toLocaleString()} ${e.symbol}`
                    : `${e.symbol} ${e.nftIds?.map((v) => `#${v}`).join(", ")}`}
                </Typography>
                <Typography level="body-sm" color="neutral" textAlign={"right"}>
                  {e.type == "withdraw" ? "-" : "+"}$
                  {e.stakeValue.toLocaleString()}
                </Typography>
              </Box>
              {e.type == "withdraw" ? (
                <KeyboardDoubleArrowDown color="error" />
              ) : (
                <KeyboardDoubleArrowUp color="success" />
              )}
            </Stack>
          </Stack>
          {i < data.length - 1 &&
            new Date(e.createdAt).toLocaleDateString() ==
              new Date(data[i + 1].createdAt).toLocaleDateString() && (
              <Divider />
            )}
        </Box>
      ))}
    </Box>
  );
});
