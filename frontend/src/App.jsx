import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext.jsx'
import { TaskProvider } from './context/TaskContext.jsx'
import Layout from './components/layout/Layout.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import OnboardingPage from './pages/OnboardingPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import FocusPage from './pages/FocusPage.jsx'
import ReflectionPage from './pages/ReflectionPage.jsx'
import NotebookPage from './pages/NotebookPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import LandingPage from './pages/LandingPage.jsx'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />
  return children
}

function OnboardedRoute({ children }) {
  const { user, isOnboarded, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />
  if (!isOnboarded) return <Navigate to="/onboarding" replace />
  return children
}

export default function App() {
  const { user, isOnboarded } = useAuth()

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={
        user ? (isOnboarded ? <Navigate to="/dashboard" replace /> : <Navigate to="/onboarding" replace />) : <LandingPage />
      } />
      <Route path="/login" element={
        user ? <Navigate to="/dashboard" replace /> : <LoginPage />
      } />
      <Route path="/register" element={
        user ? <Navigate to="/dashboard" replace /> : <RegisterPage />
      } />

      {/* Onboarding */}
      <Route path="/onboarding" element={
        <ProtectedRoute>
          <OnboardingPage />
        </ProtectedRoute>
      } />

      {/* Protected app routes */}
      <Route element={
        <OnboardedRoute>
          <TaskProvider>
            <Layout />
          </TaskProvider>
        </OnboardedRoute>
      }>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/focus" element={<FocusPage />} />
        <Route path="/reflection" element={<ReflectionPage />} />
        <Route path="/notebook" element={<NotebookPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
