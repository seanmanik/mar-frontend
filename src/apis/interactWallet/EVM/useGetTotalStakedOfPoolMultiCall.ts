import { useCallback, useEffect, useState } from "react";
import { Address } from "viem";
import { config } from "../../../wagmi";
import { multicall } from "@wagmi/core";
import {
  POOL_CONTRACT_ABI,
} from "../../../constants/contract";

export const useGetTotalStakedOfPoolMultiCall = ({
  listContractAddress = [],
  userToken,
}: {
  listContractAddress: string[];
  userToken: string;
}): {
  data:
    | {
        amount: BigInt;
        amount10: number;
        contractAddress: string;
      }[]
    | undefined;
  isLoading: boolean;
  refetch: () => void;
} => {
  const [data, setData] = useState<
    | {
        amount: BigInt;
        amount10: number;
        contractAddress: string;
      }[]
    | undefined
  >();
  const [isLoading, setIsLoading] = useState(false);

  const fetchTotalStakedInPools = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await multicall(config, {
        contracts: listContractAddress.map((contractAddress) => {
          return {
            abi: POOL_CONTRACT_ABI,
            address: contractAddress as Address,
            functionName: "totalStaked",
          } as any;
        }),
      });

      setData(
        res.map((e, i) => {
          const amount: BigInt = (
            e.status == "success" ? e.result : BigInt(0)
          ) as BigInt;
          return {
            amount: amount,
            amount10:
              BigInt(amount.toString()) /
              BigInt(
                10 ** 18
              ),
            contractAddress: listContractAddress[i],
          };
        }) as any
      );
    } catch (error) {
      setIsLoading(false);
      setData(undefined);
    } finally {
      setIsLoading(false);
    }
  }, [(listContractAddress || []).length]);

  useEffect(() => {
    if (!userToken) {
      setData(undefined);
    }
    if (listContractAddress.length > 0) {
      fetchTotalStakedInPools();
    }
  }, [(listContractAddress || []).length, fetchTotalStakedInPools, userToken]);

  return {
    data: data,
    isLoading,
    refetch: fetchTotalStakedInPools,
  };
};
