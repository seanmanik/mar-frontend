import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Box, Stack } from "@mui/joy";
import Footer from "./Footer";

const Layout = () => {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={0}
    >
      <Header />
      <Box
        sx={{
          backgroundImage:
            "linear-gradient(to right, rgba(3, 81, 248, 1), rgba(251, 196, 198, 1))",
          width: "100%",
          minHeight: "calc(100vh - 80px - 250px)",
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Stack>
  );
};

export default Layout;
