'use client'
import axios from 'axios'
import { Dispatch, FC, SetStateAction } from 'react'
import { toast } from 'react-hot-toast'
import { useAccount } from 'wagmi'

const VerifyNft: FC<{ nftAddress: string, setIsVerified: Dispatch<SetStateAction<boolean>> }> = ({ nftAddress, setIsVerified }) => {
  const { address: userAddress } = useAccount()
  const handleVerify = async () => {
    if (!userAddress) return toast.error('Connect wallet first')

    console.table({ nftAddress, userAddress })
    const { data } = await axios.get<{ isHolderOfCollection: boolean }>(`https://polygon-mumbai.g.alchemy.com/nft/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/isHolderOfCollection`, {
      params: { wallet: userAddress, contractAddress: nftAddress },
      withCredentials: true
    })
    console.log('NFT holder', data);
    if (data.isHolderOfCollection) {
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
