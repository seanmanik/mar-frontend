import React, { memo } from "react";

import UI from './index.ui'

export default memo<{
    open: boolean
    onClose: () => void
}>(({...modalProps}) => {
    return <UI {...modalProps}/>
})