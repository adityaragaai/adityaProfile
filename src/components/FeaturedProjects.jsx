/**
 * Dashboard strip of key projects.
 *
 * From sm up: slim screenshot panels in one row; the hovered/focused one widens
 * to show the project name and links to the live site.
 * Adapted from Skiper UI — Skiper 52 "ExpandOnHover" (HoverExpand_001),
 * https://skiper-ui.com, author @gurvinder-singh02. Free version; attribution required.
 * Changes from upstream: panels share the row with flex-grow so it fits any
 * width, panels are links, and the styling is toned down for a dashboard card.
 *
 * On phones six panels get too thin, so the same projects become a swipeable
 * row of cards (scroll-snap) with position dots instead.
 */
import { useRef, useState } from 'react'
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

function linkLabel(project) {
  return `${project.name} — ${project.tagline} (opens live site)`
}

// Name, tagline and arrow over the bottom of a screenshot.
function Caption({ project, className }) {
  return (
    <div
      className={cn(
        'absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/85 via-black/50 to-transparent px-3 pb-2.5 pt-10',
        className,
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
  )
}

// sm and up: expand-on-hover strip.
function ExpandStrip({ className }) {
  const [active, setActive] = useState(0)

  return (
    <div className={cn('flex h-40 w-full gap-1.5', className)}>
      {FEATURED.map((project, i) => {
        const isActive = active === i
        return (
          <motion.a
            key={project.name}
            href={project.href}
            target="_blank"
            rel="noreferrer"
            aria-label={linkLabel(project)}
            onHoverStart={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={(e) => {
              // Touch tablets: first tap widens the panel, second tap follows the link.
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
            <Caption
              project={project}
              className={cn('transition-opacity duration-300', isActive ? 'opacity-100 delay-150' : 'opacity-0')}
            />
          </motion.a>
        )
      })}
    </div>
  )
}

// Phones: swipeable cards with position dots.
function SwipeRow({ className }) {
  const scrollerRef = useRef(null)
  const [index, setIndex] = useState(0)

  function handleScroll() {
    const el = scrollerRef.current
    const first = el?.firstElementChild
    if (!first) return
    const step = first.getBoundingClientRect().width + 8 // card width + gap-2
    setIndex(Math.min(FEATURED.length - 1, Math.round(el.scrollLeft / step)))
  }

  function scrollTo(i) {
    const card = scrollerRef.current?.children[i]
    card?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
  }

  return (
    <div className={cn('flex flex-col gap-2.5', className)}>
      {/* Bleeds to the card's edges so the next card peeks in from the right */}
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="scrollbar-none -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-2 overflow-x-auto px-4"
      >
        {FEATURED.map((project) => (
          <a
            key={project.name}
            href={project.href}
            target="_blank"
            rel="noreferrer"
            aria-label={linkLabel(project)}
            className="group relative aspect-[16/10] w-[82%] shrink-0 snap-start overflow-hidden rounded-xl border border-solid border-[var(--line-10)] bg-[var(--bg-inset)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue-soft)]"
          >
            <img src={project.image} alt="" loading="lazy" className="absolute inset-0 size-full object-cover object-top" />
            <Caption project={project} />
          </a>
        ))}
      </div>

      <div className="flex justify-center gap-1.5" aria-hidden="true">
        {FEATURED.map((project, i) => (
          <button
            key={project.name}
            type="button"
            tabIndex={-1}
            onClick={() => scrollTo(i)}
            className={cn(
              'h-1.5 rounded-full transition-all duration-300',
              i === index ? 'w-4 bg-[var(--text-primary)]' : 'w-1.5 bg-[var(--line-20)]',
            )}
          />
        ))}
      </div>
    </div>
  )
}

export default function FeaturedProjects() {
  return (
    <>
      <SwipeRow className="sm:hidden" />
      <ExpandStrip className="hidden sm:flex" />
    </>
  )
}
