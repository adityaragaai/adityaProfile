import {
  Activity,
  ArrowUpRight,
  Calendar,
  Cpu,
  Download,
  ExternalLink,
  FolderOpen,
  GitCommit,
  Layers,
  Mail,
  MapPin,
  Rocket,
  Sparkles,
  Terminal,
  TrendingUp,
  PlaySquare,
  Plug,
  Trophy,
  ChevronRight,
  Flame,
  Medal,
} from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import TECH_ICONS from '../lib/techIcons'
import { FallbackComponent } from '../CustomComponents'
import CommitHeatmap from '../components/CommitHeatmap'
import GitHubStats from '../components/GitHubStats'
import { useLeetCode } from '../hooks/useLeetCode'
import { parseProfile, parseContest, parseBadges } from '../lib/leetcode'

export default function Dashboard({ onNavigate }) {
  return (
    <div className="flex p-6 flex-col flex-1 gap-4 overflow-auto">
      {/* Hero Banner */}
      <div className="relative min-h-[220px] rounded-2xl border-white/10 border-1 border-solid flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1735948055457-8d816fb80a87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjB3b3Jrc3BhY2UlMjBtaW5pbWFsJTIwZGFya3xlbnwxfDB8fHwxNzgwMTk3MjgxfDA&ixlib=rb-4.1.0&q=80&w=1200"
          alt="Developer workspace"
          className="object-cover opacity-30 absolute inset-0 w-full h-full"
        />
        <div className="bg-[linear-gradient(to_top,oklch(0.145_0_0)_0%,transparent_60%)] absolute inset-0" />
        <div className="relative z-10 flex p-8 flex-col gap-2 w-full">
          <div className="flex mb-1 items-center gap-2">
            <span className="text-[oklch(0.488_0.243_264.376)] bg-[oklch(0.488_0.243_264.376)]/10 border-[oklch(0.488_0.243_264.376)]/30 font-mono rounded-full text-[10px] border-1 border-solid px-2 py-0.5">
              PROCESS_ID: 0xAG09 · UPTIME: BTech CSE @ LPU
            </span>
          </div>
          <h1 className="font-bold text-neutral-50 text-4xl leading-10 tracking-tight">
            Aditya Gupta
            <span className="font-light text-[#a1a1a1]"> / Full-Stack Developer</span>
          </h1>
          <p className="max-w-xl text-[#a1a1a1] text-sm leading-5">
            Full-Stack Developer who ships fast and thinks in systems. I build clean, scalable web apps — and yes, I vibe code with AI to move faster without cutting corners. Obsessed with great UI, sharp logic, and turning ideas into live products.
          </p>
          <div className="flex mt-2 items-center gap-3">
            <button
              onClick={() => onNavigate?.('projects')}
              className="bg-[oklch(0.922_0_0)] text-[oklch(0.205_0_0)] transition-colors font-semibold rounded-lg text-xs leading-4 flex px-4 py-2 items-center gap-2"
            >
              <FolderOpen className="size-3.5" />
              View Projects
            </button>
            <a
              href="https://drive.google.com/file/d/1k5COQAnL50fvoU5ARkQF7D_noFjuJCbp/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="transition-colors font-medium rounded-lg text-neutral-50 text-xs leading-4 border-white/10 border-1 border-solid flex px-4 py-2 items-center gap-2"
            >
              <Download className="size-3.5" />
              Resume.pdf
            </a>
            <a
              href="https://github.com/Adityaguptawebdev"
              target="_blank"
              rel="noreferrer"
              className="transition-colors font-medium rounded-lg text-neutral-50 text-xs leading-4 border-white/10 border-1 border-solid flex px-4 py-2 items-center gap-2"
            >
              <FallbackComponent className="size-3.5" />
              GitHub
            </a>
          </div>
        </div>
        <div className="z-10 flex absolute right-6 top-6 flex-col gap-2">
          <div className="bg-[oklch(0.205_0_0)]/80 backdrop-blur-sm rounded-xl border-white/10 border-1 border-solid flex p-3 flex-col gap-1">
            <p className="uppercase text-[#a1a1a1] text-[10px] tracking-widest">Stack</p>
            <div className="max-w-[180px] flex flex-wrap gap-1">
              {[
                { t: 'React.js',   c: 'oklch(0.488 0.243 264.376)' },
                { t: 'Node.js',    c: 'oklch(0.488 0.243 264.376)' },
                { t: 'MongoDB',    c: 'oklch(0.696 0.17 162.48)' },
                { t: 'JavaScript', c: 'oklch(0.696 0.17 162.48)' },
                { t: 'TypeScript', c: 'oklch(0.488 0.243 264.376)' },
                { t: 'Java',       c: 'oklch(0.769 0.188 70.08)' },
                { t: 'Figma',      c: 'oklch(0.769 0.188 70.08)' },
                { t: 'UI/UX',      c: 'oklch(0.627 0.265 303.9)' },
              ].map(({ t, c }) => (
                <span key={t} className="flex items-center gap-1 rounded-full text-[10px] border border-solid px-2 py-0.5"
                  style={{ color: c, backgroundColor: `color-mix(in oklch, ${c} 15%, transparent)`, borderColor: `color-mix(in oklch, ${c} 20%, transparent)` }}>
                  {TECH_ICONS[t] && <img src={TECH_ICONS[t]} alt={t} className="size-3 object-contain" />}
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-[oklch(0.205_0_0)] border-white/10 border-0 border-solid p-4 gap-2">
          <CardContent className="flex p-0 flex-col gap-0">
            <div className="flex mb-1 justify-between items-center">
              <span className="uppercase text-[#a1a1a1] text-[10px] tracking-widest">Projects Shipped</span>
              <Rocket className="size-3.5 text-[oklch(0.488_0.243_264.376)]" />
            </div>
            <p className="font-bold text-neutral-50 text-3xl leading-9">7</p>
            <p className="text-[oklch(0.696_0.17_162.48)] text-[10px] flex mt-1 items-center gap-1">
              <TrendingUp className="size-3" />
              +3 this year
            </p>
          </CardContent>
        </Card>
        <Card className="bg-[oklch(0.205_0_0)] border-white/10 border-0 border-solid p-4 gap-2">
          <CardContent className="flex p-0 flex-col gap-0">
            <div className="flex mb-1 justify-between items-center">
              <span className="uppercase text-[#a1a1a1] text-[10px] tracking-widest">GitHub Commits</span>
              <GitCommit className="size-3.5 text-[oklch(0.696_0.17_162.48)]" />
            </div>
            <p className="font-bold text-neutral-50 text-3xl leading-9">500+</p>
            <p className="text-[oklch(0.696_0.17_162.48)] text-[10px] flex mt-1 items-center gap-1">
              <TrendingUp className="size-3" />
              across all repos
            </p>
          </CardContent>
        </Card>
        <Card className="bg-[oklch(0.205_0_0)] border-white/10 border-0 border-solid p-4 gap-2">
          <CardContent className="flex p-0 flex-col gap-0">
            <div className="flex mb-1 justify-between items-center">
              <span className="uppercase text-[#a1a1a1] text-[10px] tracking-widest">APIs Integrated</span>
              <Plug className="size-3.5 text-[oklch(0.769_0.188_70.08)]" />
            </div>
            <p className="font-bold text-neutral-50 text-3xl leading-9">24</p>
            <p className="text-[#a1a1a1] text-[10px] mt-1">OpenAI · Stripe · Clerk · more</p>
          </CardContent>
        </Card>
        <Card className="bg-[oklch(0.205_0_0)] border-white/10 border-0 border-solid p-4 gap-2">
          <CardContent className="flex p-0 flex-col gap-0">
            <div className="flex mb-1 justify-between items-center">
              <span className="uppercase text-[#a1a1a1] text-[10px] tracking-widest">Uptime SLA</span>
              <Activity className="size-3.5 text-[oklch(0.627_0.265_303.9)]" />
            </div>
            <p className="font-bold text-neutral-50 text-3xl leading-9">99.9%</p>
            <p className="text-[oklch(0.696_0.17_162.48)] text-[10px] flex mt-1 items-center gap-1">
              <span className="size-1.5 bg-[oklch(0.696_0.17_162.48)] inline-block rounded-full" />
              All systems live
            </p>
          </CardContent>
        </Card>
      </div>

      {/* LeetCode Teaser Card */}
      <LeetCodeCard onNavigate={onNavigate} />

      {/* Main Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 flex flex-col gap-4">
          {/* Active Projects */}
          <Card className="bg-[oklch(0.205_0_0)] border-white/10 border-0 border-solid p-6 gap-4">
            <CardHeader className="p-0 gap-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Layers className="size-4 text-[oklch(0.488_0.243_264.376)]" />
                  <span className="font-semibold text-neutral-50 text-sm leading-5">Active Projects</span>
                  <span className="bg-[oklch(0.488_0.243_264.376)]/15 text-[oklch(0.488_0.243_264.376)] border-[oklch(0.488_0.243_264.376)]/20 rounded-full text-[10px] border-1 border-solid px-2 py-0.5">
                    3 running
                  </span>
                </div>
                <button onClick={() => onNavigate?.('projects')} className="text-[#a1a1a1] text-[10px] flex items-center gap-1">
                  <ExternalLink className="size-3" />
                  View all
                </button>
              </div>
            </CardHeader>
            <CardContent className="flex p-0 flex-col gap-2">
              {[
                {
                  name: 'AlgoTaskFlow — Task Manager',
                  status: 'PRODUCTION',
                  color: 'oklch(0.488 0.243 264.376)',
                  desc: 'Full-stack task manager with JWT auth, role-based access, Admin CRUD, Recharts analytics, and Zustand theming.',
                  progress: 92,
                  bar: 'oklch(0.488 0.243 264.376)',
                  tags: ['React 19', 'TypeScript', 'Node.js', 'MongoDB'],
                  link: 'https://algotaskflow.vercel.app/dashboard',
                },
                {
                  name: 'Re-Boxed — E-Commerce',
                  status: 'PRODUCTION',
                  color: 'oklch(0.696 0.17 162.48)',
                  desc: 'Full-stack e-commerce platform for buying and selling second-hand products with an admin dashboard.',
                  progress: 95,
                  bar: 'oklch(0.488 0.243 264.376)',
                  tags: ['React.js', 'Node.js', 'MongoDB'],
                  link: 'https://re-boxed.vercel.app/',
                },
                {
                  name: 'LMS System — Ed-Tech',
                  status: 'BETA',
                  color: 'oklch(0.769 0.188 70.08)',
                  desc: 'Full-stack Learning Management System with course management and student dashboards.',
                  progress: 65,
                  bar: 'oklch(0.769 0.188 70.08)',
                  tags: ['React', 'Node.js', 'MongoDB'],
                  link: 'https://github.com/Adityaguptawebdev/LMS-System-INT222',
                },
              ].map((project) => (
                <div key={project.name} className="bg-[oklch(0.145_0_0)] rounded-xl border-white/10 border-1 border-solid flex p-4 flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full" style={{ backgroundColor: project.color }} />
                        <span className="font-semibold text-neutral-50 text-sm leading-5">{project.name}</span>
                        <span
                          className="rounded-full text-[10px] border-1 border-solid px-2 py-0.5"
                          style={{
                            color: project.color,
                            backgroundColor: `color-mix(in oklch, ${project.color} 10%, transparent)`,
                            borderColor: `color-mix(in oklch, ${project.color} 20%, transparent)`,
                          }}
                        >
                          {project.status}
                        </span>
                      </div>
                      <p className="text-[#a1a1a1] text-xs leading-4">{project.desc}</p>
                    </div>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg text-[#a1a1a1] text-[10px] border-white/10 border-1 border-solid flex px-2 py-1 items-center gap-1"
                    >
                      <ArrowUpRight className="size-3" />
                      Open
                    </a>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 rounded-full text-[10px] font-medium px-2.5 py-0.5"
                        style={{
                          color: project.color,
                          backgroundColor: `color-mix(in oklch, ${project.color} 10%, transparent)`,
                          border: `1px solid color-mix(in oklch, ${project.color} 20%, transparent)`,
                        }}
                      >
                        {TECH_ICONS[tag] && (
                          <img src={TECH_ICONS[tag]} alt={tag} className="size-3 object-contain" />
                        )}
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Commit Activity — live GitHub heatmap */}
          <Card className="bg-[oklch(0.205_0_0)] border-white/10 border-0 border-solid p-6 gap-4">
            <CardContent className="p-0">
              <CommitHeatmap username="adityaragaai" weeksCount={18} />
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4">
          {/* System Logs */}
          <Card className="bg-[oklch(0.205_0_0)] border-white/10 border-0 border-solid p-6 gap-4">
            <CardHeader className="p-0 gap-1">
              <div className="flex items-center gap-2">
                <Terminal className="size-4 text-[oklch(0.696_0.17_162.48)]" />
                <span className="font-semibold text-neutral-50 text-sm leading-5">System Logs</span>
              </div>
            </CardHeader>
            <CardContent className="flex p-0 flex-col gap-1">
              <div className="bg-[oklch(0.145_0_0)] max-h-48 font-mono rounded-xl text-[10px] flex p-3 flex-col gap-1.5 overflow-hidden">
                {[
                  { time: '10:02:44', type: 'INFO', color: 'oklch(0.696 0.17 162.48)', msg: 'algotaskflow.vercel.app · live' },
                  { time: '10:02:31', type: 'BUILD', color: 'oklch(0.488 0.243 264.376)', msg: 'TypeScript 0 errors · React 19' },
                  { time: '10:02:18', type: 'AUTH', color: 'oklch(0.627 0.265 303.9)', msg: 'JWT middleware · verified ✓' },
                  { time: '10:02:05', type: 'DB', color: 'oklch(0.769 0.188 70.08)', msg: 'MongoDB Atlas connected · 4ms' },
                  { time: '10:01:52', type: 'INFO', color: 'oklch(0.696 0.17 162.48)', msg: 'RagaAI internship · completed ✓' },
                  { time: '10:01:39', type: 'BUILD', color: 'oklch(0.488 0.243 264.376)', msg: 're-boxed.vercel.app · deployed' },
                  { time: '10:01:26', type: 'INFO', color: 'oklch(0.696 0.17 162.48)', msg: 'GitHub push · adityaragaai' },
                ].map((log, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-[oklch(0.708_0_0)]">{log.time}</span>
                    <span style={{ color: log.color }}>{log.type}</span>
                    <span className="text-[#a1a1a1]">{log.msg}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2">
                  <span className="text-[oklch(0.708_0_0)]">10:00:30</span>
                  <span className="text-[oklch(0.696_0.17_162.48)]">INFO</span>
                  <span className="text-[#a1a1a1]">Dev server listening :5176</span>
                  <span className="inline-block size-1.5 bg-[oklch(0.696_0.17_162.48)] animate-pulse rounded-full ml-1" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tech Stack */}
          <Card className="bg-[oklch(0.205_0_0)] border-white/10 border-0 border-solid p-6 gap-4">
            <CardHeader className="p-0 gap-1">
              <div className="flex items-center gap-2">
                <Cpu className="size-4 text-[oklch(0.627_0.265_303.9)]" />
                <span className="font-semibold text-neutral-50 text-sm leading-5">Tech Stack</span>
              </div>
            </CardHeader>
            <CardContent className="flex p-0 flex-col gap-2">
              <span className="text-[#a1a1a1] text-xs leading-4">Frontend</span>
              <div className="flex flex-wrap gap-1.5">
                {['React.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS'].map((t) => (
                  <span key={t} className="flex items-center gap-1 bg-[oklch(0.488_0.243_264.376)]/10 text-[oklch(0.488_0.243_264.376)] border-[oklch(0.488_0.243_264.376)]/20 rounded-full text-[10px] border border-solid px-2 py-0.5">
                    {TECH_ICONS[t] && <img src={TECH_ICONS[t]} alt={t} className="size-3 object-contain" />}
                    {t}
                  </span>
                ))}
              </div>
              <span className="text-[#a1a1a1] text-xs leading-4 mt-1">Backend & DB</span>
              <div className="flex flex-wrap gap-1.5">
                {['Node.js', 'MongoDB', 'Java', 'SQL', 'Git'].map((t) => (
                  <span key={t} className="flex items-center gap-1 bg-[oklch(0.696_0.17_162.48)]/10 text-[oklch(0.696_0.17_162.48)] border-[oklch(0.696_0.17_162.48)]/20 rounded-full text-[10px] border border-solid px-2 py-0.5">
                    {TECH_ICONS[t] && <img src={TECH_ICONS[t]} alt={t} className="size-3 object-contain" />}
                    {t}
                  </span>
                ))}
              </div>
              <span className="text-[#a1a1a1] text-xs leading-4 mt-1">Design & Other</span>
              <div className="flex flex-wrap gap-1.5">
                {['Figma', 'UI/UX', 'C++'].map((t) => (
                  <span key={t} className="flex items-center gap-1 bg-[oklch(0.627_0.265_303.9)]/10 text-[oklch(0.627_0.265_303.9)] border-[oklch(0.627_0.265_303.9)]/20 rounded-full text-[10px] border border-solid px-2 py-0.5">
                    {TECH_ICONS[t] && <img src={TECH_ICONS[t]} alt={t} className="size-3 object-contain" />}
                    {t}
                  </span>
                ))}
              </div>
              <div className="border-white/10 border-t border-solid mt-1 pt-2">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Sparkles className="size-3 text-[oklch(0.769_0.188_70.08)]" />
                  <span className="text-[#a1a1a1] text-xs leading-4">AI-Augmented Dev</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {['Claude', 'Cursor', 'ChatGPT', 'Antigravity'].map((t) => (
                    <span key={t} className="bg-[oklch(0.769_0.188_70.08)]/10 text-[oklch(0.769_0.188_70.08)] border-[oklch(0.769_0.188_70.08)]/20 rounded-full text-[10px] border-1 border-solid px-2 py-0.5">{t}</span>
                  ))}
                </div>
                <p className="text-[#a1a1a1] text-[10px] mt-1.5 leading-4">Using AI tools to ship faster & smarter.</p>
              </div>
            </CardContent>
          </Card>

          {/* Open to Work */}
          <Card className="bg-[oklch(0.205_0_0)] border-white/10 border-0 border-solid p-6 gap-4">
            <CardHeader className="p-0 gap-1">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-[oklch(0.769_0.188_70.08)]" />
                <span className="font-semibold text-neutral-50 text-sm leading-5">Open to Work</span>
              </div>
            </CardHeader>
            <CardContent className="flex p-0 flex-col gap-2">
              <p className="text-[#a1a1a1] text-xs leading-4">
                Seeking internships and full-time Full-Stack Developer / UI-UX Designer roles. Also available for freelance projects.
              </p>
              <div className="flex flex-col gap-1">
                <div className="text-[#a1a1a1] text-xs leading-4 flex items-center gap-2">
                  <MapPin className="size-3 text-[oklch(0.488_0.243_264.376)]" />
                  India · Open to Remote
                </div>
                <div className="text-[#a1a1a1] text-xs leading-4 flex items-center gap-2">
                  <Calendar className="size-3 text-[oklch(0.488_0.243_264.376)]" />
                  Available immediately
                </div>
              </div>
              <div className="flex gap-2 mt-1">
                <a
                  href="https://www.linkedin.com/in/adityagupta-swe/"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[oklch(0.922_0_0)] text-[oklch(0.205_0_0)] transition-colors font-semibold rounded-lg text-xs leading-4 flex flex-1 py-2 justify-center items-center gap-2"
                >
                  <Mail className="size-3.5" />
                  LinkedIn
                </a>
                <a
                  href="https://youtu.be/E3hUmiRxPxg?si=9Dv9-4nkeKjc9W4s"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors font-medium rounded-lg text-neutral-50 text-xs leading-4 border-white/10 border-1 border-solid flex flex-1 py-2 justify-center items-center gap-2"
                >
                  <PlaySquare className="size-3.5" />
                  YouTube
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* GitHub Contributions */}
      <GitHubStats />
    </div>
  )
}

// ─── LeetCode Teaser Card ──────────────────────────────────────────────────

function DiffPill({ label, solved, total, color }) {
  return (
    <div className="flex flex-col gap-1 min-w-[80px]">
      <div className="flex justify-between text-[10px]">
        <span style={{ color }}>{label}</span>
        <span className="text-neutral-50 font-semibold">{solved}</span>
      </div>
      <div className="bg-[oklch(0.269_0_0)] rounded-full h-1 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${total ? (solved / total) * 100 : 0}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}

function LeetCodeCard({ onNavigate }) {
  const { data, loading } = useLeetCode('rahul860152gupta')
  const profile = parseProfile(data?.profile)
  const contest = parseContest(data?.contest)
  const { badges } = parseBadges(data?.badges)

  const solved  = profile?.solved        || { total: 402, easy: 234, medium: 155, hard: 13 }
  const totals  = profile?.totalProblems || { easy: 947, medium: 2063, hard: 939 }
  const rating  = contest?.rating        || 1301
  const streak  = profile?.calendar?.streak || 15

  const topBadges = badges.length
    ? badges.slice(0, 5)
    : [
        { id: '1', name: '50 Days Badge 2026',  icon: 'https://assets.leetcode.com/static_assets/others/50_1080_1080.png' },
        { id: '2', name: '200 Days Badge 2025', icon: 'https://assets.leetcode.com/static_assets/others/lg200.png' },
        { id: '3', name: '100 Days Badge 2025', icon: 'https://assets.leetcode.com/static_assets/others/lg25100.png' },
        { id: '4', name: '50 Days Badge 2025',  icon: 'https://assets.leetcode.com/static_assets/others/lg2550.png' },
        { id: '5', name: '50 Days Badge 2024',  icon: 'https://assets.leetcode.com/static_assets/marketing/2024-50-lg.png' },
      ]

  return (
    <button
      onClick={() => onNavigate?.('leetcode')}
      className="group w-full text-left bg-[oklch(0.205_0_0)] rounded-2xl border border-white/10
                 hover:border-[oklch(0.769_0.188_70.08)]/40
                 transition-all duration-200 focus:outline-none"
    >
      {/* Row 1: stats */}
      <div className="flex items-center justify-between flex-wrap gap-4 p-5">
        {/* Left: branding + solved */}
        <div className="flex items-center gap-4">
          <div className="size-10 rounded-xl bg-[oklch(0.769_0.188_70.08)]/15 border border-[oklch(0.769_0.188_70.08)]/30 flex items-center justify-center shrink-0">
            <Trophy className="size-5 text-[oklch(0.769_0.188_70.08)]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-neutral-50 text-sm">LeetCode</p>
              {loading ? (
                <span className="w-16 h-3 bg-[oklch(0.269_0_0)] rounded animate-pulse inline-block" />
              ) : (
                <span className="text-[oklch(0.769_0.188_70.08)] bg-[oklch(0.769_0.188_70.08)]/10 border border-[oklch(0.769_0.188_70.08)]/20 rounded-full text-[10px] px-2 py-0.5 font-mono">
                  {solved.total} solved
                </span>
              )}
            </div>
            <p className="text-[#a1a1a1] text-[10px] mt-0.5">@rahul860152gupta · Live stats</p>
          </div>
        </div>

        {/* Middle: difficulty bars */}
        <div className="flex gap-4 flex-wrap">
          {loading ? (
            [0,1,2].map(i => <div key={i} className="w-20 h-8 bg-[oklch(0.269_0_0)] rounded animate-pulse" />)
          ) : (
            <>
              <DiffPill label="Easy"   solved={solved.easy}   total={totals.easy}   color="#00B8A3" />
              <DiffPill label="Medium" solved={solved.medium} total={totals.medium} color="#FFC01E" />
              <DiffPill label="Hard"   solved={solved.hard}   total={totals.hard}   color="#FF375F" />
            </>
          )}
        </div>

        {/* Right: contest + streak + cta */}
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-neutral-50 font-bold text-sm">{loading ? '—' : rating.toLocaleString()}</p>
            <p className="text-[#a1a1a1] text-[9px] uppercase tracking-wider">Contest</p>
          </div>
          <div className="text-center">
            <p className="text-neutral-50 font-bold text-sm flex items-center gap-1 justify-center">
              <Flame className="size-3 text-[oklch(0.769_0.188_70.08)]" />
              {loading ? '—' : `${streak}d`}
            </p>
            <p className="text-[#a1a1a1] text-[9px] uppercase tracking-wider">Streak</p>
          </div>
          <div className="flex items-center gap-1 text-[#a1a1a1] group-hover:text-[oklch(0.769_0.188_70.08)] transition-colors text-xs ml-2">
            View Stats
            <ChevronRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/8 mx-5" />

      {/* Row 2: badges */}
      <div className="flex items-center gap-4 px-5 py-3">
        <div className="flex items-center gap-1.5 shrink-0">
          <Medal className="size-3.5 text-[oklch(0.769_0.188_70.08)]" />
          <span className="text-[10px] text-[#a1a1a1] uppercase tracking-widest">Badges</span>
          <span className="text-[10px] font-bold text-[oklch(0.769_0.188_70.08)] ml-0.5">{topBadges.length}</span>
        </div>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {loading ? (
            [0,1,2,3,4].map(i => (
              <div key={i} className="size-8 rounded-lg bg-[oklch(0.269_0_0)] animate-pulse shrink-0" />
            ))
          ) : (
            topBadges.map((badge, i) => (
              <div
                key={badge.id}
                className={`relative shrink-0 size-8 rounded-lg overflow-hidden border transition-colors
                  ${i === 0
                    ? 'border-[oklch(0.769_0.188_70.08)]/50 bg-[oklch(0.769_0.188_70.08)]/10'
                    : 'border-white/10 bg-[oklch(0.145_0_0)]'}`}
                title={badge.name}
              >
                <img
                  src={badge.icon}
                  alt={badge.name}
                  className="w-full h-full object-contain p-0.5"
                  onError={e => { e.target.style.display = 'none' }}
                />
                {i === 0 && (
                  <span className="absolute -top-1 -right-1 size-2.5 bg-[oklch(0.769_0.188_70.08)] rounded-full border border-[oklch(0.205_0_0)]" />
                )}
              </div>
            ))
          )}
        </div>
        {!loading && topBadges[0] && (
          <p className="text-[10px] text-[#a1a1a1] shrink-0 hidden sm:block">
            Latest: <span className="text-neutral-50 font-medium">{topBadges[0].name}</span>
          </p>
        )}
      </div>
    </button>
  )
}
