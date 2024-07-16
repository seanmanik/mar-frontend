import { Box, Button, Drawer, Stack } from "@mui/joy";
import { memo, useContext, useState } from "react";
import { ImageLogoFullBlue } from "../../images";
import WalletButton from "../../components/WalletButton";
import { GroupAdd } from "@mui/icons-material";
import { AlignJustify } from "lucide-react";
import { AppContext } from "../../context/AppContext";
import SelectNetwork from "../../components/SelectNetwork";

export default memo(() => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const {
    setOpenModalUserAgreement,
    setOpenModalInviteFriends,
    setOpenModalAccountDetails,
  } = useContext(AppContext);

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
        <Stack
          direction={"row"}
          display={{
            xs: "none",
            sm: "flex",
          }}
          gap={2}
        >
          <Button
            variant="outlined"
            color="neutral"
            endDecorator={<GroupAdd fontSize="small" />}
          >
            Get 123 Points
          </Button>
          <SelectNetwork/>
          <WalletButton
            onClick={() => setOpenModalUserAgreement(true)}
            onInviteFriendsClick={() => setOpenModalInviteFriends(true)}
            onAccountDetailsClick={() => setOpenModalAccountDetails(true)}
          />
        </Stack>

        <Box
          display={{
            xs: "flex",
            sm: "none",
          }}
        >
          <SelectNetwork />
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
    </Box>
  );
});
