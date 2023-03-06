import './globals.css'
import RootWrap from '@/components/RootWrap'
import Navbar from '@/components/Navbar'
import localFont from '@next/font/local'

const gopher = localFont({
  src: [
    {
      path: '../public/Fonts/Gopher-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/Fonts/Gopher-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/Fonts/Gopher-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/Fonts/Gopher-Heavy.otf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../public/Fonts/Gopher-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/Fonts/Gopher-Thin.otf',
      weight: '100',
      style: 'normal',
    },
  ],
  variable: '--font-gopher',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${gopher.variable} bg-background`}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <RootWrap>
        <body className='flex flex-col relative'>
          <Navbar />
          {children}</body>
      </RootWrap>
    </html>
  )
}
