import { FC, MouseEventHandler, PropsWithChildren } from 'react'

const Button: FC<
  PropsWithChildren<{ onClick?: MouseEventHandler; type?: 'submit' | 'reset' | 'button'; disabled?: boolean }>
> = ({ onClick, children, type = 'button', disabled }) => {
  return (
    <div className="relative min-w-[20rem]">
      <button
        type={type}
        className={`rounded-md p-4 text-3xl text-white font-bold tracking-wide relative w-full z-[1] ${disabled ? 'cursor-not-allowed bg-secondary' : 'cursor-pointer bg-vibrant'
          }`}
        onClick={onClick}
      >
        <div className="absolute top-0 left-0 w-full flex justify-center">
          <div className="h-[2px] bg-white bg-opacity-40 rounded-full w-[94%]" />
        </div>
        {children}
      </button>
      <div className={`w-full h-[0.8rem] absolute -bottom-3 left-0 rounded-b-md z-0 ${disabled ? 'bg-secondary' : 'bg-[#960086]'
        }`}>
        <div className="w-full h-[0.3rem] bg-background absolute top-0 left-0 rounded-b-md" />
      </div>
    </div>
  )
}

export default Button
