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
        nftIds={[]} 
        symbol="Pudgy" 
        marPoint={23872} 
        puppyPoint={2938} 
        totalValue={82938} 
        stakeAmount={82312} 
        pendingValue={8000}
        openseaLink="https://abc.com"
        blurLink="https://abc.com"
        onDeposit={() => setDepositedSuccess(true)}
    />
})