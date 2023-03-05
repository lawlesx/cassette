import LandingBanner from '@/components/LandingBanner'
import LiveCard from '@/components/Stream/LiveCard'

export default function Home() {
  return (
    <main className="w-full p-10">
      <div className="flex flex-col items-center px-10">
        <LandingBanner />
        <div className="flex justify-center gap-6 flex-wrap w-full py-10">
          {Array.from(Array(9).keys()).map(i => (<LiveCard key={i} />))}
        </div>
      </div>
    </main>
  )
}
