import React, { memo } from "react";
import ModalWhite from "../ModalWhite";
import { Box, Stack, Typography } from "@mui/joy";
import imgInfo from './info.png'
import { Bolt } from "@mui/icons-material";
import Button from "../Button";
export default memo<{
    open: boolean
    onClose: () => void
}>(({...modalProps}) => {

    const images=[
        'https://i.seadn.io/gae/WG55wHkFEYqegub2kkMZbUJwmI0TfW75LRrgI4odvsfqZ0sTEX9CCr3QUenYrf9tzIsSUp7vNccImZtDO-kcTLzsqxlb98DKiO2mLOk',
        'https://i.seadn.io/gae/WG55wHkFEYqegub2kkMZbUJwmI0TfW75LRrgI4odvsfqZ0sTEX9CCr3QUenYrf9tzIsSUp7vNccImZtDO-kcTLzsqxlb98DKiO2mLOk',
        'https://i.seadn.io/gae/WG55wHkFEYqegub2kkMZbUJwmI0TfW75LRrgI4odvsfqZ0sTEX9CCr3QUenYrf9tzIsSUp7vNccImZtDO-kcTLzsqxlb98DKiO2mLOk'
    ]
    return (
        <ModalWhite {...modalProps} title="How to Level up"
            headerChildren={
                <Box>
                    <Typography color="neutral" level="body-sm"><b>Level Up</b>: Gain a new level every 5 days (120 hours)</Typography>
                    <Typography color="neutral" level="body-sm"><b>Mint NFTs</b>: Mint NFTs to advance levels faster (up to 3 NFTs per wallet)</Typography>

                    <Stack marginTop={4} direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                        <Button buttonType="primary" endDecorator={<Bolt fontSize="small" />}>Mint NFT Booster</Button>
                        <Stack direction={"row"} alignItems={"center"} justifyContent={"flex-end"} flexWrap={"wrap"}>
                            {images.map((e, i) => (
                                <img key={i} src={e} width={40} height={40} style={{objectFit: 'cover', margin: 2, borderRadius: 5}}/>
                            ))}
                            {images.length > 0 && 
                                <Typography level="title-sm" marginLeft={1}>NFTs Minted</Typography> }
                        </Stack>
                    </Stack>
                </Box>
            }
        >
            <Box margin={-2}>
                <img src={imgInfo} width={'600px'} style={{display: 'block'}}/>
            </Box>
        </ModalWhite>
    )
})