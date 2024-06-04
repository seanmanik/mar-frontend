import { Box, Grid, Stack } from "@mui/joy";
import PoolCard from "../../components/Pool/PoolCard";
import ModalDepositToken from "../../components/ModalDepositToken";
import { useState } from "react";
import ModalDepositNFT from "../../components/ModalDepositNFT";

const HomePage = () => {
    const [openModalDeposit, setOpenModalDeposit] = useState(false)
    return <Stack gap={3} direction="column" maxWidth={1420} paddingLeft={'20px'} paddingRight={'20px'} paddingBottom={'84px'} paddingTop={"44px"} alignItems="flex-start" margin={"auto"} justifyContent="flex-start">
        <Grid
            container
            spacing={{ xs: 1, md: 2 }}
            columns={{ xs: 2, sm: 4, md: 8, lg: 12 }}
            sx={{ flexGrow: 1 }}
        >
            {Array.from(Array(12)).map((_, index) => (
                <Grid xs={2} sm={4} md={4} lg={4} key={index}>
                    <Box onClick={() => setOpenModalDeposit(true)}>
                        <PoolCard />
                    </Box>
                </Grid>
            ))}
        </Grid>
        <ModalDepositNFT open={openModalDeposit} onClose={() => setOpenModalDeposit(false)}/>
    </Stack>
}

export default HomePage