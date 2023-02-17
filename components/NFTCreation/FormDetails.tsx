'use client'
import { FC } from 'react'
import { useFormContext } from 'react-hook-form'
import CaretDownIcon from '../Icons/CaretDownIcon'

const FormDetails = () => {
  const { register, formState: { errors } } = useFormContext()
  console.log(errors)

  return (
    <div className="flex flex-col gap-12 w-[35rem]">
      <div className="flex flex-col gap-4">
        <FormTitle title="NFT Name" />
        <input className="input" placeholder="Mighty Ape" {...register("name")} />
      </div>
      <div className="flex flex-col gap-4">
        <FormTitle title="NFT Symbol" />
        <input className="input" placeholder="E.g. MGT" {...register("symbol")} />
      </div>
      <div className="flex flex-col gap-4">
        <FormTitle title="Price" />
        <div className="relative">
          <input className="input w-full" placeholder="E.g. 0.001" {...register("price")} />
          <p className="absolute top-0 right-0 text-primary h-full text-lg font-medium bg-white bg-opacity-[0.12] px-3 py-2 rounded-r-lg">
            MATIC
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <FormTitle title="Quantity" />
        <input className="input" placeholder="E.g. 1500" {...register("quantity")} />
      </div>
      <div className="flex flex-col gap-4">
        <FormTitle title="NFT validity duration" />
        <div className="relative">
          <input className="input w-full" placeholder="E.g. 15" {...register("duration")} />
          <div className="absolute top-0 right-0 text-primary h-full text-lg font-medium bg-white bg-opacity-[0.12] text-right px-3 py-2 rounded-r-lg flex items-center gap-2 cursor-pointer">
            Days <CaretDownIcon />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormDetails

const FormTitle: FC<{ title: string }> = ({ title }) => {
  return <h1 className="text-primary text-lg font-medium">{title}</h1>
}
