import { atom, atomFamily, selector, selectorFamily, useRecoilState, useRecoilValueLoadable } from "recoil";
import { multicall } from "@wagmi/core";
import { wagmiConfig } from "../wagmi";
import { NFT_CONTRACT, NFT_CONTRACT_ABI, POOL_CONTRACT_ABI, TOKEN_DECIMALS } from "../constants/contract";
import { useEffect } from "react";

export const AccountNFTState = atom<{
    balance: number
    ids: number[]
    uri: string
}>({
    key: 'AccountNFTState',
    default: {
        balance: 0,
        ids: [],
        uri: ''
    }
})