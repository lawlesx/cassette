'use client'
import { FC, ReactNode } from 'react'
import { createReactClient, LivepeerConfig, studioProvider } from '@livepeer/react'

const client = createReactClient({
  provider: studioProvider({ apiKey: process.env.NEXT_PUBLIC_LIVEPEER_STUDIO_API_KEY as string }),
})

const RootWrap: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <LivepeerConfig client={client}>
      {children}
    </LivepeerConfig>
  )
}

export default RootWrap
