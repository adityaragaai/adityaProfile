/**
 * Dashboard strip of key projects: slim screenshot panels in one row; the hovered
 * (or tapped) one widens to show the project name and opens the live site.
 * Adapted from Skiper UI — Skiper 52 "ExpandOnHover" (HoverExpand_001),
 * https://skiper-ui.com, author @gurvinder-singh02. Free version; attribution required.
 *
 * Changes from upstream: panels share the row with flex-grow so it fits any
 * width, panels are links (hover/focus widens; on touch the first tap widens and
 * the second opens), and the styling is toned down to sit inside a dashboard card.
 */
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import taskflowDashboard from '../assets/taskflow-dashboard.png'
import foodHome from '../assets/FoodHome.png'
import foodAppHero from '../assets/foodsaver-app-hero.jpg'
import hintroHome from '../assets/Hintro-home.png'
import vedaaiHome from '../assets/vedaAIHome.png'
import tdcDashboard from '../assets/tdc-dashboard.jpg'

const BLUE = 'oklch(0.488 0.243 264.376)'
const EMERALD = 'oklch(0.696 0.17 162.48)'

// The first entry is the panel that starts open.
const FEATURED = [
  { name: 'FoodSaver App', tagline: 'Android app', image: foodAppHero, href: 'https://food-saver-download.vercel.app/', color: EMERALD },
  { name: 'AlgoTaskFlow', tagline: 'Task manager', image: taskflowDashboard, href: 'https://algotaskflow.vercel.app/dashboard', color: BLUE },
  { name: 'FoodSaver', tagline: 'Surplus food to NGOs', image: foodHome, href: 'https://donateforgood.vercel.app/', color: EMERALD },
  { name: 'Hintro', tagline: 'Video introductions', image: hintroHome, href: 'https://hintro-fronend-b2iz.vercel.app/', color: EMERALD },
  { name: 'VedaAI', tagline: 'AI exam grader', image: vedaaiHome, href: 'https://vedaai-exams.vercel.app/', color: EMERALD },
  { name: 'TDC', tagline: 'Matchmaker console', image: tdcDashboard, href: 'https://tdc-matchmaker-console-mu.vercel.app', color: BLUE },
]

export default function FeaturedProjects({ className }) {
  const [active, setActive] = useState(0)

  return (
    <div className={cn('flex h-36 md:h-40 w-full gap-1.5', className)}>
      {FEATURED.map((project, i) => {
        const isActive = active === i
        return (
          <motion.a
            key={project.name}
            href={project.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.name} — ${project.tagline} (opens live site)`}
            onHoverStart={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={(e) => {
              // Touch: first tap widens the panel, second tap follows the link.
              if (!isActive) {
                e.preventDefault()
                setActive(i)
              }
            }}
            initial={false}
            animate={{ flexGrow: isActive ? 7 : 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="group relative min-w-0 basis-0 overflow-hidden rounded-xl border border-solid border-[var(--line-10)] bg-[var(--bg-inset)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue-soft)]"
          >
            <img
              src={project.image}
              alt=""
              loading="lazy"
              className={cn(
                'absolute inset-0 size-full object-cover object-top transition-[filter,opacity] duration-500',
                isActive ? 'opacity-100' : 'opacity-60 grayscale',
              )}
            />

            {/* Name + arrow on the open panel */}
            <div
              className={cn(
                'absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/85 via-black/50 to-transparent px-3 pb-2.5 pt-10 transition-opacity duration-300',
                isActive ? 'opacity-100 delay-150' : 'opacity-0',
              )}
            >
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 truncate text-xs font-semibold text-white">
                  <span className="size-1.5 shrink-0 rounded-full" style={{ backgroundColor: project.color }} />
                  {project.name}
                </p>
                <p className="truncate text-[10px] text-white/60">{project.tagline}</p>
              </div>
              <ArrowUpRight className="size-3.5 shrink-0 text-white/70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </motion.a>
        )
      })}
    </div>
  )
}
