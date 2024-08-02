import { memo, useContext } from "react";

import UI from "./index.ui";
import { IPoolDetail } from "../../apis/getPools/types";

export default memo<{
  open: boolean;
  onClose: () => void;
  tokenBalanceAmout: number;
  allowanceAmount: number;
  pool: IPoolDetail
}>(
  ({
    open,
    onClose,
    tokenBalanceAmout,
    allowanceAmount,
    pool
  }) => {
    return (
      <>
        {open && (
          <UI
            open={open}
            onClose={onClose}
            balance={tokenBalanceAmout}
            allowanceAmount={allowanceAmount}
            pool={pool}
          />
        )}
      </>
    );
  }
);
