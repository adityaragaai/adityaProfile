import { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Experience from './pages/Experience'
import Education from './pages/Education'
import LeetCode from './pages/LeetCode'
import Contact from './pages/Contact'
import { pageFromPath, PAGE_PATHS, PAGE_TITLES } from './lib/routes'

const pages = {
  dashboard: Dashboard,
  projects: Projects,
  experience: Experience,
  about: Education,
  leetcode: LeetCode,
  contact: Contact,
}

export default function App() {
  const [activePage, setActivePage] = useState(() => pageFromPath(window.location.pathname))
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const PageComponent = pages[activePage]

  // Normalise unknown URLs to "/" and keep the browser back/forward buttons in sync.
  useEffect(() => {
    if (window.location.pathname !== PAGE_PATHS[activePage]) {
      window.history.replaceState(null, '', PAGE_PATHS[activePage])
    }
    const onPopState = () => setActivePage(pageFromPath(window.location.pathname))
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
    // Only on mount: later changes go through navigate() or popstate.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    document.title = PAGE_TITLES[activePage]
  }, [activePage])

  function navigate(page) {
    if (!pages[page]) return
    if (page !== activePage) {
      window.history.pushState(null, '', PAGE_PATHS[page])
      setActivePage(page)
    }
    setSidebarOpen(false)
  }

  return (
    <div className="bg-[var(--bg-app)] text-[var(--text-primary)] flex h-screen overflow-hidden w-screen">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <Sidebar activePage={activePage} onNavigate={navigate} isOpen={sidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <Header onMenuClick={() => setSidebarOpen(o => !o)} />
        <main className="flex flex-col flex-1 overflow-auto">
          <PageComponent onNavigate={navigate} />
        </main>
      </div>
    </div>
  )
}
