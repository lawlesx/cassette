'use client'
import Button from '../Buttons/Button'
import FormDetails from './FormDetails'
import UploadImage from './UploadImage'
import * as yup from 'yup'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { parseUnits } from 'ethers/lib/utils.js'
import { ethers } from 'ethers'
import { PublicLockV12 } from '@unlock-protocol/contracts'
import contractAddress from '@/utils/contract'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { CassetteUnlockFactory__factory } from '@/contracts/abis/types'
import { } from 'react'
import { useQuery } from 'react-query'

const schema = yup
  .object({
    name: yup.string().required(),
    symbol: yup.string().required(),
    price: yup.number().positive().required(),
    quantity: yup.number().positive().integer().required(),
    duration: yup.number().positive().integer().required(),
    image: yup.string().required(),
    durationUnit: yup.string().required(),
  })
  .required()

type FormData = yup.InferType<typeof schema>

const NftCreation = () => {
  const methods = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      durationUnit: 'Day(s)',
    },
  })

  const { watch, formState: { isValid } } = methods

  const { data: lockParams } = useQuery('lock-params', () => {
    const data = watch()
    const validity =
      data.durationUnit === 'Day(s)'
        ? data.duration
        : data.durationUnit === 'Month(s)'
          ? data.duration * 30
          : data.duration * 30 * 12
    const price = parseUnits(String(data.price), 'ether')
    const lockInterface = new ethers.utils.Interface(PublicLockV12.abi)
    const _params = lockInterface.encodeFunctionData('initialize(address,uint256,address,uint256,uint256,string)', [
      //* Should be factory address
      contractAddress.cassetteUnlockFactory[80001],
      validity,
      ethers.constants.AddressZero, // We use the base chain currency
      price,
      data.quantity,
      data.image,
    ])
    return _params as `0x${string}`
  }, {
    enabled: isValid,
  })

  const { config } = usePrepareContractWrite({
    address: contractAddress.cassetteUnlockFactory[80001],
    abi: CassetteUnlockFactory__factory.abi,
    functionName: 'deployLock',
    args: [
      '0x3D02B87ae906F1D6f130832f67E5c10C9f869205',
      lockParams as `0x${string}`,
      watch('name'),
      watch('symbol'),
      'ipfs://bafybeifrnutuq4zdrzg7zyxwxk2qhvmybyvz43tg3h7bequ5ywd6ippgsi/',
    ],
  })

  const { data, isSuccess, write } = useContractWrite(config)

  const onSubmit = (data: FormData) => {
    console.log('lol', data)
    write?.()
  }

  console.log('Data', data)

  return (
    <FormProvider {...methods}>
      <form
        className="flex justify-between items-start w-full"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <FormDetails />
        <div className="flex items-end flex-col gap-10">
          <UploadImage />
          <Button type="submit">{isSuccess ? 'Created' : 'Create NFT'}</Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default NftCreation
