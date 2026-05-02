import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PenLine, Send, CheckCircle2, Calendar, ChevronRight } from 'lucide-react'
import { useTasks } from '../context/TaskContext.jsx'

const prompts = [
  { id: 'completed', question: 'What did you accomplish today?', placeholder: 'Describe what you completed...' },
  { id: 'blocked', question: 'What blocked you or felt difficult?', placeholder: 'Be honest about your challenges...' },
  { id: 'learned', question: 'What\'s one thing you learned?', placeholder: 'Share an insight or takeaway...' },
]

export default function ReflectionPage() {
  const { tasks } = useTasks()
  const [responses, setResponses] = useState({ completed: '', blocked: '', learned: '' })
  const [submitted, setSubmitted] = useState(false)
  const [history, setHistory] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem('execustra_reflections')
    if (stored) setHistory(JSON.parse(stored))
    const today = new Date().toISOString().split('T')[0]
    const todayReflection = stored ? JSON.parse(stored).find(r => r.date === today) : null
    if (todayReflection) {
      setResponses(todayReflection.responses)
      setSubmitted(true)
    }
  }, [])

  const handleSubmit = () => {
    const today = new Date().toISOString().split('T')[0]
    const entry = { date: today, responses, tasks: tasks.map(t => ({ text: t.text, status: t.status })) }
    const updated = [...history.filter(h => h.date !== today), entry]
    setHistory(updated)
    localStorage.setItem('execustra_reflections', JSON.stringify(updated))
    setSubmitted(true)
  }

  const completedCount = tasks.filter(t => t.status === 'completed').length

  return (
    <div className="max-w-3xl mx-auto px-8 py-10">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <PenLine size={28} className="text-accent" /> Daily Reflection
        </h1>
        <p className="text-text-secondary">Take a moment to process your day. Honest reflection builds awareness.</p>
      </motion.div>

      {/* Today's summary */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-5 mb-8 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-success-dim flex items-center justify-center">
          <CheckCircle2 size={20} className="text-success" />
        </div>
        <div>
          <p className="text-sm text-text-muted">Today's execution</p>
          <p className="font-semibold">{completedCount} of {tasks.length} tasks completed</p>
        </div>
      </motion.div>

      {submitted ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
          <div className="w-16 h-16 rounded-full bg-success-dim flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={32} className="text-success" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Reflection submitted</h2>
          <p className="text-text-secondary mb-6">You've completed today's reflection. See you tomorrow.</p>
          <div className="glass-card p-6 max-w-lg mx-auto text-left space-y-4">
            {prompts.map(p => (
              <div key={p.id}>
                <p className="text-xs text-text-muted uppercase tracking-wider mb-1">{p.question}</p>
                <p className="text-text-secondary">{responses[p.id] || '—'}</p>
              </div>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-6">
          {prompts.map((prompt, i) => (
            <motion.div key={prompt.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}>
              <label className="block text-lg font-semibold mb-3">{prompt.question}</label>
              <textarea value={responses[prompt.id]} onChange={(e) => setResponses(prev => ({ ...prev, [prompt.id]: e.target.value }))}
                placeholder={prompt.placeholder} rows={3}
                className="input-field resize-none" id={`reflection-${prompt.id}`} />
            </motion.div>
          ))}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <button onClick={handleSubmit} disabled={!responses.completed && !responses.blocked && !responses.learned}
              className="btn-primary flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed" id="reflection-submit">
              <Send size={18} /> Submit Reflection
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* History */}
      {history.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-16">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Calendar size={20} className="text-accent" /> Past Reflections
          </h2>
          <div className="space-y-3">
            {history.slice(-5).reverse().map(entry => (
              <details key={entry.date} className="glass-card p-4 group">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="font-medium">{new Date(entry.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                  <ChevronRight size={18} className="text-text-muted group-open:rotate-90 transition-transform" />
                </summary>
                <div className="mt-4 space-y-3 pt-4 border-t border-border">
                  {prompts.map(p => (
                    <div key={p.id}><p className="text-xs text-text-muted uppercase tracking-wider mb-1">{p.question}</p><p className="text-text-secondary text-sm">{entry.responses[p.id] || '—'}</p></div>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
