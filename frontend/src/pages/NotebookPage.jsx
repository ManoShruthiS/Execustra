import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Plus, Trash2, Clock, Search } from 'lucide-react'

export default function NotebookPage() {
  const [notes, setNotes] = useState([])
  const [activeNote, setActiveNote] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('execustra_notebooks')
    if (stored) {
      const parsed = JSON.parse(stored)
      setNotes(parsed)
      if (parsed.length > 0) setActiveNote(parsed[0].id)
    }
  }, [])

  const save = (updated) => {
    setNotes(updated)
    localStorage.setItem('execustra_notebooks', JSON.stringify(updated))
  }

  const addNote = () => {
    const note = {
      id: `note-${Date.now()}`,
      title: 'Untitled Note',
      content: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    const updated = [note, ...notes]
    save(updated)
    setActiveNote(note.id)
  }

  const updateNote = (id, field, value) => {
    const updated = notes.map(n =>
      n.id === id ? { ...n, [field]: value, updatedAt: new Date().toISOString() } : n
    )
    save(updated)
  }

  const deleteNote = (id) => {
    const updated = notes.filter(n => n.id !== id)
    save(updated)
    if (activeNote === id) setActiveNote(updated[0]?.id || null)
  }

  const current = notes.find(n => n.id === activeNote)
  const filtered = notes.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.content.toLowerCase().includes(search.toLowerCase())
  )

  const timeAgo = (date) => {
    const diff = Date.now() - new Date(date).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return 'Just now'
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    return `${Math.floor(hrs / 24)}d ago`
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-72 border-r border-border bg-surface flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-lg font-semibold flex items-center gap-2">
              <BookOpen size={20} className="text-accent" /> Notes
            </h1>
            <button onClick={addNote} className="w-8 h-8 rounded-lg bg-accent-glow hover:bg-accent-strong flex items-center justify-center text-accent transition-colors" id="add-note">
              <Plus size={18} />
            </button>
          </div>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search notes..." className="input-field pl-9 py-2 text-sm" id="note-search" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filtered.map(note => (
            <button key={note.id} onClick={() => setActiveNote(note.id)}
              className={`w-full text-left p-3 rounded-lg transition-all duration-200 group ${activeNote === note.id ? 'bg-accent-glow border border-accent/20' : 'hover:bg-surface-elevated border border-transparent'}`}>
              <p className="font-medium text-sm truncate">{note.title || 'Untitled'}</p>
              <p className="text-xs text-text-muted mt-1 truncate">{note.content.slice(0, 60) || 'Empty note'}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-text-muted flex items-center gap-1"><Clock size={12} />{timeAgo(note.updatedAt)}</span>
                <button onClick={(e) => { e.stopPropagation(); deleteNote(note.id) }}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded text-text-muted hover:text-error transition-all"><Trash2 size={14} /></button>
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-text-muted text-sm">
              {notes.length === 0 ? 'No notes yet. Create one!' : 'No matching notes.'}
            </div>
          )}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col">
        {current ? (
          <motion.div key={current.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col p-8">
            <input type="text" value={current.title} onChange={(e) => updateNote(current.id, 'title', e.target.value)}
              className="text-2xl font-bold bg-transparent border-none outline-none mb-4 text-text-primary placeholder:text-text-muted" placeholder="Note title..." id="note-title" />
            <textarea value={current.content} onChange={(e) => updateNote(current.id, 'content', e.target.value)}
              className="flex-1 bg-transparent border-none outline-none resize-none text-text-secondary leading-relaxed placeholder:text-text-muted" placeholder="Start writing..." id="note-content" />
            <div className="pt-4 border-t border-border mt-4">
              <p className="text-xs text-text-muted">Last edited {timeAgo(current.updatedAt)}</p>
            </div>
          </motion.div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-text-muted">
            <div className="text-center">
              <BookOpen size={48} className="mx-auto mb-4 opacity-30" />
              <p>Select a note or create a new one</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
