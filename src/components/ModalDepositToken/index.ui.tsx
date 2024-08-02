import { memo, useEffect, useState } from "react";
import ModalBlue from "../ModalBlue";
import { Avatar, AvatarGroup, Box, Grid, Stack, Typography } from "@mui/joy";
import InputAmount from "../InputAmount";
import TokenAmountDisplay from "../TokenAmountDisplay";
import {
  IconMarPoint,
  IconMyStake,
  IconTotalValueStake,
} from "../../icons";
import { Bolt } from "@mui/icons-material";
import { ImageLogoBlueCircle } from "../../images";
import TokenToIcon from "../../utils/TokenToIcon";
import Button from "../Button";
import { useApprove } from "../../apis/interactWallet/EVM/useApprove";
import { useDeposit } from "../../apis/interactWallet/EVM/useDeposit";
import { formatNumber } from "../../utils/numbers";
import { IEstimateOutput } from "../../apis/estimateRewardByInput/types";
import { depositRequest } from "../../apis/estimateRewardByInput";
import { ERC20_CONTRACT_ABI, POOL_CONTRACT_ABI, TOKEN_DECIMALS } from "../../constants/contract";
import { useRecoilValue } from "recoil";
import { AuthTokenState } from "../../state/AuthTokenState";
import { IPoolDetail } from "../../apis/getPools/types";

export default memo<{
  open: boolean;
  pool: IPoolDetail
  balance: number;
  allowanceAmount: number;
  onClose: () => void;
}>(
  ({
    open,
    balance,
    allowanceAmount,
    pool,
    onClose,
  }) => {
    const [depositedSuccess, setDepositedSuccess] = useState(false);
    const userToken = useRecoilValue(AuthTokenState)
    const [amount, setAmount] = useState(0);
    const [estimateData, setEstimateData] = useState<IEstimateOutput>();

    const { isPending, isConfirmed, onApprove } = useApprove({
      contractAddress: pool.tokenAddress,
      decimals: TOKEN_DECIMALS[pool.tokenAddress] || 18,
      spenderAddress: pool.contractAddress,
      abi: ERC20_CONTRACT_ABI,
    });

    const {
      isPending: isPendingDeposit,
      isConfirmed: isConfirmedDeposit,
      onDeposit,
      txHash,
    } = useDeposit({
      contractAddress: pool.contractAddress,
      decimals: TOKEN_DECIMALS[pool.tokenAddress] || 18,
      abi: POOL_CONTRACT_ABI,
    });

    useEffect(() => {
      if (isConfirmedDeposit) {
      }
    }, [isConfirmedDeposit]);

    useEffect(() => {
      if (!isPendingDeposit && isConfirmedDeposit) {
        setDepositedSuccess(true);
      } else if (!isPendingDeposit && !isConfirmedDeposit) {
        setDepositedSuccess(false);
      }
    }, [isPendingDeposit, isConfirmedDeposit, setDepositedSuccess]);

    useEffect(() => {
      (async () => {
        if (!amount) return

        var response = await depositRequest(userToken, {
          quantity: amount,
          tokenPoolID: pool.tokenPoolID
        })

        if (amount == response?.quantity) {
          setEstimateData(response)
        }
      })()
    }, [amount, pool.tokenPoolID])

    return (
      <ModalBlue
        open={open}
        onClose={onClose}
        title={
          depositedSuccess
            ? `${pool.assetSymbol}
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
                  title={`Deposit ${pool.assetSymbol}`}
                  subTitle={"Your Balance"}
                  symbol={pool.assetSymbol}
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
                    amount={pool.points.find(e => e.symbol == 'MAR')?.pointsPerDay || 0}
                    amountChange={!amount ? 0 : estimateData?.pointsInfo.find(e => e.symbol == 'MAR')?.changeInPointsPerDay}
                    name="Mar points"
                    icon={IconMarPoint}
                  />
                </Grid>
                <Grid xs={12} sm={6}>
                  {/* <Typography level="title-sm">&nbsp;</Typography> */}
                  <TokenAmountDisplay
                    amount={pool.points.find(e => e.symbol == 'PUPPY')?.pointsPerDay || 0}
                    amountChange={!amount ? 0 : estimateData?.pointsInfo.find(e => e.symbol == 'PUPPY')?.changeInPointsPerDay}
                    name="Puppy points"
                    icon={IconMarPoint}
                  />
                </Grid>

                <Grid xs={12} sm={6}>
                  <Typography level="title-sm" paddingBottom={1}>
                    Total Value Staked
                  </Typography>
                  <TokenAmountDisplay
                    amountChange={(amount || 0)}
                    amount={pool.tvl}
                    showChange={false}
                    symbol={pool.assetSymbol}
                    name={`$${formatNumber(pool.tvl * pool.usdRate)}`}
                    icon={IconTotalValueStake}
                  />
                </Grid>
                <Grid xs={12} sm={6}>
                  <Typography level="title-sm" paddingBottom={1}>
                    My Staked
                  </Typography>
                  <TokenAmountDisplay
                    amountChange={(amount || 0)}
                    amount={pool.depositedAmount}
                    showChange={false}
                    symbol={pool.assetSymbol}
                    name={`$${formatNumber(pool.depositedAmount * pool.usdRate)}`}
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
                  loading={isPending}
                  disabled={isPending}
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
                  <Avatar src={TokenToIcon[pool.assetSymbol]} />
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
                symbol={pool.assetSymbol}
                name={`$${formatNumber(amount)}`}
                icon={TokenToIcon[pool.assetSymbol]}
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
