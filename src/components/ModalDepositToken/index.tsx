import { memo, useEffect, useState } from "react";

import UI from "./index.ui";
import { useApprove } from "../../apis/interactWallet/EVM/useApprove";

export default memo<{
  open: boolean;
  onClose: () => void;
  tokenBalanceAmout: number
  symbol: string
  allowanceAmount: number

  contractAddress: string
  spenderAddress: string
  abi: any
  decimals: number

  refetchAllowance: () => void
}>(({ open, onClose, tokenBalanceAmout, symbol, allowanceAmount, contractAddress, spenderAddress, abi, decimals, refetchAllowance }) => {
  const [depositedSuccess, setDepositedSuccess] = useState(false);

  const [amount, setAmount] = useState(0);

  const {
    isPending,
    isConfirming,
    isConfirmed,
    onApprove
  } = useApprove({
    contractAddress, decimals,
    spenderAddress,
    abi
  })

  console.log(isPending,
    isConfirming,
    isConfirmed,)

  useEffect(() => {
    if (isConfirmed) {
      refetchAllowance()
    }
  }, [refetchAllowance, isConfirmed])

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
      onDeposit={() => setDepositedSuccess(true)}
      onApprove={onApprove}
      amount={amount}
      setAmount={setAmount}
    />
  );
});
