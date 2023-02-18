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
import { useCallback, useRef } from 'react'
import storeNft from '@/lib/nftStorage'
import { useMutation } from 'react-query'

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

  const param = useRef<`0x${string}`>(ethers.constants.AddressZero)
  const nftTokenUri = useRef<string>('')

  const {
    watch,
    formState: { isValid },
  } = methods

  const { config } = usePrepareContractWrite({
    address: contractAddress.cassetteUnlockFactory[80001],
    abi: CassetteUnlockFactory__factory.abi,
    functionName: 'deployLock',
    args: [
      '0x3D02B87ae906F1D6f130832f67E5c10C9f869205',
      param.current,
      watch('name'),
      watch('symbol'),
      nftTokenUri.current,
    ],
  })

  const { data, isSuccess, write } = useContractWrite(config)

  const onPrepareMetadata = useCallback(async () => {
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
    param.current = _params as `0x${string}`

    const { nftTokenUri: _nftTokenUri } = await storeNft({
      name: data.name,
      feeRecipient: '0x3D02B87ae906F1D6f130832f67E5c10C9f869205',
      count: data.quantity,
      //TODO: Change external link
      externalLink: `https://cassette/nft/${data.name}`,
      file: await fetch(data.image).then((res) => res.blob()),
      description: `Watch ${data.name} Exclusively on Cassette`,
    })
    nftTokenUri.current = `ipfs://${_nftTokenUri}/`
  }, [watch])

  const { mutate: mutateMetadata, isLoading } = useMutation('upload-metadata', onPrepareMetadata)

  const onSubmit = (data: FormData) => {
    console.log('lol', data)
    write?.()
  }

  console.log('Data', data)

  return (
    <FormProvider {...methods}>
      <form className="flex justify-between items-start w-full" onSubmit={methods.handleSubmit(onSubmit)}>
        <FormDetails />
        <div className="flex items-end flex-col gap-10">
          <UploadImage />
          {!write && <Button disabled={!isValid || isLoading} onClick={() => mutateMetadata()}>
            {isLoading ? 'Uploading' : 'Prepare NFT metadata'}
          </Button>}
          <Button disabled={!write} type="submit">{isSuccess ? 'Created' : 'Create NFT'}</Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default NftCreation
