'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'
import { User, LogOut, Save, BookOpen } from 'lucide-react'

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
      alert('Profile saved successfully!')
    }
    setSaving(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="animate-pulse text-indigo-600 text-xl font-semibold">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              My Profile
            </h1>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Profile Form */}
          <div className="card bg-white shadow-lg">            <div className="flex items-center gap-2 mb-6">
              <User className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-bold text-gray-800">Personal Information</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input 
                  value={fullName} 
                  onChange={(e) => setFullName(e.target.value)}
                  className="input-field"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Family Name</label>
                <input 
                  value={familyName} 
                  onChange={(e) => setFamilyName(e.target.value)}
                  className="input-field"
                  placeholder="Enter family name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)}
                  className="input-field"
                  placeholder="Enter phone number"
                />
              </div>

              <button 
                onClick={handleSave}
                disabled={saving}
                className="btn-primary w-full mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Link               href="/journal" 
              className="card bg-gradient-to-br from


cat << 'EOF' > src/app/dashboard/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'
import { User, LogOut, Save, BookOpen } from 'lucide-react'

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
      const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single()
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
    const { error } = await supabase.from('profiles').upsert({ id: user.id, full_name: fullName, family_name: familyName, phone: phone, updated_at: new Date() })
    if (error) alert('Error: ' + error.message)
    else alert('Profile saved!')
    setSaving(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <header className="bg-white border-b px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <User className="w-8 h-8 text-indigo-600" />
          <h1 className="text-2xl font-bold text-indigo-600">My Profile</h1>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-red-600">
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-indigo-600" />
            Personal Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full p-3 border rounded-lg" placeholder="Enter your full name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Family Name</label>
              <input value={familyName} onChange={(e) => setFamilyName(e.target.value)} className="w-full p-3 border rounded-lg" placeholder="Enter family name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-3 border rounded-lg" placeholder="Enter phone number" />
            </div>
            <button onClick={handleSave} disabled={saving} className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-bold flex items-center justify-center gap-2">
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </div>

        <Link href="/journal" className="block bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg p-6 hover:scale-105 transition-transform">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-6 h-6" />
            <h3 className="text-xl font-bold">Family Journal</h3>
          </div>
          <p className="text-indigo-100">Write your thoughts, prayers, and gratitude notes</p>
        </Link>
      </main>
    </div>
  )
}
