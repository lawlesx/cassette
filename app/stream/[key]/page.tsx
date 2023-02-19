import WatcherView from '@/components/Stream/WatcherView'
import { supabase } from '@/lib/supabaseClient'

export interface StreamProps {
  stream_key: string
  stream_name: string
  stream_url: string
  streamer_wallet_address: string
  streamer_user_name: string
  nft_address: string
  playback_id: string
}

const getStream = async (key: string): Promise<StreamProps> => {
  const { data } = await supabase.from('tbl_stream').select().eq('stream_key', key)
  return data?.[0]
}

const Page = async ({ params }: { params: { key: string } }) => {
  const { key } = params
  const stream = await getStream(key)
  console.log('Stream', stream)

  if (!stream) return (
    <div className='w-full flex items-center justify-center h-40'>
      <h1 className='text-4xl text-primary text-center'>Stream not found</h1>
    </div>
  )

  return (
    <div className="w-full p-8 flex gap-4 items-start justify-between">
      <WatcherView stream={stream} />
    </div>
  )
}

export default Page
