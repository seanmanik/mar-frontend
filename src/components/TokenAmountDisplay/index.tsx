import { Box, Stack, Typography } from "@mui/joy";
import React, { memo } from "react";

export default memo<{
    amount: number
    name: string
    icon?: string
}>(({amount, name, icon}) => {
    return (
        <Stack sx={{
            background: '#F5F5F5',
            padding: 1,
            borderRadius: 10
        }} direction={"row"} alignItems={"center"} spacing={1}>
            <Box width={'40px'} height={'40px'}>
                {icon && <img src={icon} width={40} />}
            </Box>
            <Box>
                <Typography level="title-lg">{parseFloat(amount.toFixed(2)).toLocaleString()}</Typography>
                <Typography level="title-sm" color="neutral">{name}</Typography>
            </Box>
        </Stack>
    )
})