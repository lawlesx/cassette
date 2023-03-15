'use client'
import useMetaplex from '@/Hooks/useMetaplex'
import { useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { Dispatch, FC, SetStateAction } from 'react'
import { toast } from 'react-hot-toast'

const VerifyNft: FC<{ nftAddress: string, setIsVerified: Dispatch<SetStateAction<boolean>> }> = ({ nftAddress, setIsVerified }) => {
  const metaplex = useMetaplex()
  const { publicKey } = useWallet()
  const userAddress = publicKey?.toString()


  const handleVerify = async () => {
    if (!userAddress) return toast.error('Connect wallet first')
    const nftPublicKey = new PublicKey(nftAddress)

    console.table({ nftAddress, userAddress })
    const nft = await metaplex.nfts().findByMint({ mintAddress: nftPublicKey })

    if (nft.creators[0]?.address.toString() === publicKey?.toString()) {
      console.log('Verified')
      toast.success('NFT detected in wallet')
      setIsVerified(true)
    }
    else {
      console.log('Not verified')
      toast.error('NFT not detected in wallet')
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-primary text-lg font-medium">Verify your nft to get access to stream</p>
      <button onClick={handleVerify} className="bg-teal rounded-lg p-3 text-lg text-white active:bg-opacity-80">Verify</button>
    </div>
  )
}

export default VerifyNft
