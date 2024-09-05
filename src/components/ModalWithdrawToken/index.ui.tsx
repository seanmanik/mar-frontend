import { memo, useCallback, useContext, useEffect, useState } from "react";
import ModalBlue from "../ModalBlue";
import { Alert, Avatar, AvatarGroup, Box, Grid, Stack, Typography } from "@mui/joy";
import InputAmount from "../InputAmount";
import TokenAmountDisplay from "../TokenAmountDisplay";
import {
  IconMarPoint,
  IconMyStake,
  IconTotalValueStake,
} from "../../icons";
import { ArrowForward } from "@mui/icons-material";
import { ImageLogoBlueCircle } from "../../images";
import TokenToIcon from "../../utils/TokenToIcon";
import Button from "../Button";
import { useWithdraw } from "../../apis/interactWallet/EVM/useWithdraw";
import { formatNumber } from "../../utils/numbers";
import { useAccount } from "wagmi";
import { IEstimateOutput } from "../../apis/estimateRewardByInput/types";
import { depositRequest } from "../../apis/estimateRewardByInput";
import { POOL_CONTRACT_ABI, TOKEN_DECIMALS } from "../../constants/contract";
import { useRecoilValue } from "recoil";
import { AuthTokenState } from "../../state/AuthTokenState";
import { IPoolDetail } from "../../apis/getPools/types";
import { useIsCorrectNetwork } from "../../hooks/useIsCorrectNetwork";
import { toast } from "react-toastify";

export default memo<{
  open: boolean;
  onClose: () => void;
  pool: IPoolDetail
}>(
  ({
    open,
    onClose,
    pool
  }) => {
    const [estimateData, setEstimateData] = useState<IEstimateOutput>();
    const userToken = useRecoilValue(AuthTokenState)

    const checkNetwork = useIsCorrectNetwork()

    const account = useAccount();

    const [onSuccess, setOnSuccess] = useState(false);
    const [amount, setAmount] = useState(0);

    const { isPending, isConfirmed, txHash, onWithdraw } = useWithdraw({
      contractAddress: pool.contractAddress,
      decimals: TOKEN_DECIMALS[pool.tokenAddress] || 18,
      abi: POOL_CONTRACT_ABI,
    });

    useEffect(() => {
      if (!isPending && isConfirmed) {
        setOnSuccess(true);
        toast.success("Withdrawal successful.");
        // onClose && onClose();
      } else if (!isPending && !isConfirmed) {
        setOnSuccess(false);
        // onClose && onClose();
      }
    }, [isPending, isConfirmed, setOnSuccess]);

    useEffect(() => {
      (async () => {
        if (!amount) return

        var response = await depositRequest(userToken, {
          quantity: -(amount || 0),
          tokenPoolID: pool.tokenPoolID
        })

        if (-amount == response?.quantity) {
          setEstimateData(response)
        }
      })()
    }, [amount, pool.tokenPoolID])

    return (
      <ModalBlue
        open={open}
        onClose={onClose}
        title={
          onSuccess
            ? `${pool.assetSymbol}
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
                  title={`Withdraw ${pool.assetSymbol}`}
                  subTitle={"Your Staked"}
                  symbol={pool.assetSymbol}
                  balance={pool.depositedAmount}
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
                    amountChange={-(amount || 0)}
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
                    amountChange={-(amount || 0)}
                    amount={pool.depositedAmount}
                    showChange={false}
                    symbol={pool.assetSymbol}
                    name={`$${formatNumber(pool.depositedAmount * pool.usdRate)}`}
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
                disabled={amount == 0 || amount > pool.depositedAmount || isPending || !checkNetwork.isCorrect}
                onClick={() => onWithdraw && onWithdraw(amount)}
                loading={isPending}
              >
                Withdraw
              </Button>
            </>
          )}

          {!checkNetwork.isCorrect && <Alert sx={{marginTop: 1}} color="danger"><b>WRONG NETWORK</b>We only support {checkNetwork.supportedNetworks.map(e => e.name.toUpperCase()).join(', ')}</Alert>}

          {onSuccess && (
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
                symbol={pool.assetSymbol}
                name={`$${formatNumber(amount * pool.usdRate)}`}
                icon={TokenToIcon[pool.assetSymbol]}
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
