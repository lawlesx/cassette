import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="bg-black min-h-screen grid place-items-center">
      <h1 className='text-4xl text-red-400'>Cassette</h1>
    </main>
  )
}
