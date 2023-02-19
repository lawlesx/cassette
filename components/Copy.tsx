'use client'
import useCopyToClipboard from '@/Hooks/useCopyToClipboard'
import { FC } from 'react'
import CopyIcon from './Icons/CopyIcon'

const Copy: FC<{ text: string }> = ({ text }) => {
  const [, copy] = useCopyToClipboard()
  return (
    <span onClick={() => copy(text)} className="cursor-pointer">
      <CopyIcon />
    </span>
  )
}

export default Copy
