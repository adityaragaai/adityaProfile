import { useEffect, useState } from 'react'
import profile2 from '../assets/profile2.png'
import ragaaiLogo from '../assets/ragaai-logo.svg'
import firstbriqLogo from '../assets/firstbriq-logo.svg'
import microsoftLogo from '../assets/microsoft-logo.png'
import pwskillsLogo from '../assets/pwskills-logo.png'
import {
  Activity,
  Clock,
  Download,
  ExternalLink,
  FileText,
  GitBranch,
  GraduationCap,
  MapPin,
  Rocket,
  Users,
  Wrench,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const jobs = [
  {
    title: 'Product Software Engineer (Freelance)',
    company: 'FirstBriq · Remote',
    period: 'Sep 2026 — Present',
    current: true,
    dotColor: 'oklch(0.488 0.243 264.376)',
    desc: 'Own product features end to end, from scoping with the founders through design, build, deploy and iteration. Building FirstBriq\'s operations platform for interior and construction teams: WhatsApp-to-ERP workflow automation, AI-assisted lead management and the dashboards PMs use to review and approve changes. Ship full-stack features with React, Next.js and Tailwind on the frontend and typed Node.js / Express APIs on MongoDB, with validation, background jobs and tests built in.',
    tags: ['React.js', 'Next.js', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
    logo: firstbriqLogo,
    logoBg: 'bg-white',
  },
  {
    title: 'SDE Intern',
    company: 'RagaAI · Bengaluru, India',
    period: 'Jan 2026 – May 2026',
    current: false,
    dotColor: 'oklch(0.488 0.243 264.376)',
    desc: 'Shipped production features across RagaAI\'s Clinical Ops, CMS, and Denver Allergy products — fax classification and AI-assisted billing collections dashboards, review management with AI replies, and a support-ticket workflow with email notifications. Built 20+ reusable React and TypeScript components integrated with Node.js, MongoDB, and REST APIs, and lifted Lighthouse performance from 50 to 75 on a live client site.',
    tags: ['React.js', 'TypeScript', 'Node.js', 'MongoDB', 'REST APIs'],
    logo: ragaaiLogo,
    logoBg: 'bg-white',
    report: {
      title: 'Developer Contribution Report — RagaAI',
      meta: '18 pages · Clinical Ops, CMS, Denver Allergy',
      href: '/reports/Aditya_Gupta_RagaAI_Contribution_Report.pdf',
    },
  },
  {
    title: 'AI: Transformative Learning Intern',
    company: 'Edunet Foundation · Remote',
    period: '2024 · 2 months',
    current: false,
    dotColor: 'oklch(0.696 0.17 162.48)',
    desc: 'Participated in Microsoft & SAP\'s TechSaksham initiative, exploring AI applications across industries. Focused on machine learning fundamentals, AI ethics, and real-world data analysis pipelines.',
    tags: ['Machine Learning', 'AI Ethics', 'Data Analysis', 'Python'],
    logo: microsoftLogo,
    logoBg: 'bg-white',
  },
  {
    title: 'Full-Stack Developer Trainee',
    company: 'PW Skills — Sigma Batch 1.0',
    period: 'Jan 2023 — Mar 2024 · 15 months',
    current: false,
    dotColor: 'oklch(0.696 0.17 162.48)',
    desc: 'Completed an intensive Full-Stack Web Development program. Mastered the MERN stack — HTML, CSS, JavaScript, React.js, Node.js, and MongoDB — while building multiple real-world projects from scratch.',
    tags: ['React.js', 'Node.js', 'MongoDB', 'JavaScript', 'HTML/CSS'],
    logo: pwskillsLogo,
    logoBg: 'bg-white',
  },
  {
    title: 'Freelance Web Developer',
    company: 'Self-employed · Remote',
    period: '2022 — Present',
    current: true,
    dotColor: 'oklch(0.627 0.265 303.9)',
    desc: 'Delivered responsive web applications and UI/UX designs for clients. Managed social media content and video production for 10+ YouTubers as a Content Creator and Social Media Manager.',
    tags: ['HTML', 'CSS', 'React.js', 'Figma', 'Content Creation'],
  },
]

const skills = [
  { label: 'Frontend Development', value: 88, color: 'oklch(0.488 0.243 264.376)' },
  { label: 'Backend & APIs', value: 80, color: 'oklch(0.696 0.17 162.48)' },
  { label: 'UI/UX Design', value: 82, color: 'oklch(0.627 0.265 303.9)' },
  { label: 'DSA / Problem Solving', value: 70, color: 'oklch(0.769 0.188 70.08)' },
]

function ReportViewer({ report, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const linkClass = 'flex items-center gap-1.5 rounded-lg border border-[var(--line-10)] hover:bg-[var(--bg-elevated)] transition-colors text-xs font-medium px-2.5 py-1.5'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 sm:p-6" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={report.title}
        className="flex flex-col w-full max-w-5xl h-full max-h-[92vh] rounded-xl overflow-hidden bg-[var(--bg-panel)] border border-[var(--line-10)] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--line-10)]">
          <FileText className="size-4 shrink-0 text-[oklch(0.488_0.243_264.376)]" />
          <span className="font-semibold text-sm leading-5 truncate">{report.title}</span>
          <div className="ml-auto flex items-center gap-1.5 shrink-0">
            <a href={report.href} target="_blank" rel="noreferrer" className={`${linkClass} hidden sm:flex`}>
              <ExternalLink className="size-3.5" />
              Open
            </a>
            <a href={report.href} download className={linkClass}>
              <Download className="size-3.5" />
              Download
            </a>
            <button onClick={onClose} aria-label="Close report" className="rounded-lg p-1.5 hover:bg-[var(--bg-elevated)] transition-colors">
              <X className="size-4" />
            </button>
          </div>
        </div>
        <object data={`${report.href}#navpanes=0&view=FitH`} type="application/pdf" className="flex-1 w-full bg-[var(--bg-app)]">
          <div className="h-full flex flex-col items-center justify-center gap-3 p-6 text-center">
            <FileText className="size-10 text-[var(--text-secondary)]" />
            <p className="text-[var(--text-secondary)] text-sm leading-5">This browser can't preview PDFs inline.</p>
            <a href={report.href} target="_blank" rel="noreferrer" className={linkClass}>
              <ExternalLink className="size-3.5" />
              Open report
            </a>
          </div>
        </object>
      </div>
    </div>
  )
}

export default function Experience() {
  const [report, setReport] = useState(null)

  return (
    <main className="overflow-y-auto p-4 md:p-8 flex-1">
      {/* Page Header */}
      <div className="flex mb-6 md:mb-8 justify-between items-start gap-3">
        <div>
          <div className="flex mb-1 items-center gap-3">
            <h1 className="font-bold text-2xl md:text-3xl leading-8 md:leading-9 tracking-tight">Experience</h1>
            <span className="bg-[oklch(0.488_0.243_264.376)]/15 text-[oklch(0.488_0.243_264.376)] font-mono rounded-full text-xs leading-4 px-2 py-0.5">
              5 roles
            </span>
          </div>
          <p className="text-[var(--text-secondary)] text-sm leading-5">{`Deployment history · roles & engineering tenures`}</p>
        </div>
        <a
          href="https://drive.google.com/file/d/1KqdbqQFRvCLU8Yi_KsU6f6hhFppqnXBN/view?usp=drive_link"
          target="_blank"
          rel="noreferrer"
        >
          <Button className="gap-2 h-9">
            <Download className="size-4" />
            Resume.pdf
          </Button>
        </a>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 mb-6 md:mb-8 gap-3 md:gap-4">
        {[
          { label: 'INTERNSHIP', icon: Clock, value: '5 mo', sub: 'RagaAI · SDE Intern', subColor: 'oklch(0.488 0.243 264.376)' },
          { label: 'CLIENTS SERVED', icon: Users, value: '10+', sub: 'YouTubers & clients', subColor: 'var(--text-secondary)' },
          { label: 'PROJECTS', icon: Rocket, value: '7', sub: 'shipped & live', subColor: 'oklch(0.696 0.17 162.48)' },
          { label: 'CURRENT STATUS', icon: Activity, value: 'Active', sub: 'open to work', subColor: 'oklch(0.696 0.17 162.48)', iconColor: 'oklch(0.696 0.17 162.48)' },
        ].map((stat) => (
          <Card key={stat.label} className="bg-[var(--bg-panel)] border-0 border-solid p-5 gap-2">
            <CardHeader className="p-0 flex-row justify-between items-center gap-0">
              <span className="text-[var(--text-secondary)] text-[10px] tracking-widest">{stat.label}</span>
              <stat.icon className="size-3.5" style={{ color: stat.iconColor ?? 'var(--text-secondary)' }} />
            </CardHeader>
            <CardContent className="p-0">
              <div className="font-bold text-2xl leading-8">{stat.value}</div>
              <div className="text-xs leading-4" style={{ color: stat.subColor }}>{stat.sub}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline */}
        <div className="col-span-1 lg:col-span-2">
          <div className="flex mb-5 items-center gap-2">
            <GitBranch className="size-4 text-[oklch(0.488_0.243_264.376)]" />
            <h2 className="font-bold text-lg leading-7">Deployment Timeline</h2>
            <span className="font-mono rounded-full bg-[var(--bg-elevated)] text-[var(--text-secondary)] text-xs leading-4 px-2 py-0.5">main</span>
          </div>
          <div className="relative pl-8">
            <div className="bg-[var(--line-10)] absolute left-[7px] inset-y-2 w-px" />
            {jobs.map((job, i) => (
              <div key={job.title} className={`relative ${i < jobs.length - 1 ? 'mb-6' : ''}`}>
                <div
                  className="size-4 rounded-full absolute -left-[29px] top-1"
                  style={{
                    backgroundColor: job.dotColor,
                    boxShadow: `0 0 0 4px color-mix(in oklch, ${job.dotColor} 15%, transparent)`,
                  }}
                />
                <Card className="bg-[var(--bg-panel)] border-0 border-solid p-6 gap-4">
                  <CardHeader className="p-0 gap-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        {job.logo && (
                          <div className={`${job.logoBg ?? 'bg-[var(--bg-elevated)]'} rounded-lg p-1.5 flex items-center justify-center shrink-0 mt-0.5`}>
                            <img src={job.logo} alt={job.company} className="h-6 w-auto" />
                          </div>
                        )}
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-base leading-6">{job.title}</h3>
                            {job.current && (
                              <span className="bg-[oklch(0.696_0.17_162.48)]/15 text-[oklch(0.696_0.17_162.48)] font-mono rounded-full text-[10px] px-2 py-0.5">
                                CURRENT
                              </span>
                            )}
                          </div>
                          <div className="text-[oklch(0.488_0.243_264.376)] font-medium text-sm leading-5">{job.company}</div>
                        </div>
                      </div>
                      <span className="font-mono text-[var(--text-secondary)] text-xs leading-4 text-right">{job.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 gap-3">
                    <p className="text-[var(--text-secondary)] text-sm leading-5">{job.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {job.tags.map((tag) => (
                        <span key={tag} className="rounded-lg bg-[var(--bg-elevated)] text-xs leading-4 px-2 py-1">{tag}</span>
                      ))}
                    </div>
                    {job.report && (
                      <button
                        onClick={() => setReport(job.report)}
                        className="flex items-center gap-3 rounded-lg border border-[var(--line-10)] bg-[var(--bg-app)] hover:bg-[var(--bg-elevated)] transition-colors px-3 py-2.5 text-left"
                      >
                        <span className="size-8 shrink-0 rounded-md bg-[oklch(0.488_0.243_264.376)]/15 text-[oklch(0.488_0.243_264.376)] flex items-center justify-center">
                          <FileText className="size-4" />
                        </span>
                        <span className="flex flex-col min-w-0">
                          <span className="font-medium text-sm leading-5 truncate">{job.report.title}</span>
                          <span className="text-[var(--text-secondary)] text-xs leading-4 truncate">{job.report.meta}</span>
                        </span>
                        <span className="ml-auto shrink-0 text-[oklch(0.488_0.243_264.376)] text-xs font-medium">View report</span>
                      </button>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-1 flex flex-col gap-4 md:gap-6">
          {/* Location Image */}
          <Card className="bg-[var(--bg-panel)] border-0 border-solid p-0 gap-0 overflow-hidden">
            <div className="relative h-32">
              <img
                src={profile2}
                alt="workspace"
                className="object-cover w-full h-full"
              />
              <div className="bg-[linear-gradient(to_top,oklch(0.205_0_0)_10%,transparent)] absolute inset-0" />
              <div className="flex absolute left-4 bottom-3 items-center gap-2">
                <MapPin className="size-3.5 text-neutral-50" />
                <span className="font-medium text-xs leading-4 text-neutral-50">India · Open to Remote</span>
              </div>
            </div>
          </Card>

          {/* Core Competencies */}
          <Card className="bg-[var(--bg-panel)] border-0 border-solid p-6 gap-4">
            <CardHeader className="p-0 flex-row items-center gap-2">
              <Wrench className="size-4 text-[oklch(0.769_0.188_70.08)]" />
              <h3 className="font-bold text-base leading-6">Core Competencies</h3>
            </CardHeader>
            <CardContent className="p-0 gap-4">
              {skills.map((skill, i) => (
                <div key={skill.label}>
                  <div className="text-xs leading-4 flex mb-1 justify-between items-center" style={{ marginTop: i > 0 ? '12px' : 0 }}>
                    <span>{skill.label}</span>
                    <span className="font-mono text-[var(--text-secondary)]">{skill.value}%</span>
                  </div>
                  <div className="rounded-full bg-[var(--bg-elevated)] h-1.5 overflow-hidden">
                    <div className="rounded-full h-full" style={{ width: `${skill.value}%`, backgroundColor: skill.color }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Education */}
          <Card className="bg-[var(--bg-panel)] border-0 border-solid p-6 gap-4">
            <CardHeader className="p-0 flex-row items-center gap-2">
              <GraduationCap className="size-4 text-[oklch(0.488_0.243_264.376)]" />
              <h3 className="font-bold text-base leading-6">Education</h3>
            </CardHeader>
            <CardContent className="p-0 gap-4">
              <div className="flex flex-col gap-1">
                <div className="font-medium text-sm leading-5">BTech Computer Science Engineering</div>
                <div className="text-[oklch(0.488_0.243_264.376)] text-xs leading-4">Lovely Professional University · 2023–2026</div>
                <p className="text-[var(--text-secondary)] text-xs leading-4 mt-1">
                  Graduated 2026. Full-stack web development, programming, and user-centric design. Active in campus dev society.
                </p>
              </div>
              <div className="flex flex-col gap-1 pt-4 border-t border-[var(--line-8)]">
                <div className="font-medium text-sm leading-5">Diploma in Electrical Engineering</div>
                <div className="text-[oklch(0.488_0.243_264.376)] text-xs leading-4">Buddha Polytechnic College · 2020–2023</div>
                <p className="text-[var(--text-secondary)] text-xs leading-4 mt-1">CGPA 8.1 / 10 · Gorakhpur, Uttar Pradesh</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {report && <ReportViewer report={report} onClose={() => setReport(null)} />}
    </main>
  )
}
