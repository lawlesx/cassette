'use client'

import Link from 'next/link'
import ConnectWallet from './Buttons/ConnectWallet'

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-white bg-opacity-[0.07] backdrop-blur-xl px-20 py-4 rounded-b-2xl">
      <Link href="/" className="text-4xl font-bold text-primary">
        Cassette
      </Link>
      <div className='flex items-center gap-8'>
        <Link href="/stream" className="bg-red-400 rounded-xl p-4 text-lg text-white font-medium">
          Create Stream
        </Link>
        <ConnectWallet />
      </div>
    </nav>
  )
}

export default Navbar
