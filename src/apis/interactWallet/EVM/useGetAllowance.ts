import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { Address } from "viem";
import { useReadContract } from "wagmi";

export const useGetAllowance = ({
  contractAddress,
  ownerAddress,
  spenderAddress,
  abi,
}: {
  contractAddress: string;
  ownerAddress: string;
  spenderAddress: string;
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
    functionName: "allowance",
    args: [ownerAddress, spenderAddress],
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
