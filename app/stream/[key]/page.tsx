import axios from "axios";

const getStream = async (key: string) => {

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

  // console.log(key);

  return <div className="w-full h-screen">
    <h1 className="text-2xl font-bold text-primary">Stream</h1>
  </div>
};

export default Page;
