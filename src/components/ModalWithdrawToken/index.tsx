import { memo, useEffect, useState } from "react";

import UI from "./index.ui";
import { useWithdraw } from "../../apis/interactWallet/EVM/useWithdraw";
import { CONTRACT_DEFAUL_DATA } from "../../constants/contract";

export default memo<{
  open: boolean;
  onClose: () => void;
  symbol: string;
  tokenAddress: string;
  poolAddress: string;
  tokenBalanceAmout: number;
  userStaked: number;
  decimals: number;
  refetch: () => void;
}>(
  ({
    open,
    onClose,
    symbol,
    tokenAddress,
    poolAddress,
    userStaked,
    decimals,
    tokenBalanceAmout,
    refetch,
  }) => {
    const [onSuccess, setOnSuccess] = useState(false);
    const [amount, setAmount] = useState(0);

    const tokenDefaultData = CONTRACT_DEFAUL_DATA[tokenAddress];
    const poolDefaultData = CONTRACT_DEFAUL_DATA[poolAddress];

    const { isPending, isConfirmed, txHash, onWithdraw } = useWithdraw({
      contractAddress: poolAddress,
      decimals,
      abi: poolDefaultData.abi,
    });

    useEffect(() => {
      if (isConfirmed) {
        refetch && refetch();
      }
    }, [refetch, isConfirmed]);

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
      <>
        {open && (
          <UI
            open={open}
            onClose={() => {
              setOnSuccess(false);
              onClose && onClose();
            }}
            isSuccess={onSuccess}
            balance={tokenBalanceAmout}
            symbol={symbol}
            marPoint={23872}
            puppyPoint={2938}
            totalValue={userStaked * 1}
            stakeAmount={userStaked}
            pendingValue={8000}
            amount={amount}
            setAmount={setAmount}
            onWithdraw={onWithdraw}
            isPendingWithdraw={isPending}
            txHash={txHash as string}
          />
        )}
      </>
    );
  }
);
