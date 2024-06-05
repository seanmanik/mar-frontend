import { Card } from "@mui/joy";
import React from "react";

const PoolCard = (props:any) => {
    return <Card sx={{
        height: 285,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: '12px'
    }}>
        {props.children}
    </Card>
}

export default PoolCard