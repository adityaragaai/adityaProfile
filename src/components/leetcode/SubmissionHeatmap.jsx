import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Activity, Flame, Calendar } from 'lucide-react'
import {
  generateHeatmapWeeks,
  heatIntensity,
  totalSubmissionsLastYear,
} from '../../lib/leetcode'

const INTENSITY_COLORS = [
  '#1a1f2e',   // 0 – empty
  '#0e4429',   // 1 – very low
  '#006d32',   // 2 – low
  '#26a641',   // 3 – medium
  '#39d353',   // 4 – high
]

const MONTH_LABELS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const DAY_LABELS   = ['S','M','T','W','T','F','S']

function Cell({ day, size = 10, gap = 2 }) {
  const [tooltip, setTooltip] = useState(false)
  const level = heatIntensity(day.count)
  const color = INTENSITY_COLORS[level]
  const dateStr = day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <div className="relative group">
      <div
        onMouseEnter={() => setTooltip(true)}
        onMouseLeave={() => setTooltip(false)}
        className="rounded-sm transition-all duration-150 group-hover:ring-1 group-hover:ring-white/30 cursor-default"
        style={{ width: size, height: size, backgroundColor: color, margin: gap / 2 }}
      />
      {tooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 z-50 pointer-events-none
                        bg-[oklch(0.145_0_0)] border border-white/20 rounded-lg px-2.5 py-1.5
                        text-[10px] whitespace-nowrap shadow-xl">
          <p className="font-semibold text-neutral-50">{day.count} submission{day.count !== 1 ? 's' : ''}</p>
          <p className="text-[#a1a1a1]">{dateStr}</p>
        </div>
      )}
    </div>
  )
}

export default function SubmissionHeatmap({ submissionCalendar, calendarMeta, loading }) {
  const cal    = submissionCalendar || {}
  const meta   = calendarMeta || {}
  const weeks  = useMemo(() => generateHeatmapWeeks(cal, 53), [cal])
  const total  = useMemo(() => totalSubmissionsLastYear(cal), [cal])
  const streak = meta.streak || 15
  const active = meta.totalActiveDays || 189

  // Month label positions
  const monthPositions = useMemo(() => {
    const seen = new Set()
    return weeks.map((week, wi) => {
      const month = week[0]?.date.getMonth()
      if (month !== undefined && !seen.has(month)) {
        seen.add(month)
        return { wi, label: MONTH_LABELS[month] }
      }
      return null
    }).filter(Boolean)
  }, [weeks])

  if (loading) return <HeatmapSkeleton />

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="bg-[oklch(0.205_0_0)] rounded-2xl border border-white/10 p-5 flex flex-col gap-4"
    >
      {/* Header row */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Activity className="size-4 text-[oklch(0.696_0.17_162.48)]" />
          <span className="font-semibold text-neutral-50 text-sm">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-[oklch(0.696_0.17_162.48)] font-bold"
            >
              {total}
            </motion.span>
            {' '}submissions in the past one year
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Stat icon={<Calendar className="size-3 text-[#a1a1a1]" />} label="Total active days" value={active} />
          <Stat icon={<Flame className="size-3 text-[oklch(0.769_0.188_70.08)]" />} label="Max streak" value={streak} />
        </div>
      </div>

      {/* Heatmap grid */}
      <div className="overflow-x-auto">
        <div className="inline-flex flex-col gap-0" style={{ minWidth: 'max-content' }}>
          {/* Month labels */}
          <div className="flex mb-1 ml-6">
            {weeks.map((_, wi) => {
              const mp = monthPositions.find(m => m.wi === wi)
              return (
                <div key={wi} style={{ width: 14 }} className="text-[9px] text-[#a1a1a1] text-center">
                  {mp?.label || ''}
                </div>
              )
            })}
          </div>

          {/* Grid rows (7 days) */}
          <div className="flex gap-0">
            {/* Day labels */}
            <div className="flex flex-col mr-1" style={{ gap: 2 }}>
              {DAY_LABELS.map((d, i) => (
                <div key={i} className="text-[9px] text-[#a1a1a1] flex items-center justify-end pr-1" style={{ height: 12, lineHeight: 1 }}>
                  {i % 2 === 1 ? d : ''}
                </div>
              ))}
            </div>
            {/* Cells */}
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col" style={{ gap: 2 }}>
                {week.map((day, di) => (
                  <Cell key={di} day={day} size={10} gap={2} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-1.5">
        <span className="text-[10px] text-[#a1a1a1]">Less</span>
        {INTENSITY_COLORS.map((c, i) => (
          <div
            key={i}
            className="rounded-sm"
            style={{ width: 10, height: 10, backgroundColor: c, border: '1px solid rgba(255,255,255,0.08)' }}
          />
        ))}
        <span className="text-[10px] text-[#a1a1a1]">More</span>
      </div>
    </motion.div>
  )
}

function Stat({ icon, label, value }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-[#a1a1a1]">
      {icon}
      <span>{label}:</span>
      <span className="font-semibold text-neutral-50">{value}</span>
    </div>
  )
}

function HeatmapSkeleton() {
  return (
    <div className="bg-[oklch(0.205_0_0)] rounded-2xl border border-white/10 p-5 animate-pulse flex flex-col gap-4">
      <div className="h-4 bg-[oklch(0.269_0_0)] rounded w-1/2" />
      <div className="h-28 bg-[oklch(0.269_0_0)] rounded-xl" />
    </div>
  )
}
