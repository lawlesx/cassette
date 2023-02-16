import ConnectWallet from "@/components/ConnectWallet";
import CreateNft from "@/components/CreateNft";

const Page = () => {
  return (
    <div className="px-20 py-12">
      <ConnectWallet />
      <CreateNft />
      {/* <NftCreationDetails /> */}
    </div>
  )
};

export default Page;
