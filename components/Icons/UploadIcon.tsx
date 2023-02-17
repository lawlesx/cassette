import { FC } from 'react'

const UploadIcon: FC<{ className: string }> = ({ className }) => {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21.5 20.5L32 10L42.5 20.5"
        stroke="#F2F0FF"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M32 38V10" stroke="#F2F0FF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M54 38V52C54 52.5304 53.7893 53.0391 53.4142 53.4142C53.0391 53.7893 52.5304 54 52 54H12C11.4696 54 10.9609 53.7893 10.5858 53.4142C10.2107 53.0391 10 52.5304 10 52V38"
        stroke="#F2F0FF"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default UploadIcon
