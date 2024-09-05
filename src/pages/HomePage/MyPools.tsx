import { Box, Grid, Stack, Typography } from "@mui/joy";
import TokenPoolCard from "../../components/TokenPoolCard";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { PoolsState } from "../../state/PoolsState";

const HomePage = () => {
    const pools = useRecoilValue(PoolsState)

    const myPools = pools.filter((pool) => pool.depositedAmount > 0);
    
    return (<>{myPools.length > 0 && (
        <Stack gap={1} direction="column" alignItems="flex-start" justifyContent="flex-start" width={"100%"}>
            <Typography
                sx={{
                    fontSize: "24px",
                    fontWeight: 600,
                    color: "#ffffff",
                }}
            >
                My Pools
            </Typography>

            <Grid container spacing={{ xs: 2 }} columns={{ xs: 2, sm: 4, md: 8, lg: 12 }} sx={{ flexGrow: 1 }} alignItems="stretch" width={"100%"}>
                {myPools.map((item) => (
                    <Grid xs={2} sm={4} md={4} lg={4} key={item.tokenPoolID}>
                        <Box sx={{
                            height: "calc(100% - 32px)",
                        }}
                        >
                            <TokenPoolCard
                                pool={item}
                            />
                        </Box>
                    </Grid>
                )
                )}
            </Grid>
        </Stack>
    )}
    </>
    );
};

export default HomePage;
