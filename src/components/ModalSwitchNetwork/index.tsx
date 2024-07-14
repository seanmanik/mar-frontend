import {
  Box,
  DialogContent,
  DialogTitle,
  Modal,
  ModalClose,
  ModalDialog,
  Typography,
} from "@mui/joy";
import { memo } from "react";
import { useSwitchChain } from "wagmi";
import Button from "../Button";
import { ArrowForward } from "@mui/icons-material";
import { sepolia } from "viem/chains";

export default memo<{
  open: boolean;
  onClose: () => void;
}>(({ ...modalProps }) => {
  const { chains, switchChain } = useSwitchChain();


  const onHandleSwitchNetwork = () => {
    switchChain({
      chainId: sepolia.id,
    });
  }

  return (
    <Modal {...modalProps}>
      <ModalDialog
        variant={"outlined"}
        size="sm"
        sx={{
          border: "none",
          padding: 1,
        }}
      >
        <ModalClose
          sx={{
            marginTop: 2,
          }}
        />
        <DialogTitle sx={{ paddingTop: 1, paddingLeft: 1 }}>
          <Typography
            sx={{ fontSize: 25, fontWeight: 700 }}
            textAlign={"center"}
          >
            Wrong network!
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box
            maxWidth={"300px"}
            minWidth={"200px"}
            bgcolor={"white"}
            borderRadius={4}
            padding={2}
            marginTop={2}
          >
            <Button
              buttonType="secondary"
              endDecorator={<ArrowForward />}
              fullWidth
              // disabled={!yourStaked}
              onClick={onHandleSwitchNetwork}
            >
              Switch network
            </Button>
          </Box>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
});
