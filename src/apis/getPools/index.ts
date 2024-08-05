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
    e.usdRate = e.tokenPrice
})

  return response.data;
};