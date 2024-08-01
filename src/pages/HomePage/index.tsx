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
import OtherPools from "./OtherPools";
import MyPools from "./MyPools";

const HomePage = () => {
  const [poolSelected, setPoolSelected] = useState("all");

  const account = useAccount();

  const isConnectWallet = useMemo(() => {
    return !!account && !!account.isConnected;
  }, [account]);

  const poolsLoadable = useRecoilValueLoadable(PoolsState)
  const isHasPoolsData = poolsLoadable.state == 'hasValue'
  const pools = isHasPoolsData ? poolsLoadable.contents as IPoolDetail[] : []

  const myPools = pools.filter((pool) => pool.depositedAmount > 0);
  const otherPools = pools.filter((pool) => pool.depositedAmount <= 0);

  return (
    <Box maxWidth={1420} paddingLeft={"20px"} paddingRight={"20px"} paddingBottom={"84px"} paddingTop={"44px"} margin={"auto"}>
      {isConnectWallet && (
        <Box marginBottom={2}>
          <AccountLevel />
        </Box>
      )}

      <Summary />

      <PoolsSelection
        poolSelected={poolSelected}
        setPoolSelected={setPoolSelected}
      />

      {poolsLoadable.state == 'loading'
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
