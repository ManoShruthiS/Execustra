import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, Circle, XCircle, Target, Flame, Clock, ArrowRight, Sparkles, TrendingUp } from 'lucide-react'
import { useTasks } from '../context/TaskContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const catIcons = { skill: '🛠️', learning: '📖', reflection: '💭' }

export default function DashboardPage() {
  const { tasks, completeTask, skipTask, getCompletionRate, getStreak, dailyQuote } = useTasks()
  const { user } = useAuth()
  const navigate = useNavigate()
  const rate = getCompletionRate()
  const streak = getStreak()
  const safeTasks = Array.isArray(tasks) ? tasks : []
  const done = safeTasks.filter(t => t?.status === 'completed').length
  const total = safeTasks.length
  const hour = new Date().getHours()
  const greet = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  const diffColors = {
    'Easy': 'text-success bg-success-dim',
    'Medium': 'text-warning bg-warning-dim',
    'Hard': 'text-error bg-error-dim'
  }

  return (
    <div className="max-w-4xl mx-auto px-8 py-10">
      <div className="flex items-start justify-between mb-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-text-muted text-sm font-mono mb-1">{today}</p>
          <h1 className="text-3xl font-bold mb-1">{greet}</h1>
          <p className="text-text-secondary">
            {done === total && total > 0 ? 'All tasks completed! Time to reflect.' : `You have ${total - done} task${total - done !== 1 ? 's' : ''} remaining.`}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-[280px] text-right hidden md:block"
        >
          <p className="text-xs font-mono text-accent uppercase tracking-widest mb-1 italic">Daily Direction</p>
          <p className="text-sm text-text-secondary leading-relaxed italic">"{dailyQuote.text}"</p>
          <p className="text-[10px] text-text-muted mt-1">— {dailyQuote.author}</p>
        </motion.div>
      </div>

      {/* Global Analytics Section */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-10">
        {/* Main Progress Ring */}
        <div className="md:col-span-5 glass-card p-6 flex items-center gap-6">
          <div className="relative w-24 h-24 flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="48" cy="48" r="40" fill="none" stroke="var(--color-surface)" strokeWidth="8" />
              <motion.circle cx="48" cy="48" r="40" fill="none" stroke="var(--color-accent)" strokeWidth="8"
                strokeLinecap="round" strokeDasharray={2 * Math.PI * 40}
                initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - rate / 100) }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="glow-accent"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-bold text-xl">{rate}%</div>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">Execution Score</h3>
            <p className="text-text-muted text-xs leading-relaxed">Your daily consistency is calibrated. Complete more tasks to boost your clarity score.</p>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="md:col-span-4 glass-card p-5">
          <p className="text-[10px] font-mono text-text-muted uppercase tracking-widest mb-4">Focus Allocation</p>
          <div className="space-y-3">
            {[
              { label: 'Skill', value: 45, color: 'bg-accent' },
              { label: 'Learning', value: 35, color: 'bg-success' },
              { label: 'Mindset', value: 20, color: 'bg-warning' }
            ].map(cat => (
              <div key={cat.label} className="flex items-center gap-3">
                <span className="text-[10px] font-mono w-14 text-text-muted">{cat.label}</span>
                <div className="flex-1 h-1 bg-surface rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${cat.value}%` }} className={`h-full ${cat.color} rounded-full`} />
                </div>
                <span className="text-[10px] font-mono w-6 text-right">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Streak Mini-card */}
        <div className="md:col-span-3 glass-card p-5 flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 rounded-full bg-warning-dim flex items-center justify-center mb-2">
            <Flame size={20} className="text-warning" />
          </div>
          <div className="text-2xl font-bold">{streak}</div>
          <p className="text-[10px] font-mono text-text-muted uppercase tracking-widest">Day Streak</p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold flex items-center gap-2"><Sparkles size={20} className="text-accent" />Today's Tasks</h2>
        </div>
        <div className="space-y-3">
          {safeTasks.map((task, i) => (
            <motion.div key={task.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
              className={`glass-card p-5 flex items-start gap-4 group ${task.status === 'completed' ? 'opacity-60' : ''}`}>
              <button onClick={() => task.status === 'pending' && completeTask(task.id)} disabled={task.status !== 'pending'} className="mt-0.5 flex-shrink-0" id={`task-${i}-toggle`}>
                {task.status === 'completed' ? <CheckCircle2 size={22} className="text-success" /> : task.status === 'skipped' ? <XCircle size={22} className="text-text-muted" /> : <Circle size={22} className="text-text-muted group-hover:text-accent transition-colors" />}
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">{catIcons[task.category]}</span>
                    <span className="text-[10px] text-text-muted uppercase tracking-wider font-mono">{task.category}</span>
                  </div>
                  {task.difficulty && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-medium ${diffColors[task.difficulty]}`}>
                      {task.difficulty}
                    </span>
                  )}
                </div>
                <p className={`font-medium ${task.status === 'completed' ? 'line-through text-text-muted' : ''}`}>{task.text}</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="flex items-center gap-1.5 text-xs text-text-muted"><Clock size={14} />{task.duration}</span>
                {task.status === 'pending' && (
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => navigate('/focus', { state: { task } })} className="p-2 rounded-lg hover:bg-accent-glow text-text-muted hover:text-accent transition-all" title="Focus"><Target size={16} /></button>
                    <button onClick={() => skipTask(task.id)} className="p-2 rounded-lg hover:bg-error-dim text-text-muted hover:text-error transition-all" title="Skip"><XCircle size={16} /></button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="grid grid-cols-2 gap-4">
        <button onClick={() => navigate('/focus')} className="glass-card p-6 flex items-center gap-4 group text-left" id="quick-focus">
          <div className="w-10 h-10 rounded-xl bg-accent-glow flex items-center justify-center group-hover:bg-accent-strong transition-colors"><Target size={20} className="text-accent" /></div>
          <div><h3 className="font-semibold mb-0.5">Enter Focus Mode</h3><p className="text-sm text-text-muted">Start a Pomodoro session</p></div>
          <ArrowRight size={18} className="ml-auto text-text-muted group-hover:text-accent transition-colors" />
        </button>
        <button onClick={() => navigate('/reflection')} className="glass-card p-6 flex items-center gap-4 group text-left" id="quick-reflect">
          <div className="w-10 h-10 rounded-xl bg-accent-glow flex items-center justify-center group-hover:bg-accent-strong transition-colors"><Sparkles size={20} className="text-accent" /></div>
          <div><h3 className="font-semibold mb-0.5">Daily Reflection</h3><p className="text-sm text-text-muted">Review your progress</p></div>
          <ArrowRight size={18} className="ml-auto text-text-muted group-hover:text-accent transition-colors" />
        </button>
      </motion.div>
    </div>
  )
}
