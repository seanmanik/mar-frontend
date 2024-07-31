import { memo, useContext } from "react";

import UI from "./index.ui";
import { PoolDetailContext } from "../Pool/PoolDetailContext";
import { onHandlePostEstimateRewardRequest } from "../../apis/estimateRewardByInput";

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
      points
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
            marPoint={points.find(e => e.symbol == 'MAR')?.pointsPerDay || 0}
            puppyPoint={points.find(e => e.symbol == 'PUPPY')?.pointsPerDay || 0}
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
