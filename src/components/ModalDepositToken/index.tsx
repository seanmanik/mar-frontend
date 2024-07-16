import { memo, useCallback, useEffect, useState } from "react";

import UI from "./index.ui";
import { useApprove } from "../../apis/interactWallet/EVM/useApprove";
import { useDeposit } from "../../apis/interactWallet/EVM/useDeposit";
import { CONTRACT_DEFAUL_DATA } from "../../constants/contract";

export default memo<{
  open: boolean;
  onClose: () => void;
  tokenBalanceAmout: number;
  symbol: string;
  allowanceAmount: number;

  tokenAddress: string;
  poolAddress: string;
  decimals: number;
  userStaked: number;

  refetch: () => void;
  refetchAllowance: () => void;
}>(
  ({
    open,
    onClose,
    tokenBalanceAmout,
    symbol,
    allowanceAmount,
    tokenAddress,
    poolAddress,
    decimals,
    refetch,
    refetchAllowance,
    userStaked,
  }) => {
    const [depositedSuccess, setDepositedSuccess] = useState(false);

    const [amount, setAmount] = useState(0);

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

    console.log(
      isPendingDeposit,
      isConfirmedDeposit,
      "isPendingDeposit, isConfirmedDeposit"
    );

    useEffect(() => {
      if (isConfirmedDeposit) {
        console.log("======");
        // refetch && refetch();
      }
    }, [refetch, isConfirmedDeposit]);

    useEffect(() => {
      if (isConfirmed) {
        // console.log('hihihihihihi')
        // refetchAllowance && refetchAllowance();
      }
    }, [refetchAllowance, isConfirmed]);

    useEffect(() => {
      if (!isPendingDeposit && isConfirmedDeposit) {
        setDepositedSuccess(true);
        // onClose && onClose();
      } else if (!isPendingDeposit && !isConfirmedDeposit) {
        setDepositedSuccess(false);
        // onClose && onClose();
      }
    }, [isPendingDeposit, isConfirmedDeposit, setDepositedSuccess]);

    return (
      <>
        {open && (
          <UI
            open={open}
            onClose={() => {
              setDepositedSuccess(false);
              onClose && onClose();
            }}
            isSuccess={depositedSuccess}
            balance={tokenBalanceAmout}
            symbol={symbol}
            allowanceAmount={allowanceAmount}
            marPoint={23872}
            puppyPoint={2938}
            totalValue={userStaked * 1}
            stakeAmount={userStaked}
            pendingValue={8000}
            onDeposit={onDeposit}
            onApprove={onApprove}
            isPendingApprove={isPending}
            isPendingDeposit={isPendingDeposit}
            amount={amount}
            setAmount={setAmount}
            txHash={txHash as string}
          />
        )}
      </>
    );
  }
);
