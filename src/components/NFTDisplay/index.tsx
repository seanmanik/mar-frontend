import { Box, Stack, Typography } from "@mui/joy";
import React, { memo } from "react";
import ValueDisplay from "../ValueDisplay";

export default memo<{
    symbol?: string
    nftIds: {
        id: number
        image: string
    }[]
    icon?: string
}>(({icon, symbol, nftIds}) => {
    return (
        <ValueDisplay
            icon={icon}
            text={`${symbol} ${nftIds.map(e => `#${e.id}`).join(' ')}`}
            name=""
            images={nftIds.map(e => e.image)}
        />
        // <Stack sx={{
        //     background: '#F5F5F5',
        //     padding: 1,
        //     borderRadius: 10
        // }} direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
        //     <Stack direction={"row"} alignItems={"center"} spacing={1}>
        //         <Box width={'40px'} height={'40px'}>
        //             {icon && <img src={icon} width={40} />}
        //         </Box>
        //         <Box>
        //             <Typography level="title-lg">{symbol} {nftIds.map(e => `#${e.id}`).join(' ')}</Typography>
        //         </Box>
        //     </Stack>
        //     <Stack direction={"row"} alignItems={"center"} justifyContent={"flex-end"} flexWrap={"wrap"}>
        //         {nftIds.map(e => (
        //             <img src={e.image} width={40} height={40} style={{objectFit: 'cover', margin: 2, borderRadius: 5}}/>
        //         ))}
        //     </Stack>
        // </Stack>
    )
})