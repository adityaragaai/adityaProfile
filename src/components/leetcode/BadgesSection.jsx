import { motion } from 'framer-motion'
import { Medal, ArrowRight } from 'lucide-react'
import { parseBadges } from '../../lib/leetcode'

const FALLBACK_BADGES = [
  {
    id: '1',
    name: '50 Days Badge 2026',
    icon: 'https://assets.leetcode.com/static_assets/others/2026-50.gif',
    iconGif: '',
    createdAt: '2026-02-01',
  },
  {
    id: '2',
    name: '100 Days Badge 2025',
    icon: 'https://assets.leetcode.com/static_assets/others/2025-100.gif',
    iconGif: '',
    createdAt: '2025-11-10',
  },
  {
    id: '3',
    name: '50 Days Badge 2025',
    icon: 'https://assets.leetcode.com/static_assets/others/2025-50.gif',
    iconGif: '',
    createdAt: '2025-05-20',
  },
]

function BadgeCard({ badge, index, isLatest }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.15 + index * 0.08 }}
      whileHover={{ scale: 1.08, y: -2 }}
      className={`relative flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-colors cursor-default ${
        isLatest
          ? 'bg-[oklch(0.769_0.188_70.08)]/10 border-[oklch(0.769_0.188_70.08)]/30'
          : 'bg-[oklch(0.145_0_0)] border-white/10 hover:border-white/20'
      }`}
    >
      {isLatest && (
        <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[8px] bg-[oklch(0.769_0.188_70.08)] text-black font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
          LATEST
        </span>
      )}
      <div className="size-12 flex items-center justify-center">
        {badge.icon ? (
          <img
            src={badge.iconGif || badge.icon}
            alt={badge.name}
            className="size-10 object-contain"
            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
          />
        ) : null}
        <div
          className="size-10 rounded-full bg-[oklch(0.769_0.188_70.08)]/20 items-center justify-center text-[oklch(0.769_0.188_70.08)]"
          style={{ display: badge.icon ? 'none' : 'flex' }}
        >
          <Medal className="size-5" />
        </div>
      </div>
      <p className="text-[8px] text-[#a1a1a1] text-center leading-tight line-clamp-2 max-w-[70px]">{badge.name}</p>
    </motion.div>
  )
}

export default function BadgesSection({ badges: raw, loading }) {
  const { badges } = parseBadges(raw) || { badges: [] }
  const display = badges.length ? badges.slice(0, 5) : FALLBACK_BADGES

  if (loading) return <BadgesSkeleton />

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="bg-[oklch(0.205_0_0)] rounded-2xl border border-white/10 p-5 flex flex-col gap-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Medal className="size-4 text-[oklch(0.769_0.188_70.08)]" />
          <span className="font-semibold text-neutral-50 text-sm">Badges</span>
          <span className="font-mono text-[oklch(0.769_0.188_70.08)] text-sm font-bold">{display.length}</span>
        </div>
        <ArrowRight className="size-4 text-[#a1a1a1]" />
      </div>

      {/* Badge grid */}
      <div className="flex gap-2 flex-wrap">
        {display.map((badge, i) => (
          <BadgeCard key={badge.id} badge={badge} index={i} isLatest={i === 0} />
        ))}
      </div>

      {/* Latest badge name */}
      {display[0] && (
        <div className="border-t border-white/10 pt-3 flex flex-col gap-0.5">
          <p className="text-[10px] text-[#a1a1a1] uppercase tracking-widest">Most Recent Badge</p>
          <p className="text-sm font-semibold text-neutral-50">{display[0].name}</p>
        </div>
      )}
    </motion.div>
  )
}

function BadgesSkeleton() {
  return (
    <div className="bg-[oklch(0.205_0_0)] rounded-2xl border border-white/10 p-5 animate-pulse flex flex-col gap-4">
      <div className="h-4 bg-[oklch(0.269_0_0)] rounded w-1/4" />
      <div className="flex gap-2">
        {[0,1,2].map(i => <div key={i} className="size-[88px] bg-[oklch(0.269_0_0)] rounded-xl" />)}
      </div>
      <div className="h-8 bg-[oklch(0.269_0_0)] rounded" />
    </div>
  )
}
