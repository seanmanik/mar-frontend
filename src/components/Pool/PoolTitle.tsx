import { Stack, Typography } from "@mui/joy";
import React from "react";
import { ImageBTC, ImageETH } from "../../images";
import BootsTag from "./BoostTag";

const PoolTitle = () => {
    return <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" gap={1} alignItems="center">
            <img src={ImageBTC} width={24} height={24} />
            <Typography fontWeight={700} fontSize={20}>WBTC</Typography>
            <img src={ImageETH} width={20} height={20} />
        </Stack>
        <Stack direction="row" gap={1} alignItems="center">
            <BootsTag />
            <BootsTag />
        </Stack>
    </Stack>
}

export default PoolTitle