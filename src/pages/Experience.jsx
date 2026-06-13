import profile2 from '../assets/profile2.png'
import ragaaiLogo from '../assets/ragaai-logo.svg'
import microsoftLogo from '../assets/microsoft-logo.png'
import pwskillsLogo from '../assets/pwskills-logo.png'
import {
  Activity,
  Clock,
  Download,
  GitBranch,
  GraduationCap,
  MapPin,
  Rocket,
  Users,
  Wrench,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const jobs = [
  {
    title: 'SDE Frontend Intern',
    company: 'RagaAI · Bengaluru, India',
    period: 'Jan 2026 – May 2026',
    current: false,
    dotColor: 'oklch(0.488 0.243 264.376)',
    desc: 'Developed and maintained responsive web applications using React.js, TypeScript, HTML5, and CSS3. Built reusable and scalable UI components improving maintainability and reducing development time by 25%. Integrated RESTful APIs and optimized frontend performance using lazy loading and efficient state management.',
    tags: ['React.js', 'TypeScript', 'HTML5', 'CSS3', 'REST APIs'],
    logo: ragaaiLogo,
    logoBg: 'bg-white',
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

export default function Experience() {
  return (
    <main className="overflow-y-auto p-8 flex-1">
      {/* Page Header */}
      <div className="flex mb-8 justify-between items-start">
        <div>
          <div className="flex mb-1 items-center gap-3">
            <h1 className="font-bold text-3xl leading-9 tracking-tight">Experience</h1>
            <span className="bg-[oklch(0.488_0.243_264.376)]/15 text-[oklch(0.488_0.243_264.376)] font-mono rounded-full text-xs leading-4 px-2 py-0.5">
              4 roles
            </span>
          </div>
          <p className="text-[#a1a1a1] text-sm leading-5">{`Deployment history · roles & engineering tenures`}</p>
        </div>
        <a
          href="https://drive.google.com/file/d/1k5COQAnL50fvoU5ARkQF7D_noFjuJCbp/view?usp=sharing"
          target="_blank"
          rel="noreferrer"
        >
          <Button className="bg-neutral-200 text-neutral-900 gap-2 h-9">
            <Download className="size-4" />
            Resume.pdf
          </Button>
        </a>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 mb-8 gap-4">
        {[
          { label: 'INTERNSHIP', icon: Clock, value: '5 mo', sub: 'RagaAI · SDE Frontend', subColor: 'oklch(0.488 0.243 264.376)' },
          { label: 'CLIENTS SERVED', icon: Users, value: '10+', sub: 'YouTubers & clients', subColor: '#a1a1a1' },
          { label: 'PROJECTS', icon: Rocket, value: '7', sub: 'shipped & live', subColor: 'oklch(0.696 0.17 162.48)' },
          { label: 'CURRENT STATUS', icon: Activity, value: 'Active', sub: 'open to work', subColor: 'oklch(0.696 0.17 162.48)', iconColor: 'oklch(0.696 0.17 162.48)' },
        ].map((stat) => (
          <Card key={stat.label} className="bg-neutral-900 border-0 border-solid p-5 gap-2">
            <CardHeader className="p-0 flex-row justify-between items-center gap-0">
              <span className="text-[#a1a1a1] text-[10px] tracking-widest">{stat.label}</span>
              <stat.icon className="size-3.5" style={{ color: stat.iconColor ?? '#a1a1a1' }} />
            </CardHeader>
            <CardContent className="p-0">
              <div className="font-bold text-2xl leading-8">{stat.value}</div>
              <div className="text-xs leading-4" style={{ color: stat.subColor }}>{stat.sub}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Timeline */}
        <div className="col-span-2">
          <div className="flex mb-5 items-center gap-2">
            <GitBranch className="size-4 text-[oklch(0.488_0.243_264.376)]" />
            <h2 className="font-bold text-lg leading-7">Deployment Timeline</h2>
            <span className="font-mono rounded-full bg-neutral-800 text-[#a1a1a1] text-xs leading-4 px-2 py-0.5">main</span>
          </div>
          <div className="relative pl-8">
            <div className="bg-white/10 absolute left-[7px] inset-y-2 w-px" />
            {jobs.map((job, i) => (
              <div key={job.title} className={`relative ${i < jobs.length - 1 ? 'mb-6' : ''}`}>
                <div
                  className="size-4 rounded-full absolute -left-[29px] top-1"
                  style={{
                    backgroundColor: job.dotColor,
                    boxShadow: `0 0 0 4px color-mix(in oklch, ${job.dotColor} 15%, transparent)`,
                  }}
                />
                <Card className="bg-neutral-900 border-0 border-solid p-6 gap-4">
                  <CardHeader className="p-0 gap-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        {job.logo && (
                          <div className={`${job.logoBg ?? 'bg-neutral-800'} rounded-lg p-1.5 flex items-center justify-center shrink-0 mt-0.5`}>
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
                      <span className="font-mono text-[#a1a1a1] text-xs leading-4 text-right">{job.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 gap-3">
                    <p className="text-[#a1a1a1] text-sm leading-5">{job.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {job.tags.map((tag) => (
                        <span key={tag} className="rounded-lg bg-neutral-800 text-xs leading-4 px-2 py-1">{tag}</span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-1 flex flex-col gap-6">
          {/* Location Image */}
          <Card className="bg-neutral-900 border-0 border-solid p-0 gap-0 overflow-hidden">
            <div className="relative h-32">
              <img
                src={profile2}
                alt="workspace"
                className="object-cover w-full h-full"
              />
              <div className="bg-[linear-gradient(to_top,oklch(0.205_0_0)_10%,transparent)] absolute inset-0" />
              <div className="flex absolute left-4 bottom-3 items-center gap-2">
                <MapPin className="size-3.5 text-neutral-50" />
                <span className="font-medium text-xs leading-4">India · Open to Remote</span>
              </div>
            </div>
          </Card>

          {/* Core Competencies */}
          <Card className="bg-neutral-900 border-0 border-solid p-6 gap-4">
            <CardHeader className="p-0 flex-row items-center gap-2">
              <Wrench className="size-4 text-[oklch(0.769_0.188_70.08)]" />
              <h3 className="font-bold text-base leading-6">Core Competencies</h3>
            </CardHeader>
            <CardContent className="p-0 gap-4">
              {skills.map((skill, i) => (
                <div key={skill.label}>
                  <div className="text-xs leading-4 flex mb-1 justify-between items-center" style={{ marginTop: i > 0 ? '12px' : 0 }}>
                    <span>{skill.label}</span>
                    <span className="font-mono text-[#a1a1a1]">{skill.value}%</span>
                  </div>
                  <div className="rounded-full bg-neutral-800 h-1.5 overflow-hidden">
                    <div className="rounded-full h-full" style={{ width: `${skill.value}%`, backgroundColor: skill.color }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Education */}
          <Card className="bg-neutral-900 border-0 border-solid p-6 gap-4">
            <CardHeader className="p-0 flex-row items-center gap-2">
              <GraduationCap className="size-4 text-[oklch(0.488_0.243_264.376)]" />
              <h3 className="font-bold text-base leading-6">Education</h3>
            </CardHeader>
            <CardContent className="p-0 gap-1">
              <div className="font-medium text-sm leading-5">BTech Computer Science Engineering</div>
              <div className="text-[oklch(0.488_0.243_264.376)] text-xs leading-4">Lovely Professional University · 2023–Present</div>
              <p className="text-[#a1a1a1] text-xs leading-4 mt-2">
                Full-stack web development, programming, and user-centric design. Active in campus dev society.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
