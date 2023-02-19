import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full p-10">
      <Link href="/stream" className="bg-red-400 rounded-xl p-4 text-lg text-white font-medium">Create Stream</Link>
    </main>
  )
}
