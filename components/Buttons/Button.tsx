import { FC, MouseEventHandler, PropsWithChildren } from 'react'

const Button: FC<PropsWithChildren<{ onClick?: MouseEventHandler, type?: "submit" | "reset" | "button" }>> = ({ onClick, children, type = 'button' }) => {
  return (
    <div className='relative'>
      <button
        type={type}
        className="bg-vibrant rounded-md p-4 text-3xl text-white font-bold tracking-wide relative w-[20rem] z-[1]"
        onClick={onClick}
      >
        <div className="absolute top-0 left-0 w-full flex justify-center">
          <div className="h-[2px] bg-white bg-opacity-40 rounded-full w-[94%]" />
        </div>
        {children}
      </button>
      <div className="w-full h-[0.8rem] bg-[#960086] absolute -bottom-3 left-0 rounded-b-md z-0">
        <div className="w-full h-[0.3rem] bg-background absolute top-0 left-0 rounded-b-md" />
      </div>
    </div>
  )
}

export default Button
