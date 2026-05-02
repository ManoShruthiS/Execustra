import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Target,
  BookOpen,
  PenLine,
  User,
  LogOut,
  Zap,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'

const navItems = [
  { path: '/dashboard', label: 'Today', icon: LayoutDashboard },
  { path: '/focus', label: 'Focus', icon: Target },
  { path: '/reflection', label: 'Reflect', icon: PenLine },
  { path: '/notebook', label: 'Notes', icon: BookOpen },
  { path: '/profile', label: 'Profile', icon: User },
]

export default function Layout() {
  const { logout, user } = useAuth()
  const location = useLocation()

  return (
    <div className="min-h-screen flex bg-bg">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-[72px] bg-surface border-r border-border flex flex-col items-center py-6 z-50">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-10 h-10 rounded-xl overflow-hidden glow-accent">
            <img src="/logo.png" alt="ExecuStra Logo" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col items-center gap-2">
          {navItems.map(({ path, label, icon: Icon }) => {
            const isActive = location.pathname === path
            return (
              <NavLink
                key={path}
                to={path}
                className="relative group"
                id={`nav-${label.toLowerCase()}`}
              >
                <div className={`
                  w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300
                  ${isActive
                    ? 'bg-accent-glow text-accent'
                    : 'text-text-muted hover:text-text-secondary hover:bg-surface-elevated'
                  }
                `}>
                  <Icon size={20} />
                </div>
                {/* Tooltip */}
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-surface-elevated border border-border rounded-lg text-xs font-medium text-text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  {label}
                </div>
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -left-[1px] top-1/2 -translate-y-1/2 w-[3px] h-6 bg-accent rounded-r-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </NavLink>
            )
          })}
        </nav>

        {/* Logout */}
        <button
          onClick={logout}
          className="w-11 h-11 rounded-xl flex items-center justify-center text-text-muted hover:text-error hover:bg-error-dim transition-all duration-300"
          id="nav-logout"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </aside>

      {/* Main Content */}
      <main className="ml-[72px] flex-1 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="min-h-screen"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
