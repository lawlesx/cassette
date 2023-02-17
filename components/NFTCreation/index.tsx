'use client'
import Button from '../Buttons/Button'
import FormDetails from './FormDetails'
import UploadImage from './UploadImage'
import * as yup from 'yup'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object({
  name: yup.string().required(),
  symbol: yup.string().required(),
  price: yup.number().positive().required(),
  quantity: yup.number().positive().integer().required(),
  duration: yup.number().positive().integer().required(),
  image: yup.string().required(),
}).required()

type FormData = yup.InferType<typeof schema>

const NftCreation = () => {
  const methods = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    console.table(data)
  }


  return (
    <FormProvider {...methods}>
      <form className="flex justify-between items-start w-full" onSubmit={methods.handleSubmit(onSubmit)}>
        <FormDetails />
        <div className="flex items-end flex-col gap-10">
          <UploadImage />
          <Button type='submit'>Create NFT</Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default NftCreation
