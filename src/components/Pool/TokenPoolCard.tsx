import { Card, Stack } from "@mui/joy";
import { useMemo, useState } from "react";
import ValueDisplay from "../ValueDisplay";
import {
  IconTotalValueStake,
  IconWallet,
  IconYourDailyReward,
  IconYourDeposited,
} from "../../icons";
import PoolTitle from "./PoolTitle";
import { ArrowForward, Bolt, Paid, Redeem } from "@mui/icons-material";
import Button from "../Button";
import { useAccount, useBalance } from "wagmi";
import { useGetAllowance } from "../../apis/interactWallet/EVM/useGetAllowance";
import { CONTRACT_DEFAUL_DATA, MAP_POOL_TO_TOKEN } from "../../constants/contract";
import ModalWithdrawToken from "../ModalWithdrawToken";
import ModalDepositToken from "../ModalDepositToken";
import { Address } from "viem";
import { get } from "lodash";
import { getTokenAmount } from "../../utils/numbers";
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

  const tokenBalance = useBalance({
    token: MAP_POOL_TO_TOKEN[poolAddress] as Address,
    address: account.address,
  });

  const decimals = Number(get(tokenBalance, "data.decimals", 18));

  const tokenBalanceValue = get(tokenBalance, "data.value", 0);
  const tokenSymbol = get(tokenBalance, "data.symbol", "");

  const tokenBalanceAmout = getTokenAmount(tokenBalanceValue, decimals);

  const allowanceAmount = getTokenAmount(allowance, decimals);

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
        gap={1}
        justifyContent="space-between"
        height="100%"
      >
        {isConnectWallet && (
          <Stack direction={"row"} alignItems={"flex-start"} spacing={1}>
            {
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
            }
            {
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
            }
          </Stack>
        )}
        <Stack direction="column" gap={1.5}>
          {
            <ValueDisplay
              variant="small"
              name="Total value Staked"
              text={`$${tvs}`}
              icon={IconTotalValueStake}
            />
          }
          {/* { (
            <ValueDisplay
              variant="small"
              name="Base Points Per Dollar"
              text={`${pts} PTS`}
              icon={IconDailyReward}
            />
          )} */}

          {
            <ValueDisplay
              variant="small"
              name="Your Value Staked"
              text={`$${yourStaked}`}
              icon={IconYourDeposited}
            />
          }
          {
            <ValueDisplay
              variant="small"
              name="Your Daily Reward"
              text={`${yourDailyReward} PTS`}
              icon={IconYourDailyReward}
            />
          }
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
            <Button
              buttonType="primary"
              endDecorator={<Bolt />}
              fullWidth
              onClick={() => setOpenModalDeposit(true)}
            >
              Deposit
            </Button>
            <Button
              buttonType="secondary"
              endDecorator={<ArrowForward />}
              fullWidth
              // disabled={!yourStaked}
              onClick={() => setOpenModalWithraw(true)}
            >
              Withdraw
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
        tokenBalanceAmout={tokenBalanceAmout}
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
        refetchAllowance={refetch}
      />
    </Card>
  );
};

export default TokenPoolCard;
