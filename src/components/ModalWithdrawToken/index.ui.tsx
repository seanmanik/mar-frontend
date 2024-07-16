import { memo, useCallback, useEffect, useState } from "react";
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
import { CONTRACT_DEFAUL_DATA } from "../../constants/contract";
import { useWithdraw } from "../../apis/interactWallet/EVM/useWithdraw";
import { formatNumber } from "../../utils/numbers";
import { onHandlePostWithdrawRequest } from "../../apis/withdraw";
import { useAccount } from "wagmi";

export default memo<{
  open: boolean;
  marPoint: number;
  puppyPoint: number;
  totalValue: number;
  stakeAmount: number;
  pendingValue: number;
  balance: number;
  symbol: string;
  onClose: () => void;

  tokenAddress: string
  poolAddress: string
  decimals: number
  refetch: () => void;
  poolId: number | string;
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
    onClose,

    tokenAddress,
    poolAddress,
    decimals,
    refetch,
    poolId,
  }) => {
    const account = useAccount();

    const [onSuccess, setOnSuccess] = useState(false);
    const [amount, setAmount] = useState(0);

    const tokenDefaultData = CONTRACT_DEFAUL_DATA[tokenAddress];
    const poolDefaultData = CONTRACT_DEFAUL_DATA[poolAddress];

    const { isPending, isConfirmed, txHash, onWithdraw } = useWithdraw({
      contractAddress: poolAddress,
      decimals,
      abi: poolDefaultData.abi,
    });

    const onPostWithdrawAPI = useCallback(() => {
      onHandlePostWithdrawRequest({
        TokenPoolID: poolId,
        WalletAddress: account.address as string,
        TransactionHash: txHash as string,
        Quantity: amount,
      });
    }, [account.address, txHash, amount, poolId]);

    useEffect(() => {
      if (isConfirmed) {
        refetch && refetch();
        // onPostWithdrawAPI()
      }
    }, [refetch, isConfirmed, onPostWithdrawAPI]);

    useEffect(() => {
      if (!isPending && isConfirmed) {
        setOnSuccess(true);
        // onClose && onClose();
      } else if (!isPending && !isConfirmed) {
        setOnSuccess(false);
        // onClose && onClose();
      }
    }, [isPending, isConfirmed, setOnSuccess]);

    return (
      <ModalBlue
        open={open}
        onClose={onClose}
        title={
          onSuccess
            ? `${symbol}
            Withdrawn Successfully`
            : `Withdraw your USDT
            from this pool`
        }
      >
        <Box maxWidth={550}>
          {!onSuccess && (
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

                {/* <Grid xs={12} paddingBottom={-2}>
                  <Typography level="title-sm">Pending Withdrawals</Typography>
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
              <Button
                sx={{
                  marginTop: 5,
                }}
                buttonType="primary"
                justifyContentChild="center"
                endDecorator={<ArrowForward />}
                fullWidth
                disabled={amount == 0 || amount > balance || isPending}
                onClick={() => onWithdraw && onWithdraw(amount)}
                loading={isPending}
              >
                Withdraw
              </Button>
            </>
          )}

          {onSuccess && (
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
                name={`$${formatNumber(amount)}`}
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
                onClick={() => window.open(`https://sepolia.etherscan.io/tx/${txHash}`)}
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
