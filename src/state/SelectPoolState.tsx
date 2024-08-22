import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";
import { AuthTokenState } from "./AuthTokenState";
import { IPoolDetail } from "../apis/getPools/types";
import { getPoolsRequest } from "../apis/getPools";
import { useEffect } from "react";
import { multicall } from "@wagmi/core";
import { wagmiConfig } from "../wagmi";
import { POOL_CONTRACT_ABI } from "../constants/contract";
import { useAccount } from "wagmi";
import { selectorFamily } from "recoil";
import { PoolsState } from "./PoolsState";


export const SelectPoolState = selectorFamily({
    key: 'SelectPoolState',
    get: ({poolId}: {
        poolId: number
    }) => ({ get }) => {
        const pools = get(PoolsState)
        
        return pools.find(e => e.tokenPoolID == poolId)
    }
})