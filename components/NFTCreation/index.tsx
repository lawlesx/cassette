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
import { toast } from 'react-hot-toast'
import Copy from '../Copy'
import useMetaplex from '@/Hooks/useMetaplex'
import { useWallet } from '@solana/wallet-adapter-react'
import axios from 'axios'
import { toBigNumber } from '@metaplex-foundation/js'

const schema = yup
  .object({
    name: yup.string().required(),
    symbol: yup.string().required(),
    price: yup.number().positive().required(),
    quantity: yup.number().positive().integer().required(),
    // duration: yup.number().positive().integer().required(),
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

  const { publicKey } = useWallet()
  const userAddress = publicKey?.toString()

  const metaplex = useMetaplex()

  const [nftAddress, setNftAddress] = useState<string>()
  // const param = useRef<`0x${string}`>('0x')
  const nftTokenUri = useRef<string>('')
  const nftImageUri = useRef<string>('')

  const {
    watch,
    formState: { isValid },
  } = methods

  const onPrepareMetadata = useCallback(async () => {
    const data = watch()
    // const validity =
    //   data.durationUnit === 'Day(s)'
    //     ? data.duration * SECONDS_PER_DAY
    //     : data.durationUnit === 'Month(s)'
    //       ? data.duration * 30 * SECONDS_PER_DAY
    //       : data.duration * 30 * 12 * SECONDS_PER_DAY

    const { nftTokenUri: _nftTokenUri, imageUri: _imageUri } = await storeNft({
      name: data.name,
      count: data.quantity,
      //TODO: Change external link
      externalLink: `https://cassette-phi.vercel.app/nft`,
      file: await fetch(data.image).then((res) => res.blob()),
      description: `Watch ${data.name} Exclusively on Cassette`,
    })
    nftTokenUri.current = `https://ipfs.io/ipfs/${_nftTokenUri}`
    nftImageUri.current = `https://ipfs.io/ipfs/${_imageUri}`
  }, [watch])

  const { mutate: createNft, isLoading, isSuccess } = useMutation('create-nft', () =>
    toast.promise(onPrepareMetadata(), {
      loading: 'Uploading Metadata...',
      success: <b>Metadata Uploaded</b>,
      error: <b>Could Upload Metadata</b>,
    }),
    {
      onSuccess: async () => {
        const data = watch()
        console.log('lol', data)
        const uri = nftTokenUri.current.replace("ipfs://", "https://ipfs.io/ipfs/")
        console.log(uri);

        const mintObject = await toast.promise(metaplex.nfts().create({
          name: data.name,
          sellerFeeBasisPoints: 1000,
          symbol: data.symbol,
          uri,
          maxSupply: toBigNumber(data.quantity),
        }), {
          loading: 'Creating NFT...',
          success: <b>NFT Created</b>,
          error: <b>Could not create NFT</b>,
        })

        const body = {
          nft_address: mintObject.mintAddress?.toString(),
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
          toast.success('NFT created successfully')
          setNftAddress(mintObject.mintAddress?.toString())
        }
        console.log(res.data)
      }
    }
  )

  const onSubmit = async () => {
    createNft()
  }

  return (
    <FormProvider {...methods}>
      {!nftAddress ? (
        <form className="flex justify-between items-start w-full" onSubmit={methods.handleSubmit(onSubmit)}>
          <FormDetails />
          <div className="flex items-end flex-col gap-10">
            <UploadImage />
            {/* {true && (
              <Button disabled={!isValid || isLoading} onClick={() => mutateMetadata()}>
                {isLoading ? 'Uploading' : 'Prepare NFT metadata'}
              </Button>
            )} */}
            <Button type="submit" disabled={!isValid || isLoading || isSuccess}>
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
        <div className='flex items-center justify-center gap-2'>
          <h1 className="text-xl text-teal font-medium max-w-max truncate text-center">NFT Address: {nftAddress}</h1>
          <Copy text={nftAddress as string} />
        </div>
      )}
    </FormProvider>
  )
}

export default NftCreation
