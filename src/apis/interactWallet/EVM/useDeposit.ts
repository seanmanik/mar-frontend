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
  type
}: {
  contractAddress: string;
  decimals: number;
  abi: any;
  type: 'ETH' | 'ERC20'
}) => {
  const { data: hash, isPending, writeContract } = useWriteContract();

  const onDeposit = useCallback(
    async (value: number) => {
      writeContract({
        address: contractAddress as Address,
        abi,
        functionName: "stake",
        args: type == 'ETH' ? [] : [
          BigInt(value) * (BigInt(10) ** BigInt(decimals))
        ],
        value: type == 'ETH' ? 
        BigInt(value) * (BigInt(10) ** BigInt(decimals))
          : BigInt(0)
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
