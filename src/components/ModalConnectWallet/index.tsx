import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  Modal,
  ModalClose,
  ModalDialog,
  Typography,
} from "@mui/joy";
import { memo, useEffect } from "react";
import {
  IconCoinbaseWallet,
  IconMetamaskWallet,
  IconPhantomWallet,
  IconTrustWallet,
  IconWalletConnect,
} from "../../icons";
import { useConnect } from "wagmi";

export default memo<{
  open: boolean;
  onClose: () => void;
}>(({ ...modalProps }) => {
  const { connectors, connect, status } = useConnect();
  const icons: any = {
    MetaMask: IconMetamaskWallet,
    "Coinbase Wallet": IconCoinbaseWallet,
    WalletConnect: IconWalletConnect,
    TrustWallet: IconTrustWallet,
  };

  useEffect(() => {
    console.log(status);
    if (status == "success") {
      modalProps.onClose && modalProps.onClose();
    }
  }, [status]);

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
            Connect a Wallet
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
            {connectors
              .filter((e) => e.name != "Injected")
              .map((connector) => (
                <Button
                  variant="plain"
                  sx={{
                    width: "100%",
                    justifyContent: "flex-start",
                    padding: 0,
                    marginBottom: 1,
                  }}
                  key={connector.uid}
                  onClick={() => connect({ connector })}
                  type="button"
                >
                  <img
                    src={icons[connector.name] || connector.icon}
                    width={28}
                    style={{ marginRight: 12 }}
                  ></img>
                  <Typography level="title-md" fontWeight={600}>
                    {connector.name}
                  </Typography>
                </Button>
              ))}

            <Button
              variant="plain"
              sx={{
                width: "100%",
                justifyContent: "flex-start",
                padding: 0,
                marginBottom: 1,
              }}
            >
              <img
                src={IconPhantomWallet}
                width={28}
                style={{ marginRight: 12 }}
              ></img>
              <Typography level="title-md" fontWeight={600}>
                Phantom
              </Typography>
            </Button>
            {/* <Box marginTop={1}>
                        <Button variant="plain" sx={{width: '100%', justifyContent: 'flex-start', padding: 0, marginBottom: 1}}>
                            <img src={IconCoinbaseWallet} width={28} style={{marginRight: 12}}></img>
                            <Typography level="title-lg">Coinbase Wallet</Typography>
                        </Button>

                        <Button variant="plain" sx={{width: '100%', justifyContent: 'flex-start', padding: 0, marginBottom: 1}}>
                            <img src={IconMetamaskWallet} width={28} style={{marginRight: 12}}></img>
                            <Typography level="title-lg">Metamask</Typography>
                        </Button>

                        <Button variant="plain" sx={{width: '100%', justifyContent: 'flex-start', padding: 0, marginBottom: 1}}>
                            <img src={IconWalletConnect} width={28} style={{marginRight: 12}}></img>
                            <Typography level="title-lg">WalletConnect</Typography>
                        </Button>
                    </Box>

                    <Typography level="title-md" color="neutral" marginTop={2}>More</Typography>
                    <Box marginTop={1}>
                        <Button variant="plain" sx={{width: '100%', justifyContent: 'flex-start', padding: 0, marginBottom: 1}}>
                            <img src={IconArgentWallet} width={28} style={{marginRight: 12}}></img>
                            <Typography level="title-lg">Argent</Typography>
                        </Button>

                        <Button variant="plain" sx={{width: '100%', justifyContent: 'flex-start', padding: 0, marginBottom: 1}}>
                            <img src={IconTrustWallet} width={28} style={{marginRight: 12}}></img>
                            <Typography level="title-lg">Trust</Typography>
                        </Button>

                        <Button variant="plain" sx={{width: '100%', justifyContent: 'flex-start', padding: 0, marginBottom: 1}}>
                            <img src={IconLedgerLive} width={28} style={{marginRight: 12}}></img>
                            <Typography level="title-lg">Ledger Live</Typography>
                        </Button>
                    </Box> */}
          </Box>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
});
