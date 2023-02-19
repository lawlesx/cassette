'use client'
import axios from "axios";
import { FC } from "react";
import { useQuery } from "react-query";
import Button from "../Buttons/Button";

const BuyNft: FC<{ nftAddress: string }> = ({ nftAddress }) => {
  const { data } = useQuery('fetch-nft', async () => {
    const res = await axios.get('/api/fetchNft', {
      params: { nft_address: nftAddress }
    })
    return res.data
  }, {
    enabled: !!nftAddress,
    staleTime: 2000 * 60 * 5,
    cacheTime: 2000 * 60 * 5,
  })

  console.log('NFT data', data);


  return (
    <div className="w-full flex flex-col gap-4">
      <Button>Buy NFT</Button>
    </div>
  )
};

export default BuyNft;
