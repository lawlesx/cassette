'use client'
import useIsClient from '@/Hooks/useIsClient'
import axios from 'axios'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

const ConnectWallet = () => {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
    onSuccess: async (data) => {
      console.log('success', data)
      const body = {
        wallet_addresss: data.account,
        name: data.account,
        user_name: data.account,
      }
      try {
        axios.post('/api/createUser', body).then((res) => {
          console.log(res.data);
        })
      } catch (error) {
        console.log(error)
      }
    },
  })
  const { disconnect } = useDisconnect()

  const isClient = useIsClient()

  if (!isClient)
    return (
      <button onClick={() => connect()} className="bg-red-400 rounded-xl p-4 text-lg text-white font-medium">
        Connect Wallet
      </button>
    )

  return (
    <div className="flex gap-4 items-center">
      {!isConnected ? (
        <button onClick={() => connect()} className="bg-red-400 rounded-xl p-4 text-lg text-white font-medium">
          Connect Wallet
        </button>
      ) : (
        <h1 className="text-lg w-40 truncate text-red-400">{address}</h1>
      )}
      {isConnected && (
        <button onClick={() => disconnect()} className="bg-red-400 rounded-xl p-4 text-lg text-white font-medium">
          Disconnect
        </button>
      )}
    </div>
  )
}

export default ConnectWallet
