'use client'
import { Dispatch, FC, SetStateAction } from 'react'
import { toast } from 'react-hot-toast'

const VerifyNft: FC<{ nftAddress: string, setIsVerified: Dispatch<SetStateAction<boolean>> }> = ({ nftAddress, setIsVerified }) => {
  const userAddress = '0x8c8b2b8c1b0f1f2f3c3c4c5c6c7c8c9c0c1c2c3c'
  const handleVerify = async () => {
    if (!userAddress) return toast.error('Connect wallet first')

    console.table({ nftAddress, userAddress })

    console.log('NFT holder Sample');
    if (true) {
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
