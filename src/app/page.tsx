import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8 text-center flex flex-col items-center justify-center space-y-6">
      <h1 className="text-4xl font-bold">COVENANT</h1>
      <p className="text-xl text-muted-foreground">
        Healing Homes • Restoring Love
      </p>
      
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Link href="/signup" className="w-full">
          <button className="w-full py-3 bg-black text-white rounded-lg font-semibold">
            Get Started
          </button>
        </Link>
        <Link href="/login" className="w-full">
          <button className="w-full py-3 border border-black rounded-lg font-semibold">
            Login
          </button>
        </Link>
      </div>
    </div>
  )
}
