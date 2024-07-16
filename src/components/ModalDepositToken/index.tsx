import { memo } from "react";

import UI from "./index.ui";

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

  isLoadingBalance: boolean
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
    isLoadingBalance
  }) => {

    return (
      <>
        {open && (
          <UI
            open={open}
            onClose={onClose}
            balance={tokenBalanceAmout}
            symbol={symbol}
            allowanceAmount={allowanceAmount}
            marPoint={23872}
            puppyPoint={2938}
            totalValue={userStaked * 1}
            stakeAmount={userStaked}
            pendingValue={8000}
            tokenAddress={tokenAddress}
            poolAddress={poolAddress}
            decimals={decimals}
            refetch={refetch}
            refetchAllowance={refetchAllowance}
            isLoadingBalance={isLoadingBalance}
          />
        )}
      </>
    );
  }
);
