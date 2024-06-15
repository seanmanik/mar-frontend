import { memo } from "react";
import { useBalance } from "wagmi";

export default memo<{
  address: `0x${string}`;
}>(({ address }) => {
  const balance = useBalance({
    address: address,
  });
  return <>{balance?.data?.value.toString()}</>;
});
