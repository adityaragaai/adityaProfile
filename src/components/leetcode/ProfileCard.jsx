import { motion } from 'framer-motion'
import { MapPin, Link, Building2, RefreshCw, Wifi, WifiOff, ExternalLink } from 'lucide-react'
import profileImg from '../../assets/profile.jpg'
import { parseProfile } from '../../lib/leetcode'
import { useCountUp } from '../../hooks/useLeetCode'

function SkillTag({ label }) {
  return (
    <span className="bg-[var(--bg-elevated)] text-[var(--text-secondary)] rounded-full text-[10px] px-2 py-0.5 border border-[var(--line-5)]">
      {label}
    </span>
  )
}

function StatPill({ label, value }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="font-semibold text-[var(--text-primary)] text-sm">{value}</span>
      <span className="text-[var(--text-secondary)] text-[10px]">{label}</span>
    </div>
  )
}

export default function ProfileCard({ profile: raw, loading, error, onRefresh, lastUpdated }) {
  const profile = parseProfile(raw)

  // Use real data or vivid fallback
  const p = profile || {
    username: 'rahul860152gupta',
    name: 'Aditya Gupta',
    avatar: '',
    ranking: 290536,
    country: 'India',
    company: 'Lovely Professional University',
    github: 'Adityaguptawebdev',
    linkedin: 'adityagupta-swe',
    skillTags: ['html', 'css', 'javascript', 'java', 'react-16'],
    solved: { total: 402, easy: 234, medium: 155, hard: 13 },
    totalProblems: { total: 3949 },
    calendar: { streak: 15, totalActiveDays: 189 },
  }

  const rankDisplay = useCountUp(p.ranking, 1400, !loading)

  if (loading) return <ProfileSkeleton />

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-4 w-full"
    >
      {/* Avatar + name */}
      <div className="bg-[var(--bg-panel)] rounded-2xl border border-[var(--line-10)] p-5 flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <div className="relative shrink-0">
            <img
              src={p.avatar || profileImg}
              alt={p.name}
              className="size-16 rounded-xl object-cover ring-2 ring-[oklch(0.769_0.188_70.08)]/40"
              style={{ objectPosition: 'center 25%' }}
            />
            <span className="absolute -bottom-1 -right-1 size-3.5 bg-[oklch(0.696_0.17_162.48)] rounded-full border-2 border-[var(--bg-panel)]" />
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <h2 className="font-bold text-[var(--text-primary)] text-base leading-tight truncate">{p.name}</h2>
            <p className="text-[oklch(0.769_0.188_70.08)] text-xs font-mono">@{p.username}</p>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-[var(--text-secondary)] text-[10px]">Rank</span>
              <span className="font-semibold text-[var(--text-primary)] text-[10px]">
                {rankDisplay.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex justify-around border-t border-[var(--line-10)] pt-3">
          <StatPill label="Solved" value={p.solved.total} />
          <div className="w-px bg-[var(--line-10)]" />
          <StatPill label="Streak" value={`${p.calendar.streak}d`} />
          <div className="w-px bg-[var(--line-10)]" />
          <StatPill label="Active" value={p.calendar.totalActiveDays} />
        </div>
      </div>

      {/* Info */}
      <div className="bg-[var(--bg-panel)] rounded-2xl border border-[var(--line-10)] p-5 flex flex-col gap-3">
        {p.country && (
          <div className="flex items-center gap-2 text-[var(--text-secondary)] text-xs">
            <MapPin className="size-3.5 text-[oklch(0.769_0.188_70.08)] shrink-0" />
            {p.country}
          </div>
        )}
        {p.company && (
          <div className="flex items-center gap-2 text-[var(--text-secondary)] text-xs">
            <Building2 className="size-3.5 text-[oklch(0.488_0.243_264.376)] shrink-0" />
            <span className="truncate">{p.company}</span>
          </div>
        )}
        {p.github && (
          <a
            href={`https://github.com/${p.github}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs transition-colors"
          >
            <ExternalLink className="size-3.5 shrink-0" />
            GitHub: {p.github}
          </a>
        )}
        {p.linkedin && (
          <a
            href={`https://linkedin.com/in/${p.linkedin}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[oklch(0.488_0.243_264.376)] text-xs transition-colors"
          >
            <Link className="size-3.5 shrink-0" />
            LinkedIn: {p.linkedin}
          </a>
        )}

        {/* Skills */}
        {p.skillTags.length > 0 && (
          <div className="pt-1">
            <p className="text-[var(--text-secondary)] text-[10px] uppercase tracking-widest mb-2">Skills</p>
            <div className="flex flex-wrap gap-1.5">
              {p.skillTags.map((t) => <SkillTag key={t} label={t} />)}
            </div>
          </div>
        )}
      </div>

      {/* Last updated + refresh */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5 text-[10px] text-[var(--text-secondary)]">
          {error ? (
            <><WifiOff className="size-3 text-[var(--accent-red)]" /><span className="text-[var(--accent-red)]">Offline · showing cached</span></>
          ) : (
            <><Wifi className="size-3 text-[oklch(0.696_0.17_162.48)]" /><span>Live · LeetCode API</span></>
          )}
        </div>
        <button
          onClick={onRefresh}
          className="flex items-center gap-1 text-[10px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <RefreshCw className="size-3" />
          Refresh
        </button>
      </div>
    </motion.aside>
  )
}

function ProfileSkeleton() {
  return (
    <div className="flex flex-col gap-4 w-full animate-pulse">
      <div className="bg-[var(--bg-panel)] rounded-2xl border border-[var(--line-10)] p-5 flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <div className="size-16 rounded-xl bg-[var(--bg-elevated)]" />
          <div className="flex flex-col gap-2 flex-1">
            <div className="h-4 bg-[var(--bg-elevated)] rounded w-3/4" />
            <div className="h-3 bg-[var(--bg-elevated)] rounded w-1/2" />
            <div className="h-3 bg-[var(--bg-elevated)] rounded w-1/3" />
          </div>
        </div>
        <div className="flex justify-around border-t border-[var(--line-10)] pt-3">
          {[0,1,2].map(i => <div key={i} className="h-8 w-12 bg-[var(--bg-elevated)] rounded" />)}
        </div>
      </div>
      <div className="bg-[var(--bg-panel)] rounded-2xl border border-[var(--line-10)] p-5 flex flex-col gap-3">
        {[0,1,2,3].map(i => <div key={i} className="h-3 bg-[var(--bg-elevated)] rounded w-full" />)}
      </div>
    </div>
  )
}
