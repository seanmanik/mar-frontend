import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { Address } from "viem";
import { useReadContract } from "wagmi";
import { config } from "../../../wagmi";
import { multicall } from "@wagmi/core";
import { POOL_CONTRACT_ABI } from "../../../constants/contract";
import BigNumber from "bignumber.js";

interface UserStakedOfPoolResultType {
  amount: BigInt;
  amount10: BigInt;
  amountBalance: number;
  contractAddress: string;
}

export const useGetUserStakedOfPoolMultiCall = ({
  listContractAddress = [],
  userAddress,
  userToken,
}: {
  listContractAddress: string[];
  userAddress: string;
  userToken: string;
}): {
  data: UserStakedOfPoolResultType[] | undefined;
  isLoading: boolean;
  refetch: () => void;
} => {
  const [data, setData] = useState<UserStakedOfPoolResultType[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserStakedInPools = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await multicall(config, {
        contracts: listContractAddress.map((contractAddress) => {
          return {
            abi: POOL_CONTRACT_ABI,
            address: contractAddress as Address,
            functionName: "userStaked",
            args: [userAddress],
          } as any;
        }),
      });

      setData(
        res.map((e, i) => {
          const amount: BigInt = (
            e.status == "success" ? e.result : BigInt(0)
          ) as BigInt;
          const amount10 =
            BigInt(amount.toString()) /
            BigInt(
              10 ** 18
            );
          return {
            amount: amount,
            amount10: amount10,
            amountBalance: new BigNumber(amount10 as any).toNumber(),
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
  }, [(listContractAddress || []).length, userAddress]);

  useEffect(() => {
    if (!userToken) {
      setData(undefined);
    }
    if (listContractAddress.length > 0 && userAddress) {
      fetchUserStakedInPools();
    }
  }, [
    (listContractAddress || []).length,
    userAddress,
    fetchUserStakedInPools,
    userToken,
  ]);

  return {
    data: data,
    isLoading,
    refetch: fetchUserStakedInPools,
  };
};
