import { memo, useState } from "react";

import UI from "./index.ui";

export default memo<{
  open: boolean;
  onClose: () => void;
}>(({ open, onClose }) => {
  const [onSuccess, setOnSuccess] = useState(false);
  return (
    <UI
      open={open}
      onClose={() => {
        setOnSuccess(false);
        onClose && onClose();
      }}
      isSuccess={onSuccess}
      nftIds={[
        {
          id: 1,
          image:
            "https://i.seadn.io/gae/WG55wHkFEYqegub2kkMZbUJwmI0TfW75LRrgI4odvsfqZ0sTEX9CCr3QUenYrf9tzIsSUp7vNccImZtDO-kcTLzsqxlb98DKiO2mLOk?auto=format&dpr=1&w=1000",
        },
      ]}
      symbol="Pudgy"
      marPoint={23872}
      puppyPoint={2938}
      totalValue={82938}
      stakeAmount={82312}
      pendingValue={8000}
      openseaLink="https://abc.com"
      blurLink="https://abc.com"
      onWithdraw={() => setOnSuccess(true)}
    />
  );
});
