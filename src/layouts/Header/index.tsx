import { Box, Button, Drawer, Stack } from "@mui/joy";
import { memo, useState } from "react";
import { ImageLogoFullBlue } from "../../images";
import ModalUserAgreement from "../../components/ModalUserAgreement";
import ModalConnectWallet from "../../components/ModalConnectWallet";
import WalletButton from "../../components/WalletButton";
import { GroupAdd } from "@mui/icons-material";
import ModalInviteFriends from "../../components/ModalInviteFriends";
import ModalAccountDetails from "../../components/ModalAccountDetails";
import { AlignJustify } from "lucide-react";

export default memo(() => {
  const [openModalConnectWallet, setOpenModalConnectWallet] = useState(false);
  const [openModalUserAgreement, setOpenModalUserAgreement] = useState(false);
  const [openModalInviteFriends, setOpenModalInviteFriends] = useState(false);
  const [openModalAccountDetails, setOpenModalAccountDetails] = useState(false);

  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer =
    (inOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpenDrawer(inOpen);
    };

  return (
    <Box bgcolor={"white"} width={"100%"}>
      <Stack
        direction={"row"}
        maxWidth={1420}
        paddingLeft={"20px"}
        paddingRight={"20px"}
        height={60}
        alignItems={"center"}
        margin={"auto"}
        justifyContent={"space-between"}
      >
        <img src={ImageLogoFullBlue} width={140} />
        <Stack direction={"row"} display={{
          xs: 'none',
          sm: 'flex'
        }}>
          <Button
            variant="outlined"
            color="neutral"
            sx={{ marginRight: 2 }}
            endDecorator={<GroupAdd fontSize="small" />}
          >
            Get 123 Points
          </Button>
          <WalletButton
            onClick={() => setOpenModalUserAgreement(true)}
            onInviteFriendsClick={() => setOpenModalInviteFriends(true)}
            onAccountDetailsClick={() => setOpenModalAccountDetails(true)}
          />
        </Stack>

        <Box display={{
          xs: 'flex',
          sm: 'none'
        }}>
          <Button variant="plain" color="neutral" onClick={toggleDrawer(true)}>
            <AlignJustify />
          </Button>
          <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
            <Box
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <Stack
                direction={"column"}
                paddingX={"12px"}
                paddingY={"24px"}
                gap={2}
              >
                <img src={ImageLogoFullBlue} width={140} />
                <Button
                  variant="outlined"
                  color="neutral"
                  sx={{ marginRight: 2 }}
                  endDecorator={<GroupAdd fontSize="small" />}
                  fullWidth
                >
                  Get 123 Points
                </Button>
                <WalletButton
                  onClick={() => setOpenModalUserAgreement(true)}
                  onInviteFriendsClick={() => setOpenModalInviteFriends(true)}
                  onAccountDetailsClick={() => setOpenModalAccountDetails(true)}
                />
              </Stack>
            </Box>
          </Drawer>
        </Box>
      </Stack>

      <ModalUserAgreement
        open={openModalUserAgreement}
        onClose={() => setOpenModalUserAgreement(false)}
        onAgreed={() => {
          setOpenModalUserAgreement(false);
          setOpenModalConnectWallet(true);
        }}
      />
      <ModalConnectWallet
        open={openModalConnectWallet}
        onClose={() => setOpenModalConnectWallet(false)}
      />
      <ModalInviteFriends
        open={openModalInviteFriends}
        onClose={() => setOpenModalInviteFriends(false)}
      />
      <ModalAccountDetails
        open={openModalAccountDetails}
        onClose={() => setOpenModalAccountDetails(false)}
      />
    </Box>
  );
});
