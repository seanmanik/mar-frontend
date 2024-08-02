import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";
import { AuthTokenState } from "./AuthTokenState";
import { IPoolDetail } from "../apis/getPools/types";
import { getPoolsRequest } from "../apis/getPools";
import { useEffect } from "react";

export const PoolsState = atom<IPoolDetail[]>({
    key: 'PoolsState',
    default: selector({
        key: 'PoolsState/Default',
        get: async ({ get }) => {
            console.log('PoolsState/Default')
            const token = get(AuthTokenState)
            return await getPoolsRequest({token})
        }
    })
})

export function useAutoPoolsStateIntervalRefresh() {
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