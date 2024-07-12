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
    refetchAllowance,
  }) => {
    const [depositedSuccess, setDepositedSuccess] = useState(false);

    const [amount, setAmount] = useState(0);

    const tokenDefaultData = CONTRACT_DEFAUL_DATA[tokenAddress];
    const poolDefaultData = CONTRACT_DEFAUL_DATA[poolAddress];

    const { isPending, isConfirming, isConfirmed, onApprove } = useApprove({
      contractAddress: tokenAddress,
      decimals,
      spenderAddress: poolAddress,
      abi: tokenDefaultData.abi,
    });

    const {
      isPending: isPendingDeposit,
      isConfirming: isConfirmingDeposit,
      isConfirmed: isConfirmedDeposit,
      onDeposit,
    } = useDeposit({
      contractAddress: poolAddress,
      decimals,
      abi: poolDefaultData.abi,
    });

    console.log(isPendingDeposit, isConfirmingDeposit, isConfirmedDeposit);

    const onHandleDeposit = async (val: number) => {
      try {
        await onDeposit(val);
        setDepositedSuccess(true);
        onClose && onClose();
      } catch (error) {
        console.log(error);
        setDepositedSuccess(false);
        onClose && onClose();
      }
    };

    useEffect(() => {
      if (isConfirmed || isConfirmedDeposit) {
        refetchAllowance();
      }
    }, [refetchAllowance, isConfirmed, isConfirmingDeposit]);

    return (
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
        totalValue={82938}
        stakeAmount={82312}
        pendingValue={8000}
        onDeposit={onHandleDeposit}
        onApprove={onApprove}
        amount={amount}
        setAmount={setAmount}
      />
    );
  }
);
