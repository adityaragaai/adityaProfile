const API_BASE = 'https://alfa-leetcode-api.onrender.com'

async function safeFetch(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(15000) })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function fetchLeetCodeData(username) {
  const [profileR, contestR, badgesR] = await Promise.allSettled([
    safeFetch(`${API_BASE}/userProfile/${username}`),
    safeFetch(`${API_BASE}/userContestRankingInfo/${username}`),
    safeFetch(`${API_BASE}/${username}/badges`),
  ])

  const profile = profileR.status === 'fulfilled' ? profileR.value : null
  const contest = contestR.status === 'fulfilled' ? contestR.value : null
  const badges  = badgesR.status  === 'fulfilled' ? badgesR.value  : null

  // Calendar lives directly on the profile response as a plain object
  const submissionCalendar = profile?.submissionCalendar
    ? (typeof profile.submissionCalendar === 'string'
        ? JSON.parse(profile.submissionCalendar)
        : profile.submissionCalendar)
    : {}

  return { profile, contest, badges, submissionCalendar }
}

// ─── Data parsers ──────────────────────────────────────────────────────────

// Static profile info — these don't come from the stats API endpoint
const STATIC_PROFILE = {
  username:  'rahul860152gupta',
  name:      'Aditya Gupta',
  avatar:    '',
  country:   'India',
  company:   'Lovely Professional University',
  github:    'Adityaguptawebdev',
  linkedin:  'adityagupta-swe',
  skillTags: ['html', 'css', 'javascript', 'java', 'react-16'],
}

export function parseProfile(raw) {
  if (!raw) return null

  // The /userProfile endpoint returns flat fields like easySolved, totalEasy, etc.
  // matchedUserStats.acSubmissionNum is also present as an alternative
  const find = (arr, d) => (arr || []).find(x => x.difficulty === d)
  const ac = raw.matchedUserStats?.acSubmissionNum || []

  return {
    ...STATIC_PROFILE,
    // Override statics if the API happens to return them
    username:  raw.username  || STATIC_PROFILE.username,
    name:      raw.name      || STATIC_PROFILE.name,
    avatar:    raw.avatar    || STATIC_PROFILE.avatar,
    ranking:   raw.ranking   || 0,

    solved: {
      total:  raw.totalSolved  ?? find(ac, 'All')?.count    ?? 0,
      easy:   raw.easySolved   ?? find(ac, 'Easy')?.count   ?? 0,
      medium: raw.mediumSolved ?? find(ac, 'Medium')?.count ?? 0,
      hard:   raw.hardSolved   ?? find(ac, 'Hard')?.count   ?? 0,
    },
    totalProblems: {
      total:  raw.totalQuestions ?? 3949,
      easy:   raw.totalEasy      ?? 947,
      medium: raw.totalMedium    ?? 2063,
      hard:   raw.totalHard      ?? 939,
    },
    // Calendar meta (streak/activeDays) not in this endpoint — will use fallback
    calendar: {
      streak:          raw.userCalendar?.streak          || 15,
      totalActiveDays: raw.userCalendar?.totalActiveDays || 189,
    },
  }
}

export function parseContest(raw) {
  if (!raw) return null
  // API returns { userContestRanking: {...}, userContestRankingHistory: [...] }
  const r = raw.userContestRanking || raw
  return {
    attended:          r.attendedContestsCount ?? r.contestAttend ?? 0,
    rating:            Math.round(r.rating ?? r.contestRating ?? 0),
    globalRanking:     r.globalRanking     ?? r.contestGlobalRanking ?? 0,
    totalParticipants: r.totalParticipants ?? 0,
    topPercentage:     r.topPercentage     ?? r.contestTopPercentage ?? 0,
    history: (raw.userContestRankingHistory || raw.contestParticipation || [])
      .filter(p => p.attended !== false)
      .map((p, i) => ({
        index:   i + 1,
        title:   p.contest?.title || `Contest ${i + 1}`,
        rating:  Math.round(p.rating || 0),
        ranking: p.ranking || 0,
      })),
  }
}

export function parseBadges(raw) {
  if (!raw) return { badges: [], activeBadge: null }
  const badges = (raw.badges || []).map(b => {
    // Icon may be a full URL already, or a path starting with /
    const iconUrl = b.icon
      ? (b.icon.startsWith('http') ? b.icon : `https://leetcode.com${b.icon}`)
      : ''
    const gifUrl = b.iconGif
      ? (b.iconGif.startsWith('http') ? b.iconGif : `https://leetcode.com${b.iconGif}`)
      : ''
    return {
      id:        b.id || String(Math.random()),
      name:      b.displayName || b.name || 'Badge',
      icon:      iconUrl,
      iconGif:   gifUrl,
      createdAt: b.creationDate || b.activationDay || '',
    }
  })
  return { badges, activeBadge: badges[0] || null }
}

// ─── Heatmap ───────────────────────────────────────────────────────────────

export function generateHeatmapWeeks(submissionCalendar, weeksCount = 53) {
  // Normalize calendar keys to UTC midnight timestamps
  const calMap = {}
  for (const [ts, count] of Object.entries(submissionCalendar || {})) {
    const d = new Date(Number(ts) * 1000)
    d.setUTCHours(0, 0, 0, 0)
    const key = Math.floor(d.getTime() / 1000)
    calMap[key] = (calMap[key] || 0) + Number(count)
  }

  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)

  const start = new Date(today)
  start.setDate(start.getDate() - weeksCount * 7 + 1)
  start.setDate(start.getDate() - start.getDay()) // align to Sunday

  const weeks = []
  const cur = new Date(start)

  while (cur <= today) {
    const week = []
    for (let d = 0; d < 7; d++) {
      const ts = Math.floor(cur.getTime() / 1000)
      week.push({ date: new Date(cur), count: calMap[ts] || 0 })
      cur.setDate(cur.getDate() + 1)
    }
    weeks.push(week)
  }
  return weeks
}

export function heatIntensity(count) {
  if (count === 0) return 0
  if (count < 3) return 1
  if (count < 6) return 2
  if (count < 10) return 3
  return 4
}

export function totalSubmissionsLastYear(submissionCalendar) {
  const cutoff = Math.floor(Date.now() / 1000) - 365 * 86400
  return Object.entries(submissionCalendar || {}).reduce(
    (sum, [ts, c]) => (Number(ts) >= cutoff ? sum + Number(c) : sum),
    0
  )
}
