import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Zap } from 'lucide-react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { parseProfile } from '../../lib/leetcode'
import { useCountUp } from '../../hooks/useLeetCode'

const COLORS = {
  easy:   '#00B8A3',
  medium: '#FFC01E',
  hard:   '#FF375F',
  bg:     'var(--bg-elevated)',
}

const FALLBACK = {
  solved:        { total: 402, easy: 234, medium: 155, hard: 13 },
  totalProblems: { total: 3949, easy: 947, medium: 2063, hard: 939 },
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const d = payload[0]
  if (d.name === 'Remaining') return null
  return (
    <div className="bg-[var(--bg-inset)] border border-[var(--line-10)] rounded-lg px-3 py-1.5 text-xs">
      <span style={{ color: d.payload.fill }} className="font-semibold">{d.name}: {d.value}</span>
    </div>
  )
}

function DiffBar({ label, solved, total, color }) {
  const pct = total ? (solved / total) * 100 : 0
  const count = useCountUp(solved, 1000, true)
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <span className="text-xs font-medium" style={{ color }}>{label}</span>
        <span className="text-xs text-[var(--text-secondary)]">
          <span className="text-[var(--text-primary)] font-semibold">{count}</span>
          <span className="text-[var(--text-secondary)]">/{total}</span>
        </span>
      </div>
      <div className="bg-[var(--bg-elevated)] rounded-full h-1.5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  )
}

export default function ProblemStats({ profile: raw, loading }) {
  const profile = parseProfile(raw)
  const { solved, totalProblems } = profile || FALLBACK

  const totalSolved  = useCountUp(solved.total,  1200, !loading)
  const totalProbs   = totalProblems.total

  const pieData = [
    { name: 'Easy',      value: solved.easy,   fill: COLORS.easy   },
    { name: 'Medium',    value: solved.medium,  fill: COLORS.medium },
    { name: 'Hard',      value: solved.hard,    fill: COLORS.hard   },
    { name: 'Remaining', value: totalProbs - solved.total, fill: COLORS.bg },
  ]

  if (loading) return <StatsSkeleton />

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-[var(--bg-panel)] rounded-2xl border border-[var(--line-10)] p-5 flex flex-col gap-4"
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <CheckCircle2 className="size-4 text-[oklch(0.696_0.17_162.48)]" />
        <span className="font-semibold text-[var(--text-primary)] text-sm">Problem Solving</span>
      </div>

      <div className="flex items-center gap-4">
        {/* Donut chart */}
        <div className="relative shrink-0">
          <ResponsiveContainer width={130} height={130}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={42}
                outerRadius={58}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                strokeWidth={0}
                isAnimationActive
                animationBegin={0}
                animationDuration={1200}
              >
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          {/* Center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="font-bold text-[var(--text-primary)] text-xl leading-tight">{totalSolved}</p>
            <p className="text-[var(--text-secondary)] text-[9px] font-mono">/{totalProbs}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <Zap className="size-2.5 text-[oklch(0.696_0.17_162.48)]" />
              <span className="text-[oklch(0.696_0.17_162.48)] text-[8px]">Solved</span>
            </div>
          </div>
        </div>

        {/* Difficulty breakdown */}
        <div className="flex-1 flex flex-col gap-2.5">
          <DiffBar label="Easy"   solved={solved.easy}   total={totalProblems.easy}   color={COLORS.easy} />
          <DiffBar label="Medium" solved={solved.medium} total={totalProblems.medium} color={COLORS.medium} />
          <DiffBar label="Hard"   solved={solved.hard}   total={totalProblems.hard}   color={COLORS.hard} />
        </div>
      </div>

      {/* Acceptance rate mini footer */}
      <div className="border-t border-[var(--line-10)] pt-3 flex items-center justify-between">
        <span className="text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">Acceptance</span>
        <AcceptanceRate solved={solved} total={totalProblems} />
      </div>
    </motion.div>
  )
}

function AcceptanceRate({ solved, total }) {
  const rate = total.total ? ((solved.total / total.total) * 100).toFixed(1) : '0.0'
  return (
    <span className="text-xs font-semibold text-[oklch(0.769_0.188_70.08)]">{rate}% acceptance</span>
  )
}

function StatsSkeleton() {
  return (
    <div className="bg-[var(--bg-panel)] rounded-2xl border border-[var(--line-10)] p-5 animate-pulse flex flex-col gap-4">
      <div className="h-4 bg-[var(--bg-elevated)] rounded w-1/3" />
      <div className="flex items-center gap-4">
        <div className="size-[130px] rounded-full bg-[var(--bg-elevated)]" />
        <div className="flex-1 flex flex-col gap-2.5">
          {[0,1,2].map(i => <div key={i} className="h-5 bg-[var(--bg-elevated)] rounded" />)}
        </div>
      </div>
    </div>
  )
}
