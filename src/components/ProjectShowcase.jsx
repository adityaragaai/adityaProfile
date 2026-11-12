/**
 * Featured-projects strip: screenshots sit side by side as slim panels and the
 * hovered / tapped one expands to show the project.
 * Adapted from Skiper UI — Skiper 52 "ExpandOnHover" (HoverExpand_001),
 * https://skiper-ui.com, author @gurvinder-singh02. Free version; attribution required.
 *
 * Changes from upstream: panels share the row with flex-grow instead of fixed
 * rem widths (so it fits any screen), each panel is a button (hover/focus/tap to
 * expand, click the open one to jump to the project card), and the open panel
 * shows the project's name, status and stack.
 */
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ProjectShowcase({ projects, onOpen, className }) {
  const [active, setActive] = useState(0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      className={cn('flex h-56 md:h-72 w-full gap-1.5', className)}
    >
      {projects.map((project, i) => {
        const isActive = active === i
        return (
          <motion.button
            key={project.name}
            type="button"
            aria-label={isActive ? `Go to ${project.name}` : `Preview ${project.name}`}
            aria-pressed={isActive}
            onHoverStart={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => (isActive ? onOpen(project) : setActive(i))}
            initial={false}
            animate={{ flexGrow: isActive ? 9 : 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative min-w-0 basis-0 cursor-pointer overflow-hidden rounded-2xl border border-solid border-[var(--line-10)] bg-neutral-950 text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue-soft)]"
          >
            <img
              src={project.images[0]}
              alt=""
              className={cn(
                'absolute inset-0 size-full object-cover object-center transition-[filter,transform] duration-500',
                isActive ? 'scale-100 grayscale-0' : 'scale-110 grayscale-[60%] brightness-75',
              )}
            />

            {/* Collapsed: status-coloured bar along the bottom edge */}
            {!isActive && (
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1"
                style={{ backgroundColor: project.statusColor }}
              />
            )}

            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 flex flex-col justify-end gap-2 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-4 md:p-5"
                >
                  <motion.div
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.12 }}
                    className="flex min-w-0 flex-col gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="size-1.5 shrink-0 rounded-full" style={{ backgroundColor: project.statusColor }} />
                      <span className="font-mono text-[10px] uppercase tracking-widest text-white/60">
                        {String(i + 1).padStart(2, '0')} · {project.type === 'assignment' ? 'Hired assignment' : project.status}
                      </span>
                    </div>
                    <p className="truncate text-base font-semibold leading-tight text-white md:text-lg">
                      {/* Short name ("AlgoTaskFlow") on phones, full name from sm up */}
                      <span className="sm:hidden">{project.name.split(' — ')[0]}</span>
                      <span className="hidden sm:inline">{project.name}</span>
                    </p>
                    <div className="flex items-center justify-between gap-3">
                      <p className="hidden truncate text-[11px] text-white/60 sm:block">{project.tags.slice(0, 4).join(' · ')}</p>
                      <span className="ml-auto flex shrink-0 items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
                        View project <ArrowDown className="size-3" />
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        )
      })}
    </motion.div>
  )
}
