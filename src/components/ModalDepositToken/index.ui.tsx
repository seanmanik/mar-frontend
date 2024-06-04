import { memo, useState } from "react";
import ModalBlue from "../ModalBlue";
import { Box, Button, Grid, Typography } from "@mui/joy";
import InputAmount from "../InputAmount";
import TokenAmountDisplay from "../TokenAmountDisplay";
import { IconMarPoint, IconMyStake, IconPending, IconTotalValueStake } from "../../icons";
import { Bolt } from "@mui/icons-material";

export default memo<{
    open: boolean
    marPoint: number
    puppyPoint: number
    totalValue: number
    stakeAmount: number
    pendingValue: number
    balance: number
    symbol: string
    onClose: () => void
}>(({ 
    open,
    marPoint,
    puppyPoint,
    totalValue,
    stakeAmount,
    pendingValue,
    symbol,
    balance,
    onClose,
 }) => {
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
                    symbol={symbol} 
                    balance={balance}
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
                            <TokenAmountDisplay amount={marPoint} name="Mar points" icon={IconMarPoint}/>
                        </Grid>
                        <Grid xs={12} sm={6}>
                            {/* <Typography level="title-sm">&nbsp;</Typography> */}
                            <TokenAmountDisplay amount={puppyPoint} name="Puppy points" icon={IconMarPoint}/>
                        </Grid>

                        <Grid xs={12} sm={6}>
                            <Typography level="title-sm" paddingBottom={1}>Total Value Staked</Typography>
                            <TokenAmountDisplay amount={totalValue} name="USD" icon={IconTotalValueStake}/>
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <Typography level="title-sm" paddingBottom={1}>My Staked</Typography>
                            <TokenAmountDisplay amount={stakeAmount} name="USDC" icon={IconMyStake}/>
                        </Grid>

                        <Grid xs={12} paddingBottom={-2}>
                            <Typography level="title-sm">Pending Deposits</Typography>
                        </Grid>
                        <Grid xs={12} sm={12}>
                            <TokenAmountDisplay amount={pendingValue} symbol={symbol} name="in processing" icon={IconPending}/>
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