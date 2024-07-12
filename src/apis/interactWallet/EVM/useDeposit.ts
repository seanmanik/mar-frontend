import BigNumber from "bignumber.js";
import { useCallback } from "react";
import { Address } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi"

export const useDeposit = ({
    contractAddress,
    decimals,
    spenderAddress,
    abi,
}: {
    contractAddress: string;
    decimals: number;
    spenderAddress: string;
    abi: any;
}) => {
    const {
        data: hash,
        isPending,
        writeContract
    } = useWriteContract()


    const onDeposit = useCallback(async (value: number) => {
        writeContract({
            address: contractAddress as Address,
            abi,
            functionName: 'stake',
            args: [spenderAddress, BigInt(new BigNumber(value).multipliedBy(Math.pow(10, decimals)).toFixed())],
        })
    }, [contractAddress, writeContract, abi, spenderAddress, decimals])

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        })


    return {
        isPending,
        isConfirming,
        isConfirmed,
        onDeposit
    }
}