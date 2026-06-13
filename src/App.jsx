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
  const PageComponent = pages[activePage]

  return (
    <div className="bg-neutral-950 text-neutral-50 flex h-screen overflow-hidden w-screen">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex flex-col flex-1 overflow-auto">
          <PageComponent onNavigate={setActivePage} />
        </main>
      </div>
    </div>
  )
}
