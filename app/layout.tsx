import './globals.css'
import RootWrap from '@/components/RootWrap'
import Navbar from '@/components/Navbar'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <RootWrap>
        <body className='bg-background flex flex-col'>
          <Navbar />
          {children}</body>
      </RootWrap>
    </html>
  )
}
