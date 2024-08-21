import BigNumber from "bignumber.js";
import { useCallback } from "react";
import { Address } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi"
import { NFT_CONTRACT, NFT_CONTRACT_ABI } from "../../../constants/contract";

export const useMintNFT = () => {
    const {
        data: hash,
        isPending,
        writeContract
    } = useWriteContract()


    const onMint = useCallback(async () => {
        writeContract({
            address: NFT_CONTRACT as Address,
            abi: NFT_CONTRACT_ABI,
            functionName: 'safeMint',
            args: [],
        })
    }, [writeContract])

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        })


    return {
        isPending: isPending || isConfirming,
        isConfirming,
        isConfirmed,
        onMint
    }
}