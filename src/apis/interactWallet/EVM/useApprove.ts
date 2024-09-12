import BigNumber from "bignumber.js";
import { useCallback } from "react";
import { Address, parseUnits } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi"

export const useApprove = ({
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


    const onApprove = useCallback(async (value: number) => {
        writeContract({
            address: contractAddress as Address,
            abi,
            functionName: 'approve',
            args: [spenderAddress, parseUnits(value.toString(), decimals)],
        })
    }, [contractAddress, writeContract, abi, spenderAddress, decimals])

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        })


    return {
        isPending: isPending || isConfirming,
        isConfirmed,
        onApprove
    }
}