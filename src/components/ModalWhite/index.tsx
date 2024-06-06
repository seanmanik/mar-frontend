import {
  Box,
  DialogContent,
  DialogTitle,
  Modal,
  ModalClose,
  ModalDialog,
  ModalProps,
  Stack,
  Typography,
} from "@mui/joy";
import React, { memo } from "react";
import { ImageLogoBlack, ImageLogoFullBlack } from "../../images";

export default memo<
  ModalProps & {
    title?: string;
    header?: React.ReactElement;
    headerChildren?: React.ReactElement;
  }
>(({ title, header, children, headerChildren, ...modalProps }) => {
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
            "--Icon-color": "black",
            marginTop: 1,
          }}
        />
        {title || header ? (
          <DialogTitle sx={{ paddingTop: 1, paddingLeft: 2 }}>
            <Box sx={{ width: "100%" }}>
              <Stack direction={"row"} spacing={2} alignItems={"center"}>
                <img src={ImageLogoBlack} width={40} />
                {header && <Box color={"black"}>{header}</Box>}
              </Stack>
              {title &&
                title.split("\n").map((e, i) => (
                  <Typography
                    key={i}
                    sx={{
                      marginTop: 1,
                      color: "black",
                      fontFamily: "PP Neue Machina",
                      fontSize: "32px",
                      fontWeight: "800",
                      lineHeight: "30.4px",
                      letterSpacing: "-0.03em",
                      textAlign: "left",
                    }}
                  >
                    {e}
                  </Typography>
                ))}
            </Box>
          </DialogTitle>
        ) : (
          <DialogTitle sx={{ paddingTop: 1, paddingLeft: 2 }}>
            <img src={ImageLogoFullBlack} width={140} />
          </DialogTitle>
        )}
        {headerChildren && (
          <Box marginTop={1} marginRight={2} marginLeft={2}>
            {headerChildren}
          </Box>
        )}
        <DialogContent>
          <Box
            maxWidth={"700px"}
            minWidth={"350px"}
            borderRadius={10}
            padding={2}
            marginTop={2}
            sx={{
              background:
                "linear-gradient(162deg, #0351F8 47.17%, #FBC4C6 92.89%);",
            }}
          >
            {children}
          </Box>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
});
