import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";
import { AuthTokenState } from "./AuthTokenState";
import { IPoolDetail } from "../apis/getPools/types";
import { getPoolsRequest } from "../apis/getPools";
import { useEffect } from "react";
import { multicall } from "@wagmi/core";
import { wagmiConfig } from "../wagmi";
import { POOL_CONTRACT_ABI } from "../constants/contract";
import { useAccount } from "wagmi";

export const PoolsState = atom<IPoolDetail[]>({
    key: 'PoolsState',
    default: []
    // default: selector({
    //     key: 'PoolsState/Default',
    //     get: async ({ get }) => {
    //         console.log('PoolsState/Default')
    //         const token = get(AuthTokenState)
    //         return await getPoolsRequest({token})
    //     }
    // })
})

export function useFirstFetchPoolsState() {
    const token = useRecoilValue(AuthTokenState)
    const account = useAccount();
    const setPoolsState = useSetRecoilState(PoolsState)
    useEffect(() => {
        (async () => {
            const pools = await getPoolsRequest({token})
    
            if (pools.length == 0) return []
            const res = await multicall(wagmiConfig, {
                contracts: [...pools.map(e => e.contractAddress).map((contractAddress) => {
                    return {
                        abi: POOL_CONTRACT_ABI,
                        address: contractAddress,
                        functionName: "totalStaked",
                    } as any;
                }), ...(!(account || {}).address ? [] : pools.map(e => e.contractAddress).map((contractAddress) => {
                    return {
                        abi: POOL_CONTRACT_ABI,
                        address: contractAddress,
                        functionName: "userStaked",
                        args: [account.address]
                    } as any;
                }))],
            });
    
            pools.forEach((e, i) => {
                let resTVL = res[i]
                let resStaked = res[i + pools.length]
    
                console.log({
                    resTVL,
                    resStaked
                })
    
                if (resTVL.status == "success") {
                    e.tvl = parseFloat((BigInt((resTVL.result as BigInt).toString()) /
                        BigInt(10 ** pools[i].decimals)
                    ).toString())
    
                    console.log()
                }
    
                if (resStaked && resStaked.status == "success") {
                    e.depositedAmount = parseFloat((BigInt((resStaked.result as BigInt).toString()) /
                        BigInt(10 ** pools[i].decimals)
                    ).toString())
                }
            })
        
            setPoolsState(pools)
        })()
    }, [token, (account || {}).address])
}

export function useAutoPoolsStateIntervalRefresh() {
    const token = useRecoilValue(AuthTokenState)
    const account = useAccount();
    const setPoolsState = useSetRecoilState(PoolsState)
    useEffect(() => {
        if (!token) return
        const id = setInterval(async () => {
            const pools = await getPoolsRequest({token})

            if (pools.length == 0) return []
            const res = await multicall(wagmiConfig, {
                contracts: [...pools.map(e => e.contractAddress).map((contractAddress) => {
                    return {
                        abi: POOL_CONTRACT_ABI,
                        address: contractAddress,
                        functionName: "totalStaked",
                    } as any;
                }), ...(!(account || {}).address ? [] : pools.map(e => e.contractAddress).map((contractAddress) => {
                    return {
                        abi: POOL_CONTRACT_ABI,
                        address: contractAddress,
                        functionName: "userStaked",
                        args: [account.address]
                    } as any;
                }))],
            });

            pools.forEach((e, i) => {
                let resTVL = res[i]
                let resStaked = res[i + pools.length]

                if (resTVL.status == "success") {
                    e.tvl = parseFloat((BigInt((resTVL.result as BigInt).toString()) /
                        BigInt(10 ** pools[i].decimals)
                    ).toString())

                    console.log()
                }

                if (resStaked && resStaked.status == "success") {
                    e.depositedAmount = parseFloat((BigInt((resStaked.result as BigInt).toString()) /
                        BigInt(10 ** pools[i].decimals)
                    ).toString())
                }
            })
        
            setPoolsState(pools)
        }, 3000)

        return () => clearInterval(id)
    }, [token, (account || {}).address])
}