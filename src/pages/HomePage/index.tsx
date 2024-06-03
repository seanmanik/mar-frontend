import { Grid, Stack } from "@mui/joy";
import React from "react";
import PoolCard from "../../components/Pool/PoolCard";

const HomePage = () => {
    return <Stack gap={3} direction="column" maxWidth={1420} paddingLeft={'20px'} paddingRight={'20px'} paddingBottom={'84px'} paddingTop={"44px"} alignItems="flex-start" margin={"auto"} justifyContent="flex-start">
        <Grid
            container
            spacing={{ xs: 1, md: 2 }}
            columns={{ xs: 2, sm: 4, md: 8, lg: 12 }}
            sx={{ flexGrow: 1 }}
        >
            {Array.from(Array(12)).map((_, index) => (
                <Grid xs={2} sm={4} md={4} lg={4} key={index}>
                    <PoolCard />
                </Grid>
            ))}
        </Grid>
    </Stack>
}

export default HomePage