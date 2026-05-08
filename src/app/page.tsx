import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8 text-center flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">COVENANT</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Healing Homes • Restoring Love
      </p>
      <Link href="/signup">
        <button className="px-8 py-4 bg-black text-white rounded-lg text-lg font-semibold hover:bg-gray-800 transition">
          Get Started
        </button>
      </Link>
    </div>
  )
}
