import { useState, useEffect, useCallback } from 'react'
import { ExternalLink, GitBranch, Star, Zap, RefreshCw, GitFork, Users, BookOpen, TrendingUp, Flame } from 'lucide-react'
import { FallbackComponent } from '../CustomComponents'

const DEV_USER   = 'adityaragaai'
const BRAND_USER = 'Adityaguptawebdev'

// ─── Language colours ──────────────────────────────────────────────────────
const LANG_COLORS = {
  JavaScript: '#f1e05a', TypeScript: '#3178c6', HTML: '#e34c26',
  CSS: '#563d7c', Python: '#3572A5', Java: '#b07219', 'C++': '#f34b7d',
  C: '#555555', Go: '#00ADD8', Rust: '#dea584', PHP: '#4F5D95',
  Ruby: '#701516', Swift: '#F05138', Kotlin: '#A97BFF', Dart: '#00B4AB',
  Shell: '#89e051', Vue: '#41b883', Svelte: '#ff3e00', SCSS: '#c6538c',
  'Jupyter Notebook': '#DA5B0B', MDX: '#083fa1',
}
function langColor(lang) { return LANG_COLORS[lang] || '#8b949e' }

// ─── GitHub REST API hook ──────────────────────────────────────────────────
function useGitHubUser(username) {
  const [data, setData]     = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`).then(r => r.json()),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`).then(r => r.json()),
        ])
        if (cancelled) return

        const repos = Array.isArray(reposRes) ? reposRes : []
        const totalStars  = repos.reduce((s, r) => s + (r.stargazers_count || 0), 0)
        const totalForks  = repos.reduce((s, r) => s + (r.forks_count || 0), 0)

        // Language distribution
        const langMap = {}
        for (const repo of repos) {
          if (repo.language) langMap[repo.language] = (langMap[repo.language] || 0) + 1
        }
        const topLangs = Object.entries(langMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 8)
        const langTotal = topLangs.reduce((s, [, v]) => s + v, 0)

        setData({
          publicRepos: userRes.public_repos   || 0,
          followers:   userRes.followers      || 0,
          following:   userRes.following      || 0,
          totalStars,
          totalForks,
          topLangs: topLangs.map(([lang, cnt]) => ({
            lang, cnt, pct: Math.round((cnt / langTotal) * 100),
          })),
          createdAt: userRes.created_at,
          avatarUrl: userRes.avatar_url || '',
          bio: userRes.bio || '',
        })
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [username])

  return { data, loading, error }
}

// ─── GitHub Contributions hook (reused for streak calc) ───────────────────
function useGitHubContributions(username) {
  const [contributions, setContributions] = useState([])
  const [total, setTotal]                 = useState(0)
  const [loading, setLoading]             = useState(true)
  const [error, setError]                 = useState(null)
  const [lastUpdated, setLastUpdated]     = useState(null)

  const load = useCallback(async () => {
    setLoading(true); setError(null)
    try {
      const res = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
        { signal: AbortSignal.timeout(12000) }
      )
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      const contribs = json.contributions || []
      setContributions(contribs)
      const totals = json.total || {}
      setTotal(Object.values(totals).reduce((a, b) => a + b, 0))
      setLastUpdated(new Date())
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [username])

  useEffect(() => {
    load()
    const timer = setInterval(load, 5 * 60 * 1000)
    return () => clearInterval(timer)
  }, [load])

  return { contributions, total, loading, error, refresh: load, lastUpdated }
}

function computeStreak(contributions) {
  if (!contributions.length) return { current: 0, longest: 0 }

  const today = new Date().toISOString().slice(0, 10)

  // Only consider days up to today (API may include future placeholders)
  const days = [...contributions]
    .filter(c => c.date <= today)
    .sort((a, b) => a.date.localeCompare(b.date)) // ascending

  // ── Longest streak: single pass over all days ascending ──
  let longest = 0, run = 0
  for (const c of days) {
    if (c.count > 0) { run++; if (run > longest) longest = run }
    else run = 0
  }

  // ── Current streak: walk backwards from today ──
  // If today has 0 contributions we still look back (day isn't over yet)
  let current = 0
  for (let i = days.length - 1; i >= 0; i--) {
    const { date, count } = days[i]
    if (count > 0) {
      current++
    } else if (date === today && current === 0) {
      // Today is empty but it's still ongoing — check yesterday
      continue
    } else {
      break
    }
  }

  return { current, longest }
}

// ─── Card shell ────────────────────────────────────────────────────────────
function CardShell({ label, icon: Icon, accent = 'oklch(0.488 0.243 264.376)', children, loading, skeletonRows = 4 }) {
  return (
    <div
      className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Icon className="size-3.5" style={{ color: accent }} />
          <span className="text-[#a1a1a1] text-[10px] uppercase tracking-widest font-mono">{label}</span>
        </div>
        {loading ? (
          <div className="flex flex-col gap-2">
            {Array.from({ length: skeletonRows }).map((_, i) => (
              <div key={i} className="h-4 bg-white/5 rounded animate-pulse" style={{ width: `${70 + (i % 3) * 10}%` }} />
            ))}
          </div>
        ) : children}
      </div>
    </div>
  )
}

// ─── Stats Card ────────────────────────────────────────────────────────────
function GitHubStatsCard({ username, totalContribs }) {
  const { data, loading, error } = useGitHubUser(username)
  const accent = 'oklch(0.488 0.243 264.376)'

  const stats = error || !data ? null : data

  return (
    <CardShell label="GitHub Stats" icon={Star} accent={accent} loading={loading}>
      {!stats ? (
        <p className="text-[#a1a1a1] text-xs">Stats unavailable for @{username}</p>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: BookOpen,    label: 'Public Repos',  value: stats.publicRepos,                      color: accent },
            { icon: Star,        label: 'Total Stars',   value: stats.totalStars,                       color: 'oklch(0.769 0.188 70.08)' },
            { icon: GitFork,     label: 'Total Forks',   value: stats.totalForks,                       color: 'oklch(0.696 0.17 162.48)' },
            { icon: Users,       label: 'Followers',     value: stats.followers,                        color: 'oklch(0.627 0.265 303.9)' },
            { icon: TrendingUp,  label: 'Contributions', value: totalContribs || '…',                   color: 'oklch(0.696 0.17 162.48)' },
            { icon: Users,       label: 'Following',     value: stats.following,                        color: accent },
          ].map(({ icon: Ic, label, value, color }) => (
            <div key={label}
              className="flex items-center gap-2.5 rounded-xl p-2.5"
              style={{ background: `color-mix(in oklch, ${color} 6%, oklch(0.145 0 0))`, border: `1px solid color-mix(in oklch, ${color} 12%, transparent)` }}
            >
              <Ic className="size-3.5 shrink-0" style={{ color }} />
              <div>
                <p className="font-bold text-neutral-50 text-sm leading-tight">{typeof value === 'number' ? value.toLocaleString() : value}</p>
                <p className="text-[#a1a1a1] text-[9px] uppercase tracking-wider">{label}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </CardShell>
  )
}

// ─── Streak Card ───────────────────────────────────────────────────────────
function GitHubStreakCard({ contributions, total, loading: contribLoading }) {
  const accent = 'oklch(0.769 0.188 70.08)'
  const { current, longest } = contributions.length ? computeStreak(contributions) : { current: 0, longest: 0 }

  return (
    <CardShell label="Contribution Streak" icon={Zap} accent={accent} loading={contribLoading}>
      <div className="flex flex-col gap-3">
        {/* Big streak number */}
        <div className="flex items-end gap-3">
          <div className="text-center flex-1 rounded-xl p-3"
            style={{ background: `color-mix(in oklch, ${accent} 8%, oklch(0.145 0 0))`, border: `1px solid color-mix(in oklch, ${accent} 15%, transparent)` }}
          >
            <p className="font-bold text-neutral-50 text-3xl leading-none flex items-center justify-center gap-1.5">
              <Flame className="size-5" style={{ color: accent }} />
              {current}
            </p>
            <p className="text-[#a1a1a1] text-[10px] uppercase tracking-wider mt-1">Current Streak</p>
          </div>
          <div className="text-center flex-1 rounded-xl p-3"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <p className="font-bold text-neutral-50 text-3xl leading-none">{longest}</p>
            <p className="text-[#a1a1a1] text-[10px] uppercase tracking-wider mt-1">Longest Streak</p>
          </div>
        </div>

        {/* Total contributions */}
        <div className="flex items-center justify-between rounded-xl p-2.5"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <span className="text-[#a1a1a1] text-xs">Total Contributions</span>
          <span className="font-bold text-neutral-50 text-sm">{total.toLocaleString()}</span>
        </div>

        <p className="text-[9px] text-[#a1a1a1] text-center">
          Calculated from @{DEV_USER} · updates every 5 min
        </p>
      </div>
    </CardShell>
  )
}

// ─── Top Languages Card ────────────────────────────────────────────────────
function GitHubLangsCard({ username }) {
  const { data, loading, error } = useGitHubUser(username)
  const accent = 'oklch(0.627 0.265 303.9)'

  return (
    <CardShell label="Top Languages" icon={GitBranch} accent={accent} loading={loading} skeletonRows={5}>
      {error || !data?.topLangs?.length ? (
        <p className="text-[#a1a1a1] text-xs">Language data unavailable</p>
      ) : (
        <div className="flex flex-col gap-2.5">
          {/* Color bar */}
          <div className="flex h-2 rounded-full overflow-hidden gap-px">
            {data.topLangs.map(({ lang, pct }) => (
              <div key={lang} style={{ width: `${pct}%`, backgroundColor: langColor(lang) }} title={`${lang} ${pct}%`} />
            ))}
          </div>
          {/* Language list */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-1">
            {data.topLangs.map(({ lang, pct }) => (
              <div key={lang} className="flex items-center gap-1.5">
                <span className="size-2 rounded-full shrink-0" style={{ backgroundColor: langColor(lang) }} />
                <span className="text-[#a1a1a1] text-[10px] truncate flex-1">{lang}</span>
                <span className="text-neutral-50 text-[10px] font-semibold shrink-0">{pct}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </CardShell>
  )
}

// ─── Contribution Heatmap ──────────────────────────────────────────────────

const GH_COLORS    = ['#1e2a1e', '#0e4429', '#006d32', '#26a641', '#39d353']
const MONTH_LABELS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const DAY_LABELS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

function buildWeeks(contributions) {
  if (!contributions.length) return []
  const weeks = []
  let week = []
  const firstDow = new Date(contributions[0].date).getDay()
  for (let i = 0; i < firstDow; i++) week.push(null)
  for (const day of contributions) {
    if (week.length === 7) { weeks.push(week); week = [] }
    week.push(day)
  }
  while (week.length < 7) week.push(null)
  weeks.push(week)
  return weeks
}

function HeatCell({ day }) {
  const [tip, setTip] = useState(false)
  if (!day) return <div style={{ width: 14, height: 14, margin: 2 }} />
  const color = GH_COLORS[day.level ?? 0]
  const label = day.date
    ? new Date(day.date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
    : ''
  return (
    <div className="relative">
      <div
        onMouseEnter={() => setTip(true)}
        onMouseLeave={() => setTip(false)}
        className="cursor-default hover:brightness-125 transition-all duration-100"
        style={{ width: 14, height: 14, margin: 2, backgroundColor: color, borderRadius: 4 }}
      />
      {tip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none
                        bg-[#1c2128] border border-white/20 rounded-lg px-2.5 py-1.5
                        text-[10px] whitespace-nowrap shadow-xl">
          <p className="font-semibold text-neutral-50">{day.count} contribution{day.count !== 1 ? 's' : ''}</p>
          <p className="text-[#8b949e]">{label}</p>
        </div>
      )}
    </div>
  )
}

function GitHubHeatmap({ username, contributions, total, loading, error, refresh, lastUpdated }) {
  const weeks = buildWeeks(contributions)

  const monthPositions = []
  const seen = new Set()
  weeks.forEach((week, wi) => {
    const firstReal = week.find(d => d)
    if (!firstReal) return
    const month = new Date(firstReal.date + 'T12:00:00').getMonth()
    if (!seen.has(month)) { seen.add(month); monthPositions.push({ wi, label: MONTH_LABELS[month] }) }
  })

  return (
    <div
      className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.6)]"
      style={{ background: '#0d1117', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(90deg, transparent, #39d353, transparent)' }}
      />
      <div className="p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <GitBranch className="size-3.5 text-[oklch(0.696_0.17_162.48)]" />
            <span className="text-[#8b949e] text-[10px] uppercase tracking-widest font-mono">
              Contribution Graph · @{username}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {lastUpdated && !loading && (
              <span className="text-[9px] text-[#8b949e] font-mono hidden sm:block">{lastUpdated.toLocaleTimeString()}</span>
            )}
            <button onClick={refresh} className="flex items-center gap-1 text-[9px] text-[#8b949e] hover:text-neutral-50 transition-colors">
              <RefreshCw className={`size-2.5 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Total count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-neutral-50 font-medium">
            <span className="font-bold">{total.toLocaleString()}</span>
            <span className="text-[#8b949e]"> contributions in the last year</span>
          </p>
        </div>

        {loading ? (
          <div className="h-36 bg-white/5 rounded-xl animate-pulse" />
        ) : error ? (
          <div className="h-36 flex items-center justify-center rounded-xl bg-white/5">
            <span className="text-[#8b949e] text-xs">Contributions unavailable</span>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto pb-1">
              <div className="inline-flex flex-col gap-0" style={{ minWidth: 'max-content' }}>
                {/* Month labels */}
                <div className="flex mb-2 ml-10">
                  {weeks.map((_, wi) => {
                    const mp = monthPositions.find(m => m.wi === wi)
                    return (
                      <div key={wi} style={{ width: 18 }} className="text-[11px] text-[#8b949e] font-medium">
                        {mp?.label || ''}
                      </div>
                    )
                  })}
                </div>
                {/* Day labels + cells */}
                <div className="flex gap-0">
                  <div className="flex flex-col mr-1">
                    {DAY_LABELS.map((d, i) => (
                      <div key={i} className="text-[10px] text-[#8b949e] flex items-center justify-end pr-2"
                        style={{ height: 18, lineHeight: 1 }}>
                        {i === 1 || i === 3 || i === 5 ? d : ''}
                      </div>
                    ))}
                  </div>
                  {weeks.map((week, wi) => (
                    <div key={wi} className="flex flex-col">
                      {week.map((day, di) => <HeatCell key={di} day={day} />)}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end gap-1.5 mt-3">
              <span className="text-[10px] text-[#8b949e]">Less</span>
              {GH_COLORS.map((c, i) => (
                <div key={i} style={{ width: 14, height: 14, backgroundColor: c, borderRadius: 4, border: '1px solid rgba(255,255,255,0.06)' }} />
              ))}
              <span className="text-[10px] text-[#8b949e]">More</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ─── Main Export ───────────────────────────────────────────────────────────
export default function GitHubStats() {
  const { contributions, total, loading: contribLoading, error: contribError, refresh, lastUpdated } = useGitHubContributions(DEV_USER)

  return (
    <section className="mt-6 mb-2">
      {/* Divider */}
      <div className="flex items-center gap-4 mb-6">
        <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, oklch(0.488 0.243 264.376 / 0.4), transparent)' }} />
        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03]">
          <span className="size-1.5 bg-[oklch(0.696_0.17_162.48)] rounded-full animate-pulse inline-block" />
          <span className="text-[#a1a1a1] text-[10px] font-mono uppercase tracking-widest">GitHub Activity</span>
        </div>
        <div className="h-px flex-1" style={{ background: 'linear-gradient(270deg, oklch(0.488 0.243 264.376 / 0.4), transparent)' }} />
      </div>

      {/* Section Header */}
      <div className="flex justify-between items-start mb-5">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-3">
            <FallbackComponent className="size-5 text-neutral-50" />
            <h2 className="font-bold text-neutral-50 text-xl leading-7 tracking-tight">GitHub Contributions</h2>
            <span className="bg-[oklch(0.488_0.243_264.376)]/15 text-[oklch(0.488_0.243_264.376)] border-[oklch(0.488_0.243_264.376)]/30 font-mono rounded-full text-[10px] border-1 border-solid px-2 py-0.5">
              @{DEV_USER}
            </span>
          </div>
          <p className="text-[#a1a1a1] text-xs leading-5">
            Live coding activity from the professional account ·&nbsp;
            <a href={`https://github.com/${DEV_USER}`} target="_blank" rel="noreferrer"
              className="text-[oklch(0.488_0.243_264.376)] hover:underline transition-colors">@{DEV_USER}</a>
            &nbsp;· Branding on&nbsp;
            <a href={`https://github.com/${BRAND_USER}`} target="_blank" rel="noreferrer"
              className="text-[oklch(0.696_0.17_162.48)] hover:underline transition-colors">@{BRAND_USER}</a>
          </p>
        </div>
        <a
          href={`https://github.com/${BRAND_USER}`}
          target="_blank" rel="noreferrer"
          className="group flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 transition-all duration-200 shrink-0"
        >
          <FallbackComponent className="size-3.5 text-neutral-50" />
          <span className="text-neutral-50 text-xs font-medium">Visit GitHub Profile</span>
          <ExternalLink className="size-3 text-[#a1a1a1] group-hover:text-neutral-50 transition-colors" />
        </a>
      </div>

      {/* Row 1 — Stats + Streak (native, no external images) */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <GitHubStatsCard username={DEV_USER} totalContribs={total} />
        <GitHubStreakCard contributions={contributions} total={total} loading={contribLoading} />
      </div>

      {/* Row 2 — Live Contribution Heatmap */}
      <div className="mb-4">
        <GitHubHeatmap
          username={DEV_USER}
          contributions={contributions}
          total={total}
          loading={contribLoading}
          error={contribError}
          refresh={refresh}
          lastUpdated={lastUpdated}
        />
      </div>

      {/* Row 4 — Top Languages + Dual Account Card */}
      <div className="grid grid-cols-2 gap-4">
        <GitHubLangsCard username={DEV_USER} />

        {/* Dual Account Info */}
        <div
          className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] p-4"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'linear-gradient(90deg, transparent, oklch(0.696 0.17 162.48), transparent)' }}
          />
          <div className="flex items-center gap-2 mb-4">
            <span className="size-1.5 bg-[oklch(0.696_0.17_162.48)] rounded-full animate-pulse inline-block" />
            <span className="text-[#a1a1a1] text-[10px] font-mono uppercase tracking-widest">Account Setup</span>
          </div>
          <div className="flex flex-col gap-3">
            <a href={`https://github.com/${BRAND_USER}`} target="_blank" rel="noreferrer"
              className="group/card block rounded-xl p-3 border border-white/5 bg-white/5 hover:bg-white/8 hover:border-[oklch(0.488_0.243_264.376)]/30 transition-all duration-200">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[oklch(0.488_0.243_264.376)] text-[9px] font-mono uppercase tracking-widest">Personal Brand</p>
                <ExternalLink className="size-2.5 text-[#a1a1a1] group-hover/card:text-[oklch(0.488_0.243_264.376)] transition-colors" />
              </div>
              <p className="text-neutral-50 text-sm font-semibold font-mono">@{BRAND_USER}</p>
              <p className="text-[#a1a1a1] text-[10px] mt-0.5">Public profile · open-source · portfolio</p>
            </a>
            <a href={`https://github.com/${DEV_USER}`} target="_blank" rel="noreferrer"
              className="group/card block rounded-xl p-3 border border-white/5 bg-white/5 hover:bg-white/8 hover:border-[oklch(0.696_0.17_162.48)]/30 transition-all duration-200">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[oklch(0.696_0.17_162.48)] text-[9px] font-mono uppercase tracking-widest">Dev Activity</p>
                <ExternalLink className="size-2.5 text-[#a1a1a1] group-hover/card:text-[oklch(0.696_0.17_162.48)] transition-colors" />
              </div>
              <p className="text-neutral-50 text-sm font-semibold font-mono">@{DEV_USER}</p>
              <p className="text-[#a1a1a1] text-[10px] mt-0.5">Commits · PRs · contributions · work</p>
            </a>
            <p className="text-[#a1a1a1] text-[10px] leading-4 px-0.5">
              All stats above are pulled from the professional dev account. Recruiter-facing identity lives on the personal branding account.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
