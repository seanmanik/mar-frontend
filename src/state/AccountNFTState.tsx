import { atom, atomFamily, selector, selectorFamily, useRecoilState, useRecoilValueLoadable } from "recoil";
import { multicall } from "@wagmi/core";
import { wagmiConfig } from "../wagmi";
import { NFT_CONTRACT, NFT_CONTRACT_ABI, POOL_CONTRACT_ABI, TOKEN_DECIMALS } from "../constants/contract";
import { useEffect } from "react";

export const AccountNFTState = atom<{
    ids: number[]
    uri: string
}>({
    key: 'AccountNFTState',
    default: {
        ids: [],
        uri: ''
    }
})

export function useAccountNFTUpdate({ ethAddress }: {
    ethAddress: string
}) {
    const [value, setValue] = useRecoilState(AccountNFTState)

    useEffect(() => {
        const id = setInterval(() => {
            (async () => {
                console.log('useAccountNFTUpdate')
                if (!ethAddress) return;
                const [balance, uri] = await multicall(wagmiConfig, {
                    contracts: [{
                        address: NFT_CONTRACT,
                        abi: NFT_CONTRACT_ABI as any,
                        functionName: "balanceOf",
                        args: [ethAddress]
                    }, {
                        address: NFT_CONTRACT,
                        abi: NFT_CONTRACT_ABI as any,
                        functionName: "uri",
                        args: []
                    }],
                });
                const ids = await multicall(wagmiConfig, {
                    contracts: [...Array(parseInt((balance.result as BigInt).toString())).keys()].map(i => ({
                        address: NFT_CONTRACT,
                        abi: NFT_CONTRACT_ABI as any,
                        functionName: "tokenOfOwnerByIndex",
                        args: [ethAddress, i]
                    }))
                })
    
                setValue({
                    ids: ids.map(e => parseInt((e.result as BigInt).toString())),
                    uri: uri.result as string
                })
            })()
        }, 5000)

        return () => clearInterval(id)
    }, [ethAddress])

    return value
}
