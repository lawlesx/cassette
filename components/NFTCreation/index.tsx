import Button from "../Buttons/PrimaryButton"
import FormDetails from "./FormDetails"
import UploadImage from "./UploadImage"

const NftCreation = () => {
  return (
    <div className="flex justify-between items-start w-full">
      <FormDetails />
      <div className='flex items-end flex-col gap-10'>
        <UploadImage />
        <Button>Create NFT</Button>
      </div>
    </div>
  )
}

export default NftCreation