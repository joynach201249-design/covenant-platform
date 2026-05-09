'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'
import { BookOpen, Save, ArrowLeft } from 'lucide-react'

interface Entry { id: string; title: string; content: string; created_at: string }

export default function Journal() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const getData = async () => {
      const {  { session } } = await supabase.auth.getSession()
      if (!session) return
      setUser(session.user)
      await fetchEntries()
    }
    getData()
  }, [])

  const fetchEntries = async () => {
    const { data } = await supabase.from('journal_entries').select('*').order('created_at', { ascending: false })
    if (data) setEntries(data)
    setLoading(false)
  }

  const handleSave = async () => {
    if (!title || !content) { alert('Please fill in both fields'); return }
    setSaving(true)
    const { error } = await supabase.from('journal_entries').insert({ user_id: user.id, title, content, created_at: new Date() })
    if (error) alert('Error: ' + error.message)
    else { alert('Entry saved!'); setTitle(''); setContent(''); await fetchEntries() }
    setSaving(false)
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <header className="bg-white border-b px-4 py-4 flex items-center gap-4">
        <Link href="/dashboard" className="text-indigo-600"><ArrowLeft className="w-5 h-5" /></Link>
        <div className="flex items-center gap-2"><BookOpen className="w-8 h-8 text-indigo-600" /><h1 className="text-2xl font-bold text-indigo-600">Family Journal</h1></div>
      </header>
      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Write New Entry</h2>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 border rounded-lg mb-3" placeholder="Title" />
          <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={5} className="w-full p-3 border rounded-lg mb-3" placeholder="Write your thoughts..." />
          <button onClick={handleSave} disabled={saving} className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-bold flex items-center justify-center gap-2">
            <Save className="w-4 h-4" />{saving ? 'Saving...' : 'Save Entry'}
          </button>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Previous Entries</h2>
          {entries.length === 0 ? <p className="text-gray-500 text-center py-8">No entries yet.</p> : entries.map((entry) => (
            <div key={entry.id} className="bg-white rounded-xl shadow p-6">
              <h3 className="font-bold text-lg mb-1">{entry.title}</h3>
              <p className="text-sm text-gray-500 mb-3">{new Date(entry.created_at).toLocaleDateString()}</p>
              <p className="text-gray-700 whitespace-pre-wrap">{entry.content}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
