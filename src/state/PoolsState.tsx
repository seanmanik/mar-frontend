import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";
import { api } from "../apis";
import { AuthTokenState } from "./AuthTokenState";
import { IPoolDetail } from "../apis/getPools/types";
import { useEffect } from "react";

export const PoolsState = atom<IPoolDetail[]>({
    key: 'PoolsState',
    default: selector({
        key: 'PoolsState/Default',
        get: async ({ get }) => {
            const token = get(AuthTokenState)
            const response = await api.get(token ? "/Pool/GetPools" : "/Pool/GetDefaultPools", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            return response.data;
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
            const response = await api.get(token ? "/Pool/GetPools" : "/Pool/GetDefaultPools", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        
            setPoolsState(response.data)
        }, 3000)

        return () => clearInterval(id)
    }, [token])
}