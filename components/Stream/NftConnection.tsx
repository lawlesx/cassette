/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from 'next/link'
import Button from '../Buttons/Button'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FC } from 'react'
import { toast } from 'react-hot-toast'

const schema = yup.object({
  address: yup.string().required(),
})

type FormData = yup.InferType<typeof schema>

interface Props {
  streamKey: string
  streamName: string
  playbackId: string
}

const NftConnection: FC<Props> = ({ streamKey, streamName, playbackId }) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  // const router = useRouter()

  const onSubmit = async (data: FormData) => {
    toast('Creating stream...', { icon: '🔥' })
    console.log(data)
    // const body = {
    //   stream_key: streamKey,
    //   stream_name: streamName,
    //   stream_url: `${process.env.NEXT_PUBLIC_HOST}/${streamKey}`,
    //   streamer_wallet_address: address,
    //   streamer_user_name: address,
    //   nft_address: data.address,
    //   playback_id: playbackId,
    // }
    // const res = await axios.post('/api/createStream', body)
    // console.log(res.data)

    // if (!res.data.error) {
    //   router.push(`/stream/${streamKey}`)
    // } else {
    //   toast.error('Something went wrong. Please try again later.')
    // }
  }

  return (
    <form className="flex items-center justify-between w-full px-28" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2 w-full">
        <h1 className="text-primary text-lg font-medium">Paste NFT Smart contract address</h1>
        <input
          type="text"
          placeholder="E.g. mtRz4CRNfihYdWcb2gmAV3cYJve3VqdYAj"
          className="input w-[30rem]"
          {...register('address')}
        />
        <p className="text-lg text-secondary">
          {`Don't have an NFT yet?`}{' '}
          <Link href="/nft" target="_blank" rel="noopener noreferrer"
            className="text-primary">
            Create NFT
          </Link>
        </p>
      </div>
      <Button type='submit' disabled={!isValid}>Start Stream</Button>
    </form>
  )
}

export default NftConnection
