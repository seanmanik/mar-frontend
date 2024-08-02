import { memo, useContext } from "react";

import UI from "./index.ui";
import { PoolDetailContext } from "../Pool/PoolDetailContext";
import { IPoolDetail } from "../../apis/getPools/types";

export default memo<{
  open: boolean;
  pool: IPoolDetail
  onClose: () => void;
}>(
  ({
    open,
    onClose,
    pool
  }) => {
    return (
      <>
        {open && (
          <UI
            open={open}
            onClose={onClose}
            pool={pool}
          />
        )}
      </>
    );
  }
);
