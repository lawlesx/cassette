'use client'
import useIsClient from '@/Hooks/useIsClient'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const ConnectWallet = () => {
  const isClient = useIsClient()

  if (!isClient)
    return (
      <button className="p-4 text-lg text-white font-medium">
        Loading
      </button>
    )

  return (
    <div className="flex gap-4 items-center">
      <WalletMultiButton />
      {/* {true ? (
        <button onClick={connect} className="bg-red-400 rounded-xl p-4 text-lg text-white font-medium">
          Connect Wallet
        </button>
      ) : (
        <h1 className="text-lg w-40 truncate text-red-400">Address</h1>
      )} */}
      {/* {isConnected && (
        <button onClick={() => disconnect()} className="bg-red-400 rounded-xl p-4 text-lg text-white font-medium">
          Disconnect
        </button>
      )} */}
    </div>
  )
}

export default ConnectWallet
