import { memo, useState } from "react";
import ModalBlue from "../ModalBlue";
import {
  Box,
  Stack,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Typography,
  tabClasses,
} from "@mui/joy";
import { useAccount } from "wagmi";
import { BorderColor, ContentCopy } from "@mui/icons-material";
import TableAccountSummary from "../TableAccountSummary";
import TableAccountActivity from "../TableAccountActivity";

export default memo<{
  open: boolean;
  onClose: () => void;
}>(({ ...modalProps }) => {
  var account = useAccount();

  const [index, setIndex] = useState(0);
  return (
    <ModalBlue
      {...modalProps}
      header={
        <Box>
          <Stack direction={"row"} alignItems={"center"}>
            <Typography level="title-md" sx={{ color: "white" }}>
              Your wallet
            </Typography>
            {/* <BorderColor
              sx={{ color: "white", fontSize: "15px", marginLeft: 1 }}
            /> */}
          </Stack>
          <Stack direction={"row"} alignItems={"center"}>
            <Typography sx={{ color: "white", fontSize: 14, fontWeight: 800 }}>
              {account.address?.slice(0, 6)}...{account.address?.slice(-4)}
            </Typography>
            <ContentCopy
              sx={{ color: "white", fontSize: "12px", marginLeft: 1 }}
            />
          </Stack>
        </Box>
      }
    >
      <Box width={700}>
        <Tabs
          aria-label="Pipeline"
          value={index}
          onChange={(_, value) => setIndex(value as number)}
        >
          <TabList
            sx={{
              pt: 1,
              justifyContent: "flex-start",
              [`&& .${tabClasses.root}`]: {
                flex: "initial",
                bgcolor: "transparent",
                color: "gray",
                fontSize: "16px",
                "&:hover": {
                  bgcolor: "transparent",
                },
                [`&.${tabClasses.selected}`]: {
                  color: "black",
                  fontWeight: 600,
                  "&::after": {
                    height: 2,
                    borderTopLeftRadius: 3,
                    borderTopRightRadius: 3,
                    bgcolor: "black",
                  },
                },
              },
            }}
          >
            <Tab indicatorInset sx={{ width: 120 }}>
              Summary
            </Tab>
            <Tab indicatorInset sx={{ width: 120 }}>
              Activity
            </Tab>
          </TabList>
          <Box
            sx={(theme) => ({
              "--bg": theme.vars.palette.background.surface,
              background: "var(--bg)",
              boxShadow: "0 0 0 100vmax var(--bg)",
              clipPath: "inset(0 -100vmax)",
            })}
          >
            <TabPanel value={0} sx={{ padding: 0 }}>
              <Box marginTop={3} height={350}>
                <TableAccountSummary />
              </Box>
            </TabPanel>
            <TabPanel value={1} sx={{ padding: 0 }}>
              <Box marginTop={3} height={350}>
                <TableAccountActivity />
              </Box>
            </TabPanel>
          </Box>
        </Tabs>
      </Box>
    </ModalBlue>
  );
});
