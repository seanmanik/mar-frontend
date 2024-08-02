import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";
import { api } from "../apis";
import { AuthTokenState } from "./AuthTokenState";
import { IPoolDetail } from "../apis/getPools/types";
import { useEffect } from "react";
import { getPoolsRequest } from "../apis/getPools";

export const PoolsState = atom<IPoolDetail[]>({
    key: 'PoolsState',
    default: selector({
        key: 'PoolsState/Default',
        get: async ({ get }) => {
            const token = get(AuthTokenState)
            return await getPoolsRequest({token})
        }
    }),
    effects: [() => {
        
    }]
})

export function useAutoRefreshPoolsState() {
    const token = useRecoilValue(AuthTokenState)
    const setPoolsState = useSetRecoilState(PoolsState)
    useEffect(() => {
        if (!token) return
        const id = setInterval(async () => {
            const pools = await getPoolsRequest({token})
        
            setPoolsState(pools)
        }, 3000)

        return () => clearInterval(id)
    }, [token])
}