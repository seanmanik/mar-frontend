import { Box, Stack, Typography } from "@mui/joy";
import { memo } from "react";
import TokenToIcon from "../../utils/TokenToIcon";
import { CheckCircle } from "@mui/icons-material";
import { IconCheckOne } from "../../icons";

export default memo<{
    symbol: string
    nftIds: {
        id: number
        image: string
    }[]
    value: number[]
    onChange?: (value: number[]) => void
}>(({
    symbol,
    nftIds,
    value,
    onChange
}) => {

    return (
    <Box>
        <Box sx={{borderRadius: '12px', border: '1px solid #e0e0e0', padding: 1}}>
            <Stack direction={"row"} spacing={1} alignItems={"flex-start"} justifyContent={"space-between"}>
                <img src={TokenToIcon[symbol]} width={40} />
                <Box flex={1}>
                    <Typography level="title-sm" color="neutral">Deposit {symbol}</Typography>
                    <Typography level="title-lg">{symbol} {value.map(e => `#${e}`).join(' ')}</Typography>
                </Box>
                {/* <Stack flex={1} direction={"row"} spacing={1} alignItems={"center"}>
                </Stack> */}
                <Stack width={160} direction={"row"} alignItems={"center"} justifyContent={"flex-end"} flexWrap={"wrap"}>
                    {nftIds.map(e => (
                        <Box
                            key={e.id}
                            sx={{
                                margin: '2px',
                                position: 'relative'
                            }}
                        >
                            <img 
                                src={e.image} 
                                width={42}
                                height={42} 
                                style={{
                                    objectFit: 'cover', 
                                    display: 'block',
                                    borderRadius: 10,
                                    border: value.includes(e.id) ? '3px solid #1D72DC' : '3px solid transparent',
                                }}
                                onClick={() => {
                                    if (value.includes(e.id)) {
                                        onChange && onChange(value.filter(v => v != e.id))
                                    }
                                    else {
                                        onChange && onChange([...value, e.id])
                                    }
                                }}
                            />
                            {value.includes(e.id) && 
                                <img src={IconCheckOne} style={{
                                    position: 'absolute',
                                    right: -3,
                                    top: -3,
                                    width: 12,
                                    height: 12
                                    // background: '#ffffff',
                                    // borderRadius: '100px'
                                }}/>
                            }
                        </Box>
                    ))}
                </Stack>
            </Stack>
        </Box>
    </Box>
    )
})