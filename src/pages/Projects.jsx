import { useState, useRef, useLayoutEffect } from 'react'
import { Activity, Archive, ChevronLeft, ChevronRight, ExternalLink, GitCommit, Plus, Star } from 'lucide-react'
import reboxedScreenshot from '../assets/reboxed-screenshot.png'
import applevisionScreenshot from '../assets/applevision-screenshot.png'
import lpuMarketScreenshot from '../assets/LPU-Market.png'
import gymScreenshot from '../assets/GYM.png'
import lmsScreenshot from '../assets/LMS.png'
import invoiceflowScreenshot from '../assets/invoiceflow-screenshot.png'
import rfqbidScreenshot from '../assets/rfqbid-screenshot.png'
import calendarGif from '../assets/calander.gif'
import hintroIntro from '../assets/Hintro-intro.png'
import hintroLogin from '../assets/Hintro-login.png'
import hintroHome from '../assets/Hintro-home.png'
import foodHome from '../assets/FoodHome.png'
import foodImpact from '../assets/foodImpact.png'
import foodLeaderboard from '../assets/foodLeaderbord.png'
import foodLogin from '../assets/foodLogin.png'
import foodMyDonation from '../assets/foodMyDonation.png'
import taskflowDashboard from '../assets/taskflow-dashboard.png'
import taskflowLogin from '../assets/taskflow-login.png'
import invoiceflowVideo from '../assets/invoiceflow-demo.mov'
import taskflowVideo from '../assets/taskflow.mov'
import appleVideo from '../assets/apple.mov'
import joshVideo from '../assets/josh.mov'
import aiSafetyVideo from '../assets/AISEFTY.mov'

import TECH_ICONS from '../lib/techIcons'

function GithubIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

const projects = [
  {
    name: 'AlgoTaskFlow — Task Manager',
    status: 'PRODUCTION',
    statusColor: 'oklch(0.488 0.243 264.376)',
    desc: 'Full-stack task management app with JWT authentication, role-based access (Admin/Member), Admin CRUD for projects/tasks, Recharts analytics dashboard, and light/dark theming via Zustand.',
    progress: 92,
    tags: ['React 19', 'TypeScript', 'Node.js', 'MongoDB', 'Tailwind'],
    stars: 12,
    commit: '2026 · Latest',
    uptime: '99.9%',
    uptimeColor: 'oklch(0.696 0.17 162.48)',
    archived: false,
    images: [taskflowDashboard, taskflowLogin],
    video: taskflowVideo,
    repo: 'https://github.com/adityaragaai/TaskMBackend',
    live: 'https://algotaskflow.vercel.app/dashboard',
  },
  {
    name: 'FoodSaver — Surplus Food to NGOs',
    status: 'PRODUCTION',
    statusColor: 'oklch(0.696 0.17 162.48)',
    desc: 'Full-stack platform connecting restaurants and individuals with surplus food to nearby NGOs and volunteers. Features role-based auth (donor/NGO/volunteer), live donation feed, claim flow, impact charts, gamified leaderboard, and AI-assisted listing via Gemini.',
    progress: 90,
    tags: ['React.js', 'Tailwind CSS', 'Framer Motion', 'Recharts', 'Node.js', 'MongoDB'],
    stars: 5,
    commit: '2025 · Latest',
    uptime: '99.9%',
    uptimeColor: 'oklch(0.696 0.17 162.48)',
    archived: false,
    images: [foodHome, foodLogin, foodMyDonation, foodImpact, foodLeaderboard],
    repo: 'https://github.com/Adityaguptawebdev/FoodSaver_frontend',
    repoBack: 'https://github.com/Adityaguptawebdev/FoodSaver_backend',
    live: 'https://food-saver-frontend-seven.vercel.app/',
  },
  {
    name: 'Hintro — Video Introduction Platform',
    status: 'PRODUCTION',
    statusColor: 'oklch(0.696 0.17 162.48)',
    desc: 'Full-stack platform where users record short video introductions to make human connections before meetings. Features video upload, playback, user auth, and a clean onboarding flow built with React and Node.js.',
    progress: 90,
    tags: ['React.js', 'Node.js', 'MongoDB', 'Express.js'],
    stars: 8,
    commit: '2025 · Latest',
    uptime: '99.9%',
    uptimeColor: 'oklch(0.696 0.17 162.48)',
    archived: false,
    images: [hintroIntro, hintroHome, hintroLogin],
    repo: 'https://github.com/Adityaguptawebdev/Hintro_fronend',
    repoBack: 'https://github.com/Adityaguptawebdev/Hintro_backend',
    live: 'https://hintro-fronend-b2iz.vercel.app/',
  },
  {
    name: 'JTG Eats — Frontend Mockup',
    type: 'assignment',
    status: 'PRODUCTION',
    statusColor: 'oklch(0.488 0.243 264.376)',
    desc: 'Pixel-perfect frontend implementation from a Figma mockup. Responsive food delivery UI with semantic HTML5, CSS3 styling, and vanilla JS interactions including a popular items slider and contact section.',
    progress: 100,
    tags: ['HTML', 'CSS', 'JavaScript'],
    stars: null,
    commit: '2025 · Latest',
    uptime: '99.9%',
    uptimeColor: 'oklch(0.488 0.243 264.376)',
    archived: false,
    images: [],
    video: joshVideo,
    repo: 'https://github.com/Adityaguptawebdev/Josh-Tech-Group-Task',
    live: 'https://jtgeats-beryl.vercel.app/',
  },
  {
    name: 'Re-Boxed — E-Commerce',
    status: 'PRODUCTION',
    statusColor: 'oklch(0.696 0.17 162.48)',
    desc: 'Full-stack e-commerce platform for buying and selling second-hand products, featuring an admin dashboard, product listings, and user authentication.',
    progress: 95,
    tags: ['React.js', 'Node.js', 'MongoDB'],
    stars: 28,
    commit: 'Latest',
    uptime: '99.9%',
    uptimeColor: 'oklch(0.696 0.17 162.48)',
    archived: false,
    images: [reboxedScreenshot],
    repo: 'https://github.com/Adityaguptawebdev/mern-backend-main',
    live: 'https://re-boxed.vercel.app/',
  },
  {
    name: 'LMS System — Ed-Tech',
    status: 'BETA',
    statusColor: 'oklch(0.769 0.188 70.08)',
    desc: 'Full-stack Learning Management System with course management, student progress tracking, and instructor dashboards built for INT222.',
    progress: 65,
    tags: ['React', 'Node.js', 'MongoDB'],
    stars: 11,
    commit: 'In Dev',
    uptime: '97.2%',
    uptimeColor: 'oklch(0.769 0.188 70.08)',
    archived: false,
    images: [lmsScreenshot],
    repo: 'https://github.com/Adityaguptawebdev/LMS-System-INT222',
    live: 'https://github.com/Adityaguptawebdev/LMS-System-INT222',
  },
  {
    name: 'Fitness Hub — Gym Website',
    status: 'PRODUCTION',
    statusColor: 'oklch(0.696 0.17 162.48)',
    desc: 'Modern gym website with smooth animations, responsive design, class schedules, trainer profiles, and membership pricing.',
    progress: 100,
    tags: ['HTML', 'CSS', 'JavaScript'],
    stars: 9,
    commit: 'Stable',
    uptime: '99.9%',
    uptimeColor: 'oklch(0.696 0.17 162.48)',
    archived: false,
    images: [gymScreenshot],
    repo: 'https://github.com/Adityaguptawebdev/gym-website',
    live: 'https://poetic-maamoul-648e3f.netlify.app/',
  },
  {
    name: 'Apple Vision Pro — Clone',
    status: 'PRODUCTION',
    statusColor: 'oklch(0.696 0.17 162.48)',
    desc: 'Modern Apple Vision Pro landing page recreation with smooth GSAP animations, scroll effects, and pixel-perfect design.',
    progress: 100,
    tags: ['HTML', 'CSS', 'GSAP'],
    stars: 17,
    commit: 'Stable',
    uptime: '99.9%',
    uptimeColor: 'oklch(0.696 0.17 162.48)',
    archived: false,
    images: [applevisionScreenshot],
    video: appleVideo,
    repo: 'https://github.com/Adityaguptawebdev/Apple_vision_pro',
    live: 'https://adityaguptawebdev.github.io/Apple_vision_pro/',
  },
  {
    name: 'InvoiceFlow — Invoice Management System',
    type: 'assignment',
    status: 'PRODUCTION',
    statusColor: 'oklch(0.696 0.17 162.48)',
    desc: 'REST API layer for an invoice management system built with Express and MongoDB. Designed with production standards — structured error handling, MongoDB indexes, automatic tax calculation, server-side pagination, and a full Jest + Supertest test suite.',
    progress: 100,
    tags: ['React', 'Express.js', 'MongoDB', 'Node.js', 'Jest', 'Supertest'],
    stars: null,
    commit: '2025 · Latest',
    uptime: '99.9%',
    uptimeColor: 'oklch(0.696 0.17 162.48)',
    archived: false,
    images: [invoiceflowScreenshot],
    video: invoiceflowVideo,
    repo: 'https://github.com/adityaragaai/InvoiceFlow_Frontend',
    repoBack: 'https://github.com/adityaragaai/InvoiceFlow_Backend',
    live: 'https://invoice-flow-frontend.vercel.app/invoices',
  },
  {
    name: 'RFQBid — British Auction RFQ System',
    type: 'assignment',
    status: 'PRODUCTION',
    statusColor: 'oklch(0.488 0.243 264.376)',
    desc: 'Real-time British Auction system for RFQ management. Buyers monitor live auctions with countdown timers; suppliers place competitive bids. Features an L1 ranking algorithm that automatically highlights the lowest bidder for every RFQ.',
    progress: 100,
    tags: ['React.js', 'Vite', 'Tailwind CSS', 'Node.js', 'Lucide React'],
    stars: null,
    commit: '2025 · Latest',
    uptime: '99.9%',
    uptimeColor: 'oklch(0.488 0.243 264.376)',
    archived: false,
    images: [rfqbidScreenshot],
    repo: 'https://github.com/adityaragaai/FRQ-frontend',
    repoBack: 'https://github.com/adityaragaai/FRQ-backend',
    live: 'https://frq-frontend.vercel.app/',
  },
  {
    name: 'AI Safety Incident Dashboard',
    type: 'assignment',
    status: 'PRODUCTION',
    statusColor: 'oklch(0.488 0.243 264.376)',
    desc: 'Interactive dashboard for viewing, filtering, sorting, and reporting hypothetical AI safety incidents. Filter by severity, sort by date, toggle details, and submit new incidents — all in vanilla HTML, CSS & JS.',
    progress: 100,
    tags: ['HTML', 'CSS', 'JavaScript'],
    stars: null,
    commit: '2025 · Latest',
    uptime: '99.9%',
    uptimeColor: 'oklch(0.488 0.243 264.376)',
    archived: false,
    images: [],
    video: aiSafetyVideo,
    repo: 'https://github.com/adityaguptawebdev/AI-Safety-Incident-Dashboard',
    live: 'https://nimble-palmier-314855.netlify.app/',
  },
  {
    name: 'Interactive Calendar Component',
    type: 'assignment',
    status: 'PRODUCTION',
    statusColor: 'oklch(0.488 0.243 264.376)',
    desc: 'Polished wall-calendar UI built for a Frontend Engineering Challenge. Features date range selection, smooth 3D page-flip animations via Framer Motion, dynamic monthly themes, today highlight, and notes persistence with localStorage.',
    progress: 100,
    tags: ['React', 'TypeScript', 'Framer Motion'],
    stars: null,
    commit: '2026 · Latest',
    uptime: '99.9%',
    uptimeColor: 'oklch(0.488 0.243 264.376)',
    archived: false,
    images: [calendarGif],
    repo: 'https://github.com/adityaragaai/Calendar-Task-TUF',
    youtube: 'https://youtu.be/Liz70OSf3QA',
    live: 'https://calendar-task-tuf.vercel.app/',
  },
  {
    name: 'LPU Market — Campus App',
    status: 'PRODUCTION',
    statusColor: 'oklch(0.696 0.17 162.48)',
    desc: 'Campus marketplace platform for LPU students to buy and sell items within their community. Mobile-responsive with a clean UI.',
    progress: 100,
    tags: ['HTML', 'CSS', 'JavaScript'],
    stars: 14,
    commit: 'Stable',
    uptime: '99.9%',
    uptimeColor: 'oklch(0.696 0.17 162.48)',
    archived: false,
    images: [lpuMarketScreenshot],
    repo: 'https://github.com/Adityaguptawebdev/LPU-Market',
    live: 'https://thriving-empanada-d37df9.netlify.app/',
  },
]

function filterProjects(list, active) {
  if (active === 'all')        return list
  if (active === 'production') return list.filter(p => p.status === 'PRODUCTION' && !p.type)
  if (active === 'beta')       return list.filter(p => p.status === 'BETA')
  if (active === 'design')     return list.filter(p => p.status === 'DESIGN')
  if (active === 'assignment') return list.filter(p => p.type === 'assignment')
  return list
}

function ImageCarousel({ images, repo, live, repoBack, statusColor }) {
  const [current, setCurrent] = useState(0)
  if (!images || images.length === 0) return null

  return (
    <div className="group relative w-full rounded-lg overflow-hidden bg-neutral-950" style={{ aspectRatio: '16/9' }}>
      <img
        src={images[current]}
        alt={`screenshot ${current + 1}`}
        className="w-full h-full object-contain"
      />

      <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="absolute inset-0 bg-black/50" />
        {repoBack ? (
          <>
            <a href={repo} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
              className="relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-neutral-900/90 hover:bg-neutral-800 text-neutral-100 text-[11px] font-medium transition-colors border border-white/15"
            >
              <GithubIcon className="size-3.5" /> Frontend
            </a>
            <a href={repoBack} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
              className="relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-neutral-900/90 hover:bg-neutral-800 text-neutral-100 text-[11px] font-medium transition-colors border border-white/15"
            >
              <GithubIcon className="size-3.5" /> Backend
            </a>
          </>
        ) : (
          <a href={repo} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
            className="relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-neutral-900/90 hover:bg-neutral-800 text-neutral-100 text-[11px] font-medium transition-colors border border-white/15"
          >
            <GithubIcon className="size-3.5" /> GitHub
          </a>
        )}
        <a href={live} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
          className="relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-medium transition-colors"
          style={{
            backgroundColor: `color-mix(in oklch, ${statusColor} 25%, rgba(0,0,0,0.7))`,
            color: 'white',
            border: `1px solid color-mix(in oklch, ${statusColor} 50%, transparent)`,
          }}
        >
          <ExternalLink className="size-3" /> Live
        </a>
      </div>

      {images.length > 1 && (
        <>
          <button onClick={() => setCurrent((current - 1 + images.length) % images.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 transition-colors opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="size-3.5" />
          </button>
          <button onClick={() => setCurrent((current + 1) % images.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 transition-colors opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="size-3.5" />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                className="rounded-full transition-all"
                style={{ width: i === current ? '16px' : '6px', height: '6px', backgroundColor: i === current ? 'white' : 'rgba(255,255,255,0.4)' }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

const MAIN_FILTERS = [
  { key: 'all',        label: 'All' },
  { key: 'production', label: 'Production' },
  { key: 'beta',       label: 'Beta' },
  { key: 'design',     label: 'Design' },
]

const PILL_COLORS = {
  all:        { bg: 'rgb(250 250 250)', text: 'rgb(10 10 10)' },
  production: { bg: 'oklch(0.696 0.17 162.48)', text: 'white' },
  beta:       { bg: 'oklch(0.769 0.188 70.08)', text: 'white' },
  design:     { bg: 'rgb(163 163 163)', text: 'rgb(10 10 10)' },
}

const ASSIGNMENT_COLOR = 'oklch(0.488 0.243 264.376)'

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all')
  const visible = filterProjects(projects, activeFilter)
  const btnRefs = useRef([])
  const [pill, setPill] = useState({ left: 0, width: 0 })
  const isAssignmentActive = activeFilter === 'assignment'
  const mainActiveIdx = MAIN_FILTERS.findIndex(f => f.key === activeFilter)

  useLayoutEffect(() => {
    if (isAssignmentActive) return
    const el = btnRefs.current[mainActiveIdx]
    if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth })
  }, [activeFilter, isAssignmentActive, mainActiveIdx])

  return (
    <div className="flex p-4 md:p-8 flex-col flex-1 gap-4 md:gap-6 overflow-auto">
      {/* Page Header */}
      <div className="flex justify-between items-start gap-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <h1 className="font-bold text-neutral-50 text-2xl md:text-3xl leading-8 md:leading-9 tracking-tight">Projects</h1>
            <span className="bg-[oklch(0.488_0.243_264.376)]/15 text-[oklch(0.488_0.243_264.376)] border-[oklch(0.488_0.243_264.376)]/30 font-mono rounded-full text-[10px] border border-solid px-2 py-0.5">
              13 shipped
            </span>
          </div>
          <p className="text-[#a1a1a1] text-sm leading-5">Production systems &amp; live deployments</p>
        </div>
        <a
          href="https://github.com/Adityaguptawebdev"
          target="_blank"
          rel="noreferrer"
          className="shrink-0 transition-colors font-semibold rounded-lg bg-neutral-200 hover:bg-white text-neutral-900 text-xs leading-4 flex px-3 md:px-4 py-2 items-center gap-2"
        >
          <Plus className="size-3.5" />
          <span className="hidden sm:inline">View </span>GitHub
        </a>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex items-center gap-1 bg-neutral-800/50 border border-white/10 rounded-full p-1 shrink-0">
          <span
            className="absolute top-1 bottom-1 rounded-full pointer-events-none"
            style={{
              left: pill.left,
              width: pill.width,
              opacity: isAssignmentActive ? 0 : 1,
              backgroundColor: isAssignmentActive ? 'transparent' : PILL_COLORS[activeFilter]?.bg,
              transition: 'left 0.25s cubic-bezier(0.4,0,0.2,1), width 0.25s cubic-bezier(0.4,0,0.2,1), background-color 0.25s ease, opacity 0.2s ease',
            }}
          />
          {MAIN_FILTERS.map((f, i) => {
            const isActive = activeFilter === f.key
            return (
              <button
                key={f.key}
                ref={el => { btnRefs.current[i] = el }}
                onClick={() => setActiveFilter(f.key)}
                className="relative z-10 font-medium rounded-full text-xs leading-4 px-3 md:px-4 py-1.5 transition-colors duration-200"
                style={{ color: isActive ? PILL_COLORS[f.key].text : '#a1a1a1' }}
              >
                {f.label}
              </button>
            )
          })}
        </div>

        <span className="w-px h-5 bg-white/10 rounded-full shrink-0 hidden sm:block" />

        <style>{`
          @keyframes companyGlow {
            0%, 100% { box-shadow: 0 0 6px 0 color-mix(in oklch, ${ASSIGNMENT_COLOR} 35%, transparent), 0 0 0 1px color-mix(in oklch, ${ASSIGNMENT_COLOR} 30%, transparent); }
            50%       { box-shadow: 0 0 18px 2px color-mix(in oklch, ${ASSIGNMENT_COLOR} 60%, transparent), 0 0 0 1px color-mix(in oklch, ${ASSIGNMENT_COLOR} 55%, transparent); }
          }
          @keyframes companyShimmer {
            0%, 100% { box-shadow: 0 0 0 1px color-mix(in oklch, ${ASSIGNMENT_COLOR} 20%, transparent); opacity: 1; }
            50%       { box-shadow: 0 0 8px 1px color-mix(in oklch, ${ASSIGNMENT_COLOR} 38%, transparent); opacity: 0.85; }
          }
          .company-btn .label-default { display: inline-flex; align-items: center; gap: 4px; transition: opacity 0.2s, transform 0.2s; }
          .company-btn .label-hover   { position: absolute; inset: 0; display: inline-flex; align-items: center; justify-content: center; gap: 4px;
                                        opacity: 0; transform: translateY(4px); transition: opacity 0.2s, transform 0.2s; }
          .company-btn:hover .label-default { opacity: 0; transform: translateY(-4px); }
          .company-btn:hover .label-hover   { opacity: 1; transform: translateY(0); }
        `}</style>

        <button
          onClick={() => setActiveFilter('assignment')}
          className="company-btn relative overflow-hidden font-medium rounded-full text-xs leading-4 px-3 md:px-4 py-1.5 transition-colors duration-200 shrink-0"
          style={isAssignmentActive ? {
            backgroundColor: ASSIGNMENT_COLOR,
            color: 'white',
            animation: 'companyGlow 2s ease-in-out infinite',
          } : {
            backgroundColor: `color-mix(in oklch, ${ASSIGNMENT_COLOR} 10%, transparent)`,
            color: ASSIGNMENT_COLOR,
            animation: 'companyShimmer 2.5s ease-in-out infinite',
          }}
        >
          <span className="label-default">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
            </svg>
            Company Assignment
          </span>
          <span className="label-hover">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            Recruitment Process
          </span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visible.map(project => (
          <div
            key={project.name}
            className="flex flex-col rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
            style={{
              backgroundColor: 'rgb(18 18 20)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            {/* Colored top accent */}
            <div className="h-[2px] shrink-0" style={{ background: `linear-gradient(90deg, ${project.statusColor}, transparent)` }} />

            <div className="flex flex-col gap-4 p-5 flex-1">
              {/* Header */}
              <div className="flex justify-between items-start gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="size-2 rounded-full shrink-0" style={{ backgroundColor: project.statusColor }} />
                  <span className="font-semibold text-neutral-50 text-sm leading-5 truncate">{project.name}</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {project.type === 'assignment' && (
                    <span className="font-mono rounded-full text-[9px] font-semibold px-2 py-0.5"
                      style={{
                        color: 'oklch(0.769 0.188 70.08)',
                        backgroundColor: 'color-mix(in oklch, oklch(0.769 0.188 70.08) 10%, transparent)',
                        border: '1px solid color-mix(in oklch, oklch(0.769 0.188 70.08) 20%, transparent)',
                      }}
                    >HIRED</span>
                  )}
                  <span className="font-mono rounded-full text-[9px] font-semibold px-2 py-0.5"
                    style={{
                      color: project.statusColor,
                      backgroundColor: project.archived ? 'rgb(28 28 28)' : `color-mix(in oklch, ${project.statusColor} 10%, transparent)`,
                      border: `1px solid ${project.archived ? 'rgba(255,255,255,0.08)' : `color-mix(in oklch, ${project.statusColor} 20%, transparent)`}`,
                    }}
                  >{project.status}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-[#a1a1a1] text-xs leading-5">{project.desc}</p>

              {/* Video (autoplay) or image carousel */}
              {project.video ? (
                <div className="group relative w-full rounded-lg overflow-hidden bg-neutral-950" style={{ aspectRatio: '16/9' }}>
                  <video
                    src={project.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  {/* Hover overlay — same as ImageCarousel */}
                  <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="absolute inset-0 bg-black/50" />
                    {project.repoBack ? (
                      <>
                        <a href={project.repo} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
                          className="relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-neutral-900/90 hover:bg-neutral-800 text-neutral-100 text-[11px] font-medium transition-colors border border-white/15"
                        >
                          <GithubIcon className="size-3.5" /> Frontend
                        </a>
                        <a href={project.repoBack} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
                          className="relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-neutral-900/90 hover:bg-neutral-800 text-neutral-100 text-[11px] font-medium transition-colors border border-white/15"
                        >
                          <GithubIcon className="size-3.5" /> Backend
                        </a>
                      </>
                    ) : (
                      <a href={project.repo} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
                        className="relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-neutral-900/90 hover:bg-neutral-800 text-neutral-100 text-[11px] font-medium transition-colors border border-white/15"
                      >
                        <GithubIcon className="size-3.5" /> GitHub
                      </a>
                    )}
                    <a href={project.live} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
                      className="relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-medium transition-colors"
                      style={{
                        backgroundColor: `color-mix(in oklch, ${project.statusColor} 25%, rgba(0,0,0,0.7))`,
                        color: 'white',
                        border: `1px solid color-mix(in oklch, ${project.statusColor} 50%, transparent)`,
                      }}
                    >
                      <ExternalLink className="size-3" /> Live
                    </a>
                  </div>
                </div>
              ) : project.images && project.images.length > 0 && (
                <ImageCarousel images={project.images} repo={project.repo} live={project.live} repoBack={project.repoBack} statusColor={project.statusColor} />
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 rounded-full text-[10px] font-medium px-2.5 py-0.5"
                    style={{
                      color: project.statusColor,
                      backgroundColor: `color-mix(in oklch, ${project.statusColor} 10%, transparent)`,
                      border: `1px solid color-mix(in oklch, ${project.statusColor} 20%, transparent)`,
                    }}
                  >
                    {TECH_ICONS[tag] && (
                      <img src={TECH_ICONS[tag]} alt={tag} className="size-3 object-contain" />
                    )}
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex-1" />

              {/* Footer */}
              <div className="flex items-center gap-3 pt-3 border-t border-white/[0.06]">
                <span className="text-[#a1a1a1] text-[10px] flex items-center gap-1">
                  <Star className="size-3 text-[oklch(0.769_0.188_70.08)]" />
                  {project.stars ?? 'Assignment'}
                </span>
                <span className="font-mono text-[#a1a1a1] text-[10px] flex items-center gap-1">
                  <GitCommit className="size-3" />
                  {project.commit}
                </span>

                <div className="flex ml-auto gap-1.5">
                  {/* Assignment with two repos */}
                  {project.repoBack && (
                    <>
                      <a href={project.repo} target="_blank" rel="noreferrer"
                        className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[10px] font-medium transition-colors border border-white/10"
                      >
                        <GithubIcon className="size-3" /> Frontend
                      </a>
                      <a href={project.repoBack} target="_blank" rel="noreferrer"
                        className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[10px] font-medium transition-colors border border-white/10"
                      >
                        <GithubIcon className="size-3" /> Backend
                      </a>
                      <a href={project.live} target="_blank" rel="noreferrer"
                        className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-medium transition-opacity hover:opacity-80"
                        style={{
                          backgroundColor: `color-mix(in oklch, ${project.statusColor} 15%, transparent)`,
                          color: project.statusColor,
                          border: `1px solid color-mix(in oklch, ${project.statusColor} 28%, transparent)`,
                        }}
                      >
                        <ExternalLink className="size-3" /> Live
                      </a>
                    </>
                  )}

                  {/* No image, no repoBack */}
                  {!project.repoBack && (!project.images || project.images.length === 0) && (
                    <>
                      <a href={project.repo} target="_blank" rel="noreferrer"
                        className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[10px] font-medium transition-colors border border-white/10"
                      >
                        <GithubIcon className="size-3" /> GitHub
                      </a>
                      {project.youtube && (
                        <a href={project.youtube} target="_blank" rel="noreferrer"
                          className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-medium transition-colors border border-white/10"
                          style={{ backgroundColor: 'rgb(220 38 38 / 0.15)', color: 'rgb(248 113 113)', border: '1px solid rgb(220 38 38 / 0.25)' }}
                        >
                          <svg className="size-3" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                          Demo
                        </a>
                      )}
                      <a href={project.live} target="_blank" rel="noreferrer"
                        className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-medium transition-opacity hover:opacity-80"
                        style={{
                          backgroundColor: `color-mix(in oklch, ${project.statusColor} 15%, transparent)`,
                          color: project.statusColor,
                          border: `1px solid color-mix(in oklch, ${project.statusColor} 28%, transparent)`,
                        }}
                      >
                        <ExternalLink className="size-3" /> Live
                      </a>
                    </>
                  )}

                  {/* Has image, no repoBack */}
                  {!project.repoBack && project.images && project.images.length > 0 && (
                    project.archived ? (
                      <span className="text-[#a1a1a1] text-[10px] flex items-center gap-1">
                        <Archive className="size-3" />
                        <a href={project.live} target="_blank" rel="noreferrer" className="hover:text-neutral-300 transition-colors">View</a>
                      </span>
                    ) : (
                      <a href={project.live} target="_blank" rel="noreferrer"
                        className="text-[10px] flex items-center gap-1 hover:opacity-80 transition-opacity"
                        style={{ color: project.uptimeColor }}
                      >
                        <Activity className="size-3" />
                        {project.uptime}
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
