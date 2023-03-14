'use client'
import useIsClient from '@/Hooks/useIsClient'
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import axios from 'axios';
import { useQuery } from 'react-query';

const ConnectWallet = () => {
  const isClient = useIsClient()
  const { connected, publicKey } = useWallet()

  useQuery('connecting', () => {
    if (!publicKey || !connected) {
      throw new Error('No public key or not connected')
    }
    const address = publicKey.toString()
    const body = {
      wallet_addresss: address,
      name: address,
      user_name: address,
    }
    console.log('body', body);

    try {
      axios.post('/api/createUser', body).then((res) => {
        console.log(res.data);
      })
    } catch (error) {
      console.log('Error Connecting', error);
    }
  }, {
    enabled: Boolean(connected && publicKey),
  })

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
