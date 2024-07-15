import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { Address } from "viem";
import { useReadContract } from "wagmi";
import { config } from "../../../wagmi";
import { multicall } from '@wagmi/core';
import { CONTRACT_DEFAUL_DATA } from "../../../constants/contract";

export const useGetUserStakedOfPoolMultiCall = ({
  listContractAddress = [],
  userAddress,
}: {
  listContractAddress: string[];
  userAddress: string;
}): {
  data: any[] | undefined;
  isLoading: boolean;
  refetch: () => void
} => {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const fetchUserStakedInPools = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await multicall(config, {
        contracts: listContractAddress.map(contractAddress => {
          return {
            abi: CONTRACT_DEFAUL_DATA[contractAddress].abi,
            address: contractAddress as Address,
            functionName: "userStaked",
            args: [userAddress],
          } as any
        })
      })

      setData(res as any)
    } catch (error) {
      setIsLoading(false)
      setData(undefined)
    }
  }, [listContractAddress, userAddress])

  useEffect(() => {
    if (listContractAddress.length > 0 && userAddress) {
      fetchUserStakedInPools()
    }
  }, [listContractAddress, userAddress, fetchUserStakedInPools])

  return {
    data: data,
    isLoading,
    refetch: fetchUserStakedInPools,
  };
};
