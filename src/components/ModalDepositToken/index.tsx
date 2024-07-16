import { memo, useContext } from "react";

import UI from "./index.ui";
import { PoolDetailContext } from "../Pool/PoolDetailContext";

export default memo<{
  open: boolean;
  onClose: () => void;
  tokenBalanceAmout: number;
  allowanceAmount: number;
  refetchAllowance: () => void;

  isLoadingBalance: boolean;
}>(
  ({
    open,
    onClose,
    tokenBalanceAmout,
    allowanceAmount,
    refetchAllowance,
    isLoadingBalance,
  }) => {
    const {
      userStaked,
      tokenAddress,
      poolAddress,
      decimals,
      onHandleRefetchData,
      symbol,
      poolId,
    } = useContext(PoolDetailContext);

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
            refetch={onHandleRefetchData}
            refetchAllowance={refetchAllowance}
            isLoadingBalance={isLoadingBalance}
            poolId={poolId}
          />
        )}
      </>
    );
  }
);
