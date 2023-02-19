'use client'
import axios from 'axios'
import { FC } from 'react'
import { useAccount } from 'wagmi'

const VerifyNft: FC<{ nftAddress: string }> = ({ nftAddress }) => {
  const { address: userAddress } = useAccount()
  const handleVerify = async () => {
    console.log('verify');
    console.table({ nftAddress, userAddress })
    const { data } = await axios.get(`https://polygon-mumbai.g.alchemy.com/nft/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/isHolderOfCollection`, {
      params: { wallet: userAddress, contractAddress: '0xff17A492a74c12d3a62aD6A0F5B5873C93bcb7A7' },
      withCredentials: true
    })
    console.log('NFT holder', data);
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-primary text-lg font-medium">Verify your nft to get access to stream</p>
      <button onClick={handleVerify} className="bg-teal rounded-lg p-3 text-lg text-white active:bg-opacity-80">Verify</button>
    </div>
  )
}

export default VerifyNft
