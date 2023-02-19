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
import { useAccount, useContractEvent, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { CassetteUnlockFactory__factory } from '@/contracts/abis/types'
import { useCallback, useRef, useState } from 'react'
import storeNft from '@/lib/nftStorage'
import { useMutation } from 'react-query'
import { SECONDS_PER_DAY } from '@/helpers/constants'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import Link from 'next/link'
import Copy from '../Copy'

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

  const { address: userAddress } = useAccount()

  const [isCreatingNft, setisCreatingNft] = useState(false)
  const param = useRef<`0x${string}`>(ethers.constants.AddressZero)
  const nftTokenUri = useRef<string>('')
  const nftImageUri = useRef<string>('')

  const {
    watch,
    formState: { isValid },
  } = methods

  const { config } = usePrepareContractWrite({
    address: contractAddress.cassetteUnlockFactory[80001],
    abi: CassetteUnlockFactory__factory.abi,
    functionName: 'deployLock',
    args: [userAddress as `0x${string}`, param.current, watch('name'), watch('symbol'), nftTokenUri.current],
  })
  const { data: executionData, isSuccess, write } = useContractWrite({
    ...config,
    onSuccess: () => toast('Creating NFT', {
      icon: '🔥',
    }),
    onError: () => toast.error('Something went wrong. Please try again later.'),
  })

  useContractEvent({
    address: contractAddress.cassetteUnlockFactory[80001],
    abi: CassetteUnlockFactory__factory.abi,
    eventName: 'LockDeployed',
    listener: async (lock, deployer, owner) => {
      console.log(lock, deployer, owner)
      const data = watch()
      const body = {
        nft_address: lock,
        mint_price: data.price,
        nft_quantity: data.quantity,
        nft_title: data.name,
        nft_image_uri: nftImageUri.current,
        nft_symbol: data.symbol,
        nft_owner_address: userAddress,
        nft_sold_count: 0,
      }
      const res = await axios.post('/api/createNft', body)
      if (!res.data.error) {
        setisCreatingNft(false)
        toast.success('NFT created successfully')
      }
      console.log(res.data)
    },
  })

  const onPrepareMetadata = useCallback(async () => {
    const data = watch()
    const validity =
      data.durationUnit === 'Day(s)'
        ? data.duration * SECONDS_PER_DAY
        : data.durationUnit === 'Month(s)'
          ? data.duration * 30 * SECONDS_PER_DAY
          : data.duration * 30 * 12 * SECONDS_PER_DAY
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

    const { nftTokenUri: _nftTokenUri, imageUri: _imageUri } = await storeNft({
      name: data.name,
      feeRecipient: '0x3D02B87ae906F1D6f130832f67E5c10C9f869205',
      count: data.quantity,
      //TODO: Change external link
      externalLink: `https://cassette/nft/${data.name}`,
      file: await fetch(data.image).then((res) => res.blob()),
      description: `Watch ${data.name} Exclusively on Cassette`,
    })
    nftTokenUri.current = `ipfs://${_nftTokenUri}/`
    nftImageUri.current = `ipfs://${_imageUri}`
  }, [watch])

  const { mutate: mutateMetadata, isLoading } = useMutation('upload-metadata', () =>
    toast.promise(onPrepareMetadata(), {
      loading: 'Uploading Metadata...',
      success: <b>Metadata Uploaded</b>,
      error: <b>Could Upload Metadata</b>,
    })
  )

  const onSubmit = (data: FormData) => {
    console.log('lol', data)
    setisCreatingNft(true)
    if (!write) {
      toast.error('Please prepare NFT metadata or Connect your wallet')
      return
    }
    write()
  }

  return (
    <FormProvider {...methods}>
      <form className="flex justify-between items-start w-full" onSubmit={methods.handleSubmit(onSubmit)}>
        <FormDetails />
        <div className="flex items-end flex-col gap-10">
          <UploadImage />
          {!write && (
            <Button disabled={!isValid || isLoading} onClick={() => mutateMetadata()}>
              {isLoading ? 'Uploading' : 'Prepare NFT metadata'}
            </Button>
          )}
          <Button disabled={!write} type="submit">
            {isSuccess ? (isCreatingNft ? 'Creating' : 'Created') : 'Create NFT'}
          </Button>
          {executionData && (
            <div className="flex items-center justify-end gap-2">
              <h1 className="highlight-pill w-max">Txn Hash</h1>
              <Link
                href={`https://mumbai.polygonscan.com/tx/${executionData.hash}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-secondary text-lg font-medium w-2/5 truncate"
              >
                {executionData.hash}
              </Link>
              <Copy text={executionData.hash} />
            </div>
          )}
        </div>
      </form>
    </FormProvider>
  )
}

export default NftCreation
