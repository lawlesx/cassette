'use client'
import { FC, ReactNode } from 'react'
import { createReactClient, LivepeerConfig, studioProvider } from '@livepeer/react'
import { WagmiConfig, createClient, configureChains } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { polygonMumbai, polygon } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from 'react-hot-toast';
import useIsClient from '@/Hooks/useIsClient'

const { provider, webSocketProvider } = configureChains(
  [polygon, polygonMumbai],
  [publicProvider()],
)

const wagmiClient = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
})

const livePeerClient = createReactClient({
  provider: studioProvider({ apiKey: process.env.NEXT_PUBLIC_LIVEPEER_STUDIO_API_KEY as string }),
})

const queryClient = new QueryClient()

const RootWrap: FC<{ children: ReactNode }> = ({ children }) => {
  const isClient = useIsClient()
  return (
    <WagmiConfig client={wagmiClient}>
      <LivepeerConfig client={livePeerClient}>
        <QueryClientProvider client={queryClient}>
          {children}
          <>{isClient && <Toaster />}</>
        </QueryClientProvider>
      </LivepeerConfig>
    </WagmiConfig>
  )
}

export default RootWrap
