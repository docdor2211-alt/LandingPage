import { useEffect, useState } from 'react'
import Home from './pages/Home'

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false

    const savedTheme = window.localStorage.getItem('docdor-theme')
    if (savedTheme) return savedTheme === 'dark'

    return false
  })

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', isDarkMode)
    root.style.colorScheme = isDarkMode ? 'dark' : 'light'
    window.localStorage.setItem('docdor-theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  return (
    <Home
      isDarkMode={isDarkMode}
      toggleTheme={() => setIsDarkMode((prev) => !prev)}
    />
  )
}

export default App