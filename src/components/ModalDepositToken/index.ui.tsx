import React, { memo, useState } from "react";
import ModalBlue from "../ModalBlue";
import { Box, Button, Grid, Stack, Typography } from "@mui/joy";
import InputAmount from "../InputAmount";
import TokenAmountDisplay from "../TokenAmountDisplay";
import { IconETH, IconUSDT } from "../../icons";
import { Bolt } from "@mui/icons-material";

export default memo<{
    open: boolean
    onClose: () => void
}>(({ open, onClose }) => {
    const [amount, setAmount] = useState(0)
    return (
        <ModalBlue
            open={open}
            onClose={onClose}
            title={`Deposit your USDT
            to earn points`}
        >
            <Box>
                <Box maxWidth={'100%'} overflow={'hidden'}>
                    <InputAmount 
                    symbol="USDC" 
                    balance={1000000000}
                    value={amount} 
                    onChange={v => setAmount(v)}
                    />
                </Box>
                <Box marginTop={4}>
                    <Grid container spacing={2} sx={{flexGrow: 1}}>
                        <Grid xs={12} paddingBottom={-2}>
                            <Typography level="title-sm">My Rewards</Typography>
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <TokenAmountDisplay amount={467000.129387192837} name="Mar points" icon={IconUSDT}/>
                        </Grid>
                        <Grid xs={12} sm={6}>
                            {/* <Typography level="title-sm">&nbsp;</Typography> */}
                            <TokenAmountDisplay amount={467000.129387192837} name="Mar points" icon={IconETH}/>
                        </Grid>

                        <Grid xs={12} sm={6}>
                            <Typography level="title-sm" paddingBottom={1}>Total Value Staked</Typography>
                            <TokenAmountDisplay amount={467000.129387192837} name="Mar points" icon={IconUSDT}/>
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <Typography level="title-sm" paddingBottom={1}>My Staked</Typography>
                            <TokenAmountDisplay amount={467000.129387192837} name="Mar points" icon={IconETH}/>
                        </Grid>

                        <Grid xs={12} paddingBottom={-2}>
                            <Typography level="title-sm">Pending Deposits</Typography>
                        </Grid>
                        <Grid xs={12} sm={12}>
                            <TokenAmountDisplay amount={467000.129387192837} name="Mar points" icon={IconUSDT}/>
                        </Grid>
                    </Grid>
                </Box>
                <Button sx={{width: '100%', marginTop: 5}} endDecorator={<Bolt fontSize="small"/>}>
                    Deposit
                </Button>
            </Box>
        </ModalBlue>
    )
})