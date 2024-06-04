import { memo } from "react";
import ModalBlue from "../ModalBlue";
import { Button, Stack, Typography } from "@mui/joy";
import { GroupAdd, Twitter } from "@mui/icons-material";

export default memo<{
    open: boolean
    onClose: () => void
}>(({...modalProps}) => {
    return (
        <ModalBlue {...modalProps}
            title={`Invite friends to
            points.pro`}
        >
            <Stack alignItems={"center"} paddingTop={5} paddingBottom={5}>
                <GroupAdd sx={{fontSize: 50, color: 'black'}}/>
                <Typography fontSize={76} fontWeight={800} lineHeight={'70px'} marginBottom={3}>25,000</Typography>
                <Typography color="neutral" fontSize={14} fontWeight={600}>MAR REFERRAL POINTS EARNED</Typography>
                <Typography level="body-md" textAlign={"center"} marginTop={3} marginBottom={3}>Share your invite code or the link to tweet your invite and earn x points x user activity</Typography>
                <Stack direction={"row"} spacing={1}>
                    <Button variant="soft" color="neutral" sx={{width: 150}}>JWN-NPW</Button>
                    <Button color="primary" sx={{width: 150}} endDecorator={<Twitter fontSize="small"/>}>Share link</Button>
                </Stack>
            </Stack>
        </ModalBlue>
    )
})