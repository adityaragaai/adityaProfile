import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Experience from './pages/Experience'
import Education from './pages/Education'
import LeetCode from './pages/LeetCode'
import Contact from './pages/Contact'

const pages = {
  dashboard: Dashboard,
  projects: Projects,
  experience: Experience,
  about: Education,
  leetcode: LeetCode,
  contact: Contact,
}

export default function App() {
  const [activePage, setActivePage] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const PageComponent = pages[activePage]

  function navigate(page) {
    setActivePage(page)
    setSidebarOpen(false)
  }

  return (
    <div className="bg-neutral-950 text-neutral-50 flex h-screen overflow-hidden w-screen">
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
