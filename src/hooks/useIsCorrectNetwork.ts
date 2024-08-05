import { useAccount } from "wagmi"
import { wagmiConfig } from "../wagmi"

export function useIsCorrectNetwork() : {
    isCorrect: boolean
    currentNetworkId: number | undefined
    supportedNetworks: {
        id: number
        name: string
        icon: string
    }[]
} {
    const account = useAccount()
    const isCorrect = !!wagmiConfig.chains.find(e => e.id == account.chainId)

    return {
        isCorrect,
        currentNetworkId: account.chainId,
        supportedNetworks: wagmiConfig.chains.map(e => ({
            id: e.id,
            name: e.name,
            icon: ''
        }))
    }
}