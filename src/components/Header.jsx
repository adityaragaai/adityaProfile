import { Bell, Menu, Moon, Search, Settings, Sun } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'

export default function Header({ onMenuClick }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="bg-[var(--bg-panel)] shrink-0 border-[var(--line-10)] border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex px-4 md:px-6 items-center gap-3 md:gap-4 h-12">
      {/* Hamburger — mobile only */}
      <button
        onClick={onMenuClick}
        className="md:hidden text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors p-1 -ml-1"
        aria-label="Toggle menu"
      >
        <Menu className="size-5" />
      </button>

      <div className="hidden md:flex items-center gap-1">
        <div className="size-3 bg-[oklch(0.704_0.191_22.216)] rounded-full" />
        <div className="size-3 bg-[oklch(0.769_0.188_70.08)] rounded-full" />
        <div className="size-3 bg-[oklch(0.696_0.17_162.48)] rounded-full" />
      </div>

      <div className="flex items-center flex-1 gap-2">
        <div className="bg-[var(--bg-inset)] rounded-lg text-[var(--text-secondary)] text-xs leading-4 border-[var(--line-10)] border-1 border-solid flex px-3 py-1 items-center gap-1 w-full max-w-[260px]">
          <Search className="size-3 shrink-0" />
          <span className="truncate">Search workspace...</span>
          <span className="bg-[var(--bg-elevated)] rounded-sm text-[10px] ml-auto px-1 hidden sm:inline">⌘K</span>
        </div>
      </div>

      <div className="flex ml-auto items-center gap-2 md:gap-3">
        <div className="text-[oklch(0.696_0.17_162.48)] text-[10px] hidden sm:flex items-center gap-1">
          <span className="size-1.5 bg-[oklch(0.696_0.17_162.48)] inline-block rounded-full" />
          All systems operational
        </div>
        <button
          onClick={toggleTheme}
          className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors p-1"
          aria-label="Toggle color theme"
          title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </button>
        <Bell className="size-4 text-[var(--text-secondary)]" />
        <Settings className="size-4 text-[var(--text-secondary)]" />
      </div>
    </header>
  )
}
