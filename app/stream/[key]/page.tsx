import axios from "axios";

interface Stream {
  stream_key: string;
  stream_name: string;
  stream_url: string;
  streamer_wallet_address: string;
  streamer_user_name: string;
  nft_address: string;
  playback_id: string;
}

const getStream = async (key: string): Promise<Stream> => {

  const res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/fetchStream`, {
    params: {
      stream_key: key,
    },
    withCredentials: true,
  });
  return res.data;

}

const Page = async ({ params }: { params: { key: string } }) => {
  const { key } = params;
  const stream = await getStream(key);
  console.log('Stream', stream);


  return <div className="w-full min-h-screen">
    <div></div>
  </div>
};

export default Page;
