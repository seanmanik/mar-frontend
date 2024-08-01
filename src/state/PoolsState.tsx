import { atom, selector } from "recoil";
import { api } from "../apis";
import { AuthTokenState } from "./AuthTokenState";
import { IPoolDetail } from "../apis/getPools/types";

export const PoolsState = atom<IPoolDetail[]>({
    key: 'PoolsState',
    default: selector({
        key: 'PoolsState/Default',
        get: async ({ get }) => {
            console.log('PoolsState')
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