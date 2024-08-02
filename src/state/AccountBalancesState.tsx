import { atom, atomFamily, selector, selectorFamily, useRecoilState, useRecoilValueLoadable } from "recoil";
import { multicall } from "@wagmi/core";
import { config } from "../wagmi";
import { PoolsState } from "./PoolsState";
import { ERC20_CONTRACT_ABI, POOL_CONTRACT_ABI, TOKEN_DECIMALS } from "../constants/contract";
import { useEffect } from "react";

export const AccountBalancesState = atom<{
    amount: BigInt
    amount10: number
    allowanceAmount: BigInt
    allowanceAmount10: number
    poolId: number
}[]>({
    key: 'AccountBalancesState',
    default: []
})

export function useAccountBalanceStateUpdate({ ethAddress }: {
    ethAddress: string
}) {
    const [value, setValue] = useRecoilState(AccountBalancesState)

    const poolsLoadable = useRecoilValueLoadable(PoolsState)
    const pools = poolsLoadable.state == 'hasValue' ? poolsLoadable.contents : []

    useEffect(() => {
        (async () => {
            if (pools.length == 0) return []
            console.log('update AccountBalanceState')
            const res = await multicall(config, {
                contracts: [...pools.map(e => {
                    return {
                        abi: ERC20_CONTRACT_ABI,
                        address: e.tokenAddress,
                        functionName: "balanceOf",
                        args: [ethAddress]
                    } as any;
                }), ...pools.map(e => {
                    return {
                        abi: ERC20_CONTRACT_ABI,
                        address: e.tokenAddress,
                        functionName: "allowance",
                        args: [ethAddress, e.contractAddress]
                    } as any;
                })],
            });

            setValue(pools.map((e, i) => {
                var resAmount = res[i]
                var resAllowance = res[i + pools.length]

                const amount: BigInt = (
                    resAmount.status == "success" ? resAmount.result : BigInt(0)
                ) as BigInt;

                const allowance: BigInt = (
                    resAllowance.status == "success" ? resAllowance.result : BigInt(0)
                ) as BigInt;

                return {
                    amount: amount,
                    amount10:
                        parseFloat((BigInt(amount.toString()) /
                            BigInt(
                                10 ** TOKEN_DECIMALS[pools[i].tokenAddress.toLowerCase()])
                        ).toString()),

                    allowanceAmount: allowance,
                    allowanceAmount10:
                        parseFloat((BigInt(allowance.toString()) /
                            BigInt(
                                10 ** TOKEN_DECIMALS[pools[i].tokenAddress.toLowerCase()])
                        ).toString()),
                    poolId: pools[i].tokenPoolID
                };
            }))
        })()
    }, [ethAddress, pools])

    return value
}
