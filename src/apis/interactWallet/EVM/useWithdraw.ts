import BigNumber from "bignumber.js";
import { useCallback } from "react";
import { Address, parseUnits } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi"

export const useWithdraw = ({
    contractAddress,
    decimals,
    abi,
}: {
    contractAddress: string;
    decimals: number;
    abi: any;
}) => {
    const {
        data: hash,
        isPending,
        writeContract
    } = useWriteContract()


    const onWithdraw = useCallback(async (value: number) => {
        writeContract({
            address: contractAddress as Address,
            abi,
            functionName: 'withdraw',
            args: [parseUnits(value.toString(), decimals)],
        })
    }, [contractAddress, writeContract, abi, decimals])

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        })


    return {
        isPending: isPending || isConfirming,
        isConfirmed,
        txHash: hash,
        onWithdraw
    }
}