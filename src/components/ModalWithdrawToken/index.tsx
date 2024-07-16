import { memo } from "react";

import UI from "./index.ui";

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
    return (
      <>
        {open && (
          <UI
            open={open}
            onClose={onClose}
            balance={tokenBalanceAmout}
            symbol={symbol}
            marPoint={23872}
            puppyPoint={2938}
            totalValue={userStaked * 1}
            stakeAmount={userStaked}
            pendingValue={8000}
            tokenAddress={tokenAddress}
            poolAddress={poolAddress}
            decimals={decimals}
            refetch={refetch}
          />
        )}
      </>
    );
  }
);
