import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, ArrowRight, ChevronRight, Target, Brain, TrendingUp, Shield } from 'lucide-react'

const features = [
  {
    icon: Target,
    title: 'Daily Execution',
    description: 'Receive 1–3 optimized tasks each day, designed to move you forward without overwhelm.',
  },
  {
    icon: Brain,
    title: 'Adaptive Intelligence',
    description: 'The system learns your patterns and adjusts difficulty to keep you in your growth zone.',
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description: 'Watch your consistency grow with streaks, completion rates, and behavioral analytics.',
  },
  {
    icon: Shield,
    title: 'Low Cognitive Load',
    description: 'No decisions required. Just follow today\'s tasks and reflect on your progress.',
  },
]

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-bg overflow-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-accent/[0.03] blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-accent/[0.02] blur-[100px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden glow-accent">
            <img src="/logo.png" alt="ExecuStra Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-xl font-bold tracking-tight">ExecuStra</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="btn-ghost" id="landing-login">Sign In</Link>
          <Link to="/register" className="btn-primary text-sm" id="landing-register">Get Started</Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 pt-24 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-surface-elevated/50 text-sm text-text-secondary mb-8">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            Adaptive Life Operating System
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
            Stop thinking.
            <br />
            <span className="text-gradient">Start executing.</span>
          </h1>

          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
            ExecuStra removes decision fatigue by delivering clear, daily micro-actions
            aligned to your goals. No confusion. No overwhelm. Just progress.
          </p>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => navigate('/register')}
              className="btn-primary flex items-center gap-2 text-base px-8 py-4"
              id="hero-cta"
            >
              Begin Your Path
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => {
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="btn-secondary px-8 py-4 text-base"
              id="hero-learn-more"
            >
              Learn More
            </button>
          </div>
        </motion.div>

        {/* AI System Vitals Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-20 max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-card p-6 border-accent-glow/20">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-mono text-accent uppercase tracking-[0.2em]">Agent Activity</span>
                <span className="text-[10px] font-mono text-success animate-pulse uppercase">Live</span>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Task Synthesizer', status: 98 },
                  { name: 'Behavioral Analyzer', status: 84 },
                  { name: 'Difficulty Calibration', status: 92 }
                ].map((agent, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[9px] mb-1 font-mono text-text-muted">
                      <span>{agent.name}</span>
                      <span>{agent.status}%</span>
                    </div>
                    <div className="h-1 bg-surface rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: `${agent.status}%` }} 
                        transition={{ delay: 0.6 + i * 0.1, duration: 1 }}
                        className="h-full bg-accent" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-6 border-accent-glow/20 md:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-mono text-accent uppercase tracking-[0.2em]">Execution Efficiency Trend</span>
                <span className="text-[10px] font-mono text-text-muted">LAST 7 DAYS</span>
              </div>
              <div className="flex items-end justify-between h-20 gap-1.5">
                {[30, 45, 25, 60, 55, 85, 100].map((val, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${val}%` }}
                    transition={{ delay: 0.8 + i * 0.05, duration: 0.8 }}
                    className={`flex-1 rounded-t-sm ${i === 6 ? 'bg-accent glow-accent' : 'bg-accent-glow'}`}
                  />
                ))}
              </div>
              <div className="mt-3 flex justify-between text-[8px] font-mono text-text-muted uppercase tracking-widest">
                <span>Phase 01</span>
                <span className="text-accent">Peak Clarity Reached</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-8 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built for <span className="text-gradient">clarity</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            Every feature is designed to reduce noise and amplify execution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="glass-card p-8 group"
            >
              <div className="w-12 h-12 rounded-xl bg-accent-glow flex items-center justify-center mb-5 group-hover:bg-accent-strong transition-colors duration-300">
                <feature.icon size={22} className="text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-text-secondary leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Execution Loop */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The <span className="text-gradient">Execution Loop</span>
          </h2>
          <p className="text-text-secondary text-lg">Your daily cycle to build consistency.</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4">
          {['Open App', 'View Tasks', 'Execute', 'Reflect', 'Adapt'].map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4"
            >
              <div className="glass-card px-6 py-4 text-center">
                <span className="text-accent text-sm font-mono block mb-1">0{i + 1}</span>
                <span className="font-semibold">{step}</span>
              </div>
              {i < 4 && <ChevronRight size={20} className="text-text-muted hidden md:block" />}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-12 md:p-16 text-center glow-accent"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to stop overthinking?
          </h2>
          <p className="text-text-secondary text-lg mb-8 max-w-lg mx-auto">
            Join ExecuStra and transform from thinking into doing.
          </p>
          <button
            onClick={() => navigate('/register')}
            className="btn-primary text-base px-10 py-4 flex items-center gap-2 mx-auto"
            id="cta-register"
          >
            Start Your Transformation
            <ArrowRight size={18} />
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-8 px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-text-muted">
          <span>© 2026 ExecuStra. All rights reserved.</span>
          <span>Built for executors, not dreamers.</span>
        </div>
      </footer>
    </div>
  )
}
