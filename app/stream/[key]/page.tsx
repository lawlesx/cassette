import CopyIcon from '@/components/Icons/CopyIcon'
import axios from 'axios'

interface Stream {
  stream_key: string
  stream_name: string
  stream_url: string
  streamer_wallet_address: string
  streamer_user_name: string
  nft_address: string
  playback_id: string
}

const getStream = async (key: string): Promise<Stream> => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/fetchStream`, {
    params: {
      stream_key: key,
    },
  })
  return res.data.data
}

const Page = async ({ params }: { params: { key: string } }) => {
  const { key } = params
  const stream = await getStream(key)
  console.log('Stream', stream)

  return (
    <div className="w-full p-8 flex gap-4 items-start justify-between min-h-screen">
      <div className="border border-teal w-[70%]">
        <div className="w-full h-[35rem]"></div>
      </div>
      <div className="flex flex-col gap-4 w-[30%] px-10">
        <div className="flex flex-col gap-2">
          <h1 className="highlight-pill w-min">Name</h1>
          <p className="text-primary text-lg font-medium">{stream.stream_name ?? 'Name not found'}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="highlight-pill w-min">Username</h1>
          <p className="text-primary text-lg font-medium">{stream.streamer_user_name ?? 'Username not found'}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="highlight-pill w-max">NFT Address</h1>
          <div className="flex items-center gap-2">
            <p className="text-primary text-lg font-medium w-3/4 truncate">{stream.nft_address}</p> <CopyIcon />
          </div>
        </div>
      </div>
      {/* <Preview streamKey={stream.stream_key} streamName={stream.stream_name} playbackId={stream.playback_id} /> */}
    </div>
  )
}

export default Page
