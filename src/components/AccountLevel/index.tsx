import { Bolt, EmojiObjects } from "@mui/icons-material";
import { Box, Stack, Tooltip, Typography } from "@mui/joy";
import { memo, useEffect, useState } from "react";
import ModalHowToLevelUp from "../ModalHowToLevelUp";
import Button from "../Button";
import { useRecoilValue } from "recoil";
import { UserInfoState } from "../../state/UserInfoState";
import { useAccount } from "wagmi";
import { AccountNFTState } from "../../state/AccountNFTState";
import { useMintNFT } from "../../apis/interactWallet/EVM/useMintNFT";
import { toast } from "react-toastify";

export default memo(() => {
  const [openModalHowToLevelUp, setOpenModalHowToLevelUp] = useState(false);
  const userInfo = useRecoilValue(UserInfoState)
  const wallet = useAccount()
  const userNFT = useRecoilValue(AccountNFTState)

  const { isPending, isConfirming, isConfirmed, onMint } = useMintNFT()
  
  useEffect(() => {
    if (isConfirmed) {
      toast.success("Mint an NFT successfully.")
    }
  }, [isConfirmed]);
  
  return (
    <Box
      sx={{
        background: "#ffffff",
        borderRadius: "10px",
        padding: 1.5,
      }}
    >
      <Stack
        direction={{
          md: "row",
          sm: "column",
          xs: "column",
        }}
        alignItems={"center"}
        justifyContent={"space-between"}
        gap={1}
      >
        <Box>
          <Typography
            level="title-sm"
            fontSize={"12px"}
            color="neutral"
            fontWeight={"700"}
          >
            {`${wallet?.address?.slice(0, 6)}...${wallet?.address?.slice(-5)}`}
          </Typography>
          <Tooltip
            title={
              <Box
                sx={{
                  color: "gray",
                  textTransform: "uppercase",
                  fontWeight: "700",
                  fontSize: "12px",
                  maxWidth: "400px",
                }}
              >
                You own {userNFT.balance} Booster NFTs, <br />
                each NFT gives you 1 progression leveL
              </Box>
            }
            sx={{ background: "#F5F5F5" }}
            placement="right-end"
          >
            <Typography
              sx={{
                fontFamily: "PP Neue Machina",
                fontSize: "32px",
                fontWeight: "800",
                lineHeight: "32px",
                textAlign: "left",
              }}
            >
              Level {userInfo.level + (userNFT.balance >= 3 ? 3 : userNFT.balance)} <span style={{ color: "gray" }}>- {(userInfo.boostPercentage || 0) + (userNFT.balance >= 3 ? 3 : userNFT.balance) * 10}% Booster</span>
            </Typography>
          </Tooltip>
        </Box>
        <Stack
          direction={{
            sm: "row",
            xs: "column",
          }}
          alignItems={"center"}
          justifyContent={"flex-end"}
          spacing={1}
        >
          <Button
            buttonType="secondary"
            endDecorator={<EmojiObjects fontSize="small" />}
            onClick={() => setOpenModalHowToLevelUp(true)}
          >
            How to Level Up
          </Button>
          <Button
              disabled={isPending}
              loading={isConfirming}
              buttonType="primary"
              endDecorator={<Bolt fontSize="small" />}
              onClick={() => onMint()}
            >
              Mint NFT Booster
            </Button>
        </Stack>
      </Stack>

      <ModalHowToLevelUp
        open={openModalHowToLevelUp}
        onClose={() => setOpenModalHowToLevelUp(false)}
      />
    </Box>
  );
});
