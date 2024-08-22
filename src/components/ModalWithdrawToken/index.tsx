import { memo, useContext } from "react";

import UI from "./index.ui";
import { IPoolDetail } from "../../apis/getPools/types";
import { useRecoilValue } from "recoil";
import { SelectPoolState } from "../../state/SelectPoolState";

export default memo<{
  open: boolean;
  poolId: number
  onClose: () => void;
}>(
  ({
    open,
    onClose,
    poolId
  }) => {
    const pool = useRecoilValue(SelectPoolState({
      poolId
    }))
    return (
      <>
        {open && pool && (
          <UI
            open={open}
            onClose={onClose}
            pool={pool as IPoolDetail}
          />
        )}
      </>
    );
  }
);
