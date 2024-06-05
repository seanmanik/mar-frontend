import { Box, Stack, Typography } from "@mui/joy";
import React, { memo } from "react";
import BoxInfoDisplay from "../BoxInfoDisplay";

export default memo<{
    amount: number
    symbol?: string
    name: string
    icon?: string
}>(({amount, name, icon, symbol}) => {
    return (
        <BoxInfoDisplay 
            text={`${parseFloat(amount.toFixed(2)).toLocaleString()} ${symbol ? ` ${symbol}`: ''}`}
            description={name}
            icon={icon}
        />
        // <Stack sx={{
        //     background: '#F5F5F5',
        //     padding: 1,
        //     borderRadius: 10
        // }} direction={"row"} alignItems={"center"} spacing={1}>
        //     <Box width={'40px'} height={'40px'}>
        //         {icon && <img src={icon} width={40} />}
        //     </Box>
        //     <Box>
        //         <Typography level="title-lg">{parseFloat(amount.toFixed(2)).toLocaleString()}{symbol ? ` ${symbol}`: ''}</Typography>
        //         <Typography level="body-sm" color="neutral">{name}</Typography>
        //     </Box>
        // </Stack>
    )
})