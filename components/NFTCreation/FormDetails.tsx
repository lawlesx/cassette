'use client'
import { FC, MouseEventHandler, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import CaretDownIcon from '../Icons/CaretDownIcon'

export enum DurationUnitOptions {
  Days = "Day(s)",
  Months = "Month(s)",
  Years = "Year(s)",
}

const FormDetails = () => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext()
  console.table(errors)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <div className="flex flex-col gap-12 w-[35rem]">
      <div className="flex flex-col gap-4">
        <FormTitle title="NFT Name" />
        <input className="input" placeholder="Mighty Ape" {...register('name')} />
      </div>
      <div className="flex flex-col gap-4">
        <FormTitle title="NFT Symbol" />
        <input className="input" placeholder="E.g. MGT" {...register('symbol')} />
      </div>
      <div className="flex flex-col gap-4">
        <FormTitle title="Price" />
        <div className="relative">
          <input className="input w-full" placeholder="E.g. 0.001" {...register('price')} />
          <p className="absolute top-0 right-0 text-primary h-full text-lg font-medium bg-white bg-opacity-[0.12] px-3 py-2 rounded-r-lg">
            MATIC
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <FormTitle title="NFT validity duration" />
        <div className="relative">
          <input className="input w-full" placeholder="E.g. 15" {...register('duration')} />
          <button
            type="button"
            onClick={() => {
              setIsDropdownOpen((prev) => !prev)
            }}
            className="absolute top-0 right-0 text-primary h-full text-lg font-medium bg-white bg-opacity-[0.12] text-right min-w-[6rem] px-3 py-2 rounded-r-lg flex justify-center items-center gap-2 cursor-pointer"
          >
            {isDropdownOpen ? <Dropdown items={Object.values(DurationUnitOptions)} setItem={(item) => setValue('durationUnit', item)} /> : <>{watch('durationUnit')} <CaretDownIcon /></>}
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <FormTitle title="Quantity" />
        <input className="input" placeholder="E.g. 1500" {...register('quantity')} />
      </div>
    </div>
  )
}

export default FormDetails

const FormTitle: FC<{ title: string }> = ({ title }) => {
  return <h1 className="text-primary text-lg font-medium">{title}</h1>
}

const Dropdown: FC<{ items: string[], setItem: (item: string) => void }> = ({ items, setItem }) => {
  return (
    <div className="absolute top-0 right-0 w-full bg-white bg-opacity-10 backdrop-blur-lg rounded-b-md rounded-tr-md">
      <div className="flex flex-col">
        {items.map((item, i) => (<DropdownItem title={item} key={i} onClick={() => setItem(item)} />))}
      </div>
    </div>
  )
}

const DropdownItem: FC<{ title: string, onClick: MouseEventHandler }> = ({ title, onClick }) => {
  return <button onClick={onClick} className="text-primary text-lg text-center font-medium hover:backdrop-hue-rotate-90 px-4 py-2">{title}</button>
}
