import { Box, Card, Stack } from "@mui/joy";
import React, { ReactNode } from "react";
import ValueDisplay from "../ValueDisplay";
import { IconDailyReward, IconDeposit, IconETH, IconMarPoint, IconPending, IconTotalValueStake, IconUSDT, IconWallet, IconWithdraw, IconYourDailyReward, IconYourDeposited } from "../../icons";
import PoolTitle from "./PoolTitle";
import { Paid, Redeem } from "@mui/icons-material";
import Button from "../Button";
import { useAccount } from "wagmi";

export interface IPoolCard {
    // children: ReactNode
}

const PoolCard = () => {
    const account = useAccount()

    return <Card sx={{
        height: '100%',
        padding: 2,
        backgroundColor: 'white',
        borderRadius: '12px'
    }}>
        <PoolTitle />
        <Stack direction={"row"} alignItems={"flex-start"} spacing={1} >
            <ValueDisplay name="TVL" text="$23,231,234" isNameAbove flex={1} nameIcon={<Paid sx={{ fontSize: 15, color: 'gray', marginRight: 0.5 }} />} />
            <ValueDisplay name="DAILY" text="$23,231,234" align="right" isNameAbove flex={1} nameIcon={<Redeem sx={{ fontSize: 15, color: 'gray', marginLeft: 0.5 }} />} />
        </Stack>
        <Box>
            <ValueDisplay variant="small" name="Total value Staked" text="$20,000,000" icon={IconTotalValueStake} />
            <ValueDisplay variant="small" name="Base Points Per Dollar" text="0.01 PTS" icon={IconDailyReward} marginTop={1.5} />

            <ValueDisplay variant="small" name="Your Value Staked" text="$200.5" icon={IconYourDeposited} marginTop={1.5} />
            <ValueDisplay variant="small" name="Your Daily Reward" text="14 PTS" icon={IconYourDailyReward} marginTop={1.5} />

            <ValueDisplay variant="small" name="Your NFTs Deposited" icon={IconYourDeposited} marginTop={1.5} images={[
                'https://i.seadn.io/gae/WG55wHkFEYqegub2kkMZbUJwmI0TfW75LRrgI4odvsfqZ0sTEX9CCr3QUenYrf9tzIsSUp7vNccImZtDO-kcTLzsqxlb98DKiO2mLOk',
                'https://i.seadn.io/gae/WG55wHkFEYqegub2kkMZbUJwmI0TfW75LRrgI4odvsfqZ0sTEX9CCr3QUenYrf9tzIsSUp7vNccImZtDO-kcTLzsqxlb98DKiO2mLOk',
                'https://i.seadn.io/gae/WG55wHkFEYqegub2kkMZbUJwmI0TfW75LRrgI4odvsfqZ0sTEX9CCr3QUenYrf9tzIsSUp7vNccImZtDO-kcTLzsqxlb98DKiO2mLOk',
                'https://i.seadn.io/gae/WG55wHkFEYqegub2kkMZbUJwmI0TfW75LRrgI4odvsfqZ0sTEX9CCr3QUenYrf9tzIsSUp7vNccImZtDO-kcTLzsqxlb98DKiO2mLOk',
                'https://i.seadn.io/gae/WG55wHkFEYqegub2kkMZbUJwmI0TfW75LRrgI4odvsfqZ0sTEX9CCr3QUenYrf9tzIsSUp7vNccImZtDO-kcTLzsqxlb98DKiO2mLOk',
                'https://i.seadn.io/gae/WG55wHkFEYqegub2kkMZbUJwmI0TfW75LRrgI4odvsfqZ0sTEX9CCr3QUenYrf9tzIsSUp7vNccImZtDO-kcTLzsqxlb98DKiO2mLOk',
                'https://i.seadn.io/gae/WG55wHkFEYqegub2kkMZbUJwmI0TfW75LRrgI4odvsfqZ0sTEX9CCr3QUenYrf9tzIsSUp7vNccImZtDO-kcTLzsqxlb98DKiO2mLOk',
            ]} />
        </Box>
        {
            !account || !account.isConnected ? <Stack gap={1} direction="column">
                <Button buttonType="primary" endDecorator={<img src={IconWallet} width={24} height={24} />} fullWidth>
                    Connect Wallet
                </Button>
            </Stack> : <Stack gap={1} direction="row">
                <Button buttonType="primary" endDecorator={<img src={IconDeposit} width={16} height={16} />} fullWidth>
                    Deposit
                </Button>
                <Button buttonType="secondary" endDecorator={<img src={IconWithdraw} width={24} height={24} />} fullWidth>
                    Withdraw
                </Button>
            </Stack>
            // <Stack gap={1} direction="column">
            //     <Button buttonType="primary" endDecorator={<img src={IconDeposit} width={16} height={16} />} fullWidth>
            //         Deposit
            //     </Button>
            //     <Button buttonType="secondary" endDecorator={<img src={IconWithdraw} width={24} height={24} />} fullWidth>
            //         Withdraw
            //     </Button>
            // </Stack>
        }
    </Card>
}

export default PoolCard