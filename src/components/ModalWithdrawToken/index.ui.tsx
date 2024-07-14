import { memo } from "react";
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
import { ArrowForward } from "@mui/icons-material";
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
  isSuccess: boolean;
  onClose: () => void;
  onWithdraw: (amount: number) => void;

  amount: number
  setAmount: (_: number) => void
  isPendingWithdraw: boolean
  txHash: string

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
    isSuccess,
    onClose,
    onWithdraw,
    amount,
    setAmount,
    isPendingWithdraw,
    txHash
  }) => {

    return (
      <ModalBlue
        open={open}
        onClose={onClose}
        title={
          isSuccess
            ? `${symbol}
            Withdrawn Successfully`
            : `Withdraw your USDT
            from this pool`
        }
      >
        <Box maxWidth={550}>
          {!isSuccess && (
            <>
              <Box maxWidth={"100%"} overflow={"hidden"}>
                <InputAmount
                  title={`Withdraw ${symbol}`}
                  subTitle={"Your Staked"}
                  symbol={symbol}
                  balance={balance}
                  value={amount}
                  onChange={(v) => setAmount(v)}
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

                <Grid xs={12} paddingBottom={-2}>
                  <Typography level="title-sm">Pending Withdrawals</Typography>
                </Grid>
                <Grid xs={12} sm={12}>
                  <TokenAmountDisplay
                    amount={pendingValue}
                    symbol={symbol}
                    name="in processing"
                    icon={IconPending}
                  />
                </Grid>
              </Grid>
              <Button
                sx={{
                  marginTop: 5,
                }}
                buttonType="primary"
                justifyContentChild="center"
                endDecorator={<ArrowForward />}
                fullWidth
                disabled={amount == 0 || amount > balance || isPendingWithdraw}
                onClick={() => onWithdraw && onWithdraw(amount)}
                loading={isPendingWithdraw}
              >
                Withdraw
              </Button>
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
                  padding={5}
                >
                  Congrats, you have withdrawn your tokens, keep exploring
                </Typography>
              </Stack>
              <Typography level="title-sm" marginBottom={1}>
                Token Withdrawn
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
                endDecorator={<ArrowForward />}
                fullWidth
                onClick={() => window.open(`https://sepolia.etherscan.io//tx/${txHash}`)}
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
