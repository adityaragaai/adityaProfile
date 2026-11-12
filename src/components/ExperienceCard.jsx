/**
 * Dashboard summary of work history: a compact timeline of the latest roles
 * (logo, title, company, dates), with ongoing roles marked "Current" and the
 * RagaAI contribution report one click away. Rows link to /experience.
 */
import { MotionConfig, motion } from 'framer-motion'
import { Briefcase, ChevronRight, FileText } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { PAGE_PATHS } from '@/lib/routes'
import { jobs } from '@/data/experience'

const SHOWN = 4
const EMERALD = 'oklch(0.696 0.17 162.48)'
const EASE = [0.16, 1, 0.3, 1]

function CurrentBadge() {
  return (
    <span
      className="flex shrink-0 items-center gap-1.5 rounded-full border border-solid px-2 py-0.5 text-[10px] font-medium"
      style={{
        color: EMERALD,
        backgroundColor: `color-mix(in oklch, ${EMERALD} 10%, transparent)`,
        borderColor: `color-mix(in oklch, ${EMERALD} 22%, transparent)`,
      }}
    >
      <span className="relative flex size-1.5">
        <span className="absolute inline-flex size-full animate-ping rounded-full opacity-60 motion-reduce:hidden" style={{ backgroundColor: EMERALD }} />
        <span className="relative inline-flex size-1.5 rounded-full" style={{ backgroundColor: EMERALD }} />
      </span>
      Current
    </span>
  )
}

// Sits above the row's stretched link, so it opens the PDF instead of /experience.
function ReportChip({ report }) {
  return (
    <a
      href={report.href}
      target="_blank"
      rel="noreferrer"
      title={report.title}
      className="relative z-10 flex items-center gap-1 rounded-full border border-solid border-[var(--line-10)] bg-[var(--bg-elevated)] px-2 py-0.5 text-[10px] font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
    >
      <FileText className="size-3" />
      Report
    </a>
  )
}

function Logo({ job }) {
  return (
    <span
      className={cn(
        'relative z-10 flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-solid border-[var(--line-10)]',
        job.logo ? job.logoBg ?? 'bg-white' : 'bg-[var(--bg-elevated)]',
      )}
    >
      {job.logo ? (
        <img src={job.logo} alt="" className="size-full object-contain p-1.5" />
      ) : (
        <Briefcase className="size-4 text-[var(--text-secondary)]" />
      )}
    </span>
  )
}

export default function ExperienceCard({ onNavigate }) {
  const shown = jobs.slice(0, SHOWN)
  const currentCount = jobs.filter((j) => j.current).length

  function openExperience(e) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    e.preventDefault()
    onNavigate?.('experience')
  }

  return (
    <MotionConfig reducedMotion="user">
      <Card className="bg-[var(--bg-panel)] border-[var(--line-10)] border-0 border-solid p-5 md:p-6 gap-4 flex flex-col">
        <CardHeader className="p-0 gap-1">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Briefcase className="size-4 text-[oklch(0.488_0.243_264.376)]" />
              <span className="font-semibold text-[var(--text-primary)] text-sm leading-5">Experience</span>
              {currentCount > 0 && (
                <span className="bg-[oklch(0.488_0.243_264.376)]/15 text-[oklch(0.488_0.243_264.376)] border-[oklch(0.488_0.243_264.376)]/20 rounded-full text-[10px] border-1 border-solid px-2 py-0.5">
                  {currentCount} current
                </span>
              )}
            </div>
            <a
              href={PAGE_PATHS.experience}
              onClick={openExperience}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-[10px] flex items-center gap-1"
            >
              View all
              <ChevronRight className="size-3" />
            </a>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <ol className="relative flex flex-col">
            {/* Timeline rail behind the logos; draws downward when the card scrolls into view */}
            <motion.span
              aria-hidden="true"
              className="absolute left-[30px] top-6 bottom-6 w-px origin-top bg-[var(--line-15)]"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: EASE }}
            />

            {shown.map((job, i) => (
              <motion.li
                key={job.title}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: 0.1 + i * 0.08, ease: EASE }}
                className="group relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-[var(--bg-elevated)]/60"
              >
                <Logo job={job} />

                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <div className="flex min-w-0 items-center gap-2">
                    {/* Stretched link: the whole row opens /experience; the Report chip sits above it */}
                    <a
                      href={PAGE_PATHS.experience}
                      onClick={openExperience}
                      className="text-sm font-semibold leading-5 text-[var(--text-primary)] outline-none sm:truncate after:absolute after:inset-0 after:rounded-xl focus-visible:after:ring-2 focus-visible:after:ring-[var(--accent-blue-soft)]"
                    >
                      {job.title}
                    </a>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] sm:truncate">{job.company}</p>
                  {/* Phones: dates and badges on their own line under the company */}
                  <div className="mt-1 flex flex-wrap items-center gap-1.5 sm:hidden">
                    <span className="mr-0.5 font-mono text-[10px] text-[var(--text-tertiary)]">{job.period}</span>
                    {job.current && <CurrentBadge />}
                    {job.report && <ReportChip report={job.report} />}
                  </div>
                </div>

                {/* sm and up: badges and dates on the right */}
                <div className="hidden shrink-0 flex-col items-end gap-1.5 sm:flex">
                  <div className="flex items-center gap-1.5">
                    {job.report && <ReportChip report={job.report} />}
                    {job.current && <CurrentBadge />}
                  </div>
                  <p className="font-mono text-[10px] text-[var(--text-tertiary)]">{job.period}</p>
                </div>

                <ChevronRight className="hidden size-3.5 shrink-0 text-[var(--text-tertiary)] opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100 sm:block" />
              </motion.li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </MotionConfig>
  )
}
