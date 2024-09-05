import { useRecoilState, useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from "recoil"
import { AccountBalancesState } from "../state/AccountBalancesState"
import { PoolsState } from "../state/PoolsState"
import { useEffect } from "react"
import { multicall } from "@wagmi/core";
import { wagmiConfig } from "../wagmi";
import { ERC20_CONTRACT_ABI, NFT_CONTRACT, NFT_CONTRACT_ABI, POOL_CONTRACT_ABI } from "../constants/contract"
import { AccountNFTState } from "../state/AccountNFTState"
import { AuthTokenState } from "../state/AuthTokenState";
import { useAccount, useClient } from "wagmi";
import { getPoolsRequest } from "../apis/getPools";
import { formatEther, formatUnits, zeroAddress } from "viem";
import { getBalance } from "viem/actions";


function toNumber(v: any, decimals: number = 0) {
    return parseFloat(formatUnits(v, decimals))
}

export function useInitAndUpdateStateInterval() {
    const token = useRecoilValue(AuthTokenState)
    const account = useAccount();
    const client = useClient()
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
            var ETHPool = pools.find(e => e.assetSymbol == 'ETH');
            (ETHPool as any).tokenAddress = zeroAddress // TODO: remove this line

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

            setAccountBalance([
                ...pools.map((e, i) => {
                    if (e.tokenAddress == zeroAddress) return null
                    return {
                        amount10: balanceOfResult[i],
                        allowanceAmount10: allowanceResult[i],
                        poolId: pools[i].tokenPoolID
                    };
                }),
                ETHPool ? {
                    amount10: parseFloat(formatEther(await getBalance(client as any, {
                        address: account.address as any
                    }))),
                    allowanceAmount10: 9999999999999999999,
                    poolId: ETHPool?.tokenPoolID
                } : null
            ].filter(e => !!e) as any)

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