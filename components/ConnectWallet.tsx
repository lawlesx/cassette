'use client'
import { useAccount, useConnect, useEnsName } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

const ConnectWallet = () => {
  const { address, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  return (
    <div className="bg-red-900 rounded-3xl p-10">
      {isConnected ? (
        <h1 className="text-lg text-red-400">Connected to {ensName ?? address}</h1>
      ) : (
        <button onClick={() => connect()} className="bg-red-400 rounded-xl p-4 text-lg text-white font-medium">Connect Wallet</button>
      )}
    </div>
  )
}

export default ConnectWallet
