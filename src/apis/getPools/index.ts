import { useQuery } from "@tanstack/react-query";
import { api } from "..";
import { IPoolDetail } from "./types";
import { DEFAULT_CLIENT_STALE_TIME } from "../../constants/queryConfigs";

export const getPoolsRequest = ({
  token,
}: {
  token: string;
}): IPoolDetail[] => {
  return [
    {
      tokenPoolID: 3,
      contractAddress: "0xAAb9fe7f19387f1C6090843625Cb26e31E33f7cC",
      blockchain: "Ethereum",
      assetName: "USD Coin",
      assetSymbol: "USDC",
      assetLogo: "",
      tvl: 0.0,
      apy: 0,
      depositedAmount: 0,
      depositedValue: 0,
    },
    {
      tokenPoolID: 4,
      contractAddress: "0xFA4e81f155dAf51c7AACC63c32FE4c58b0982937",
      blockchain: "Ethereum",
      assetName: "USD Tether",
      assetSymbol: "USDT",
      assetLogo: "",
      tvl: 0.0,
      apy: 0,
      depositedAmount: 0,
      depositedValue: 0,
    },
    {
      tokenPoolID: 5,
      contractAddress: "0xba0CaFE0E3A3588F323fD2064AF6891923e2d463",
      blockchain: "Ethereum",
      assetName: "Wrapped Bitcoin",
      assetSymbol: "WBTC",
      assetLogo: "",
      tvl: 0.0,
      apy: 0,
      depositedAmount: 0,
      depositedValue: 0,
    },
  ];
};
// export const getPoolsRequest = async ({
//   token,
// }: {
//   token: string;
// }): Promise<IPoolDetail[]> => {
//   return await api.get("/Pool/GetPools", {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };

export const useGetPools = ({ token }: { token: string }) => {
  const { data, isError, isFetching, isLoading, refetch, error } = useQuery<
    IPoolDetail[]
  >({
    queryKey: ["Pools", token],
    queryFn: () => getPoolsRequest({ token }),
    enabled: !!token,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: DEFAULT_CLIENT_STALE_TIME["30sec"],
  });

  return { data, isError, isFetching, isLoading, refetch, error };
};
