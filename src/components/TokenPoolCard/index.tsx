import { Card, Divider, Stack, Typography } from "@mui/joy";
import { useContext, useMemo, useState } from "react";
import ValueDisplay from "../ValueDisplay";
import {
  IconMarPoint,
  IconPuppyPoint,
  IconWalletYellow,
} from "../../icons";
import { ArrowForward, Bolt, Paid, Redeem, Wallet } from "@mui/icons-material";
import Button from "../Button";
import { useAccount } from "wagmi";
import ModalWithdrawToken from "../ModalWithdrawToken";
import ModalDepositToken from "../ModalDepositToken";
import { get } from "lodash";
import {
  formatNumber
} from "../../utils/numbers";
import { AppContext } from "../../context/AppContext";
import { IPoolDetail } from "../../apis/getPools/types";
import PoolTitle from "./PoolTitle";
import { useRecoilValue } from "recoil";
import { AccountBalanceForPool } from "../../state/AccountBalanceForPool";


const TokenPoolCard = ({pool}: {
  pool: IPoolDetail
}) => {
  const [openModalDeposit, setOpenModalDeposit] = useState(false);
  const [openModalWithraw, setOpenModalWithraw] = useState(false);

  const { setOpenModalUserAgreement } = useContext(AppContext);

  const account = useAccount();

  const isConnectWallet = useMemo(() => {
    return !!account && !!account.isConnected;
  }, [account]);

  const accountBalanceState = useRecoilValue(AccountBalanceForPool({poolId: pool.tokenPoolID}))

  const accountBalance = accountBalanceState?.amount10 || 0
  const accountAllowanceBalance = accountBalanceState?.allowanceAmount10 || 0

  return (
    <Card
      sx={{
        height: "100%",
        padding: 2,
        backgroundColor: "white",
        borderRadius: "12px",
      }}
    >
      <PoolTitle assetSymbol={pool.assetSymbol} />
      <Stack
        direction="column"
        gap={3}
        justifyContent="space-between"
        height="100%"
      >
        <Stack direction={"row"} alignItems={"flex-start"} spacing={1}>
          <ValueDisplay
            name="TVL"
            text={`$${formatNumber(pool.tvl * pool.usdRate * 1)}`}
            isNameAbove
            flex={1}
            nameIcon={
              <Paid sx={{ fontSize: 15, color: "gray", marginRight: 0.5 }} />
            }
            type="primary"
          />
          {isConnectWallet && (
            <ValueDisplay
              name="MY DEPOSIT"
              text={`$${formatNumber(pool.depositedAmount * pool.usdRate * 1)}`}
              align="right"
              isNameAbove
              flex={1}
              nameIcon={
                <Paid sx={{ fontSize: 15, color: "gray", marginLeft: 0.5 }} />
              }
              type="primary"
            />
          )}
        </Stack>
        {isConnectWallet && pool.depositedAmount > 0 && (
          <Stack direction="column" gap={1.5}>
            <Typography
              level="body-sm"
              sx={{
                fontSize: 12,
                fontWeight: 700,
                color: "rgba(0, 0, 0, 0.5)",
              }}
            >
              MY DAILY REWARDS
            </Typography>
            <Divider
              sx={{
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              }}
            />
            {(pool.points || []).map(e => (
              <ValueDisplay
                key={e.symbol}
                variant="small"
                name={e.name}
                text={(e.pointsPerDay).toLocaleString()}
                icon={{
                  MAR: IconMarPoint,
                  PUPPY: IconPuppyPoint
                }[e.symbol]}
                iconWidth={32}
              />
            ))}
          </Stack>
        )}
        {isConnectWallet && (
          <ValueDisplay
            variant="small"
            name="Wallet Balance"
            text={`${formatNumber(accountBalance)} ${pool.assetSymbol}`}
            icon={IconWalletYellow}
            iconWidth={20}
            type="tertiary"
          />
        )}

        {!isConnectWallet ? (
          <Stack gap={1} direction="column">
            <Button
              buttonType="primary"
              endDecorator={<Wallet fontSize="small" />}
              fullWidth
              onClick={() => setOpenModalUserAgreement(true)}
            >
              Connect Wallet
            </Button>
          </Stack>
        ) : (
          <Stack gap={1} direction="row">
            {pool.depositedAmount > 0 && (
              <Button
                buttonType="secondary"
                endDecorator={<ArrowForward />}
                fullWidth
                onClick={() => setOpenModalWithraw(true)}
              >
                Withdraw
              </Button>
            )}
            <Button
              buttonType="primary"
              endDecorator={<Bolt />}
              fullWidth
              onClick={() => setOpenModalDeposit(true)}
            >
              Deposit
            </Button>
          </Stack>
        )}
      </Stack>

      {/* TODO: move modal to homepage */}
      <ModalWithdrawToken
        open={openModalWithraw}
        onClose={() => setOpenModalWithraw(false)}
        pool={pool}
      />
      <ModalDepositToken
        open={openModalDeposit}
        onClose={() => setOpenModalDeposit(false)}
        tokenBalanceAmout={accountBalance || 0}
        allowanceAmount={accountAllowanceBalance}
        pool={pool}
      />
    </Card>
  );
};

export default TokenPoolCard;
