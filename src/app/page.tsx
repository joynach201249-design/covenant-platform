import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">COVENANT</h1>
      <p className="text-xl text-muted-foreground">
        Healing Homes • Restoring Love
      </p>
      <Button className="mt-8">Get Started</Button>
    </div>
  )
}
