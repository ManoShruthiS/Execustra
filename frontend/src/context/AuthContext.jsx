import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isOnboarded, setIsOnboarded] = useState(false)

  useEffect(() => {
    // Check for stored session
    const stored = localStorage.getItem('execustra_user')
    if (stored) {
      const parsed = JSON.parse(stored)
      setUser(parsed)
      setIsOnboarded(parsed.isOnboarded || false)
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    // TODO: Replace with Supabase auth
    const mockUser = {
      id: crypto.randomUUID(),
      email,
      created_at: new Date().toISOString(),
      isOnboarded: false,
    }
    setUser(mockUser)
    localStorage.setItem('execustra_user', JSON.stringify(mockUser))
    return mockUser
  }

  const register = async (email, password) => {
    const mockUser = {
      id: crypto.randomUUID(),
      email,
      created_at: new Date().toISOString(),
      isOnboarded: false,
    }
    setUser(mockUser)
    localStorage.setItem('execustra_user', JSON.stringify(mockUser))
    return mockUser
  }

  const completeOnboarding = (profileData) => {
    const updated = { ...user, isOnboarded: true, profile: profileData }
    setUser(updated)
    setIsOnboarded(true)
    localStorage.setItem('execustra_user', JSON.stringify(updated))
  }

  const logout = () => {
    setUser(null)
    setIsOnboarded(false)
    localStorage.removeItem('execustra_user')
    localStorage.removeItem('execustra_tasks')
    localStorage.removeItem('execustra_reflections')
    localStorage.removeItem('execustra_notebooks')
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isOnboarded,
      login,
      register,
      logout,
      completeOnboarding,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
