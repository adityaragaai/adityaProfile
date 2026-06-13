import { Bell, Search, Settings } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-[oklch(0.205_0_0)] shrink-0 border-white/10 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex px-6 items-center gap-4 h-12">
      <div className="flex items-center gap-1">
        <div className="size-3 bg-[oklch(0.704_0.191_22.216)] rounded-full" />
        <div className="size-3 bg-[oklch(0.769_0.188_70.08)] rounded-full" />
        <div className="size-3 bg-[oklch(0.696_0.17_162.48)] rounded-full" />
      </div>
      <div className="flex items-center flex-1 gap-2">
        <div className="bg-[oklch(0.145_0_0)] rounded-lg text-[#a1a1a1] text-xs leading-4 border-white/10 border-1 border-solid flex px-3 py-1 items-center gap-1 w-64">
          <Search className="size-3" />
          <span>Search workspace...</span>
          <span className="bg-[oklch(0.269_0_0)] rounded-sm text-[10px] ml-auto px-1">⌘K</span>
        </div>
      </div>
      <div className="flex ml-auto items-center gap-3">
        <div className="text-[oklch(0.696_0.17_162.48)] text-[10px] flex items-center gap-1">
          <span className="size-1.5 bg-[oklch(0.696_0.17_162.48)] inline-block rounded-full" />
          All systems operational
        </div>
        <Bell className="size-4 text-[#a1a1a1]" />
        <Settings className="size-4 text-[#a1a1a1]" />
      </div>
    </header>
  )
}
