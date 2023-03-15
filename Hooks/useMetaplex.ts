import { Metaplex, walletAdapterIdentity } from '@metaplex-foundation/js'
import { Connection, clusterApiUrl } from '@solana/web3.js'
import { useWallet } from '@solana/wallet-adapter-react'

const useMetaplex = () => {
  const connection = new Connection(clusterApiUrl('devnet'))

  const wallet = useWallet()
  return Metaplex.make(connection).use(walletAdapterIdentity(wallet))
}

export default useMetaplex
