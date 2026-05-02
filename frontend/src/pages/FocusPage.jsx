import { useState, useEffect, useRef, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play, Pause, RotateCcw, Coffee, Target, Volume2, VolumeX } from 'lucide-react'

const MODES = {
  focus: { label: 'Focus', duration: 25 * 60, color: 'accent' },
  shortBreak: { label: 'Short Break', duration: 5 * 60, color: 'success' },
  longBreak: { label: 'Long Break', duration: 15 * 60, color: 'warning' },
}

export default function FocusPage() {
  const location = useLocation()
  const activeTask = location.state?.task || null
  const [mode, setMode] = useState('focus')
  const [timeLeft, setTimeLeft] = useState(MODES.focus.duration)
  const [isRunning, setIsRunning] = useState(false)
  const [sessions, setSessions] = useState(0)
  const [activeSound, setActiveSound] = useState('none')
  const intervalRef = useRef(null)

  const currentMode = MODES[mode]

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      clearInterval(intervalRef.current)
      setIsRunning(false)
      if (mode === 'focus') {
        setSessions(s => s + 1)
      }
    }
    return () => clearInterval(intervalRef.current)
  }, [isRunning, timeLeft, mode])

  const toggleTimer = () => setIsRunning(!isRunning)

  const resetTimer = () => {
    clearInterval(intervalRef.current)
    setIsRunning(false)
    setTimeLeft(currentMode.duration)
  }

  const switchMode = (newMode) => {
    clearInterval(intervalRef.current)
    setIsRunning(false)
    setMode(newMode)
    setTimeLeft(MODES[newMode].duration)
  }

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const progress = 1 - timeLeft / currentMode.duration
  const circumference = 2 * Math.PI * 140
  const strokeDashoffset = circumference * (1 - progress)

  return (
    <div className="max-w-3xl mx-auto px-8 py-10 flex flex-col items-center min-h-screen">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 w-full">
        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
          <Target size={28} className="text-accent" /> Focus Mode
        </h1>
        {activeTask && (
          <div className="glass-card inline-block px-5 py-3 mt-4">
            <p className="text-sm text-text-muted mb-1">Current task</p>
            <p className="font-medium">{activeTask.text}</p>
          </div>
        )}
      </motion.div>

      {/* Mode selector */}
      <div className="flex gap-2 p-1 bg-surface rounded-xl mb-12">
        {Object.entries(MODES).map(([key, { label }]) => (
          <button key={key} onClick={() => switchMode(key)}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${mode === key ? 'bg-accent-glow text-accent' : 'text-text-muted hover:text-text-secondary'}`}
            id={`mode-${key}`}>{label}</button>
        ))}
      </div>

      {/* Timer circle */}
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative mb-12">
        <svg width="320" height="320" viewBox="0 0 320 320" className="transform -rotate-90">
          <circle cx="160" cy="160" r="140" fill="none" stroke="var(--color-surface-elevated)" strokeWidth="4" />
          <circle cx="160" cy="160" r="140" fill="none" stroke="var(--color-accent)" strokeWidth="4"
            strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-linear" style={{ filter: 'drop-shadow(0 0 8px var(--color-accent-glow))' }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-6xl font-bold tracking-tight font-mono">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
          <span className="text-text-muted text-sm mt-2">{currentMode.label}</span>
        </div>
      </motion.div>

      {/* Controls */}
      <div className="flex items-center gap-4 mb-10">
        <button onClick={resetTimer} className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-text-muted hover:text-text-primary hover:border-text-muted transition-all" id="timer-reset">
          <RotateCcw size={20} />
        </button>
        <button onClick={toggleTimer}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent-dim flex items-center justify-center text-black glow-accent hover:glow-accent-strong transition-all"
          id="timer-toggle">
          {isRunning ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
        </button>
        <button onClick={() => switchMode(mode === 'focus' ? 'shortBreak' : 'focus')}
          className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-text-muted hover:text-text-primary hover:border-text-muted transition-all" id="timer-break">
          <Coffee size={20} />
        </button>
      </div>

      {/* Sessions counter */}
      <div className="glass-card px-6 py-3 mb-8">
        <span className="text-text-muted text-sm">Sessions completed: </span>
        <span className="text-accent font-bold">{sessions}</span>
      </div>

      {/* Ambient Sound (Visual Simulation) */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-[10px] text-text-muted font-mono uppercase tracking-widest">Ambient Sound</p>
        <div className="flex gap-2 p-1 bg-surface rounded-xl">
          {[
            { id: 'none', label: 'Silence', icon: VolumeX },
            { id: 'lofi', label: 'Lofi', icon: Volume2 },
            { id: 'rain', label: 'Rain', icon: Volume2 },
          ].map((sound) => (
            <button
              key={sound.id}
              onClick={() => setActiveSound(sound.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${activeSound === sound.id ? 'bg-accent-glow text-accent' : 'text-text-muted hover:text-text-secondary hover:bg-surface-elevated'}`}
            >
              <sound.icon size={14} />
              {sound.label}
              {activeSound === sound.id && sound.id !== 'none' && (
                <span className="flex gap-0.5 ml-1">
                  {[0, 1, 2].map(i => (
                    <motion.span 
                      key={i}
                      animate={{ height: [4, 10, 4] }}
                      transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.15 }}
                      className="w-0.5 bg-accent"
                    />
                  ))}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
