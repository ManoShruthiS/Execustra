import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, ArrowRight, ArrowLeft, Compass, AlertTriangle, BarChart3, Check } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

const goals = [
  'AI Engineer',
  'Software Developer',
  'Data Scientist',
  'Designer',
  'Product Manager',
  'Content Creator',
  'Entrepreneur',
  'Student (General)',
  'Other',
]

const blockerOptions = [
  'Lack of clarity on what to do',
  'Too many options / decision fatigue',
  'Procrastination / low motivation',
  'No structured routine',
  'Imposter syndrome',
  'Time management issues',
  'Burnout or overwhelm',
]

const consistencyLevels = [
  { value: 'low', label: 'Low', description: 'I struggle to stick to plans for more than a few days', color: 'text-error' },
  { value: 'medium', label: 'Medium', description: 'I\'m sometimes consistent, but often fall off track', color: 'text-warning' },
  { value: 'high', label: 'High', description: 'I\'m mostly consistent but want to improve further', color: 'text-success' },
]

const steps = [
  {
    id: 'goal',
    title: 'What\'s your aspiration?',
    subtitle: 'Choose the direction you want to grow in.',
    icon: Compass,
  },
  {
    id: 'blockers',
    title: 'What\'s holding you back?',
    subtitle: 'Select the blockers you face most often.',
    icon: AlertTriangle,
  },
  {
    id: 'consistency',
    title: 'How consistent are you?',
    subtitle: 'Be honest — this helps us calibrate your system.',
    icon: BarChart3,
  },
]

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [goal, setGoal] = useState('')
  const [selectedBlockers, setSelectedBlockers] = useState([])
  const [consistency, setConsistency] = useState('')
  const { completeOnboarding } = useAuth()
  const navigate = useNavigate()

  const toggleBlocker = (blocker) => {
    setSelectedBlockers(prev =>
      prev.includes(blocker)
        ? prev.filter(b => b !== blocker)
        : [...prev, blocker]
    )
  }

  const canProceed = () => {
    if (step === 0) return goal !== ''
    if (step === 1) return selectedBlockers.length > 0
    if (step === 2) return consistency !== ''
    return false
  }

  const handleComplete = () => {
    completeOnboarding({
      goal,
      blockers: selectedBlockers,
      consistency,
    })
    navigate('/dashboard')
  }

  const currentStep = steps[step]
  const StepIcon = currentStep.icon

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[50%] -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent/[0.03] blur-[150px]" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-2xl"
      >
        {/* Progress bar */}
        <div className="flex items-center gap-3 mb-12">
          {steps.map((s, i) => (
            <div key={s.id} className="flex-1 h-1 rounded-full overflow-hidden bg-surface-elevated">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: i <= step ? '100%' : '0%' }}
                transition={{ duration: 0.4 }}
                className="h-full bg-accent rounded-full"
              />
            </div>
          ))}
        </div>

        {/* Step header */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-xl bg-accent-glow flex items-center justify-center">
                <StepIcon size={22} className="text-accent" />
              </div>
              <div>
                <span className="text-xs text-text-muted font-mono">
                  Step {step + 1} of {steps.length}
                </span>
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-2">{currentStep.title}</h1>
            <p className="text-text-secondary mb-8">{currentStep.subtitle}</p>

            {/* Step content */}
            <div className="glass-card p-8">
              {step === 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {goals.map((g) => (
                    <button
                      key={g}
                      onClick={() => setGoal(g)}
                      className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                        goal === g
                          ? 'border-accent bg-accent-glow text-text-primary'
                          : 'border-border hover:border-text-muted text-text-secondary hover:text-text-primary'
                      }`}
                      id={`goal-${g.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <span className="font-medium">{g}</span>
                    </button>
                  ))}
                </div>
              )}

              {step === 1 && (
                <div className="space-y-3">
                  {blockerOptions.map((b) => (
                    <button
                      key={b}
                      onClick={() => toggleBlocker(b)}
                      className={`w-full p-4 rounded-xl border text-left transition-all duration-200 flex items-center justify-between ${
                        selectedBlockers.includes(b)
                          ? 'border-accent bg-accent-glow text-text-primary'
                          : 'border-border hover:border-text-muted text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      <span className="font-medium">{b}</span>
                      {selectedBlockers.includes(b) && (
                        <Check size={18} className="text-accent" />
                      )}
                    </button>
                  ))}
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  {consistencyLevels.map((level) => (
                    <button
                      key={level.value}
                      onClick={() => setConsistency(level.value)}
                      className={`w-full p-5 rounded-xl border text-left transition-all duration-200 ${
                        consistency === level.value
                          ? 'border-accent bg-accent-glow'
                          : 'border-border hover:border-text-muted'
                      }`}
                      id={`consistency-${level.value}`}
                    >
                      <span className={`text-lg font-semibold ${level.color}`}>{level.label}</span>
                      <p className="text-text-secondary text-sm mt-1">{level.description}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={() => setStep(s => s - 1)}
                disabled={step === 0}
                className="btn-ghost flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowLeft size={18} />
                Back
              </button>

              {step < steps.length - 1 ? (
                <button
                  onClick={() => setStep(s => s + 1)}
                  disabled={!canProceed()}
                  className="btn-primary flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
                  id="onboarding-next"
                >
                  Continue
                  <ArrowRight size={18} />
                </button>
              ) : (
                <button
                  onClick={handleComplete}
                  disabled={!canProceed()}
                  className="btn-primary flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
                  id="onboarding-complete"
                >
                  Start My Journey
                  <Zap size={18} />
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
