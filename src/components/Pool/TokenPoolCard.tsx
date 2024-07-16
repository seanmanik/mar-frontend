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
import { ArrowForward, Bolt, Paid, Redeem } from "@mui/icons-material";
import Button from "../Button";
import { useAccount, useBalance } from "wagmi";
import { useGetAllowance } from "../../apis/interactWallet/EVM/useGetAllowance";
import {
  CONTRACT_DEFAUL_DATA,
  MAP_POOL_TO_TOKEN,
} from "../../constants/contract";
import ModalWithdrawToken from "../ModalWithdrawToken";
import ModalDepositToken from "../ModalDepositToken";
import { Address } from "viem";
import { get } from "lodash";
import { getTokenAmount } from "../../utils/numbers";
import { useGetTotalStakedOfPool } from "../../apis/interactWallet/EVM/useGetTotalStakedOfPool";
import { useGetUserStakedOfPool } from "../../apis/interactWallet/EVM/useGetUserStakedOfPool";
import { PoolsContext } from "../../context/PoolsContext";
export interface ITokenPoolCardProps {
  tvl: number;
  dailyReward: number;
  tvs: number;
  pts: number;
  yourStaked: number;
  yourDailyReward: number;

  assetName: string;
  assetSymbol: string;
  poolAddress: string;
}

const TokenPoolCard = ({
  tvl,
  dailyReward,
  tvs,
  // pts,
  yourStaked,
  yourDailyReward,
  // assetName,
  assetSymbol,
  poolAddress,
}: ITokenPoolCardProps) => {
  const [openModalDeposit, setOpenModalDeposit] = useState(false);

  const [openModalWithraw, setOpenModalWithraw] = useState(false);
  const { refecthGetUserStakedOfPoolMultiCall } = useContext(PoolsContext);

  const account = useAccount();

  const isConnectWallet = useMemo(() => {
    return !!account && !!account.isConnected;
  }, [account]);

  const tokenAddress = useMemo(() => {
    return MAP_POOL_TO_TOKEN[poolAddress] as Address;
  }, [poolAddress]);

  const tokenDefaultData = CONTRACT_DEFAUL_DATA[tokenAddress];

  const { data: allowance, refetch } = useGetAllowance({
    contractAddress: tokenAddress,
    ownerAddress: account.address as string,
    spenderAddress: poolAddress,
    abi: tokenDefaultData.abi,
  });

  const {
    data: dataBalance,
    refetch: refetchBalance,
    isFetching: isFetchBalance,
    isLoading: isLoadingBalance,
  } = useBalance({
    token: MAP_POOL_TO_TOKEN[poolAddress] as Address,
    address: account.address,
  });

  const decimals = Number(get(dataBalance, "decimals", 18));
  const tokenBalanceValue = get(dataBalance, "value", 0);
  const tokenSymbol = get(dataBalance, "symbol", "");

  const { data: totalStakedOfPool, refetch: refetchTotalStakedOfPool } =
    useGetTotalStakedOfPool({
      contractAddress: poolAddress,
      abi: CONTRACT_DEFAUL_DATA[poolAddress].abi,
    });

  const totalStakedOfPoolAmount = getTokenAmount(totalStakedOfPool, decimals);

  const { data: totalStakedOfUser, refetch: refetchTotalStakedOfUser } =
    useGetUserStakedOfPool({
      contractAddress: poolAddress,
      userAddress: account.address as string,
      abi: CONTRACT_DEFAUL_DATA[poolAddress].abi,
    });

  const totalStakedOfUserAmount = getTokenAmount(totalStakedOfUser, decimals);

  const tokenBalanceAmout = getTokenAmount(tokenBalanceValue, decimals);

  const allowanceAmount = getTokenAmount(allowance, decimals);

  const onHandleRefetchData = useCallback(() => {
    refetchBalance();
    refetchTotalStakedOfPool();
    refetchTotalStakedOfUser();
    refecthGetUserStakedOfPoolMultiCall();
  }, [
    refetch,
    refetchTotalStakedOfPool,
    refetchTotalStakedOfUser,
    refecthGetUserStakedOfPoolMultiCall,
  ]);

  return (
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
            text={`$${totalStakedOfPoolAmount * 1}`}
            isNameAbove
            flex={1}
            nameIcon={
              <Paid sx={{ fontSize: 15, color: "gray", marginRight: 0.5 }} />
            }
            type="primay"
          />
          {isConnectWallet && (
            <ValueDisplay
              name="MY DEPOSIT"
              text={`$${totalStakedOfUserAmount * 1}`}
              align="right"
              isNameAbove
              flex={1}
              nameIcon={
                // <Redeem
                //   sx={{ fontSize: 15, color: "gray", marginLeft: 0.5 }}
                // />
                <Paid sx={{ fontSize: 15, color: "gray", marginLeft: 0.5 }} />
              }
              type="primay"
            />
          )}
        </Stack>
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
          <ValueDisplay
            variant="small"
            name="Mar Points"
            text={`${"467,000"}`}
            icon={IconMarPoint}
            iconWidth={32}
          />
          {/* { (
            <ValueDisplay
              variant="small"
              name="Base Points Per Dollar"
              text={`${pts} PTS`}
              icon={IconDailyReward}
            />
          )} */}
          <ValueDisplay
            variant="small"
            name="Puppy Points"
            text={`${"467,000"}`}
            icon={IconPuppyPoint}
            iconWidth={32}
          />
          {/* <ValueDisplay
            variant="small"
            name="Your Daily Reward"
            text={`${totalStakedOfUserAmount * 0.001} PTS`}
            icon={IconYourDailyReward}
          /> */}
        </Stack>
        <ValueDisplay
          variant="small"
          name="Wallet Balance"
          text={`${tokenBalanceAmout} ${tokenSymbol}`}
          icon={IconWalletYellow}
          iconWidth={20}
          type="tertiary"
        />
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
        symbol={tokenSymbol}
        tokenAddress={tokenAddress}
        poolAddress={poolAddress}
        decimals={decimals}
        tokenBalanceAmout={totalStakedOfUserAmount}
        userStaked={totalStakedOfUserAmount}
        refetch={onHandleRefetchData}
      />
      <ModalDepositToken
        open={openModalDeposit}
        onClose={() => setOpenModalDeposit(false)}
        tokenBalanceAmout={tokenBalanceAmout}
        symbol={tokenSymbol}
        allowanceAmount={allowanceAmount}
        tokenAddress={tokenAddress}
        poolAddress={poolAddress}
        decimals={decimals}
        refetch={onHandleRefetchData}
        refetchAllowance={refetch}
        userStaked={totalStakedOfUserAmount}
        isLoadingBalance={isFetchBalance || isLoadingBalance}
      />
    </Card>
  );
};

export default TokenPoolCard;
