'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'

interface Entry {
  id: string
  title: string
  content: string
  created_at: string
}

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
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (data) setEntries(data)
    setLoading(false)
  }

  const handleSave = async () => {
    if (!title || !content) {
      alert('Please fill in both fields')
      return
    }
    
    setSaving(true)
    const { error } = await supabase      .from('journal_entries')
      .insert({ 
        user_id: user.id, 
        title, 
        content,
        created_at: new Date()
      })

    if (error) {
      alert('Error: ' + error.message)
    } else {
      alert('Entry saved!')
      setTitle('')
      setContent('')
      await fetchEntries()
    }
    setSaving(false)
  }

  if (loading) return <p>Loading...</p>

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Family Journal</h1>
          <Link href="/dashboard" className="text-sm underline">Profile</Link>
        </div>

        <div className="bg-muted p-4 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Write New Entry</h2>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title (e.g., Gratitude, Prayer)"
            className="w-full p-3 mb-3 border rounded bg-background"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your thoughts..."
            rows={5}
            className="w-full p-3 mb-3 border rounded bg-background"
          />
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full py-3 bg-black text-white rounded font-bold"
          >
            {saving ? 'Saving...' : 'Save Entry'}          </button>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Previous Entries</h2>
          {entries.length === 0 ? (
            <p className="text-muted-foreground">No entries yet. Start writing!</p>
          ) : (
            entries.map((entry) => (
              <div key={entry.id} className="border p-4 rounded">
                <h3 className="font-bold text-lg">{entry.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {new Date(entry.created_at).toLocaleDateString()}
                </p>
                <p className="whitespace-pre-wrap">{entry.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
