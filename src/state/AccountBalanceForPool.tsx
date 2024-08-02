import { selectorFamily } from "recoil";
import { AccountBalancesState } from "./AccountBalancesState";

export const AccountBalanceForPool = selectorFamily({
    key: 'AccountBalanceForPool',
    get: ({poolId}: {
        poolId: number
    }) => ({ get }) => {
        const balances = get(AccountBalancesState)
        
        return balances.find(e => e.poolId == poolId)
    }
})