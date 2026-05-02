import { motion } from 'framer-motion'
import { User, Target, TrendingUp, Flame, Calendar, BarChart3, Shield, AlertTriangle } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { useTasks } from '../context/TaskContext.jsx'

export default function ProfilePage() {
  const { user } = useAuth()
  const { tasks, taskHistory, getStreak, getCompletionRate } = useTasks()
  const profile = user?.profile || {}
  const streak = getStreak()
  const rate = getCompletionRate()

  // Calculate historical stats
  const totalTasks = taskHistory.reduce((sum, day) => sum + day.tasks.length, 0) + tasks.length
  const totalCompleted = taskHistory.reduce((sum, day) => sum + day.tasks.filter(t => t.status === 'completed').length, 0) + tasks.filter(t => t.status === 'completed').length
  const overallRate = totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0
  const daysActive = taskHistory.length + 1

  const consistencyLabel = { low: 'Building', medium: 'Growing', high: 'Strong' }
  const consistencyColor = { low: 'text-error', medium: 'text-warning', high: 'text-success' }

  return (
    <div className="max-w-4xl mx-auto px-8 py-10">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <User size={28} className="text-accent" /> Profile & Progress
        </h1>
        <p className="text-text-secondary">Track your growth and behavioral patterns.</p>
      </motion.div>

      {/* User card */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 mb-8 flex items-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent-dim flex items-center justify-center text-2xl font-bold text-black glow-accent">
          {user?.email?.[0]?.toUpperCase() || 'E'}
        </div>
        <div>
          <h2 className="text-xl font-bold">{user?.email}</h2>
          <p className="text-text-secondary text-sm">Member since {new Date(user?.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
          {profile.goal && <span className="inline-block mt-2 px-3 py-1 rounded-full bg-accent-glow text-accent text-xs font-medium">{profile.goal}</span>}
        </div>
      </motion.div>

      {/* Stats grid */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="glass-card p-5 text-center">
          <Flame size={22} className="text-warning mx-auto mb-2" />
          <p className="text-2xl font-bold">{streak}</p>
          <p className="text-xs text-text-muted">Day Streak</p>
        </div>
        <div className="glass-card p-5 text-center">
          <TrendingUp size={22} className="text-accent mx-auto mb-2" />
          <p className="text-2xl font-bold">{overallRate}%</p>
          <p className="text-xs text-text-muted">Overall Rate</p>
        </div>
        <div className="glass-card p-5 text-center">
          <Calendar size={22} className="text-success mx-auto mb-2" />
          <p className="text-2xl font-bold">{daysActive}</p>
          <p className="text-xs text-text-muted">Days Active</p>
        </div>
        <div className="glass-card p-5 text-center">
          <Target size={22} className="text-accent mx-auto mb-2" />
          <p className="text-2xl font-bold">{totalCompleted}</p>
          <p className="text-xs text-text-muted">Tasks Done</p>
        </div>
      {/* Secondary Stats Row */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-surface/30 border border-border/50 rounded-2xl p-4">
          <p className="text-[10px] font-mono text-text-muted uppercase tracking-widest mb-1">Efficiency</p>
          <div className="flex items-end gap-2">
            <span className="text-lg font-bold text-success">92%</span>
            <span className="text-[10px] text-text-muted pb-1">v. High</span>
          </div>
        </div>
        <div className="bg-surface/30 border border-border/50 rounded-2xl p-4">
          <p className="text-[10px] font-mono text-text-muted uppercase tracking-widest mb-1">Avg Session</p>
          <div className="flex items-end gap-2">
            <span className="text-lg font-bold text-accent">28m</span>
            <span className="text-[10px] text-text-muted pb-1">Focused</span>
          </div>
        </div>
        <div className="bg-surface/30 border border-border/50 rounded-2xl p-4">
          <p className="text-[10px] font-mono text-text-muted uppercase tracking-widest mb-1">Task Skips</p>
          <div className="flex items-end gap-2">
            <span className="text-lg font-bold text-error">12</span>
            <span className="text-[10px] text-text-muted pb-1">Total</span>
          </div>
        </div>
        <div className="bg-surface/30 border border-border/50 rounded-2xl p-4">
          <p className="text-[10px] font-mono text-text-muted uppercase tracking-widest mb-1">Reflections</p>
          <div className="flex items-end gap-2">
            <span className="text-lg font-bold text-warning">48</span>
            <span className="text-[10px] text-text-muted pb-1">Entries</span>
          </div>
        </div>
      </motion.div>

      {/* Profile details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2"><BarChart3 size={18} className="text-accent" /> Behavioral Profile</h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Goal</p>
              <p className="font-medium">{profile.goal || 'Not set'}</p>
            </div>
            <div>
              <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Consistency Level</p>
              <p className={`font-medium ${consistencyColor[profile.consistency] || ''}`}>
                {consistencyLabel[profile.consistency] || 'Unknown'}
              </p>
            </div>
            <div>
              <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Today's Progress</p>
              <div className="h-2 bg-surface rounded-full overflow-hidden mt-1">
                <div className="h-full bg-gradient-to-r from-accent to-accent-dim rounded-full transition-all" style={{ width: `${rate}%` }} />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2"><AlertTriangle size={18} className="text-warning" /> Identified Blockers</h3>
          <div className="space-y-2">
            {(profile.blockers || []).map((b, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-surface">
                <Shield size={16} className="text-text-muted flex-shrink-0" />
                <span className="text-sm text-text-secondary">{b}</span>
              </div>
            ))}
            {(!profile.blockers || profile.blockers.length === 0) && (
              <p className="text-text-muted text-sm">No blockers identified yet.</p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Advanced Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Psychological Profile */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
          <h3 className="font-semibold mb-6 flex items-center gap-2"><BarChart3 size={18} className="text-accent" /> Psychological Profile</h3>
          <div className="space-y-5">
            {[
              { label: 'Clarity', value: 85, color: 'bg-accent' },
              { label: 'Resilience', value: 65, color: 'bg-success' },
              { label: 'Focus', value: 90, color: 'bg-warning' },
              { label: 'Consistency', value: overallRate, color: 'bg-accent-dim' },
            ].map((trait) => (
              <div key={trait.label}>
                <div className="flex justify-between text-xs mb-1.5 font-mono uppercase tracking-widest">
                  <span className="text-text-muted">{trait.label}</span>
                  <span className="text-text-primary">{trait.value}%</span>
                </div>
                <div className="h-1.5 bg-surface rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${trait.value}%` }} 
                    className={`h-full ${trait.color} rounded-full shadow-[0_0_8px_rgba(143,170,220,0.3)]`} 
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Weekly Trend */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6">
          <h3 className="font-semibold mb-6 flex items-center gap-2"><TrendingUp size={18} className="text-accent" /> Weekly Efficiency</h3>
          <div className="flex items-end justify-between h-32 gap-2 px-2">
            {[40, 70, 45, 90, 65, 80, 100].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <motion.div 
                  initial={{ height: 0 }} 
                  animate={{ height: `${val}%` }} 
                  className={`w-full rounded-t-sm transition-all duration-500 ${i === 6 ? 'bg-accent glow-accent' : 'bg-accent-glow hover:bg-accent'}`} 
                />
                <span className="text-[10px] text-text-muted font-mono uppercase">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border flex justify-between items-center text-[10px] text-text-muted font-mono uppercase tracking-widest">
            <span>Avg: 70%</span>
            <span className="text-success">+12% vs Last Week</span>
          </div>
        </motion.div>
      </div>

      {/* Execution Heatmap */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold flex items-center gap-2"><BarChart3 size={18} className="text-accent" /> Execution Heatmap</h3>
          <div className="flex items-center gap-4 text-[10px] text-text-muted font-mono uppercase tracking-widest">
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-surface" /> 0%</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-accent/20" /> 1-50%</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-accent/60" /> 51-99%</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-accent shadow-[0_0_8px_rgba(143,170,220,0.5)]" /> 100%</div>
          </div>
        </div>
        
        <div className="flex flex-col gap-1 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex gap-1 min-w-max">
            {/* Generate a grid of 12 weeks x 7 days */}
            {Array.from({ length: 24 }).map((_, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {Array.from({ length: 7 }).map((_, dayIndex) => {
                  // Simulate some random completion data for visual effect
                  const rand = Math.random()
                  const opacity = rand > 0.8 ? 'bg-accent' : rand > 0.5 ? 'bg-accent/60' : rand > 0.3 ? 'bg-accent/20' : 'bg-surface'
                  const isToday = weekIndex === 23 && dayIndex === new Date().getDay() - 1
                  return (
                    <div 
                      key={dayIndex} 
                      className={`w-3 h-3 rounded-sm transition-all duration-500 hover:scale-125 hover:z-10 cursor-pointer ${opacity} ${isToday ? 'ring-1 ring-white ring-offset-1 ring-offset-black' : ''}`}
                      title={`${weekIndex + 1} weeks ago`}
                    />
                  )
                })}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-text-muted font-mono uppercase tracking-widest px-1">
            <span>6 Months Ago</span>
            <span>Today</span>
          </div>
        </div>
      </motion.div>

      {/* Recent history */}
      {taskHistory.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-10">
          <h3 className="font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-2">
            {taskHistory.slice(-7).reverse().map(day => {
              const dayDone = day.tasks.filter(t => t.status === 'completed').length
              const dayTotal = day.tasks.length
              const dayRate = Math.round((dayDone / dayTotal) * 100)
              return (
                <div key={day.date} className="glass-card p-4 flex items-center justify-between">
                  <span className="text-sm">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-1.5 bg-surface rounded-full overflow-hidden">
                      <div className="h-full bg-accent rounded-full" style={{ width: `${dayRate}%` }} />
                    </div>
                    <span className="text-sm font-mono text-text-muted">{dayDone}/{dayTotal}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      )}
    </div>
  )
}
