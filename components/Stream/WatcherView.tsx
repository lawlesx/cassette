'use client'
import { StreamProps } from '@/app/stream/[key]/page'
import { FC, useState } from 'react'
import Copy from '../Copy'
import BuyNft from './BuyNft'
import Preview from './Preview'
import VerifyNft from './VerifyNft'

interface Props {
  stream: StreamProps
}

const WatcherView: FC<Props> = ({ stream }) => {
  const { stream_key, stream_name, streamer_user_name, nft_address, playback_id } = stream
  const [isVerified, setIsVerified] = useState(false)

  return (
    <>
      {isVerified ? (
        <Preview streamKey={stream_key} streamName={stream_name} playbackId={playback_id} />
      ) : (
        <div className="border border-teal w-[70%]">
          <div className="w-full h-[35rem] flex items-center justify-center">
            <h1 className="text-4xl text-secondary tracking-wider">Verification Pending</h1>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-4 w-[30%] px-10">
        <div className="flex flex-col gap-2">
          <h1 className="highlight-pill w-min">Name</h1>
          <p className="text-secondary text-lg font-medium">{stream_name ?? 'Name not found'}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="highlight-pill w-min">Username</h1>
          <p className="text-secondary text-lg font-medium w-3/4 truncate">
            {streamer_user_name ?? 'Username not found'}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="highlight-pill w-max">NFT Address</h1>
          <div className="flex items-center gap-2">
            <p className="text-secondary text-lg font-medium w-3/4 truncate">{nft_address}</p>{' '}
            <Copy text={nft_address} />
          </div>
        </div>
        <div className="w-full h-1 rounded-full bg-vibrant my-4" />
        <VerifyNft nftAddress={nft_address} setIsVerified={setIsVerified} />
        <p className="text-xl font-bold w-full text-center text-sky-400">OR</p>
        <BuyNft nftAddress={nft_address} />
      </div>
    </>
  )
}

export default WatcherView
