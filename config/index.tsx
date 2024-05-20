
// config/index.tsx

import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { http } from '@wagmi/core'

import { cookieStorage, createStorage } from 'wagmi'
import { mainnet, sepolia, avalancheFuji, avalanche, polygon, polygonAmoy, polygonZkEvmTestnet, polygonZkEvm} from 'viem/chains'

// Your WalletConnect Cloud project ID
export const projectId = '10ade354f8ba8a839ea7d853776c6a0d'

// Create a metadata object
const metadata = {
  name: 'Marketplace',
  description: 'Buy & Sell cross chain with your crypto',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Create wagmiConfig
const chains = [mainnet, sepolia, avalancheFuji, avalanche, polygon, polygonAmoy, polygonZkEvmTestnet, polygonZkEvm] as const
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [avalancheFuji.id]: http(),
    [avalanche.id]: http(),
    [polygon.id]: http(),
    [polygonAmoy.id]: http(),
    [polygonZkEvmTestnet.id]: http(),
    [polygonZkEvm.id]: http(),
  },
})