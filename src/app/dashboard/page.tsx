'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [fullName, setFullName] = useState('')
  const [familyName, setFamilyName] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    const getData = async () => {
      const {  { session } } = await supabase.auth.getSession()
      if (!session) return

      setUser(session.user)
      
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()

      if (data) {
        setFullName(data.full_name || '')
        setFamilyName(data.family_name || '')
        setPhone(data.phone || '')
      }
      setLoading(false)
    }
    getData()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    const { error } = await supabase
      .from('profiles')
      .upsert({ 
        id: user.id, 
        full_name: fullName, 
        family_name: familyName, 
        phone: phone,
        updated_at: new Date()
      })
    if (error) {
      alert('Error: ' + error.message)
    } else {
      alert('Profile saved!')
    }
    setSaving(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  if (loading) return <p>Loading...</p>

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">My Profile</h1>
          <button onClick={handleLogout} className="text-sm text-red-500">Logout</button>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-3 border rounded bg-background"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Family Name</label>
            <input 
              value={familyName} 
              onChange={(e) => setFamilyName(e.target.value)}
              className="w-full p-3 border rounded bg-background"
              placeholder="Enter family name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border rounded bg-background"              placeholder="Enter phone number"
            />
          </div>

          <button 
            onClick={handleSave}
            disabled={saving}
            className="w-full py-3 bg-black text-white rounded-lg font-bold mt-4"
          >
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </div>

        <div className="border-t pt-6">
          <Link href="/journal" className="block w-full py-3 bg-blue-600 text-white rounded-lg font-bold text-center">
            📖 Family Journal
          </Link>
        </div>
      </div>
    </div>
  )
}
