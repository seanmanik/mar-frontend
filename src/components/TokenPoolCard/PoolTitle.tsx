import { Stack, Typography } from "@mui/joy";
import TokenToIcon from "../../utils/TokenToIcon";
import BootsTag from "./BoostTag";

const PoolTitle = ({assetSymbol} : {assetSymbol: string}) => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Stack direction="row" gap={1} alignItems="center">
        <img src={TokenToIcon[assetSymbol]} width={24} height={24} />
        <Typography fontWeight={700} fontSize={20}>
          {assetSymbol}
        </Typography>
        <img src={TokenToIcon['ETH']} width={20} height={20} />
      </Stack>
      <Stack direction="row" gap={1} alignItems="center">
        <BootsTag />
        <BootsTag />
      </Stack>
    </Stack>
  );
};

export default PoolTitle;
