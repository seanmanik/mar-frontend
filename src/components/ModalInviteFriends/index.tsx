import { memo } from "react";
import ModalBlue from "../ModalBlue";
import { Stack, Typography } from "@mui/joy";
import { GroupAdd, Twitter } from "@mui/icons-material";
import Button from "../Button";

export default memo<{
    open: boolean
    onClose: () => void
}>(({ ...modalProps }) => {
    return (
        <ModalBlue {...modalProps}
            title={`Invite friends to
            points.pro`}
        >
            <Stack alignItems={"center"} paddingTop={5} paddingBottom={5}>
                <GroupAdd sx={{ fontSize: 50, color: 'black' }} />
                <Typography fontSize={76} fontWeight={800} lineHeight={'70px'} marginBottom={3}>25,000</Typography>
                <Typography color="neutral" fontSize={14} fontWeight={600}>MAR REFERRAL POINTS EARNED</Typography>
                <Typography level="body-md" textAlign={"center"} marginTop={3} marginBottom={3}>Share your invite code or the link to tweet<br />your invite and earn x points x user activity</Typography>

                <Stack gap={1} direction="row">
                    <Button buttonType="secondary" fullWidth>
                        JWN-NPW
                    </Button>
                    <Button buttonType="primary" endDecorator={<Twitter />} fullWidth>
                        Share link
                    </Button>
                </Stack>
            </Stack>
        </ModalBlue>
    )
})