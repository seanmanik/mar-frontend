import { selector } from "recoil";
import { multicall } from "@wagmi/core";
import { config } from "../wagmi";
import { PoolsState } from "./PoolsState";
import { POOL_CONTRACT_ABI, TOKEN_DECIMALS } from "../constants/contract";

export const PoolTVLsSelector = selector({
    key: 'PoolTVLsSelector',
    get: async ({ get }) => {
        const pools = get(PoolsState)
        console.log('PoolTVLsSelector', pools)
        if (pools.length == 0) return []
        const res = await multicall(config, {
            contracts: pools.map(e => e.contractAddress).map((contractAddress) => {
                return {
                    abi: POOL_CONTRACT_ABI,
                    address: contractAddress,
                    functionName: "totalStaked",
                } as any;
            }),
        });

        return res.map((e, i) => {
            const amount: BigInt = (
                e.status == "success" ? e.result : BigInt(0)
            ) as BigInt;
            return {
                amount: amount,
                amount10:
                    BigInt(amount.toString()) /
                    BigInt(
                        10 ** TOKEN_DECIMALS[pools[i].tokenAddress.toLowerCase()]),
                tokenPoolId: pools[i].tokenPoolID
            };
        }) as any
    }
})