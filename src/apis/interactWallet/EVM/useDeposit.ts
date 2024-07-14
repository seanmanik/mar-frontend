import BigNumber from "bignumber.js";
import { useCallback } from "react";
import { Address } from "viem";
import {
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

export const useDeposit = ({
  contractAddress,
  decimals,
  abi,
}: {
  contractAddress: string;
  decimals: number;
  abi: any;
}) => {
  const { data: hash, isPending, writeContract } = useWriteContract();

  const onDeposit = useCallback(
    async (value: number) => {
      writeContract({
        address: contractAddress as Address,
        abi,
        functionName: "stake",
        args: [
          BigInt(
            new BigNumber(value).multipliedBy(Math.pow(10, decimals)).toFixed()
          ),
        ],
      });
    },
    [contractAddress, writeContract, abi, decimals]
  );

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return {
    isPending: isPending || isConfirming,
    isConfirmed,
    txHash: hash,
    onDeposit,
  };
};
