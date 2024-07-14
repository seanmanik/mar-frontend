import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { Address } from "viem";
import { useReadContract } from "wagmi";

export const useGetUserStakedOfPool = ({
  contractAddress,
  userAddress,
  abi,
}: {
  contractAddress: string;
  userAddress: string;
  abi: any;
}): {
  data: number;
  isLoading: boolean;
  refetch: () => void
} => {
  const queryClient = useQueryClient()
  const { data, isLoading, queryKey } = useReadContract({
    abi: abi,
    address: contractAddress as Address,
    functionName: "userStaked",
    args: [userAddress],
  });

  const refetch = useCallback(async () => {
    queryClient.invalidateQueries({ queryKey })
  }, [queryKey, queryClient])

  return {
    data: (data as number) || 0,
    isLoading,
    refetch,
  };
};
