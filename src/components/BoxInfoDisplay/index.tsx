import { Box, Stack, Typography } from "@mui/joy";
import React, { memo } from "react";

export default memo<{
    text: string
    description?: string
    icon?: string
    images?: string[]
}>(({icon, text, description, images}) => {
    return (
        <Stack sx={{
            background: '#F5F5F5',
            padding: 1,
            borderRadius: 10
        }} direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <Box width={'40px'} height={'40px'}>
                    {icon && <img src={icon} width={40} />}
                </Box>
                <Box>
                    <Typography level="title-lg">{text}</Typography>
                    {description && <Typography level="body-sm" color="neutral">{description}</Typography>}
                </Box>
            </Stack>
            {images && images.length > 0 &&
                <Stack direction={"row"} alignItems={"center"} justifyContent={"flex-end"} flexWrap={"wrap"}>
                    {images.map(e => (
                        <img src={e} width={40} height={40} style={{objectFit: 'cover', margin: 2, borderRadius: 5}}/>
                    ))}
                </Stack>
            }
        </Stack>
    )
})