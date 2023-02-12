'use client'
import useIsClient from '@/Hooks/useIsClient'
import { useAccount, useConnect, useDisconnect, useEnsName } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

const ConnectWallet = () => {
  const { address, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  const isClient = useIsClient()

  if (!isClient)
    return (
      <div className="bg-red-900 rounded-3xl p-10 flex gap-4 items-center">
        <button onClick={() => connect()} className="bg-red-400 rounded-xl p-4 text-lg text-white font-medium">
          Connect Wallet
        </button>
      </div>
    )

  return (
    <div className="bg-red-900 rounded-3xl p-10 flex gap-4 items-center">
      {!isConnected ? (
        <button onClick={() => connect()} className="bg-red-400 rounded-xl p-4 text-lg text-white font-medium">
          Connect Wallet
        </button>
      ) : (
        <h1 className="text-lg text-red-400">Connected to {ensName ?? address}</h1>
      )}
      <button onClick={() => disconnect()} className="bg-red-400 rounded-xl p-4 text-lg text-white font-medium">
        Disconnect
      </button>
    </div>
  )
}

export default ConnectWallet
