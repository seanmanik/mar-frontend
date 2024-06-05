import { Box, Stack, StackProps, Typography } from "@mui/joy";
import React, { memo } from "react";

export default memo<{
    name: string
    icon?: string
    text?: string
    images?: string[]
} & StackProps>(({icon, name, text, images, ...stackProps}) => {
    return (
        <Stack sx={{
            background: '#F5F5F5',
            padding: 1,
            borderRadius: 10
        }} direction={"row"} alignItems={"center"} justifyContent={"space-between"} {...stackProps} >
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <Box width={'40px'} height={'40px'}>
                    {icon && <img src={icon} width={40} />}
                </Box>
                <Box>
                    <Typography level="title-lg">{name}</Typography>
                </Box>
            </Stack>
            <Stack direction={"column"} alignItems={'flex-end'}>
                {text && <Typography level="title-lg" textAlign={'left'}>{text}</Typography>}
                {images && images.length > 0 &&
                    <Stack direction={"row"} alignItems={"center"} justifyContent={"flex-end"} flexWrap={"wrap"}>
                        {images.slice(0, 3).map(e => (
                            <img src={e} width={25} height={25} style={{objectFit: 'cover', margin: 2, borderRadius: 5}}/>
                        ))}
                        {images.length > 3 && (
                            <Stack alignItems={"center"} justifyContent={"center"} sx={{background: 'white', borderRadius: 5, margin: '2px'}} height={25} width={25}>
                                <Typography fontSize={"10px"} fontWeight={700}>+{images.length - 3}</Typography>
                            </Stack>
                        )}
                    </Stack>
                }
            </Stack>
        </Stack>
    )
})