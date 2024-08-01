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
            const response = await api.get<IPoolDetail[]>(token ? "/Pool/GetPools" : "/Pool/GetDefaultPools", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            response.data.forEach(e => {
                e.usdRate = {
                    WBTC: 63217,
                    USDT: 1.1,
                    USDC: 1.02
                }[e.assetSymbol] || 1
            })
    
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
            const response = await api.get<IPoolDetail[]>(token ? "/Pool/GetPools" : "/Pool/GetDefaultPools", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            response.data.forEach(e => {
                e.usdRate = {
                    WBTC: 63217,
                    USDT: 1.1,
                    USDC: 1.02
                }[e.assetSymbol] || 1
            })
        
            setPoolsState(response.data)
        }, 3000)

        return () => clearInterval(id)
    }, [token])
}