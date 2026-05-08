'use client'

import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'

export default function Dashboard() {
  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
      <p className="text-xl mb-8">You are securely logged into COVENANT.</p>
      
      <button 
        onClick={handleLogout}
        className="px-8 py-3 bg-red-600 text-white rounded-lg font-bold mb-4"
      >
        Logout
      </button>
      
      <Link href="/" className="underline text-muted-foreground">Go Home</Link>
    </div>
  )
}
