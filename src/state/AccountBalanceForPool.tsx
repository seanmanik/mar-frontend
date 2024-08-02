import { selectorFamily } from "recoil";
import { AccountBalancesState } from "./AccountBalancesState";

export const AccountBalanceForPool = selectorFamily({
    key: 'AccountBalanceForPool',
    get: ({poolId, ethAddress}: {
        poolId: number
        ethAddress: string
    }) => ({ get }) => {
        const balances = get(AccountBalancesState({ethAddress}))
        
        return balances.find(e => e.poolId == poolId)
    }
})