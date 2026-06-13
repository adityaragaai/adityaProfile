import { Briefcase, Code2, LayoutDashboard, Mail, Network, Terminal, User, Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'
import profileImg from '../assets/profile.jpg'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'projects', label: 'Projects', icon: Code2 },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'leetcode', label: 'LeetCode', icon: Trophy },
  { id: 'about', label: 'About', icon: User },
  { id: 'contact', label: 'Contact', icon: Mail },
  { id: 'systems', label: 'Systems', icon: Network },
  { id: 'logs', label: 'Logs', icon: Terminal },
]

const navigablePages = new Set(['dashboard', 'projects', 'experience', 'about', 'leetcode', 'contact'])

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="min-h-screen bg-[oklch(0.205_0_0)] shrink-0 border-white/10 border-t-0 border-r-1 border-b-0 border-l-0 border-solid flex p-4 flex-col gap-1 w-56">
      <div className="flex mb-4 px-2 py-3 items-center gap-2">
        <div className="size-7 bg-[oklch(0.488_0.243_264.376)] rounded-lg flex justify-center items-center">
          <Terminal className="size-4 text-white" />
        </div>
        <div>
          <p className="font-bold uppercase text-neutral-50 text-xs leading-4 tracking-widest">devOS</p>
          <p className="text-[#a1a1a1] text-[10px]">v2.4.1 · stable</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = activePage === id
          const isNavigable = navigablePages.has(id)
          return (
            <button
              key={id}
              onClick={() => isNavigable && onNavigate(id)}
              className={cn(
                'text-left rounded-lg text-sm leading-5 flex px-3 py-2 items-center gap-2 w-full transition-colors',
                isActive ? 'bg-[oklch(0.269_0_0)] font-medium text-neutral-50' : 'text-[#a1a1a1]',
                !isNavigable && 'cursor-default'
              )}
            >
              <Icon
                className={cn(
                  'size-4',
                  isActive && id === 'leetcode' && 'text-[oklch(0.769_0.188_70.08)]',
                  isActive && id !== 'leetcode' && 'text-[oklch(0.488_0.243_264.376)]',
                )}
              />
              {label}
            </button>
          )
        })}
      </nav>

      <div className="flex mt-auto flex-col gap-2">
        <div className="bg-[oklch(0.269_0_0)] rounded-lg flex p-3 flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="uppercase text-[#a1a1a1] text-[10px] tracking-widest">System</span>
            <span className="size-2 bg-[oklch(0.696_0.17_162.48)] inline-block rounded-full" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-[10px] flex justify-between">
              <span className="text-[#a1a1a1]">CPU</span>
              <span className="text-neutral-50">12%</span>
            </div>
            <div className="bg-[oklch(0.145_0_0)] rounded-full h-1 overflow-hidden">
              <div className="w-[12%] bg-[oklch(0.488_0.243_264.376)] rounded-full h-full" />
            </div>
            <div className="text-[10px] flex justify-between">
              <span className="text-[#a1a1a1]">RAM</span>
              <span className="text-neutral-50">68%</span>
            </div>
            <div className="bg-[oklch(0.145_0_0)] rounded-full h-1 overflow-hidden">
              <div className="w-[68%] bg-[oklch(0.696_0.17_162.48)] rounded-full h-full" />
            </div>
          </div>
        </div>
        <div className="flex px-2 items-center gap-2">
          <img src={profileImg} alt="Aditya Gupta" className="size-6 rounded-full object-cover object-top" />
          <div>
            <p className="font-medium text-neutral-50 text-xs leading-4">Aditya Gupta</p>
            <p className="text-[#a1a1a1] text-[10px]">Full-Stack Developer</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
