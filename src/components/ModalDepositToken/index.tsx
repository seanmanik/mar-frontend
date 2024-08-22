import { memo, useContext } from "react";

import UI from "./index.ui";
import { IPoolDetail } from "../../apis/getPools/types";
import { useRecoilValue } from "recoil";
import { AccountBalanceForPool } from "../../state/AccountBalanceForPool";
import { SelectPoolState } from "../../state/SelectPoolState";

export default memo<{
  open: boolean;
  onClose: () => void;
  poolId: number
}>(
  ({
    open,
    onClose,
    poolId
  }) => {

    
    const pool = useRecoilValue(SelectPoolState({
      poolId
    }))
    
    const accountBalanceState = useRecoilValue(AccountBalanceForPool({poolId: poolId}))

    const accountBalance = accountBalanceState?.amount10 || 0
    const accountAllowanceBalance = accountBalanceState?.allowanceAmount10 || 0
  
    return (
      <>
        {open && pool &&(
          <UI
            open={open}
            onClose={onClose}
            balance={accountBalance}
            allowanceAmount={accountAllowanceBalance}
            pool={pool as IPoolDetail}
          />
        )}
      </>
    );
  }
);
