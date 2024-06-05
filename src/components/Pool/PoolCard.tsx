import { Box, Card, Stack } from "@mui/joy";
import React from "react";
import ValueSmallDisplay from "../ValueSmallDisplay";
import { IconDailyReward, IconMarPoint, IconPending, IconTotalValueStake, IconUSDT, IconYourDailyReward, IconYourDeposited } from "../../icons";

const PoolCard = (props:any) => {
    return <Card sx={{
        // height: 285,
        padding: 2,
        backgroundColor: 'white',
        borderRadius: '12px'
    }}>
        <Box>
            <ValueSmallDisplay name="Total value Staked" text="$20,000,000" icon={IconTotalValueStake} />
            <ValueSmallDisplay name="Base Points Per Dollar" text="0.01 PTS" icon={IconDailyReward} marginTop={1.5}/>

            <ValueSmallDisplay name="Your Value Staked" text="$200.5" icon={IconYourDeposited} marginTop={1.5}/>
            <ValueSmallDisplay name="Your Daily Reward" text="14 PTS" icon={IconYourDailyReward} marginTop={1.5}/>

            <ValueSmallDisplay name="Your NFTs Deposited" icon={IconYourDeposited} marginTop={1.5} images={[
                'https://i.seadn.io/gae/WG55wHkFEYqegub2kkMZbUJwmI0TfW75LRrgI4odvsfqZ0sTEX9CCr3QUenYrf9tzIsSUp7vNccImZtDO-kcTLzsqxlb98DKiO2mLOk',
                'https://i.seadn.io/gae/WG55wHkFEYqegub2kkMZbUJwmI0TfW75LRrgI4odvsfqZ0sTEX9CCr3QUenYrf9tzIsSUp7vNccImZtDO-kcTLzsqxlb98DKiO2mLOk',
                'https://i.seadn.io/gae/WG55wHkFEYqegub2kkMZbUJwmI0TfW75LRrgI4odvsfqZ0sTEX9CCr3QUenYrf9tzIsSUp7vNccImZtDO-kcTLzsqxlb98DKiO2mLOk',
                'https://i.seadn.io/gae/WG55wHkFEYqegub2kkMZbUJwmI0TfW75LRrgI4odvsfqZ0sTEX9CCr3QUenYrf9tzIsSUp7vNccImZtDO-kcTLzsqxlb98DKiO2mLOk',
                'https://i.seadn.io/gae/WG55wHkFEYqegub2kkMZbUJwmI0TfW75LRrgI4odvsfqZ0sTEX9CCr3QUenYrf9tzIsSUp7vNccImZtDO-kcTLzsqxlb98DKiO2mLOk',
                'https://i.seadn.io/gae/WG55wHkFEYqegub2kkMZbUJwmI0TfW75LRrgI4odvsfqZ0sTEX9CCr3QUenYrf9tzIsSUp7vNccImZtDO-kcTLzsqxlb98DKiO2mLOk',
                'https://i.seadn.io/gae/WG55wHkFEYqegub2kkMZbUJwmI0TfW75LRrgI4odvsfqZ0sTEX9CCr3QUenYrf9tzIsSUp7vNccImZtDO-kcTLzsqxlb98DKiO2mLOk',
            ]}/>
        </Box>
        {props.children}
    </Card>
}

export default PoolCard