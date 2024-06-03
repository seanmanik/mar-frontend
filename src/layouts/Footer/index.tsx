import { Box, Stack, Typography } from '@mui/joy';
import React from "react";
import { ImageLogoFullBlue } from '../../images';

const Footer = () => {
    return (
        <Box bgcolor={'white'} width="100%">
            <Stack direction={"row"} maxWidth={1420} paddingLeft={'20px'} paddingRight={'20px'} height={250} alignItems={"center"} margin={"auto"} justifyContent={"space-between"}>
                <Stack direction="column" alignItems="flex-start" justifyContent="space-between">
                    <div>
                        <img src={ImageLogoFullBlue} width={140} />
                        <Typography>Brand Tagline copy for impact</Typography>
                    </div>
                </Stack>
            </Stack>
        </Box>
    )

}

export default Footer