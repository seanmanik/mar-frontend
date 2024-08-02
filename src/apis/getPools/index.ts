import { api } from "..";
import { IPoolDetail } from "./types";

export const getPoolsRequest = async ({token,}: {
  token: string;
}): Promise<IPoolDetail[]> => {
  const response = await api.get(token ? "/Pool/GetPools" : "/Pool/GetDefaultPools", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  (response.data as IPoolDetail[]).forEach(e => {
    e.usdRate = {
        WBTC: 63217,
        USDT: 1.1,
        USDC: 1.02
    }[e.assetSymbol] || 1
})

  return response.data;
};