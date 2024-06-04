import { memo, useState } from "react";

import UI from './index.ui'

export default memo<{
    open: boolean
    onClose: () => void
}>(({open, onClose}) => {
    const [depositedSuccess, setDepositedSuccess] = useState(false)
    return <UI
        open={open}
        onClose={() => {
            setDepositedSuccess(false)
            onClose && onClose()
        }}
        isSuccess={depositedSuccess} 
        balance={1203000} 
        symbol="USDT" 
        marPoint={23872} 
        puppyPoint={2938} 
        totalValue={82938} 
        stakeAmount={82312} 
        pendingValue={8000}
        onDeposit={() => setDepositedSuccess(true)}
    />
})