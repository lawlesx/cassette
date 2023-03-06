/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import Button from '../Buttons/Button'
import FormDetails from './FormDetails'
import UploadImage from './UploadImage'
import * as yup from 'yup'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useRef, useState } from 'react'
import storeNft from '@/lib/nftStorage'
import { useMutation } from 'react-query'
import { SECONDS_PER_DAY } from '@/helpers/constants'
import { toast } from 'react-hot-toast'

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


  const [nftAddress, setNftAddress] = useState<string>()
  const [isCreatingNft, setisCreatingNft] = useState(false)
  const param = useRef<`0x${string}`>('0x')
  const nftTokenUri = useRef<string>('')
  const nftImageUri = useRef<string>('')

  const {
    watch,
    formState: { isValid },
  } = methods

  const onPrepareMetadata = useCallback(async () => {
    const data = watch()
    const validity =
      data.durationUnit === 'Day(s)'
        ? data.duration * SECONDS_PER_DAY
        : data.durationUnit === 'Month(s)'
          ? data.duration * 30 * SECONDS_PER_DAY
          : data.duration * 30 * 12 * SECONDS_PER_DAY

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
    // if (!write) {
    //   toast.error('Please prepare NFT metadata or Connect your wallet')
    //   return
    // }
  }

  return (
    <FormProvider {...methods}>
      {!nftAddress ? (
        <form className="flex justify-between items-start w-full" onSubmit={methods.handleSubmit(onSubmit)}>
          <FormDetails />
          <div className="flex items-end flex-col gap-10">
            <UploadImage />
            {false && (
              <Button disabled={!isValid || isLoading} onClick={() => mutateMetadata()}>
                {isLoading ? 'Uploading' : 'Prepare NFT metadata'}
              </Button>
            )}
            <Button type="submit">
              {/* {isSuccess ? (isCreatingNft ? 'Creating' : 'Created') : 'Create NFT'} */}
              Create NFT
            </Button>
            {/* {executionData && (
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
            )} */}
          </div>
        </form>
      ) : (
        <h1 className="text-xl text-teal font-medium w-full text-center">NFT Address: {nftAddress}</h1>
      )}
    </FormProvider>
  )
}

export default NftCreation
