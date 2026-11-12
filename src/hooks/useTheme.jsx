import { createContext, useCallback, useContext, useLayoutEffect, useState } from 'react'

const ThemeContext = createContext(null)

function getInitialTheme() {
  try {
    const stored = window.localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    // localStorage unavailable — fall through to default
  }
  return 'dark'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)

  // Layout effect (not a passive effect) so the <html> class flips synchronously
  // inside flushSync — the theme toggle's View Transition snapshots right after.
  useLayoutEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light')
    try {
      window.localStorage.setItem('theme', theme)
    } catch {
      // ignore write failures (private browsing, etc.)
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
