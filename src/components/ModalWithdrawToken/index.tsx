import { memo, useState } from "react";

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

  decimals: number;
}>(({ open, onClose, symbol,
  tokenAddress,
  poolAddress,
  decimals, tokenBalanceAmout }) => {
  const [onSuccess, setOnSuccess] = useState(false);
  const [amount, setAmount] = useState(0);

  const tokenDefaultData = CONTRACT_DEFAUL_DATA[tokenAddress];
  const poolDefaultData = CONTRACT_DEFAUL_DATA[poolAddress];

  const {
    isPending,
    isConfirming,
    isConfirmed,
    onWithdraw,
  } = useWithdraw({
    contractAddress: poolAddress,
    decimals,
    abi: poolDefaultData.abi,
  });

  const onHandleWithdraw = async (val: number) => {
    try {
      await onWithdraw(val);
      setOnSuccess(true);
      onClose && onClose();
    } catch (error) {
      console.log(error);
      setOnSuccess(false);
      onClose && onClose();
    }
  };

  return (
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
      totalValue={82938}
      stakeAmount={82312}
      pendingValue={8000}
      amount={amount}
      setAmount={setAmount}
      onWithdraw={onHandleWithdraw}
    />
  );
});
