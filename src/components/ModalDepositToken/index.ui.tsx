import { memo, useState } from "react";
import ModalBlue from "../ModalBlue";
import { Avatar, AvatarGroup, Box, Grid, Stack, Typography } from "@mui/joy";
import InputAmount from "../InputAmount";
import TokenAmountDisplay from "../TokenAmountDisplay";
import {
  IconMarPoint,
  IconMyStake,
  IconPending,
  IconTotalValueStake,
} from "../../icons";
import { Bolt } from "@mui/icons-material";
import { ImageLogoBlueCircle } from "../../images";
import TokenToIcon from "../../utils/TokenToIcon";
import Button from "../Button";

export default memo<{
  open: boolean;
  marPoint: number;
  puppyPoint: number;
  totalValue: number;
  stakeAmount: number;
  pendingValue: number;
  balance: number;
  symbol: string;
  allowanceAmount: number;
  isSuccess: boolean;
  onClose: () => void;
  onDeposit: (amount: number) => void;
  onApprove: (amount: number) => void;

  amount: number;
  setAmount: (_: number) => void;
  isPendingApprove: boolean;
  isPendingDeposit: boolean;

  txHash: string;
}>(
  ({
    open,
    marPoint,
    puppyPoint,
    totalValue,
    stakeAmount,
    pendingValue,
    symbol,
    balance,
    allowanceAmount,
    isSuccess,
    onClose,
    onDeposit,
    onApprove,
    amount,
    setAmount,
    isPendingApprove,
    isPendingDeposit,
    txHash,
  }) => {
    const [test, setTest] = useState(0);

    return (
      <ModalBlue
        open={open}
        onClose={onClose}
        title={
          isSuccess
            ? `${symbol}
            Deposited Successfully`
            : `Deposit your USDT
            to earn points`
        }
      >
        <Box maxWidth={550}>
          {!isSuccess && (
            <>
              <Box maxWidth={"100%"} overflow={"hidden"}>
                <InputAmount
                  title={`Deposit ${symbol}`}
                  subTitle={"Your Balance"}
                  symbol={symbol}
                  balance={balance}
                  value={amount}
                  onChange={(v) => setAmount(v)}
                />

                <InputAmount
                  title={`Test ${symbol}`}
                  subTitle={"Your Test"}
                  symbol={symbol}
                  balance={balance}
                  value={test}
                  onChange={(v) => setTest(v)}
                />
              </Box>
              <Grid marginTop={4} container spacing={2} sx={{ flexGrow: 1 }}>
                <Grid xs={12} paddingBottom={-2}>
                  <Typography level="title-sm">My Rewards</Typography>
                </Grid>
                <Grid xs={12} sm={6}>
                  <TokenAmountDisplay
                    amount={marPoint}
                    name="Mar points"
                    icon={IconMarPoint}
                  />
                </Grid>
                <Grid xs={12} sm={6}>
                  {/* <Typography level="title-sm">&nbsp;</Typography> */}
                  <TokenAmountDisplay
                    amount={puppyPoint}
                    name="Puppy points"
                    icon={IconMarPoint}
                  />
                </Grid>

                <Grid xs={12} sm={6}>
                  <Typography level="title-sm" paddingBottom={1}>
                    Total Value Staked
                  </Typography>
                  <TokenAmountDisplay
                    amount={totalValue}
                    name="USD"
                    icon={IconTotalValueStake}
                  />
                </Grid>
                <Grid xs={12} sm={6}>
                  <Typography level="title-sm" paddingBottom={1}>
                    My Staked
                  </Typography>
                  <TokenAmountDisplay
                    amount={stakeAmount}
                    name="USDC"
                    icon={IconMyStake}
                  />
                </Grid>

                {/* <Grid xs={12} paddingBottom={-2}>
                  <Typography level="title-sm">Pending Deposits</Typography>
                </Grid>
                <Grid xs={12} sm={12}>
                  <TokenAmountDisplay
                    amount={pendingValue}
                    symbol={symbol}
                    name="in processing"
                    icon={IconPending}
                  />
                </Grid> */}
              </Grid>
              {amount > allowanceAmount ? (
                <Button
                  sx={{
                    marginTop: 5,
                  }}
                  buttonType="primary"
                  justifyContentChild="center"
                  endDecorator={<Bolt />}
                  fullWidth
                  onClick={() => onApprove && onApprove(amount)}
                  loading={isPendingApprove}
                  disabled={isPendingApprove}
                >
                  Approve
                </Button>
              ) : (
                <Button
                  sx={{
                    marginTop: 5,
                  }}
                  buttonType="primary"
                  justifyContentChild="center"
                  endDecorator={<Bolt />}
                  fullWidth
                  disabled={amount == 0 || amount > balance || isPendingDeposit}
                  onClick={() => onDeposit && onDeposit(amount)}
                  loading={isPendingDeposit}
                >
                  Deposit
                </Button>
              )}
            </>
          )}

          {isSuccess && (
            <>
              <Stack alignItems={"center"} paddingTop={5} paddingBottom={5}>
                <AvatarGroup>
                  <Avatar src={ImageLogoBlueCircle} />
                  <Avatar src={TokenToIcon[symbol]} />
                </AvatarGroup>
                <Typography
                  fontSize={32}
                  lineHeight={"34px"}
                  fontWeight={500}
                  textAlign={"center"}
                >
                  Congrats, you are earning
                  <br />
                  like a pro!
                </Typography>
              </Stack>
              <Typography level="title-sm" marginBottom={1}>
                Token Deposit
              </Typography>
              <TokenAmountDisplay
                amount={amount}
                symbol={symbol}
                name={`$${parseFloat(amount.toFixed(2)).toLocaleString()}`}
                icon={TokenToIcon[symbol]}
              />
              <Button
                sx={{
                  marginTop: 5,
                }}
                buttonType="secondary"
                justifyContentChild="center"
                fullWidth
                onClick={() =>
                  window.open(`https://sepolia.etherscan.io/tx/${txHash}`)
                }
              >
                View on Explorer
              </Button>
            </>
          )}
        </Box>
      </ModalBlue>
    );
  }
);
