import Link from 'next/link'
import Button from '../Buttons/Button'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object({
  address: yup.string().required(),
})

type FormData = yup.InferType<typeof schema>

const NftConnection = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
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
