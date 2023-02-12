import CreateNft from "@/components/CreateNft";

const Page = () => {
  return (
    <div className="p-10">
      <div className="flex flex-col gap-4 w-full bg-red-900 border-2 border-red-400 rounded-3xl">
        <CreateNft />
      </div>
    </div>
  )
};

export default Page;
