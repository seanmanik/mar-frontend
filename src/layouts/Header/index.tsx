import { Box, Button, DialogContent, DialogTitle, Modal, ModalClose, ModalDialog, Stack } from "@mui/joy";
import React, { memo, useState } from "react";
import { ImageLogoFullBlue } from "../../images";
import { IconGroupAdd, IconWallet } from "../../icons";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import ModalBlue from "../../components/ModalBlue";
1
export default memo(() => {
    // const account = useAccount()
    // const { connectors, connect, status, error } = useConnect()
    // const { disconnect } = useDisconnect()
    const [openModalConnectWallet, setOpenModalConnectWallet] = useState(false)
    return (
        <Box bgcolor={'white'} width="100%">
            <Stack direction={"row"} maxWidth={1420} paddingLeft={'20px'} paddingRight={'20px'} height={80} alignItems={"center"} margin={"auto"} justifyContent={"space-between"}>
                <img src={ImageLogoFullBlue} width={140} />
                <Box>
                    <Button variant="outlined" color="neutral" sx={{ marginRight: 2 }}>Get 123 Points<img src={IconGroupAdd} style={{ marginLeft: 5 }} /></Button>
                    <Button color="primary"
                        onClick={() => setOpenModalConnectWallet(true)}
                    >Connect <img src={IconWallet} style={{ marginLeft: 5 }} /></Button>
                </Box>
            </Stack>

            <ModalBlue
                open={openModalConnectWallet}
                onClose={() => setOpenModalConnectWallet(false)}
                title={`Deposit your USDT
                        to earn points`}
            >
                <Box>This is a outlined modal dialog</Box>
            </ModalBlue>
        </Box>
    )
})

// const account = useAccount()
//   const { connectors, connect, status, error } = useConnect()
//   const { disconnect } = useDisconnect()

//   return (
//     <>
//       <Header />
//       <div>
//         <h2>Account</h2>

//         <div>
//           blance: <Balance address={(account.addresses || [])[0] || ''} />
//           <br/>
//           status: {account.status}
//           <br />
//           addresses: {JSON.stringify(account.addresses)}
//           <br />
//           chainId: {account.chainId}
//         </div>

//         {account.status === 'connected' && (
//           <button type="button" onClick={() => disconnect()}>
//             Disconnect
//           </button>
//         )}
//       </div>

//       <div>
//         <h2>Connect</h2>
//         {connectors.map((connector) => (
//           <button
//             key={connector.uid}
//             onClick={() => connect({ connector })}
//             type="button"
//           >
//             {connector.name}
//           </button>
//         ))}
//         <div>{status}</div>
//         <div>{error?.message}</div>
//       </div>
//     </>
//   )