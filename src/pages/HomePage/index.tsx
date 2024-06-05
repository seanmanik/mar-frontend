import { Box, Grid, Stack } from "@mui/joy";
import PoolCard from "../../components/Pool/PoolCard";
import { useState } from "react";
import ModalWithdrawNFT from "../../components/ModalWithdrawNFT";
import ModalWithdrawToken from "../../components/ModalWithdrawToken";
import ModalDepositToken from "../../components/ModalDepositToken";
import ModalDepositNFT from "../../components/ModalDepositNFT";

const HomePage = () => {
    const [openModalDeposit, setOpenModalDeposit] = useState(0)
    return <Stack gap={3} direction="column" maxWidth={1420} paddingLeft={'20px'} paddingRight={'20px'} paddingBottom={'84px'} paddingTop={"44px"} alignItems="flex-start" margin={"auto"} justifyContent="flex-start">
        <Grid
            container
            spacing={{ xs: 1, md: 2 }}
            columns={{ xs: 2, sm: 4, md: 8, lg: 12 }}
            sx={{ flexGrow: 1 }}
        >
            {Array.from(Array(12)).map((_, index) => (
                <Grid xs={2} sm={4} md={4} lg={4} key={index}>
                    <Box onClick={() => setOpenModalDeposit(index)}>
                        <PoolCard>
                            {index == 1 && <>ModalWithdrawNFT</>}
                            {index == 2 && <>ModalWithdrawToken</>}
                            {index == 3 && <>ModalDepositToken</>}
                            {index == 4 && <>ModalDepositNFT</>}
                        </PoolCard>
                    </Box>
                </Grid>
            ))}
        </Grid>
        <ModalWithdrawNFT open={openModalDeposit == 1} onClose={() => setOpenModalDeposit(0)}/>
        <ModalWithdrawToken open={openModalDeposit == 2} onClose={() => setOpenModalDeposit(0)}/>
        <ModalDepositToken open={openModalDeposit == 3} onClose={() => setOpenModalDeposit(0)}/>
        <ModalDepositNFT open={openModalDeposit == 4} onClose={() => setOpenModalDeposit(0)}/>
    </Stack>
}

export default HomePage