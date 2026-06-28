import { useState } from 'react'
import lpuImg from '../assets/lpu.jpeg'
import certInfosys from '../assets/cert-infosys.png'
import certNptel from '../assets/cert-nptel.png'
import certTechsaksham from '../assets/cert-techsaksham.png'
import certPwskills from '../assets/cert-pwskills.png'
import {
  Award,
  BookOpen,
  CalendarClock,
  Check,
  GitBranch,
  GraduationCap,
  Layers,
  MapPin,
  TrendingUp,
  Trophy,
  PlaySquare,
  X,
  ZoomIn,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const timeline = [
  {
    title: 'BTech Computer Science Engineering',
    institution: 'Lovely Professional University',
    period: '2023 — 2026',
    dotColor: 'oklch(0.696 0.17 162.48)',
    current: false,
    desc: 'Pursuing a B.Tech in CSE with a focus on full-stack web development, data structures, algorithms, and software engineering. Active member of the campus developer community.',
    tags: ['Full-Stack Dev', 'DSA', 'Software Engineering', 'Project Management'],
  },
  {
    title: 'Diploma in Electrical Engineering',
    institution: 'Buddha Polytechnic College',
    period: '2020 — 2023',
    dotColor: 'oklch(0.769 0.188 70.08)',
    current: false,
    desc: 'Three-year technical diploma developing a strong foundation in engineering principles, mathematics, and problem-solving that now underlies my approach to software development.',
    tags: ['Electrical Engg.', 'Mathematics', 'Physics', 'PLC', 'C++'],
  },
  {
    title: 'Class 12 · Science (PCM)',
    institution: 'U.P. Board',
    period: '2018 — 2020',
    dotColor: 'oklch(0.627 0.265 303.9)',
    current: false,
    desc: 'Completed higher secondary education with Physics, Chemistry, and Mathematics. Developed a strong analytical foundation that drives my engineering mindset.',
    tags: ['Physics', 'Chemistry', 'Mathematics'],
  },
  {
    title: 'Class 10 · Secondary Education',
    institution: 'U.P. Board',
    period: '2016 — 2018',
    dotColor: 'oklch(0.769 0.188 70.08)',
    current: false,
    desc: 'Completed secondary schooling with a focus on Science and Mathematics. Built early curiosity in technology and logical reasoning that shaped future academic choices.',
    tags: ['Science', 'Mathematics', 'English'],
  },
]

const certifications = [
  {
    label: 'Front-End Web Developer',
    issued: 'May 2025 · Infosys Springboard',
    image: certInfosys,
  },
  {
    label: 'Responsible and Safe AI System',
    issued: 'Oct 2024 · IIT Hyderabad / NPTEL',
    image: certNptel,
  },
  {
    label: 'AI Internship – TechSaksham',
    issued: 'Sep–Dec 2024 · Microsoft & SAP CSR',
    image: certTechsaksham,
  },
  {
    label: 'Backend Development – Node.js, Express, SQL, MongoDB',
    issued: 'Nov 2023 · Physics Wallah',
    image: certPwskills,
  },
]

const honors = [
  'Content Creator for 10+ YouTubers',
  'Mentor available on Unstop platform',
  'AlgoStrive YouTube channel — tech education',
  'Campus developer society member · LPU',
]

export default function Education() {
  const [lightbox, setLightbox] = useState(null)

  return (
    <div className="overflow-y-auto p-4 md:p-8 flex-1">
      {/* Page Header */}
      <div className="flex mb-6 md:mb-8 justify-between items-start gap-3">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <h1 className="font-bold text-2xl md:text-3xl leading-8 md:leading-9 tracking-tight">Education</h1>
            <span className="bg-[oklch(0.488_0.243_264.376)]/15 text-[oklch(0.7_0.18_264)] font-mono rounded-full text-xs leading-4 px-2.5 py-0.5">
              BTech CSE
            </span>
          </div>
          <p className="text-[#a1a1a1] text-sm leading-5">{`Academic build logs · certifications & continuous learning`}</p>
        </div>
        <a
          href="https://drive.google.com/file/d/1k5COQAnL50fvoU5ARkQF7D_noFjuJCbp/view?usp=sharing"
          target="_blank"
          rel="noreferrer"
        >
          <Button variant="outline" className="gap-2">
            <GraduationCap className="size-4" />
            Resume.pdf
          </Button>
        </a>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 mb-6 md:mb-8 gap-3 md:gap-4">
        <Card className="bg-neutral-900 border-0 border-solid p-5 gap-3">
          <CardHeader className="p-0 gap-2">
            <div className="flex justify-between items-center">
              <span className="font-mono text-[#a1a1a1] text-[10px] tracking-widest">DEGREE</span>
              <BookOpen className="size-3.5 text-[#a1a1a1]" />
            </div>
          </CardHeader>
          <CardContent className="p-0 gap-1">
            <div className="font-bold text-2xl leading-8">B.Tech</div>
            <span className="text-[#a1a1a1] text-xs leading-4">Computer Science Engg.</span>
          </CardContent>
        </Card>
        <Card className="bg-neutral-900 border-0 border-solid p-5 gap-3">
          <CardHeader className="p-0 gap-2">
            <div className="flex justify-between items-center">
              <span className="font-mono text-[#a1a1a1] text-[10px] tracking-widest">EXPERIENCE</span>
              <TrendingUp className="size-3.5 text-[#a1a1a1]" />
            </div>
          </CardHeader>
          <CardContent className="p-0 gap-1">
            <div className="font-bold text-2xl leading-8">
              15<span className="text-[#a1a1a1] text-base leading-6"> mo</span>
            </div>
            <span className="text-[oklch(0.696_0.17_162.48)] text-xs leading-4 flex items-center gap-1">
              <Award className="size-3" />
              PW Skills trained
            </span>
          </CardContent>
        </Card>
        <Card className="bg-neutral-900 border-0 border-solid p-5 gap-3">
          <CardHeader className="p-0 gap-2">
            <div className="flex justify-between items-center">
              <span className="font-mono text-[#a1a1a1] text-[10px] tracking-widest">CERTIFICATIONS</span>
              <Layers className="size-3.5 text-[#a1a1a1]" />
            </div>
          </CardHeader>
          <CardContent className="p-0 gap-1">
            <div className="font-bold text-2xl leading-8">4</div>
            <span className="text-[#a1a1a1] text-xs leading-4">Infosys · NPTEL · Microsoft · PW</span>
          </CardContent>
        </Card>
        <Card className="bg-neutral-900 border-0 border-solid p-5 gap-3">
          <CardHeader className="p-0 gap-2">
            <div className="flex justify-between items-center">
              <span className="font-mono text-[#a1a1a1] text-[10px] tracking-widest">EXPECTED</span>
              <CalendarClock className="size-3.5 text-[#a1a1a1]" />
            </div>
          </CardHeader>
          <CardContent className="p-0 gap-1">
            <div className="font-bold text-2xl leading-8">2026</div>
            <span className="text-[oklch(0.696_0.17_162.48)] text-xs leading-4">Passed out · LPU</span>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Academic Timeline */}
        <div className="col-span-1 lg:col-span-2 flex flex-col gap-6">
          <div className="flex mb-1 items-center gap-2">
            <GitBranch className="size-4 text-[oklch(0.696_0.17_162.48)]" />
            <h2 className="font-semibold text-lg leading-7">Academic Timeline</h2>
            <span className="font-mono rounded-sm bg-neutral-800 text-[#a1a1a1] text-[10px] px-2 py-0.5">edu</span>
          </div>
          {timeline.map((entry) => (
            <Card key={entry.title} className="bg-neutral-900 border-0 border-solid p-6 gap-4">
              <CardHeader className="p-0 gap-1">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <span
                      className="size-2.5 rounded-full shrink-0"
                      style={{
                        backgroundColor: entry.dotColor,
                        boxShadow: `0 0 0 4px color-mix(in oklch, ${entry.dotColor} 15%, transparent)`,
                      }}
                    />
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{entry.title}</span>
                        {entry.current && (
                          <span className="bg-[oklch(0.696_0.17_162.48)]/15 text-[oklch(0.696_0.17_162.48)] font-mono rounded-full text-[10px] px-2 py-0.5">
                            CURRENT
                          </span>
                        )}
                      </div>
                      <span className="text-[oklch(0.7_0.18_264)] text-xs leading-4">{entry.institution}</span>
                    </div>
                  </div>
                  <span className="font-mono text-[#a1a1a1] text-xs leading-4 shrink-0">{entry.period}</span>
                </div>
              </CardHeader>
              <CardContent className="p-0 gap-3">
                <p className="text-[#a1a1a1] text-sm leading-5">{entry.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {entry.tags.map((tag) => (
                    <span key={tag} className="rounded-md bg-neutral-800 text-xs leading-4 px-2 py-1">{tag}</span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Right Sidebar */}
        <div className="col-span-1 flex flex-col gap-4 md:gap-6">
          {/* Campus Image */}
          <a href="https://www.lpu.in/" target="_blank" rel="noreferrer" className="block">
            <Card className="bg-neutral-900 border-0 border-solid p-0 gap-0 overflow-hidden hover:ring-1 hover:ring-white/20 transition-all">
              <div className="relative w-full h-40">
                <img
                  src={lpuImg}
                  alt="University campus"
                  className="object-cover w-full h-full"
                />
                <div className="bg-gradient-to-t from-neutral-900 to-transparent absolute inset-0" />
                <div className="flex absolute left-4 bottom-3 items-center gap-2">
                  <MapPin className="size-3.5 text-neutral-50" />
                  <span className="font-medium text-xs leading-4">Lovely Professional University · Punjab</span>
                </div>
              </div>
            </Card>
          </a>

          {/* Certifications */}
          <Card className="bg-neutral-900 border-0 border-solid p-6 gap-4">
            <CardHeader className="p-0 gap-2">
              <div className="flex items-center gap-2">
                <Award className="size-4 text-[oklch(0.769_0.188_70.08)]" />
                <span className="font-semibold">Certifications</span>
              </div>
            </CardHeader>
            <CardContent className="p-0 gap-3">
              {certifications.map((cert) => (
                <button
                  key={cert.label}
                  onClick={() => setLightbox(cert)}
                  className="group flex items-center gap-3 w-full text-left hover:bg-neutral-800 rounded-lg p-1.5 -mx-1.5 transition-colors"
                >
                  <div className="relative size-14 rounded-lg overflow-hidden bg-neutral-800 shrink-0 border border-white/10 group-hover:border-white/20 transition-colors">
                    <img src={cert.image} alt={cert.label} className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <ZoomIn className="size-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm leading-5 text-left">{cert.label}</span>
                    <span className="font-mono text-[#a1a1a1] text-[11px]">{cert.issued}</span>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Honors & Activities */}
          <Card className="bg-neutral-900 border-0 border-solid p-6 gap-4">
            <CardHeader className="p-0 gap-2">
              <div className="flex items-center gap-2">
                <Trophy className="size-4 text-[oklch(0.769_0.188_70.08)]" />
                <span className="font-semibold">{`Highlights & Activities`}</span>
              </div>
            </CardHeader>
            <CardContent className="p-0 gap-2">
              {honors.map((h) => (
                <div key={h} className="flex items-start gap-2">
                  <Check className="size-3.5 text-[oklch(0.696_0.17_162.48)] mt-0.5 shrink-0" />
                  <span className="text-[#a1a1a1] text-sm leading-5">{h}</span>
                </div>
              ))}
              <a
                href="https://youtu.be/E3hUmiRxPxg?si=9Dv9-4nkeKjc9W4s"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 mt-2 text-[oklch(0.769_0.188_70.08)] text-xs leading-4 hover:opacity-80 transition-opacity"
              >
                <PlaySquare className="size-3.5" />
                @AlgoStrive on YouTube
              </a>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-3 -right-3 z-10 bg-neutral-800 hover:bg-neutral-700 border border-white/10 rounded-full p-1.5 transition-colors"
            >
              <X className="size-4 text-neutral-200" />
            </button>
            <img src={lightbox.image} alt={lightbox.label} className="w-full rounded-xl shadow-2xl" />
            <div className="mt-3 text-center">
              <p className="text-neutral-200 font-medium text-sm">{lightbox.label}</p>
              <p className="text-[#a1a1a1] text-xs mt-0.5">{lightbox.issued}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
