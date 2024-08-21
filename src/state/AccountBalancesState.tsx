import { atom } from "recoil";

export const AccountBalancesState = atom<{
    amount10: number
    allowanceAmount10: number
    poolId: number
}[]>({
    key: 'AccountBalancesState',
    default: []
})
