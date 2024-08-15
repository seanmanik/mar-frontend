import { http, createConfig } from 'wagmi'
import { sepolia, mainnet } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'

// console.log(sepolia)
sepolia.rpcUrls = {
  default: {
    http: ['https://sepolia.infura.io/v3/c867f71cca3449dfbbfa806e2fea931e' as any],
  },
};

export const wagmiConfig = createConfig({
  chains: [sepolia],
  connectors: [
    injected(),
    coinbaseWallet({ appName: 'Create Wagmi' }),
    walletConnect({ projectId: import.meta.env.VITE_WC_PROJECT_ID }),
  ],
  transports: {
    // [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})

// https://sepolia.infura.io/v3/