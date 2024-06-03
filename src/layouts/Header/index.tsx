import { Box, Button, Stack } from "@mui/joy";
import { memo, useState } from "react";
import { ImageLogoFullBlue } from "../../images";
import { IconGroupAdd } from "../../icons";
import ModalUserAgreement from "../ModalUserAgreement";
import ModalConnectWallet from "../ModalConnectWallet";
import ConnectButton from "./ConnectButton";

export default memo(() => {
    const [ openModalConnectWallet, setOpenModalConnectWallet ] = useState(false)
    const [ openModalUserAgreement, setOpenModalUserAgreement ] = useState(false)
    return (
        <Box bgcolor={'white'}>
            <Stack direction={"row"} maxWidth={1420} paddingLeft={'20px'} paddingRight={'20px'} height={60} alignItems={"center"} margin={"auto"} justifyContent={"space-between"}>
                <img src={ImageLogoFullBlue} width={140}/>
                <Stack direction={"row"}>
                    <Button variant="outlined" color="neutral" sx={{marginRight: 2}}>Get 123 Points<img src={IconGroupAdd} style={{marginLeft: 5}}/></Button>
                    <ConnectButton onClick={() => setOpenModalUserAgreement(true)} />
                </Stack>
            </Stack>

            <ModalUserAgreement
                open={openModalUserAgreement} 
                onClose={() => setOpenModalUserAgreement(false)}
                onAgreed={() => {
                    setOpenModalUserAgreement(false)
                    setOpenModalConnectWallet(true)
                }}
                />
            <ModalConnectWallet open={openModalConnectWallet} onClose={() => setOpenModalConnectWallet(false)}/>
        </Box>
    )
})