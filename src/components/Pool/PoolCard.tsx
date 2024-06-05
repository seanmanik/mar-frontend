import { Box, Card, Stack } from "@mui/joy";
import React from "react";
import ValueDisplay from "../ValueDisplay";
import { IconDailyReward, IconETH, IconMarPoint, IconPending, IconTotalValueStake, IconUSDT, IconYourDailyReward, IconYourDeposited } from "../../icons";
import PoolTitle from "./PoolTitle";

const PoolCard = (props: any) => {
    return <Card sx={{
        // height: 285,
        padding: 2,
        backgroundColor: 'white',
        borderRadius: '12px'
    }}>
        <PoolTitle />
        <Stack direction={"row"} alignItems={"flex-start"} spacing={1} >
            <ValueDisplay name="TVL" text="$23,231,234" isNameAbove flex={1} />
            <ValueDisplay name="DAILY" text="$23,231,234" align="right" isNameAbove flex={1} />
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
        {props.children}
    </Card>
}

export default PoolCard