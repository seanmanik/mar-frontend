import { useQuery } from "@tanstack/react-query";
import { api } from "..";
import { IPoolDetail } from "./types";
import { DEFAULT_CLIENT_STALE_TIME } from "../../constants/queryConfigs";

export const getPoolsRequest = async ({
  token,
}: {
  token: string;
}): Promise<IPoolDetail[]> => {
  const response = await api.get(token ? "/Pool/GetPools" : "/Pool/GetDefaultPools", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const useGetPools = ({ token }: { token: string }) => {
  const { data, isError, isFetching, isLoading, refetch, error } = useQuery<
    IPoolDetail[]
  >({
    queryKey: ["Pools", token],
    queryFn: () => getPoolsRequest({ token }),
    enabled: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: DEFAULT_CLIENT_STALE_TIME["30sec"],
  });

  return { data, isError, isFetching, isLoading, refetch, error };
};
