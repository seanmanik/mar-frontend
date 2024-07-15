import { useCallback, useEffect, useState } from "react";
import { Address } from "viem";
import { config } from "../../../wagmi";
import { multicall } from '@wagmi/core';
import { CONTRACT_DEFAUL_DATA, MAP_POOL_TO_TOKEN } from "../../../constants/contract";

export const useGetTotalStakedOfPoolMultiCall = ({
  listContractAddress = []
}: {
  listContractAddress: string[];
}): {
  data: {
    amount: BigInt,
    amount10: number,
    contractAddress: string
  }[] | undefined;
  isLoading: boolean;
  refetch: () => void
} => {
  const [data, setData] = useState<{
    amount: BigInt,
    amount10: number,
    contractAddress: string
  }[] | undefined>()
  const [isLoading, setIsLoading] = useState(false)

  const fetchTotalStakedInPools = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await multicall(config, {
        contracts: listContractAddress.map(contractAddress => {
          return {
            abi: CONTRACT_DEFAUL_DATA[contractAddress].abi,
            address: contractAddress as Address,
            functionName: "totalStaked"
          } as any
        })
      })

      setData(res.map((e, i) => {
        const amount: BigInt = (e.status == 'success' ? e.result : BigInt(0)) as BigInt
        return ({
          amount: amount,
          amount10: BigInt(amount.toString()) / BigInt(10 ** (CONTRACT_DEFAUL_DATA[MAP_POOL_TO_TOKEN[listContractAddress[i]]] as any).decimals),
          contractAddress: listContractAddress[i]
        })
      }) as any)
    } catch (error) {
      setIsLoading(false)
      setData(undefined)
    }
  }, [(listContractAddress || []).length])

  useEffect(() => {
    if (listContractAddress.length > 0) {
      fetchTotalStakedInPools()
    }
  }, [(listContractAddress || []).length, fetchTotalStakedInPools])

  return {
    data: data,
    isLoading,
    refetch: fetchTotalStakedInPools,
  };
};
