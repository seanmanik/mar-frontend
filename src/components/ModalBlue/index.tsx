import { Box, DialogContent, DialogTitle, Modal, ModalClose, ModalDialog, ModalProps, Typography } from "@mui/joy";
import React, { memo } from "react";
import { ImageLogoFullBlack, ImageLogoWhite } from "../../images";

export default memo<ModalProps & {
    title?: string
}>(({title, children, ...modalProps}) => {
    return <Modal {...modalProps}>
        <ModalDialog variant={"outlined"} size="sm" sx={{
            background: 'linear-gradient(116.32deg, #0351F8 47.17%, #FBC4C6 92.89%);',
            border: 'none',
            padding: 1
        }}>
            <ModalClose sx={{
                '--Icon-color': 'white',
                marginTop: 1
            }} />
            {title ? (
                <DialogTitle sx={{paddingTop: 1, paddingLeft: 1}}>
                    <Box>
                        <img src={ImageLogoWhite} width={40}/>
                        <Typography sx={{
                            marginTop: 1,
                            color: 'white',
                            fontFamily: 'PP Neue Machina',
                            fontSize: '32px',
                            fontWeight: '800',
                            lineHeight: '30.4px',
                            letterSpacing: '-0.03em',
                            textAlign: 'left'
                        }}>{title.split('\n').map(e => <>{e}<br/></>)}</Typography>
                    </Box>
                </DialogTitle>
            ) : (
                <DialogTitle sx={{paddingTop: 1, paddingLeft: 1}} >
                    <img src={ImageLogoFullBlack} width={140}/>
                </DialogTitle>
            )}
            <DialogContent>
                <Box maxWidth={'666px'} minWidth={'400px'} bgcolor={"white"} borderRadius={4} padding={2} marginTop={2}>
                    {children}
                </Box>
            </DialogContent>
        </ModalDialog>
    </Modal>
})