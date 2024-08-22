import { memo, useEffect } from "react";
import ModalWhite from "../ModalWhite";
import { Box, Stack, Typography } from "@mui/joy";
import imgInfo from "./info.png";
import { Bolt } from "@mui/icons-material";
import Button from "../Button";
import { useRecoilValue } from "recoil";
import { AccountNFTState } from "../../state/AccountNFTState";
import { ImageLevelUpNFT, ImageLogoBlack } from "../../images";
import { useMintNFT } from "../../apis/interactWallet/EVM/useMintNFT";
import { toast } from "react-toastify";
export default memo<{
  open: boolean;
  onClose: () => void;
}>(({ ...modalProps }) => {
  const userNFT = useRecoilValue(AccountNFTState)
  const { isPending, isConfirming, isConfirmed, onMint } = useMintNFT()

  useEffect(() => {
    if (isConfirmed) {
      toast.success("Mint an NFT successfully.")
    }
  }, [isConfirmed]);
  
  return (
    <ModalWhite
      {...modalProps}
      title="How to Level up"
      headerChildren={
        <Box>
          <Typography color="neutral" level="body-sm">
            <b>Level Up</b>: Gain a new level every 5 days (120 hours)
          </Typography>
          <Typography color="neutral" level="body-sm">
            <b>Mint NFTs</b>: Mint NFTs to advance levels faster (up to 3 NFTs
            per wallet)
          </Typography>

          <Stack
            marginTop={4}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Button
              disabled={isPending}
              loading={isConfirming}
              buttonType="primary"
              endDecorator={<Bolt fontSize="small" />}
              onClick={() => onMint()}
            >
              Mint NFT Booster
            </Button>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"flex-end"}
              flexWrap={"wrap"}
            >
              {[...Array(userNFT.balance)].map((e, i) => (
                <img
                  key={i}
                  src={ImageLevelUpNFT}
                  width={40}
                  height={40}
                  style={{ objectFit: "cover", margin: 2, borderRadius: 5 }}
                />
              ))}
              {userNFT.balance > 0 && (
                <Typography level="title-sm" marginLeft={1}>
                  NFTs Minted
                </Typography>
              )}
            </Stack>
          </Stack>
        </Box>
      }
    >
      <Box margin={-2}>
        <img src={imgInfo} width={"600px"} style={{ display: "block" }} />
      </Box>
    </ModalWhite>
  );
});
