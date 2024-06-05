import { Box, Grid, Stack } from "@mui/joy";
import PoolCard from "../../components/Pool/PoolCard";
import { useState } from "react";
import ModalWithdrawNFT from "../../components/ModalWithdrawNFT";
import ModalWithdrawToken from "../../components/ModalWithdrawToken";
import ModalDepositToken from "../../components/ModalDepositToken";
import ModalDepositNFT from "../../components/ModalDepositNFT";
import ValueDisplay from "../../components/ValueDisplay";
import { IconMarPoint, IconMyStake, IconPudgy, IconTotalValueStake } from "../../icons";

const HomePage = () => {
    const [openModalDeposit, setOpenModalDeposit] = useState(0)
    return (
        <Box maxWidth={1420} paddingLeft={'20px'} paddingRight={'20px'} paddingBottom={'84px'} paddingTop={"44px"} margin={"auto"}>
            <Grid container
                    spacing={{ xs: 1, md: 2 }}
                    sx={{ flexGrow: 1, marginBottom: 2 }}>
                <Grid xs={6} md={3}>
                    <ValueDisplay isNameAbove name="TVL" text="$500,000,000" icon={IconTotalValueStake} />
                </Grid>
                <Grid xs={6} md={3}>
                    <ValueDisplay isNameAbove name="MY STAKE" text="$12,000" icon={IconMyStake} />
                </Grid>
                <Grid xs={6} md={3}>
                    <ValueDisplay isNameAbove name="MAR POINTS" text="$500,000,000" icon={IconMarPoint} />
                </Grid>
                <Grid xs={6} md={3}>
                    <ValueDisplay isNameAbove name="PUPPY POINTS" text="$500,000,000" icon={IconMarPoint} />
                </Grid>
            </Grid>
            <Stack gap={3} direction="column" alignItems="flex-start" justifyContent="flex-start">
                <Grid
                    container
                    spacing={{ xs: 1, md: 2 }}
                    columns={{ xs: 2, sm: 4, md: 8, lg: 12 }}
                    sx={{ flexGrow: 1 }}
                >
                    {Array.from(Array(12)).map((_, index) => (
                        <Grid xs={2} sm={4} md={4} lg={4} key={index}>
                            <Box onClick={() => setOpenModalDeposit(index)}>
                                <PoolCard />
                            </Box>
                        </Grid>
                    ))}
                </Grid>
                <ModalWithdrawNFT open={openModalDeposit == 1} onClose={() => setOpenModalDeposit(0)}/>
                <ModalWithdrawToken open={openModalDeposit == 2} onClose={() => setOpenModalDeposit(0)}/>
                <ModalDepositToken open={openModalDeposit == 3} onClose={() => setOpenModalDeposit(0)}/>
                <ModalDepositNFT open={openModalDeposit == 4} onClose={() => setOpenModalDeposit(0)}/>
            </Stack>
        </Box>
    )
}

export default HomePage