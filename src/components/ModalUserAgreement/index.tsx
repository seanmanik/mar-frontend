import { memo, useState } from "react";
import ModalBlue from "../ModalBlue";
import { Button, Checkbox, Link, Stack, Typography } from "@mui/joy";
import { IconWallet } from "../../icons";

export default memo<{
    open: boolean
    onClose: () => void
    onAgreed: () => void
}>(({onAgreed, ...modalProps}) => {
    var [agree, setAgree] = useState(true)
    return (
        <ModalBlue {...modalProps}>
            <Stack alignItems={"center"}>
                <Typography level="h2">User Agreement</Typography>
                <Typography textAlign={"center"} marginTop={1}>I understand and consent to the<br/><Link>Terms of Service</Link> and <Link>Privacy Policy</Link></Typography>
                <Checkbox sx={{marginTop: 3}} label={<b>Yes, I agree</b>} 
                    checked={agree} 
                    onChange={e => setAgree(e.target.checked)}/>
                <Button sx={{width: '100%', marginTop: 4}}
                    disabled={!agree}
                    onClick={onAgreed}
                >
                    Connect Wallet <img src={IconWallet} style={{marginLeft: 10}}/>
                </Button>
            </Stack>
        </ModalBlue>
    )
})