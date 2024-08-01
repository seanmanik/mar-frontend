import { Card, Divider, Stack, Typography } from "@mui/joy";
import { useCallback, useContext, useMemo, useState } from "react";
import ValueDisplay from "../ValueDisplay";
import {
  IconMarPoint,
  IconPuppyPoint,
  IconTotalValueStake,
  IconWallet,
  IconWalletYellow,
  IconYourDailyReward,
  IconYourDeposited,
} from "../../icons";
import PoolTitle from "./PoolTitle";
import { ArrowForward, Bolt, Paid, Redeem, Wallet } from "@mui/icons-material";
import Button from "../Button";
import { useAccount, useBalance } from "wagmi";
import { useGetAllowance } from "../../apis/interactWallet/EVM/useGetAllowance";
import ModalWithdrawToken from "../ModalWithdrawToken";
import ModalDepositToken from "../ModalDepositToken";
import { Address } from "viem";
import { get } from "lodash";
import {
  formatNumber,
  getTokenAmount,
} from "../../utils/numbers";
import { useGetTotalStakedOfPool } from "../../apis/interactWallet/EVM/useGetTotalStakedOfPool";
import { useGetUserStakedOfPool } from "../../apis/interactWallet/EVM/useGetUserStakedOfPool";
import { PoolsContext } from "../../context/PoolsContext";
import { AppContext } from "../../context/AppContext";
import PoolDetailContextProvider from "./PoolDetailContext";
import { ERC20_CONTRACT_ABI, POOL_CONTRACT_ABI } from "../../constants/contract";
export interface ITokenPoolCardProps {
  tvl: number;
  dailyReward: number;
  tvs: number;
  pts: number;
  yourStaked: number;
  // yourDailyReward: number;

  assetName: string;
  assetSymbol: string;
  poolAddress: string;
  poolId: number | string;
  tokenAddress: string

  usdRate: number

  points: {
    name: string
    symbol: string
    points: number
    pointsPerDay: number
    calculatedAt: Date
  }[]
}

const TokenPoolCard = ({
  tvl,
  dailyReward,
  tvs,
  // pts,
  // yourStaked,
  // yourDailyReward,
  // assetName,
  tokenAddress,
  usdRate = 1,
  assetSymbol,
  poolAddress,
  poolId,
  points
}: ITokenPoolCardProps) => {
  const { userToken } = useContext(AppContext);
  const [openModalDeposit, setOpenModalDeposit] = useState(false);

  const [openModalWithraw, setOpenModalWithraw] = useState(false);
  const {
    refecthGetUserStakedOfPoolMultiCall,
    refecthGetTotalStakedOfPoolMultiCall,
  } = useContext(PoolsContext);

  const { setOpenModalUserAgreement } = useContext(AppContext);

  const account = useAccount();

  const isConnectWallet = useMemo(() => {
    return !!account && !!account.isConnected;
  }, [account]);

  const { data: allowance, refetch } = useGetAllowance({
    contractAddress: tokenAddress,
    ownerAddress: account.address as string,
    spenderAddress: poolAddress,
    abi: ERC20_CONTRACT_ABI,
  });

  const {
    data: dataBalance,
    refetch: refetchBalance,
    isFetching: isFetchBalance,
    isLoading: isLoadingBalance,
  } = useBalance({
    token: tokenAddress as any,
    address: account.address,
  });

  const decimals = Number(get(dataBalance, "decimals", 18));
  const tokenBalanceValue = get(dataBalance, "value", 0);
  const tokenSymbol = get(dataBalance, "symbol", "");

  const { data: totalStakedOfPool, refetch: refetchTotalStakedOfPool } =
    useGetTotalStakedOfPool({
      contractAddress: poolAddress,
      abi: POOL_CONTRACT_ABI,
    });

  const totalStakedOfPoolAmount = getTokenAmount(totalStakedOfPool, decimals);

  const { data: totalStakedOfUser, refetch: refetchTotalStakedOfUser } =
    useGetUserStakedOfPool({
      contractAddress: poolAddress,
      userAddress: account.address as string,
      abi: POOL_CONTRACT_ABI,
    });

  const totalStakedOfUserAmount = getTokenAmount(totalStakedOfUser, decimals);

  const tokenBalanceAmout = getTokenAmount(tokenBalanceValue, decimals);

  const allowanceAmount = getTokenAmount(allowance, decimals);

  const onHandleRefetchData = useCallback(() => {
    refetchBalance();
    refetchTotalStakedOfPool();
    refetchTotalStakedOfUser();
    refecthGetUserStakedOfPoolMultiCall();
    refecthGetTotalStakedOfPoolMultiCall();
  }, [
    refetch,
    refetchTotalStakedOfPool,
    refetchTotalStakedOfUser,
    refecthGetUserStakedOfPoolMultiCall,
    refecthGetTotalStakedOfPoolMultiCall,
  ]);

  return (
    <PoolDetailContextProvider
      symbol={tokenSymbol}
      tokenAddress={tokenAddress}
      poolAddress={poolAddress}
      decimals={decimals}
      userStaked={totalStakedOfUserAmount}
      onHandleRefetchData={onHandleRefetchData}
      poolId={poolId}
      points={points}
    >
      <Card
        sx={{
          height: "100%",
          padding: 2,
          backgroundColor: "white",
          borderRadius: "12px",
        }}
      >
        <PoolTitle assetSymbol={assetSymbol} />
        <Stack
          direction="column"
          gap={3}
          justifyContent="space-between"
          height="100%"
        >
          <Stack direction={"row"} alignItems={"flex-start"} spacing={1}>
            <ValueDisplay
              name="TVL"
              text={`$${formatNumber(totalStakedOfPoolAmount * usdRate * 1)}`}
              // smallText={assetSymbol}
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
                text={`$${formatNumber(totalStakedOfUserAmount * usdRate * 1)}`}
                // smallText={assetSymbol}
                align="right"
                isNameAbove
                flex={1}
                nameIcon={
                  // <Redeem
                  //   sx={{ fontSize: 15, color: "gray", marginLeft: 0.5 }}
                  // />
                  <Paid sx={{ fontSize: 15, color: "gray", marginLeft: 0.5 }} />
                }
                type="primary"
              />
            )}
          </Stack>
          {isConnectWallet && totalStakedOfUserAmount > 0 && (
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
              {points.map(e => (
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
              text={`${formatNumber(tokenBalanceAmout)} ${tokenSymbol}`}
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
              {totalStakedOfUserAmount > 0 && (
                <Button
                  buttonType="secondary"
                  endDecorator={<ArrowForward />}
                  fullWidth
                  // disabled={!yourStaked}
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

        <ModalWithdrawToken
          open={openModalWithraw}
          onClose={() => setOpenModalWithraw(false)}
          tokenBalanceAmout={totalStakedOfUserAmount}
        />
        <ModalDepositToken
          open={openModalDeposit}
          onClose={() => setOpenModalDeposit(false)}
          tokenBalanceAmout={tokenBalanceAmout}
          allowanceAmount={allowanceAmount}
          refetchAllowance={refetch}
          isLoadingBalance={isFetchBalance || isLoadingBalance}
        />
      </Card>
    </PoolDetailContextProvider>
  );
};

export default TokenPoolCard;
