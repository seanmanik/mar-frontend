import { atom } from "recoil";
import { IPoolDetail } from "../apis/getPools/types";

export const SelectPoolForDepositWithdraw = atom<{
    depositPoolId?: number
    withdrawPoolId?: number
}>({
    key: 'SelectPoolForDepositWithdraw',
    default: {
        depositPoolId: undefined,
        withdrawPoolId: undefined
    }
})