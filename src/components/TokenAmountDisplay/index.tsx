import { memo } from "react";
import ValueDisplay from "../ValueDisplay";
import { formatNumber, toNumberFixed } from "../../utils/numbers";
import { Box, Stack, Typography } from "@mui/joy";

export default memo<{
  amount: number;
  amountChange?: number
  showChange?: boolean
  symbol?: string;
  name: string;
  icon?: string;
}>(({ amount, name, icon, symbol, amountChange = 0, showChange = true }) => {
  return (
    <Stack sx={{
        background: amountChange < 0 ? '#FFE8EF' : amountChange > 0 ? '#EEFFE7' : '#F5F5F5',
        padding: 1,
        borderRadius: 10
    }} direction={"row"} alignItems={"center"} spacing={1}>
        <Box width={'40px'} height={'40px'}>
            {icon && <img src={icon} width={40} />}
        </Box>
        <Box flex={1}>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Typography level="title-lg">{toNumberFixed(amount, 2).toLocaleString()}{symbol ? ` ${symbol}`: ''}</Typography>
              {amountChange == 0 || showChange == false ? <></> : <Typography level="title-lg" color={amountChange > 0 ? 'success' : amountChange < 0 ? 'danger': 'primary'}>{amountChange > 0 ? '+': ''}{toNumberFixed(amountChange, 2).toLocaleString()}</Typography>}
            </Stack>
            <Typography level="body-sm" color="neutral">{name}</Typography>
        </Box>
    </Stack>
  );
});
