/* eslint-disable @next/next/no-img-element */
'use client'
import { FC, useCallback } from "react"
import UploadIcon from "../Icons/UploadIcon"
import { useDropzone } from 'react-dropzone'
import { useFormContext } from "react-hook-form"

const UploadImage: FC = () => {
  const { setValue, watch } = useFormContext()
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const image = URL.createObjectURL(acceptedFiles[0])
    setValue('image', image, { shouldValidate: true })

    console.log('Accepted Files', image);
  }, [setValue])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  if (watch('image')) return (
    <div className="border-2 border-white bg-white bg-opacity-10 w-[27rem] h-[35rem] flex flex-col items-center justify-center gap-4">
      <img src={watch('image')} className="w-[27rem] h-[35rem] object-contain" alt="LOL" />
    </div>
  )

  return (
    <div className="border-2 border-white bg-white bg-opacity-10 w-[27rem] h-[35rem] flex flex-col items-center justify-center gap-4" {...getRootProps()}>
      <input {...getInputProps()} />
      <UploadIcon className="w-24 h-24" />
      <h1 className="text-primary text-3xl font-bold">{isDragActive ? 'Drop it here' : 'Upload Image'}</h1>
    </div>
  )
}

export default UploadImage