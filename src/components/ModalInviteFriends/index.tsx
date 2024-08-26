import { memo, useEffect, useState } from "react";
import ModalBlue from "../ModalBlue";
import { Box, Stack, Typography } from "@mui/joy";
import { GroupAdd, Twitter } from "@mui/icons-material";
import Button from "../Button";
import { getRefcode } from "../../apis/getRefcode";
import { useRecoilValue } from "recoil";
import { AuthTokenState } from "../../state/AuthTokenState";
import { Copy } from "lucide-react";
import { toast } from "react-toastify";

export default memo<{
  open: boolean;
  onClose: () => void;
}>(({ ...modalProps }) => {
  const [refCode, setRefCode] = useState('')
  const token = useRecoilValue(AuthTokenState)
  
  useEffect(() => {
    if (!token) return;
    (async () => {
      var v = await getRefcode({
        token: token
      })
      setRefCode(v)
    })();
  }, [token])

  return (
    <ModalBlue
      {...modalProps}
      title={`Invite friends to
            points.pro`}
    >
      <Box>
        <Stack alignItems={"center"} paddingTop={5} paddingBottom={2}>
          <GroupAdd sx={{ fontSize: 50, color: "black" }} />
          <Typography
            fontSize={76}
            fontWeight={800}
            lineHeight={"70px"}
            marginBottom={3}
          >
            25,000
          </Typography>
          <Typography color="neutral" fontSize={14} fontWeight={600}>
            MAR REFERRAL POINTS EARNED
          </Typography>
          <Typography
            level="body-md"
            textAlign={"center"}
            marginTop={3}
            marginBottom={3}
          >
            Share your invite code or the link to tweet
            <br />
            your invite and earn x points x user activity
          </Typography>
        </Stack>
        <Stack gap={1} direction="row"padding={2}>
          <Button buttonType="secondary" fullWidth endDecorator={<Copy size={'18px'}/>} onClick={() => {
            try {
              navigator.clipboard.writeText(`${location.host}?${refCode}`)
              toast.success("Copied to clipboard")
            }
            catch (ex) {
              toast.error('ERROR:' + (ex as any).toString())
            }
          }}>
            {refCode}
          </Button>
          <Button buttonType="primary" endDecorator={<Twitter />} fullWidth onClick={(() => {
            const twitterBaseUrl = "https://twitter.com/intent/tweet";
            const url = `https://${'chat.openapi.com'}?${refCode}`
            const text = 'Use my ref code and get started with #pointpro.\n'
            const fullUrl = `${twitterBaseUrl}?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
            
            // Mở cửa sổ chia sẻ
            window.open(fullUrl, '_blank');
          })}>
            Share link
          </Button>
        </Stack>
      </Box>
    </ModalBlue>
  );
});
