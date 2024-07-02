import { Box, Grid, Stack } from "@mui/joy";
import { useState } from "react";
import ModalWithdrawNFT from "../../components/ModalWithdrawNFT";
import ModalWithdrawToken from "../../components/ModalWithdrawToken";
import ModalDepositToken from "../../components/ModalDepositToken";
import ModalDepositNFT from "../../components/ModalDepositNFT";
import {
  IconMarPoint,
  IconMyStake,
  IconTotalValueStake,
} from "../../icons";
import AccountLevel from "../../components/AccountLevel";
import StatsCard from "../../components/StatsCard";
import PoolsSelection from "../../components/PoolsSelection";
import TokenPoolCard from "../../components/Pool/TokenPoolCard";
import NftPoolCard from "../../components/Pool/NftPoolCard";
import TestContract from "../../components/TestContract";

const HomePage = () => {
  const [openModalDeposit, setOpenModalDeposit] = useState(0);
  const [poolSelected, setPoolSelected] = useState("all");

  return (
    <Box
      maxWidth={1420}
      paddingLeft={"20px"}
      paddingRight={"20px"}
      paddingBottom={"84px"}
      paddingTop={"44px"}
      margin={"auto"}
    >
      <TestContract />
      <Box marginBottom={2}>
        <AccountLevel />
      </Box>

      <Grid
        container
        spacing={{ xs: 1, md: 2 }}
        sx={{ flexGrow: 1, marginBottom: 2 }}
      >
        <Grid xs={12} sm={6} md={3} lg={3}>
          <StatsCard
            title="TVL"
            value="$500,000,000"
            icon={IconTotalValueStake}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3} lg={3}>
          <StatsCard title="MY STAKE" value="$12,000" icon={IconMyStake} />
        </Grid>
        <Grid xs={12} sm={6} md={3} lg={3}>
          <StatsCard
            title="MAR POINTS"
            value="$500,000,000"
            icon={IconMarPoint}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3} lg={3}>
          <StatsCard
            title="PUPPY POINTS"
            value="$500,000,000"
            icon={IconMarPoint}
          />
        </Grid>
      </Grid>
      <PoolsSelection
        poolSelected={poolSelected}
        setPoolSelected={setPoolSelected}
      />
      <Stack
        gap={3}
        direction="column"
        alignItems="flex-start"
        justifyContent="flex-start"
        marginTop={3}
      >
        <Grid
          container
          spacing={{ xs: 2 }}
          columns={{ xs: 2, sm: 4, md: 8, lg: 12 }}
          sx={{ flexGrow: 1 }}
          alignItems="stretch"
        >
          {Array.from(Array(20)).map((_, index) => (
            <Grid xs={2} sm={4} md={4} lg={4} key={index}>
              <Box
                onClick={() => setOpenModalDeposit(index)}
                sx={{
                  height: "calc(100% - 32px)",
                }}
              >
                {index % 2 === 0 ? (
                  <TokenPoolCard
                    tvl={Math.ceil(Math.random() * 10000 * (index + 1))}
                    tvs={Math.ceil(Math.random() * 10000 * (index + 1))}
                    pts={Math.ceil(Math.random() * 10000 * (index + 1))}
                    dailyReward={Math.ceil(Math.random() * 10000 * (index + 1))}
                    yourStaked={Math.ceil(Math.random() * 10000 * (index + 1))}
                    yourDailyReward={Math.ceil(
                      Math.random() * 10000 * (index + 1)
                    )}
                  />
                ) : (
                  <NftPoolCard
                    tvl={Math.ceil(Math.random() * 10000 * (index + 1))}
                    tvs={Math.ceil(Math.random() * 10000 * (index + 1))}
                    pts={Math.ceil(Math.random() * 10000 * (index + 1))}
                    dailyReward={Math.ceil(Math.random() * 10000 * (index + 1))}
                    yourStaked={Math.ceil(Math.random() * 10000 * (index + 1))}
                    yourDailyReward={Math.ceil(
                      Math.random() * 10000 * (index + 1)
                    )}
                    yourDeposit={Math.ceil(Math.random() * 10000 * (index + 1))}
                  />
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
        <ModalWithdrawNFT
          open={openModalDeposit == 1}
          onClose={() => setOpenModalDeposit(0)}
        />
        <ModalWithdrawToken
          open={openModalDeposit == 2}
          onClose={() => setOpenModalDeposit(0)}
        />
        <ModalDepositToken
          open={openModalDeposit == 3}
          onClose={() => setOpenModalDeposit(0)}
        />
        <ModalDepositNFT
          open={openModalDeposit == 4}
          onClose={() => setOpenModalDeposit(0)}
        />
      </Stack>
    </Box>
  );
};

export default HomePage;
