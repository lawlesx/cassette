/* eslint-disable @next/next/no-img-element */
'use client'
import axios from 'axios'
import { FC } from 'react'
import { useQuery } from 'react-query'
import Button from '../Buttons/Button'
import { usePrepareContractWrite, useContractWrite, useAccount } from 'wagmi'
import { PublicLockV12 } from '@unlock-protocol/contracts'
import { ethers } from 'ethers'
import { parseEther } from 'ethers/lib/utils.js'

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
  const { address } = useAccount()
  const { data: nftData } = useQuery<{ data: FetchNFt; error: boolean }>(
    'fetch-nft',
    async () => {
      const res = await axios.get('/api/fetchNft', {
        params: { nft_address: nftAddress },
      })
      return res.data
    },
    {
      enabled: !!nftAddress,
      staleTime: 2000 * 60 * 5,
      cacheTime: 2000 * 60 * 5,
    }
  )

  console.log('NFT data', nftData)

  const image = !nftData?.error ? `https://ipfs.io/ipfs/${nftData?.data.nft_image_uri.slice(7)}` : ''

  if (nftData?.error)
    return (
      <h1 className="text-xl text-teal font-medium w-full text-center">
        NFT not listed on <span className="text-primary font-bold">Cassette</span>
      </h1>
    )

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
      {nftData && <BuyLogic nftAddress={nftAddress} nftPrice={nftData.data.mint_price} userAddress={address as `0x${string}`} />}
    </div>
  )
}

interface BuyLogicProps {
  nftAddress: string
  nftPrice: number
  userAddress: string
}

const BuyLogic: FC<BuyLogicProps> = ({ nftAddress, nftPrice, userAddress }) => {
  const { config, error } = usePrepareContractWrite({
    address: nftAddress as `0x${string}`,
    abi: PublicLockV12.abi,
    functionName: 'purchase',
    args: [[parseEther(String(nftPrice))], [userAddress], [userAddress], [ethers.constants.AddressZero], [ethers.constants.HashZero]],
  })

  const { data, write } = useContractWrite({
    ...config,
    onSuccess(data, variables, context) {
      console.log(data, variables, context)
    },
  })

  console.log('Buy logic', data, error);


  return <Button onClick={() => write?.()}>Buy NFT</Button>
}

export default BuyNft
