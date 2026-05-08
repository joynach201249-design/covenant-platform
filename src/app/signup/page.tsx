import Link from "next/link"

export default function Signup() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Sign Up for COVENANT</h1>
      <p className="mb-8 text-muted-foreground">Coming soon! Database connection needed.</p>
      <Link href="/">
        <button className="px-6 py-3 bg-primary text-primary-foreground rounded-md">
          Go Back Home
        </button>
      </Link>
    </div>
  )
}
