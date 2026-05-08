'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSignup = async () => {
    setMessage('Signing up...')
    const { error } = await supabase.auth.signUp({ email, password })
    
    if (error) {
      setMessage('Error: ' + error.message)
    } else {
      setMessage('Success! Check your email.')
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Join COVENANT</h1>
      
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
          onClick={handleSignup}
          className="w-full py-3 bg-black text-white rounded font-bold"
        >
          Sign Up
        </button>
        
        {message && <p className="text-center text-sm mt-4">{message}</p>}
      </div>

      <Link href="/" className="mt-8 text-sm underline">Go Back Home</Link>
    </div>
  )
}
