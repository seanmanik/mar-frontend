import { memo, useContext } from "react";

import UI from "./index.ui";
import { PoolDetailContext } from "../Pool/PoolDetailContext";

export default memo<{
  open: boolean;
  onClose: () => void;
  tokenBalanceAmout: number;
}>(
  ({
    open,
    onClose,
    tokenBalanceAmout,
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
            marPoint={23872}
            puppyPoint={2938}
            totalValue={userStaked * 1}
            stakeAmount={userStaked}
            pendingValue={8000}
            tokenAddress={tokenAddress}
            poolAddress={poolAddress}
            decimals={decimals}
            refetch={onHandleRefetchData}
            poolId={poolId}
          />
        )}
      </>
    );
  }
);
