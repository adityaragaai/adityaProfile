import { useState, useEffect, useCallback } from 'react'
import { Activity, RefreshCw } from 'lucide-react'

const GH_COLORS    = ['#1e2a1e', '#0e4429', '#006d32', '#26a641', '#39d353']
const MONTH_LABELS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const DAY_LABELS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

function useContributions(username) {
  const [contributions, setContributions] = useState([])
  const [total, setTotal]   = useState(0)
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res  = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
        { signal: AbortSignal.timeout(12000) }
      )
      if (!res.ok) throw new Error()
      const json = await res.json()
      setContributions(json.contributions || [])
      const t = json.total || {}
      setTotal(Object.values(t).reduce((a, b) => a + b, 0))
    } catch {
      // keep empty — show zeros
    } finally {
      setLoading(false)
    }
  }, [username])

  useEffect(() => {
    load()
    const timer = setInterval(load, 5 * 60 * 1000)
    return () => clearInterval(timer)
  }, [load])

  return { contributions, total, loading, refresh: load }
}

function buildWeeks(contributions, weeksCount = 18) {
  if (!contributions.length) return []
  const today = new Date().toISOString().slice(0, 10)
  const recent = contributions
    .filter(c => c.date <= today)
    .slice(-weeksCount * 7)

  const weeks = []
  let week = []
  const firstDow = new Date(recent[0]?.date || today).getDay()
  for (let i = 0; i < firstDow; i++) week.push(null)
  for (const day of recent) {
    if (week.length === 7) { weeks.push(week); week = [] }
    week.push(day)
  }
  while (week.length < 7) week.push(null)
  if (week.some(d => d)) weeks.push(week)
  return weeks
}

function HeatCell({ day, size = 12 }) {
  const [tip, setTip] = useState(false)
  if (!day) return <div style={{ width: size, height: size, margin: 1.5 }} />
  const color = GH_COLORS[day.level ?? 0]
  const label = day.date
    ? new Date(day.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    : ''
  return (
    <div className="relative">
      <div
        onMouseEnter={() => setTip(true)}
        onMouseLeave={() => setTip(false)}
        className="cursor-default hover:brightness-125 transition-all duration-100"
        style={{ width: size, height: size, margin: 1.5, backgroundColor: color, borderRadius: 3 }}
      />
      {tip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 z-50 pointer-events-none
                        bg-[oklch(0.145_0_0)] border border-white/20 rounded-lg px-2 py-1
                        text-[9px] whitespace-nowrap shadow-xl">
          <span className="text-neutral-50 font-semibold">{day.count}</span>
          <span className="text-[#a1a1a1]"> · {label}</span>
        </div>
      )}
    </div>
  )
}

export default function CommitHeatmap({ username = 'adityaragaai', weeksCount = 18 }) {
  const { contributions, total, loading, refresh } = useContributions(username)
  const weeks = buildWeeks(contributions, weeksCount)

  // Month labels
  const monthPositions = []
  const seen = new Set()
  weeks.forEach((week, wi) => {
    const first = week.find(d => d)
    if (!first) return
    const m = new Date(first.date + 'T12:00:00').getMonth()
    if (!seen.has(m)) { seen.add(m); monthPositions.push({ wi, label: MONTH_LABELS[m] }) }
  })

  return (
    <div className="flex flex-col gap-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="size-4 text-[oklch(0.696_0.17_162.48)]" />
          <span className="font-semibold text-neutral-50 text-sm leading-5">Commit Activity</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#a1a1a1] text-[10px]">
            {loading ? '…' : <><span className="text-neutral-50 font-medium">{total}</span> this year</>}
          </span>
          <button onClick={refresh} className="text-[#a1a1a1] hover:text-neutral-50 transition-colors">
            <RefreshCw className={`size-3 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="h-24 bg-[oklch(0.269_0_0)] rounded-lg animate-pulse" />
      ) : (
        <div className="overflow-x-auto">
          <div className="inline-flex flex-col gap-0" style={{ minWidth: 'max-content' }}>
            {/* Month labels */}
            <div className="flex mb-1 ml-7">
              {weeks.map((_, wi) => {
                const mp = monthPositions.find(m => m.wi === wi)
                return (
                  <div key={wi} style={{ width: 15 }} className="text-[9px] text-[#a1a1a1]">
                    {mp?.label || ''}
                  </div>
                )
              })}
            </div>
            {/* Day labels + cells */}
            <div className="flex gap-0">
              <div className="flex flex-col mr-0.5">
                {DAY_LABELS.map((d, i) => (
                  <div key={i} className="text-[8px] text-[#a1a1a1] flex items-center justify-end pr-1"
                    style={{ height: 15, lineHeight: 1 }}>
                    {i === 1 || i === 3 || i === 5 ? d : ''}
                  </div>
                ))}
              </div>
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col">
                  {week.map((day, di) => <HeatCell key={di} day={day} size={12} />)}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      {!loading && (
        <div className="flex items-center justify-end gap-1 mt-0.5">
          <span className="text-[8px] text-[#a1a1a1]">Less</span>
          {GH_COLORS.map((c, i) => (
            <div key={i} style={{ width: 10, height: 10, backgroundColor: c, borderRadius: 2, border: '1px solid rgba(255,255,255,0.05)' }} />
          ))}
          <span className="text-[8px] text-[#a1a1a1]">More</span>
        </div>
      )}
    </div>
  )
}
