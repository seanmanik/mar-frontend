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
        nftIds={[{
            id: 12,
            image: 'https://i.seadn.io/gcs/files/7980eff33afcecc76c5b77b1f2d3bcb7.png'
        }, {
            id: 967,
            image: 'https://i.seadn.io/gcs/files/7980eff33afcecc76c5b77b1f2d3bcb7.png'
        }, {
            id: 231,
            image: 'https://i.seadn.io/gcs/files/7980eff33afcecc76c5b77b1f2d3bcb7.png'
        }, {
            id: 653,
            image: 'https://i.seadn.io/gcs/files/7980eff33afcecc76c5b77b1f2d3bcb7.png'
        }]} 
        symbol="Pudgy" 
        marPoint={23872} 
        puppyPoint={2938} 
        totalValue={82938} 
        stakeAmount={82312} 
        pendingValue={8000}
        onDeposit={() => setDepositedSuccess(true)}
    />
})