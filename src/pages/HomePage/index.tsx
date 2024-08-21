import { Box, CircularProgress, Stack } from "@mui/joy";
import { useMemo, useState } from "react";
import AccountLevel from "../../components/AccountLevel";
import PoolsSelection from "../../components/PoolsSelection";
import { useAccount } from "wagmi";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { PoolsState } from "../../state/PoolsState";
import Summary from "./Summary";
import OtherPools from "./OtherPools";
import MyPools from "./MyPools";
import { useInitAndUpdateStateInterval } from "../../hooks/useInitAndUpdateStateInterval";

const HomePage = () => {
  const account = useAccount();

  const isConnectWallet = useMemo(() => {
    return !!account && !!account.isConnected;
  }, [account]);

  const pools = useRecoilValue(PoolsState)
  
  useInitAndUpdateStateInterval()

  return (
    <Box maxWidth={1420} paddingLeft={"20px"} paddingRight={"20px"} paddingBottom={"84px"} paddingTop={"44px"} margin={"auto"}>
      {isConnectWallet && (
        <Box marginBottom={2}>
          <AccountLevel />
        </Box>
      )}

      <Summary />

      <PoolsSelection/>

      {pools.length == 0
        ? (
          <Stack width={"100%"} height={"400px"} alignItems="center" justifyContent="center">
            <CircularProgress variant="soft" size="lg" />
          </Stack>
        ) : (
          <Stack gap={3} direction="column" alignItems="flex-start" justifyContent="flex-start" marginTop={3} width={"100%"}>
            <MyPools />
            <OtherPools />
          </Stack>
        )}
    </Box>
  );
};

export default HomePage;
