'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = async () => {
    setMessage('Logging in...')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    
    if (error) {
      setMessage('Error: ' + error.message)
    } else {
      setMessage('Success! Redirecting...')
      window.location.href = '/'
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Login to COVENANT</h1>
      
      <div className="w-full max-w-sm space-y-4">
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded bg-background text-foreground"
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded bg-background text-foreground"
        />
        
        <button 
          onClick={handleLogin}
          className="w-full py-3 bg-black text-white rounded font-bold"
        >
          Login
        </button>
        
        {message && <p className="text-center text-sm mt-4">{message}</p>}
      </div>

      <Link href="/signup" className="mt-4 text-sm underline">
        Don't have an account? Sign Up
      </Link>
    </div>
  )
}
