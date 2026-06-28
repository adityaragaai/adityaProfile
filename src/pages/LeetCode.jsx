import { motion } from 'framer-motion'
import { Code2, ExternalLink } from 'lucide-react'
import { useLeetCode } from '../hooks/useLeetCode'
import ProfileCard      from '../components/leetcode/ProfileCard'
import ContestAnalytics from '../components/leetcode/ContestAnalytics'
import ProblemStats     from '../components/leetcode/ProblemStats'
import BadgesSection    from '../components/leetcode/BadgesSection'
import SubmissionHeatmap from '../components/leetcode/SubmissionHeatmap'

const USERNAME = 'rahul860152gupta'

export default function LeetCode() {
  const { data, loading, error, refresh, lastUpdated } = useLeetCode(USERNAME)

  return (
    <div className="flex flex-col flex-1 overflow-auto">
      {/* Page header */}
      <div className="flex items-center justify-between px-4 md:px-6 pt-4 md:pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-lg bg-[oklch(0.769_0.188_70.08)]/15 border border-[oklch(0.769_0.188_70.08)]/30 flex items-center justify-center">
            <Code2 className="size-4 text-[oklch(0.769_0.188_70.08)]" />
          </div>
          <div>
            <h1 className="font-bold text-neutral-50 text-sm leading-tight">LeetCode Stats</h1>
            <p className="text-[#a1a1a1] text-[10px]">
              {lastUpdated
                ? `Updated ${lastUpdated.toLocaleTimeString()}`
                : 'Fetching live data…'}
            </p>
          </div>
        </div>
        <a
          href={`https://leetcode.com/u/${USERNAME}/`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-xs text-[#a1a1a1] hover:text-neutral-50 transition-colors border border-white/10 rounded-lg px-3 py-1.5"
        >
          <ExternalLink className="size-3" />
          View Profile
        </a>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-4 p-4 md:p-6 pt-3 flex-1">
        {/* Left: Profile Card */}
        <ProfileCard
          profile={data?.profile}
          loading={loading}
          error={error}
          onRefresh={refresh}
          lastUpdated={lastUpdated}
        />

        {/* Right: Dashboard panels */}
        <div className="flex flex-col gap-4 min-w-0">
          {/* Row 1: Contest analytics */}
          <ContestAnalytics contest={data?.contest} loading={loading} />

          {/* Row 2: Problems + Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ProblemStats profile={data?.profile} loading={loading} />
            <BadgesSection badges={data?.badges}  loading={loading} />
          </div>

          {/* Row 3: Heatmap */}
          <SubmissionHeatmap
            submissionCalendar={data?.submissionCalendar}
            calendarMeta={data?.profile?.userCalendar}
            loading={loading}
          />
        </div>
      </div>
    </div>
  )
}
