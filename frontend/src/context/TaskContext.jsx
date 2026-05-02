import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext.jsx'

const TaskContext = createContext(null)

const generateDailyTasks = (profile) => {
  const taskSets = {
    'AI Engineer': [
      { text: 'Complete 1 Python coding challenge on LeetCode', duration: '25 min', category: 'skill', difficulty: 'Medium' },
      { text: 'Read 1 chapter of ML fundamentals', duration: '30 min', category: 'learning', difficulty: 'Hard' },
      { text: 'Write notes on what you learned today', duration: '10 min', category: 'reflection', difficulty: 'Easy' },
    ],
    'Software Developer': [
      { text: 'Build one small feature or fix a bug in your project', duration: '30 min', category: 'skill', difficulty: 'Hard' },
      { text: 'Watch 1 tutorial on system design basics', duration: '20 min', category: 'learning', difficulty: 'Medium' },
      { text: 'Document your progress in your notebook', duration: '10 min', category: 'reflection', difficulty: 'Easy' },
    ],
    'Data Scientist': [
      { text: 'Clean and explore a dataset using Pandas', duration: '25 min', category: 'skill', difficulty: 'Medium' },
      { text: 'Study 1 statistical concept or algorithm', duration: '20 min', category: 'learning', difficulty: 'Hard' },
      { text: 'Summarize your key insight for the day', duration: '10 min', category: 'reflection', difficulty: 'Easy' },
    ],
    'Designer': [
      { text: 'Recreate 1 UI component from a design you admire', duration: '30 min', category: 'skill', difficulty: 'Hard' },
      { text: 'Study color theory or typography principles', duration: '20 min', category: 'learning', difficulty: 'Medium' },
      { text: 'Reflect on what design decisions worked today', duration: '10 min', category: 'reflection', difficulty: 'Easy' },
    ],
    default: [
      { text: 'Spend 25 minutes on your most important skill', duration: '25 min', category: 'skill', difficulty: 'Medium' },
      { text: 'Learn something new in your field for 20 minutes', duration: '20 min', category: 'learning', difficulty: 'Hard' },
      { text: 'Write a reflection on your progress', duration: '10 min', category: 'reflection', difficulty: 'Easy' },
    ],
  }

  const goal = profile?.goal || 'default'
  const tasks = taskSets[goal] || taskSets.default

  return tasks.map((task, index) => ({
    id: `task-${Date.now()}-${index}`,
    ...task,
    status: 'pending',
    date: new Date().toISOString().split('T')[0],
    completedAt: null,
  }))
}

export function TaskProvider({ children }) {
  const { user } = useAuth()
  const [tasks, setTasks] = useState([])
  const [taskHistory, setTaskHistory] = useState([])

  const [dailyQuote, setDailyQuote] = useState({
    text: "Execution is the only bridge between dreams and reality.",
    author: "ExecuStra"
  })

  const quotes = [
    { text: "Consistency is more important than intensity.", author: "ExecuStra" },
    { text: "Small daily actions lead to massive long-term results.", author: "ExecuStra" },
    { text: "Don't find time, make time. Don't think, execute.", author: "ExecuStra" },
    { text: "Your future is created by what you do today, not tomorrow.", author: "ExecuStra" },
    { text: "Clarity comes from action, not from thinking.", author: "ExecuStra" }
  ]

  useEffect(() => {
    // Pick a random quote for the day
    const day = new Date().getDate()
    setDailyQuote(quotes[day % quotes.length])
  }, [])

  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem('execustra_tasks')
      const storedHistory = localStorage.getItem('execustra_task_history')
      const today = new Date().toISOString().split('T')[0]

      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed.length > 0 && parsed[0].date === today) {
          setTasks(parsed)
        } else {
          // New day — generate new tasks
          if (parsed.length > 0) {
            const prevHistory = storedHistory ? JSON.parse(storedHistory) : []
            prevHistory.push({ date: parsed[0].date, tasks: parsed })
            localStorage.setItem('execustra_task_history', JSON.stringify(prevHistory))
            setTaskHistory(prevHistory)
          }
          const newTasks = generateDailyTasks(user.profile)
          setTasks(newTasks)
          localStorage.setItem('execustra_tasks', JSON.stringify(newTasks))
        }
      } else {
        const newTasks = generateDailyTasks(user.profile)
        setTasks(newTasks)
        localStorage.setItem('execustra_tasks', JSON.stringify(newTasks))
      }

      if (storedHistory) {
        setTaskHistory(JSON.parse(storedHistory))
      }
    }
  }, [user])

  const completeTask = (taskId) => {
    setTasks(prev => {
      const prevTasks = Array.isArray(prev) ? prev : [];
      const updated = prevTasks.map(t =>
        t.id === taskId
          ? { ...t, status: 'completed', completedAt: new Date().toISOString() }
          : t
      )
      localStorage.setItem('execustra_tasks', JSON.stringify(updated))
      return updated
    })
  }

  const skipTask = (taskId) => {
    setTasks(prev => {
      const prevTasks = Array.isArray(prev) ? prev : [];
      const updated = prevTasks.map(t =>
        t.id === taskId ? { ...t, status: 'skipped' } : t
      )
      localStorage.setItem('execustra_tasks', JSON.stringify(updated))
      return updated
    })
  }

  const getCompletionRate = () => {
    const safeTasks = Array.isArray(tasks) ? tasks : [];
    if (safeTasks.length === 0) return 0
    const completed = safeTasks.filter(t => t?.status === 'completed').length
    return Math.round((completed / safeTasks.length) * 100)
  }

  const getStreak = () => {
    let streak = 0
    const safeHistory = Array.isArray(taskHistory) ? taskHistory : [];
    const sortedHistory = [...safeHistory].sort((a, b) =>
      new Date(b.date) - new Date(a.date)
    )
    for (const day of sortedHistory) {
      const safeDayTasks = Array.isArray(day?.tasks) ? day.tasks : [];
      const completed = safeDayTasks.filter(t => t?.status === 'completed').length
      if (safeDayTasks.length > 0 && completed >= Math.ceil(safeDayTasks.length / 2)) {
        streak++
      } else {
        break
      }
    }
    // Include today if some tasks completed
    const safeTasks = Array.isArray(tasks) ? tasks : [];
    const todayCompleted = safeTasks.filter(t => t?.status === 'completed').length
    if (todayCompleted > 0) streak++
    return streak
  }

  return (
    <TaskContext.Provider value={{
      tasks,
      taskHistory,
      completeTask,
      skipTask,
      getCompletionRate,
      getStreak,
    }}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider')
  }
  return context
}
