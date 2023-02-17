import { FC } from 'react'
import Button from './Buttons/PrimaryButton'
import CaretDownIcon from './Icons/CaretDownIcon'
import UploadIcon from './Icons/UploadIcon'

const NftCreationDetails = () => {
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

export default NftCreationDetails

const FormDetails = () => {
  return (
    <div className="flex flex-col gap-12 w-[30rem]">
      <div className="flex flex-col gap-4">
        <FormTitle title="NFT Name" />
        <input className="input" placeholder="Mighty Ape" />
      </div>
      <div className="flex flex-col gap-4">
        <FormTitle title="NFT Symbol" />
        <input className="input" placeholder="E.g. MGT" />
      </div>
      <div className="flex flex-col gap-4">
        <FormTitle title="Price" />
        <div className="relative">
          <input className="input w-full" placeholder="E.g. 0.001" />
          <p className="absolute top-0 right-0 text-primary h-full text-lg font-medium bg-white bg-opacity-[0.12] px-3 py-2 rounded-r-lg">
            MATIC
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <FormTitle title="Quantity" />
        <input className="input" placeholder="E.g. 1500" />
      </div>
      <div className="flex flex-col gap-4">
        <FormTitle title="NFT validity duration" />
        <div className="relative">
          <input className="input w-full" placeholder="E.g. 15" />
          <div className="absolute top-0 right-0 text-primary h-full text-lg font-medium bg-white bg-opacity-[0.12] text-right px-3 py-2 rounded-r-lg flex items-center gap-2 cursor-pointer">
            Days <CaretDownIcon />
          </div>
        </div>
      </div>
    </div>
  )
}

const UploadImage: FC = () => {
  return (
    <div className="border-2 border-white bg-white bg-opacity-10 w-[27rem] h-[35rem] flex flex-col items-center justify-center gap-4">
      <UploadIcon className="w-24 h-24" />
      <h1 className="text-primary text-3xl font-bold">Upload Image</h1>
    </div>
  )
}

const FormTitle: FC<{ title: string }> = ({ title }) => {
  return <h1 className="text-primary text-lg font-medium">{title}</h1>
}
