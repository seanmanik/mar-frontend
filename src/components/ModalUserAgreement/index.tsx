import { memo, useState } from "react";
import ModalBlue from "../ModalBlue";
import { Checkbox, Link, Stack, Typography } from "@mui/joy";
import Button from "../Button";
import { IconWallet } from "../../icons";

export default memo<{
    open: boolean
    onClose: () => void
    onAgreed: () => void
}>(({ onAgreed, ...modalProps }) => {
    var [agree, setAgree] = useState(true)
    return (
        <ModalBlue {...modalProps}>
            <Stack alignItems={"center"}>
                <Typography level="h2">User Agreement</Typography>
                <Typography textAlign={"center"} marginTop={1}>I understand and consent to the<br /><Link>Terms of Service</Link> and <Link>Privacy Policy</Link></Typography>
                <Checkbox sx={{ marginTop: 3 }} label={<b>Yes, I agree</b>}
                    checked={agree}
                    onChange={e => setAgree(e.target.checked)} />
                <Button sx={{ marginTop: 4 }} buttonType="primary" disabled={!agree} onClick={onAgreed} endDecorator={<img src={IconWallet} width={24} height={24} />} fullWidth>
                    Connect Wallet
                </Button>
            </Stack>
        </ModalBlue>
    )
})