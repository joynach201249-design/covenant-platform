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
      const { data } = await supabase.auth.getSession()
      const session = data.session
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
    const { error } = await supabase.from('journal_entries').insert({ 
      user_id: user.id, 
      title, 
      content, 
      created_at: new Date() 
    })
    if (error) alert('Error: ' + error.message)
    else { 
      alert('Entry saved!')
      setTitle('')
      setContent('')
      await fetchEntries() 
    }    setSaving(false)
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </Link>
          <div className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Family Journal</h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Write New Entry</h2>
          <input value={title} onChange={(e) => setTitle(e.target.value)} 
            className="w-full px-4 py-3 border border-gray-300 rounded-xl mb-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" 
            placeholder="Title (e.g., Gratitude, Prayer)" />
          <textarea value={content} onChange={(e) => setContent(e.target.value)} 
            rows={5} 
            className="w-full px-4 py-3 border border-gray-300 rounded-xl mb-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" 
            placeholder="Write your thoughts..." />
          <button onClick={handleSave} disabled={saving} 
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition shadow-lg">
            <Save className="w-5 h-5" />
            {saving ? 'Saving...' : 'Save Entry'}
          </button>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Previous Entries</h2>
          {entries.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No entries yet. Start writing!</p>
            </div>
          ) : (
            entries.map((entry) => (
              <div key={entry.id} className="bg-white rounded-2xl shadow p-6 border border-gray-100 hover:shadow-md transition">
                <h3 className="font-bold text-lg mb-1 text-gray-900">{entry.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{new Date(entry.created_at).toLocaleDateString()}</p>
                <p className="text-gray-700 whitespace-pre-wrap">{entry.content}</p>
              </div>            ))
          )}
        </div>
      </div>
    </div>
  )
}
