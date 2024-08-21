import { useRecoilState, useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from "recoil"
import { AccountBalancesState } from "../state/AccountBalancesState"
import { PoolsState } from "../state/PoolsState"
import { useEffect } from "react"
import { multicall } from "@wagmi/core";
import { wagmiConfig } from "../wagmi";
import { ERC20_CONTRACT_ABI, NFT_CONTRACT, NFT_CONTRACT_ABI, POOL_CONTRACT_ABI } from "../constants/contract"
import { AccountNFTState } from "../state/AccountNFTState"
import { AuthTokenState } from "../state/AuthTokenState";
import { useAccount } from "wagmi";
import { getPoolsRequest } from "../apis/getPools";



function toNumber(v: any, decimals: number = 0) {
    return parseFloat((BigInt((v as BigInt).toString()) / BigInt(10 ** decimals)).toString())
}

export function useAccountNFTUpdate({ ethAddress }: {
    ethAddress: string
}) {
    const [value, setValue] = useRecoilState(AccountNFTState)

    useEffect(() => {
        const id = setInterval(() => {
            (async () => {
                console.log('useAccountNFTUpdate')
                if (!ethAddress) return;
                const [balance, uri] = await multicall(wagmiConfig, {
                    contracts: [{
                        address: NFT_CONTRACT,
                        abi: NFT_CONTRACT_ABI as any,
                        functionName: "balanceOf",
                        args: [ethAddress]
                    }, {
                        address: NFT_CONTRACT,
                        abi: NFT_CONTRACT_ABI as any,
                        functionName: "uri",
                        args: []
                    }],
                });
                const ids = await multicall(wagmiConfig, {
                    contracts: [...Array(parseInt((balance.result as BigInt).toString())).keys()].map(i => ({
                        address: NFT_CONTRACT,
                        abi: NFT_CONTRACT_ABI as any,
                        functionName: "tokenOfOwnerByIndex",
                        args: [ethAddress, i]
                    }))
                })

                console.log('bal', balance)
    
                setValue({
                    ids: ids.map(e => parseInt((e.result as BigInt).toString())),
                    uri: uri.result as string,
                    balance: toNumber(balance)
                })
            })()
        }, 5000)

        return () => clearInterval(id)
    }, [ethAddress])

    return value
}

export function useInitAndUpdateStateInterval() {
    const token = useRecoilValue(AuthTokenState)
    const account = useAccount();
    const setPoolsState = useSetRecoilState(PoolsState)
    const setAccountBalance = useSetRecoilState(AccountBalancesState)
    const setAccountNFT= useSetRecoilState(AccountNFTState)
    useEffect(() => {
        const delay = 5000
        let isRunning = false
        let nextRun = 0
        const id = setInterval(async () => {
            if (isRunning) return;
            if (Date.now() < nextRun) return;

            nextRun = Date.now() + delay

            const pools = await getPoolsRequest({token})

            if (pools.length == 0) return []

            const resMulticall = await multicall(wagmiConfig, {
                contracts: [
                    ...pools.map(e => e.contractAddress).map((contractAddress) => ({
                        abi: POOL_CONTRACT_ABI,
                        address: contractAddress,
                        functionName: "totalStaked",
                        args: []
                    })), 
                    ...pools.map(e => e.contractAddress).map((contractAddress) => ({
                        abi: POOL_CONTRACT_ABI,
                        address: contractAddress,
                        functionName: "userStaked",
                        args: [account.address || '0x0000000000000000000000000000000000000000']
                    })),
                    ...pools.map(e => ({
                        abi: ERC20_CONTRACT_ABI,
                        address: e.tokenAddress,
                        functionName: "balanceOf",
                        args: [account.address || '0x0000000000000000000000000000000000000000']
                    })),
                    ...pools.map(e => ({
                        abi: ERC20_CONTRACT_ABI,
                        address: e.tokenAddress,
                        functionName: "allowance",
                        args: [account.address || '0x0000000000000000000000000000000000000000', e.contractAddress]
                    })),
                    {
                        address: NFT_CONTRACT,
                        abi: NFT_CONTRACT_ABI as any,
                        functionName: "balanceOf",
                        args: [account.address || '0x0000000000000000000000000000000000000000']
                    }
                ] as any,
            });

            const result = resMulticall.map(e => e)
            const [
                totalStakedResult,
                userStakedResult,
                balanceOfResult,
                allowanceResult,
                balanceOfNFT
            ] = [
                result.splice(0, pools.length).map((e, i) => e.status == 'success' ? toNumber(e.result, pools[i].decimals) : 0),
                result.splice(0, pools.length).map((e, i) => e.status == 'success' ? toNumber(e.result, pools[i].decimals) : 0),
                result.splice(0, pools.length).map((e, i) => e.status == 'success' ? toNumber(e.result, pools[i].decimals) : 0),
                result.splice(0, pools.length).map((e, i) => e.status == 'success' ? toNumber(e.result, pools[i].decimals) : 0),
                ...(result.splice(0, 1).map((e) => e.status == 'success' ? toNumber(e.result) : 0))
            ]

            pools.forEach((e, i) => {
                e.tvl = totalStakedResult[i] ? totalStakedResult[i] : e.tvl
                e.depositedAmount = userStakedResult[i] ? userStakedResult[i] : e.depositedAmount
            })
        
            setPoolsState(pools.map((e, i) => {
                e.tvl = totalStakedResult[i] ? totalStakedResult[i] : e.tvl
                e.depositedAmount = userStakedResult[i] ? userStakedResult[i] : e.depositedAmount

                return e
            }))

            setAccountBalance(pools.map((e, i) => {
                return {
                    amount10: balanceOfResult[i],
                    allowanceAmount10: allowanceResult[i],
                    poolId: pools[i].tokenPoolID
                };
            }))

            setAccountNFT({
                balance: balanceOfNFT,
                ids: [],
                uri: ''
            })
            console.log('Updated data from chain', {
                totalStakedResult,
                userStakedResult,
                balanceOfResult,
                allowanceResult,
                balanceOfNFT
            })
            isRunning = false;
        }, 1)

        return () => clearInterval(id)
    }, [token, (account || {}).address])
}