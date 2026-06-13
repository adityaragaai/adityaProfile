import { motion } from 'framer-motion'
import { TrendingUp, Trophy, Users, Award } from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  ReferenceLine, CartesianGrid,
} from 'recharts'
import { parseContest } from '../../lib/leetcode'
import { useCountUp } from '../../hooks/useLeetCode'

const FALLBACK = {
  attended: 7,
  rating: 1301,
  globalRanking: 849478,
  totalParticipants: 874223,
  topPercentage: 97.21,
  history: [
    { index: 1, title: 'Weekly Contest 400', rating: 1500, ranking: 12000 },
    { index: 2, title: 'Weekly Contest 405', rating: 1450, ranking: 14000 },
    { index: 3, title: 'Biweekly Contest 130', rating: 1420, ranking: 16000 },
    { index: 4, title: 'Weekly Contest 412', rating: 1380, ranking: 18000 },
    { index: 5, title: 'Weekly Contest 418', rating: 1340, ranking: 20000 },
    { index: 6, title: 'Biweekly Contest 135', rating: 1310, ranking: 22000 },
    { index: 7, title: 'Weekly Contest 423', rating: 1301, ranking: 24000 },
  ],
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[oklch(0.145_0_0)] border border-white/10 rounded-lg px-3 py-2 text-xs">
      <p className="text-[#a1a1a1] mb-1 font-mono">#{label}</p>
      <p className="text-[oklch(0.769_0.188_70.08)] font-bold">{payload[0].value} pts</p>
    </div>
  )
}

export default function ContestAnalytics({ contest: raw, loading }) {
  const c = parseContest(raw) || FALLBACK
  const rating = useCountUp(c.rating, 1200, !loading)
  const rank   = useCountUp(c.globalRanking, 1400, !loading)

  const chartData = c.history.map((h, i) => ({ label: i + 1, rating: h.rating }))

  if (loading) return <ContestSkeleton />

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-[oklch(0.205_0_0)] rounded-2xl border border-white/10 p-5 flex flex-col gap-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="size-4 text-[oklch(0.769_0.188_70.08)]" />
          <span className="font-semibold text-neutral-50 text-sm">Contest Analytics</span>
        </div>
        <span className="text-[oklch(0.769_0.188_70.08)] bg-[oklch(0.769_0.188_70.08)]/10 border border-[oklch(0.769_0.188_70.08)]/20 rounded-full text-[10px] px-2 py-0.5">
          {c.attended} attended
        </span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <StatBox
          icon={<Award className="size-3.5 text-[oklch(0.769_0.188_70.08)]" />}
          label="Contest Rating"
          value={rating.toLocaleString()}
          accent="oklch(0.769 0.188 70.08)"
          big
        />
        <StatBox
          icon={<Users className="size-3.5 text-[oklch(0.488_0.243_264.376)]" />}
          label="Global Rank"
          value={`${rank.toLocaleString()} / ${c.totalParticipants.toLocaleString()}`}
          accent="oklch(0.488 0.243 264.376)"
        />
        <StatBox
          icon={<TrendingUp className="size-3.5 text-[oklch(0.696_0.17_162.48)]" />}
          label="Top Percentage"
          value={`${c.topPercentage.toFixed(2)}%`}
          accent="oklch(0.696 0.17 162.48)"
        />
      </div>

      {/* Rating chart */}
      {chartData.length > 1 && (
        <div>
          <p className="text-[#a1a1a1] text-[10px] uppercase tracking-widest mb-2">Rating History</p>
          <ResponsiveContainer width="100%" height={110}>
            <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -32, bottom: 0 }}>
              <defs>
                <linearGradient id="contestGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.769 0.188 70.08)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="oklch(0.769 0.188 70.08)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 9, fill: '#a1a1a1' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 9, fill: '#a1a1a1' }}
                axisLine={false}
                tickLine={false}
                domain={['auto', 'auto']}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }} />
              <ReferenceLine
                y={c.rating}
                stroke="oklch(0.769 0.188 70.08)"
                strokeDasharray="4 4"
                strokeOpacity={0.3}
              />
              <Area
                type="monotone"
                dataKey="rating"
                stroke="oklch(0.769 0.188 70.08)"
                strokeWidth={2}
                fill="url(#contestGrad)"
                dot={{ r: 3, fill: 'oklch(0.769 0.188 70.08)', strokeWidth: 0 }}
                activeDot={{ r: 5, fill: 'oklch(0.769 0.188 70.08)', stroke: 'white', strokeWidth: 1.5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.div>
  )
}

function StatBox({ icon, label, value, accent, big }) {
  return (
    <div
      className="rounded-xl p-3 flex flex-col gap-1 border border-white/5"
      style={{ background: `color-mix(in oklch, ${accent} 6%, oklch(0.145 0 0))` }}
    >
      <div className="flex items-center gap-1.5">
        {icon}
        <span className="text-[#a1a1a1] text-[10px] uppercase tracking-wider">{label}</span>
      </div>
      <p className={`font-bold text-neutral-50 ${big ? 'text-2xl' : 'text-sm'} leading-tight`}>{value}</p>
    </div>
  )
}

function ContestSkeleton() {
  return (
    <div className="bg-[oklch(0.205_0_0)] rounded-2xl border border-white/10 p-5 animate-pulse flex flex-col gap-4">
      <div className="h-4 bg-[oklch(0.269_0_0)] rounded w-1/3" />
      <div className="grid grid-cols-3 gap-3">
        {[0,1,2].map(i => <div key={i} className="h-16 bg-[oklch(0.269_0_0)] rounded-xl" />)}
      </div>
      <div className="h-28 bg-[oklch(0.269_0_0)] rounded-xl" />
    </div>
  )
}
