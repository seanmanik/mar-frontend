import React, { memo } from "react";

import UI from './index.ui'

export default memo<{
    open: boolean
    onClose: () => void
}>(({...modalProps}) => {
    return <UI {...modalProps} balance={1203000} symbol="USDC" marPoint={23872} puppyPoint={2938} totalValue={82938} stakeAmount={82312} pendingValue={8000}/>
})