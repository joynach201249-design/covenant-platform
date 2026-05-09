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
      const { data } = await supabase.auth.getSession()
      const session = data.session
      if (!session) return
      setUser(session.user)
      const { data: profile } = await supabase.from('profiles').select('*').eq('id', session.user.id).single()
      if (profile) {
        setFullName(profile.full_name || '')
        setFamilyName(profile.family_name || '')
        setPhone(profile.phone || '')
      }
      setLoading(false)
    }
    getData()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    const { error } = await supabase.from('profiles').upsert({ 
      id: user.id, 
      full_name: fullName, 
      family_name: familyName, 
      phone: phone,
      updated_at: new Date() 
    })
    if (error) alert('Error: ' + error.message)
    else alert('Profile saved!')
    setSaving(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <User className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition">
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <User className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input value={fullName} onChange={(e) => setFullName(e.target.value)} 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" 
                placeholder="Enter your full name" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Family Name</label>
              <input value={familyName} onChange={(e) => setFamilyName(e.target.value)} 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" 
                placeholder="Enter family name" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" 
                placeholder="Enter phone number" />
            </div>

            <button onClick={handleSave} disabled={saving}               className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition shadow-lg">
              <Save className="w-5 h-5" />
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </div>

        <Link href="/journal" 
          className="block bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl shadow-lg p-6 transition transform hover:scale-105">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8" />
            <div>
              <h3 className="text-xl font-bold">Family Journal</h3>
              <p className="text-indigo-100 text-sm">Write your thoughts, prayers, and gratitude notes</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
