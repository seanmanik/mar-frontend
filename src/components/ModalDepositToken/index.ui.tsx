import { memo, useState } from "react";
import ModalBlue from "../ModalBlue";
import { Avatar, AvatarGroup, Box, Button, Grid, Stack, Typography } from "@mui/joy";
import InputAmount from "../InputAmount";
import TokenAmountDisplay from "../TokenAmountDisplay";
import { IconMarPoint, IconMyStake, IconPending, IconTotalValueStake } from "../../icons";
import { Bolt } from "@mui/icons-material";
import { ImageLogoBlueCircle, ImageLogoWhite } from "../../images";
import TokenToIcon from "../../utils/TokenToIcon";

export default memo<{
    open: boolean
    marPoint: number
    puppyPoint: number
    totalValue: number
    stakeAmount: number
    pendingValue: number
    balance: number
    symbol: string
    isSuccess: boolean
    onClose: () => void
    onDeposit: (amount: number) => void
}>(({ 
    open,
    marPoint,
    puppyPoint,
    totalValue,
    stakeAmount,
    pendingValue,
    symbol,
    balance,
    isSuccess,
    onClose,
    onDeposit
 }) => {
    const [amount, setAmount] = useState(0)
    if (isSuccess) {

    }
    return (
        <ModalBlue
            open={open}
            onClose={onClose}
            title={isSuccess ? `${symbol}
            Deposited Successfully`
            : `Deposit your USDT
            to earn points`}
        >
            
            <Box>
                {!isSuccess &&(<>
                    <Box maxWidth={'100%'} overflow={'hidden'}>
                        <InputAmount 
                            symbol={symbol} 
                            balance={balance}
                            value={amount} 
                            onChange={v => setAmount(v)}
                        />
                    </Box>
                    <Grid marginTop={4} container spacing={2} sx={{flexGrow: 1}}>
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
                    <Button sx={{width: '100%', marginTop: 5}} endDecorator={<Bolt fontSize="small"/>}
                        onClick={() => onDeposit && onDeposit(amount)}>
                        Deposit
                    </Button>
                </>)}

                {isSuccess &&(<>
                    <Stack alignItems={"center"} paddingTop={5} paddingBottom={5}>
                        <AvatarGroup>
                            <Avatar src={ImageLogoBlueCircle} />
                            <Avatar src={TokenToIcon[symbol]} />
                        </AvatarGroup>
                        <Typography fontSize={32} lineHeight={'34px'} fontWeight={500} textAlign={"center"}>Congrats, you are earning<br/>like a pro!</Typography>
                    </Stack>
                    <Typography level="title-sm" marginBottom={1}>Token Deposit</Typography>
                    <TokenAmountDisplay amount={pendingValue} symbol={symbol} name="in processing" icon={TokenToIcon[symbol]}/>
                    <Button variant="outlined" color="neutral" sx={{width: '100%', marginTop: 5}}
                        onClick={() => window.open('https://etherscan.io')}
                    >
                        View on Explorer
                    </Button>
                </>)}
            </Box>
        </ModalBlue>
    )
})