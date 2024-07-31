import { memo, useCallback, useContext, useEffect, useState } from "react";
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
import { CONTRACT_DEFAUL_DATA } from "../../constants/contract";
import { useApprove } from "../../apis/interactWallet/EVM/useApprove";
import { useDeposit } from "../../apis/interactWallet/EVM/useDeposit";
import { formatNumber } from "../../utils/numbers";
import { onHandlePostDepositRequest } from "../../apis/deposit";
import { useAccount } from "wagmi";
import { IEstimateInput, IEstimateOutput } from "../../apis/estimateRewardByInput/types";
import { onHandlePostEstimateRewardRequest } from "../../apis/estimateRewardByInput";
import { AppContext } from "../../context/AppContext";

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
  onClose: () => void;

  tokenAddress: string;
  poolAddress: string;
  decimals: number;

  refetch: () => void;
  refetchAllowance: () => void;
  isLoadingBalance: boolean;

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
    allowanceAmount,
    onClose,
    tokenAddress,
    poolAddress,
    decimals,
    refetch,
    refetchAllowance,
    isLoadingBalance,
    poolId,
  }) => {
    const { userToken } = useContext(AppContext);
    const [depositedSuccess, setDepositedSuccess] = useState(false);
    const account = useAccount();
    const [amount, setAmount] = useState(0);
    const [estimateData, setEstimateData] = useState<IEstimateOutput>();

    const tokenDefaultData = CONTRACT_DEFAUL_DATA[tokenAddress];
    const poolDefaultData = CONTRACT_DEFAUL_DATA[poolAddress];

    const { isPending, isConfirmed, onApprove } = useApprove({
      contractAddress: tokenAddress,
      decimals,
      spenderAddress: poolAddress,
      abi: tokenDefaultData.abi,
    });

    const {
      isPending: isPendingDeposit,
      isConfirmed: isConfirmedDeposit,
      onDeposit,
      txHash,
    } = useDeposit({
      contractAddress: poolAddress,
      decimals,
      abi: poolDefaultData.abi,
    });

    // const onPostDepositAPI = useCallback(() => {
    //   onHandlePostDepositRequest({
    //     TokenPoolID: poolId,
    //     WalletAddress: account.address as string,
    //     TransactionHash: txHash as string,
    //     Quantity: amount,
    //   });
    // }, [account.address, txHash, amount, poolId]);

    useEffect(() => {
      if (isConfirmedDeposit) {
        refetch && refetch();
        // onPostDepositAPI()
      }
    }, [refetch, isConfirmedDeposit]);

    useEffect(() => {
      if (isConfirmed) {
        refetchAllowance && refetchAllowance();
      }
    }, [refetchAllowance, isConfirmed]);

    useEffect(() => {
      if (!isPendingDeposit && isConfirmedDeposit) {
        setDepositedSuccess(true);
      } else if (!isPendingDeposit && !isConfirmedDeposit) {
        setDepositedSuccess(false);
      }
    }, [isPendingDeposit, isConfirmedDeposit, setDepositedSuccess]);

    useEffect(() => {
      (async () => {
        if (amount == 0) return

        var response = await onHandlePostEstimateRewardRequest(userToken, {
          quantity: amount,
          tokenPoolID: parseInt(poolId.toString())
        })

        if (amount == response?.quantity) {
          setEstimateData(response)
        }
      })()
    }, [amount, poolId])

    return (
      <ModalBlue
        open={open}
        onClose={onClose}
        title={
          depositedSuccess
            ? `${symbol}
            Deposited Successfully`
            : `Deposit your USDT
            to earn points`
        }
      >
        <Box maxWidth={550}>
          {!depositedSuccess && (
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
              </Box>
              <Grid marginTop={4} container spacing={2} sx={{ flexGrow: 1 }}>
                <Grid xs={12} paddingBottom={-2}>
                  <Typography level="title-sm">Daily Rewards</Typography>
                </Grid>
                <Grid xs={12} sm={6}>
                  <TokenAmountDisplay
                    amount={marPoint}
                    amountChange={estimateData?.pointsInfo.find(e => e.symbol == 'MAR')?.changeInPointsPerDay}
                    name="Mar points"
                    icon={IconMarPoint}
                  />
                </Grid>
                <Grid xs={12} sm={6}>
                  {/* <Typography level="title-sm">&nbsp;</Typography> */}
                  <TokenAmountDisplay
                    amount={puppyPoint}
                    amountChange={estimateData?.pointsInfo.find(e => e.symbol == 'PUPPY')?.changeInPointsPerDay}
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
                  loading={isPending || isLoadingBalance}
                  disabled={isPending || isLoadingBalance}
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

          {depositedSuccess && (
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
                name={`$${formatNumber(amount)}`}
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
