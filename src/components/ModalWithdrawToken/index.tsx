import { memo, useState } from "react";

import UI from './index.ui'

export default memo<{
    open: boolean
    onClose: () => void
}>(({open, onClose}) => {
    const [onSuccess, setOnSuccess] = useState(false)
    return <UI
        open={open}
        onClose={() => {
            setOnSuccess(false)
            onClose && onClose()
        }}
        isSuccess={onSuccess} 
        balance={1203000} 
        symbol="USDT" 
        marPoint={23872} 
        puppyPoint={2938} 
        totalValue={82938} 
        stakeAmount={82312} 
        pendingValue={8000}
        onWithdraw={() => setOnSuccess(true)}
    />
})