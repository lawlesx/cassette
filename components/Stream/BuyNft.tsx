/* eslint-disable @next/next/no-img-element */
'use client'
import axios from 'axios'
import { FC, useState } from 'react'
import { useQuery } from 'react-query'
import Button from '../Buttons/Button'

interface FetchNFt {
  mint_price: number
  nft_address: string
  nft_created_at: string
  nft_image_uri: string
  nft_owner_address: string
  nft_quantity: number
  nft_sold_count: number
  nft_symbol: string
  nft_title: string
}

const BuyNft: FC<{ nftAddress: string }> = ({ nftAddress }) => {

  const address = '0x8c8b2b8c1b0f1f2f3c3c4c5c6c7c8c9c0c1c2c3c'

  const { data: nftData } = useQuery<{ data: FetchNFt; error: boolean }>(
    ['fetch-nft', nftAddress],
    async () => {
      const res = await axios.get('/api/fetchNft', {
        params: { nft_address: nftAddress },
      })
      return res.data
    },
    {
      enabled: !!nftAddress,
    }
  )

  console.log('NFT data', nftData)

  if (nftData?.error || (!nftData?.data && !nftData?.error))
    return (
      <h1 className="text-xl text-teal font-medium w-full text-center">
        NFT not listed on <span className="text-primary font-bold">Cassette</span>
      </h1>
    )

  if (!nftData?.data) return <h1 className="text-xl text-teal font-medium w-full text-center">Loading...</h1>

  const image = !nftData?.error ? `https://ipfs.io/ipfs/${nftData?.data.nft_image_uri.slice(7)}` : ''

  return (
    <div className="w-full flex flex-col gap-4">
      {nftData && (
        <>
          <img src={image} alt={nftData.data.nft_title} className="w-full h-[25rem] object-cover" />
          <h1 className="text-lg text-teal font-medium">
            NFT name: <span className="text-secondary">{nftData.data.nft_title}</span>
          </h1>
          <h1 className="text-lg text-teal font-medium">
            NFT Price: <span className="text-secondary">{nftData.data.mint_price}</span>
          </h1>
        </>
      )}
      {nftData && (
        <BuyLogic nftAddress={nftAddress} nftPrice={nftData.data.mint_price} userAddress={address as `0x${string}`} />
      )}
    </div>
  )
}

interface BuyLogicProps {
  nftAddress: string
  nftPrice: number
  userAddress: string
}

const BuyLogic: FC<BuyLogicProps> = ({ nftAddress, nftPrice, userAddress }) => {
  const [isSuccess, setIsSuccess] = useState(false)

  console.table({ nftAddress, nftPrice, userAddress })

  return (
    <>
      {isSuccess ? (
        <h1 className="text-xl text-teal font-medium w-full text-center">NFT Bought! Click on Verify</h1>
      ) : (
        <Button onClick={() => setIsSuccess(true)}>Buy NFT</Button>
      )}
    </>
  )
}

export default BuyNft
