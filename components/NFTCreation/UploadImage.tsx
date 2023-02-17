import { FC } from "react"
import UploadIcon from "../Icons/UploadIcon"

const UploadImage: FC = () => {
  return (
    <div className="border-2 border-white bg-white bg-opacity-10 w-[27rem] h-[35rem] flex flex-col items-center justify-center gap-4">
      <UploadIcon className="w-24 h-24" />
      <h1 className="text-primary text-3xl font-bold">Upload Image</h1>
    </div>
  )
}

export default UploadImage