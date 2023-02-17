'use client'

import ConnectWallet from "./Buttons/ConnectWallet"

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-white bg-opacity-[0.07] backdrop-blur-xl px-20 py-6 rounded-2xl">
      <h1 className="text-4xl font-bold text-primary">Cassette</h1>
      <ConnectWallet />
    </nav>
  )
}

export default Navbar
