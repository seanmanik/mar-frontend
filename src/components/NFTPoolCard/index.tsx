import { Card, Stack } from "@mui/joy";
import { useMemo } from "react";
import ValueDisplay from "../ValueDisplay";
import {
  IconDailyReward,
  IconTotalValueStake,
  IconWallet,
  IconYourDailyReward,
  IconYourDeposited,
} from "../../icons";
import PoolTitle from "./PoolTitle";
import { ArrowForward, Bolt, Paid, Redeem } from "@mui/icons-material";
import Button from "../Button";
import { useAccount } from "wagmi";

export interface INftPoolCardProps {
  tvl: number;
  dailyReward: number;
  tvs: number;
  pts: number;
  yourStaked: number;
  yourDailyReward: number;
  yourDeposit: number;
}

const NftPoolCard = ({
  tvl,
  dailyReward,
  tvs,
  pts,
  yourStaked,
  yourDailyReward,
  yourDeposit,
}: INftPoolCardProps) => {
  const account = useAccount();

  const isConnectWallet = useMemo(() => {
    return !!account && !!account.isConnected;
  }, [account]);

  return (
    <Card
      sx={{
        height: "100%",
        padding: 2,
        backgroundColor: "white",
        borderRadius: "12px",
      }}
    >
      <PoolTitle assetSymbol=""/>
      <Stack
        direction="column"
        gap={1}
        justifyContent="space-between"
        height="100%"
      >
        {isConnectWallet && (
          <Stack direction={"row"} alignItems={"flex-start"} spacing={1}>
            {tvl && (
              <ValueDisplay
                name="TVL"
                text={`$${tvl}`}
                isNameAbove
                flex={1}
                nameIcon={
                  <Paid
                    sx={{ fontSize: 15, color: "gray", marginRight: 0.5 }}
                  />
                }
              />
            )}
            {dailyReward && (
              <ValueDisplay
                name="DAILY REWARD"
                text={`$${dailyReward}`}
                align="right"
                isNameAbove
                flex={1}
                nameIcon={
                  <Redeem
                    sx={{ fontSize: 15, color: "gray", marginLeft: 0.5 }}
                  />
                }
              />
            )}
          </Stack>
        )}
        <Stack direction="column" gap={1.5}>
          {tvs && (
            <ValueDisplay
              variant="small"
              name="Total value Staked"
              text={`$${tvs}`}
              icon={IconTotalValueStake}
            />
          )}
          {pts && (
            <ValueDisplay
              variant="small"
              name="Base Points Per Dollar"
              text={`${pts} PTS`}
              icon={IconDailyReward}
            />
          )}

          {yourStaked && (
            <ValueDisplay
              variant="small"
              name="Your Value Staked"
              text={`$${yourStaked}`}
              icon={IconYourDeposited}
            />
          )}
          {yourDailyReward && (
            <ValueDisplay
              variant="small"
              name="Your Daily Reward"
              text={`${yourDailyReward} PTS`}
              icon={IconYourDailyReward}
            />
          )}

          {yourDeposit && (
            <ValueDisplay
              variant="small"
              name="Your NFTs Deposited"
              icon={IconYourDeposited}
              images={[
                "https://i.seadn.io/gae/WG55wHkFEYqegub2kkMZbUJwmI0TfW75LRrgI4odvsfqZ0sTEX9CCr3QUenYrf9tzIsSUp7vNccImZtDO-kcTLzsqxlb98DKiO2mLOk",
                "https://i.seadn.io/gae/WG55wHkFEYqegub2kkMZbUJwmI0TfW75LRrgI4odvsfqZ0sTEX9CCr3QUenYrf9tzIsSUp7vNccImZtDO-kcTLzsqxlb98DKiO2mLOk",
                "https://i.seadn.io/gae/WG55wHkFEYqegub2kkMZbUJwmI0TfW75LRrgI4odvsfqZ0sTEX9CCr3QUenYrf9tzIsSUp7vNccImZtDO-kcTLzsqxlb98DKiO2mLOk",
                "https://i.seadn.io/gae/WG55wHkFEYqegub2kkMZbUJwmI0TfW75LRrgI4odvsfqZ0sTEX9CCr3QUenYrf9tzIsSUp7vNccImZtDO-kcTLzsqxlb98DKiO2mLOk",
                "https://i.seadn.io/gae/WG55wHkFEYqegub2kkMZbUJwmI0TfW75LRrgI4odvsfqZ0sTEX9CCr3QUenYrf9tzIsSUp7vNccImZtDO-kcTLzsqxlb98DKiO2mLOk",
                "https://i.seadn.io/gae/WG55wHkFEYqegub2kkMZbUJwmI0TfW75LRrgI4odvsfqZ0sTEX9CCr3QUenYrf9tzIsSUp7vNccImZtDO-kcTLzsqxlb98DKiO2mLOk",
                "https://i.seadn.io/gae/WG55wHkFEYqegub2kkMZbUJwmI0TfW75LRrgI4odvsfqZ0sTEX9CCr3QUenYrf9tzIsSUp7vNccImZtDO-kcTLzsqxlb98DKiO2mLOk",
              ]}
            />
          )}
        </Stack>
        {!isConnectWallet ? (
          <Stack gap={1} direction="column">
            <Button
              buttonType="primary"
              endDecorator={<img src={IconWallet} width={24} height={24} />}
              fullWidth
            >
              Connect Wallet
            </Button>
          </Stack>
        ) : (
          <Stack gap={1} direction="row">
            <Button buttonType="primary" endDecorator={<Bolt />} fullWidth>
              Deposit
            </Button>
            <Button
              buttonType="secondary"
              endDecorator={<ArrowForward />}
              fullWidth
            >
              Withdraw
            </Button>
          </Stack>
        )}
      </Stack>
    </Card>
  );
};

export default NftPoolCard;
