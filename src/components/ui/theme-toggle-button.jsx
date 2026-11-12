/**
 * Theme toggle with a View Transition reveal.
 * Adapted from Skiper UI — Skiper 26 "Theme toggle btn" (https://skiper-ui.com),
 * author @gurvinder-singh02, original concept by rudrodip
 * (https://github.com/rudrodip/theme-toggle-effect). Free version; attribution required.
 *
 * Changes from upstream: wired to this app's useTheme (html.light class) instead of
 * next-themes, trimmed to the circle variant, colors use the app's theme tokens,
 * the reveal is skipped for users who prefer reduced motion, and a one-time
 * discovery hint (pulse + "Try light mode" bubble) points new visitors at it.
 */
import { useCallback, useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'

const STYLE_ID = 'theme-transition-styles'
const HINT_KEY = 'theme-toggle-discovered'
const HINT_DELAY_MS = 1500
const HINT_DURATION_MS = 7000
// Theme-aware blue: light enough to read on dark, dark enough to read on light.
const ACCENT = 'var(--accent-blue-soft)'

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}

function hasDiscoveredToggle() {
  try {
    return window.localStorage.getItem(HINT_KEY) === '1'
  } catch {
    return false
  }
}

function markToggleDiscovered() {
  try {
    window.localStorage.setItem(HINT_KEY, '1')
  } catch {
    // storage unavailable — the hint simply shows again next visit
  }
}

// Shows the discovery hint briefly on each visit until the visitor has used the toggle once.
function useDiscoveryHint() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (hasDiscoveredToggle()) return
    const showTimer = setTimeout(() => setShow(true), HINT_DELAY_MS)
    const hideTimer = setTimeout(() => setShow(false), HINT_DELAY_MS + HINT_DURATION_MS)
    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  const dismiss = useCallback(() => {
    setShow(false)
    markToggleDiscovered()
  }, [])

  return { show, dismiss }
}

// Where the circle grows from, as a clip-path position.
const START_POSITIONS = {
  center: '50% 50%',
  'top-left': '0% 0%',
  'top-right': '100% 0%',
  'bottom-left': '0% 100%',
  'bottom-right': '100% 100%',
  'top-center': '50% 0%',
  'bottom-center': '50% 100%',
}

function createCircleAnimation(start, blur) {
  const at = START_POSITIONS[start] ?? START_POSITIONS.center
  const radius = start === 'center' ? '100%' : '150%'
  const name = `reveal-circle-${start}${blur ? '-blur' : ''}`
  return `
    ::view-transition-group(root) {
      animation-duration: ${start === 'center' ? '0.7s' : '1s'};
      animation-timing-function: var(--expo-out);
    }
    ::view-transition-new(root) {
      animation-name: ${name};
      ${blur ? 'filter: blur(2px);' : ''}
    }
    ::view-transition-old(root) {
      animation: none;
      z-index: -1;
    }
    @keyframes ${name} {
      from {
        clip-path: circle(0% at ${at});
        ${blur ? 'filter: blur(8px);' : ''}
      }
      ${blur ? '50% { filter: blur(4px); }' : ''}
      to {
        clip-path: circle(${radius} at ${at});
        ${blur ? 'filter: blur(0px);' : ''}
      }
    }
  `
}

function injectStyles(css) {
  let el = document.getElementById(STYLE_ID)
  if (!el) {
    el = document.createElement('style')
    el.id = STYLE_ID
    document.head.appendChild(el)
  }
  el.textContent = css
}

function useThemeToggle({ start = 'top-right', blur = false } = {}) {
  const { theme, toggleTheme: flipTheme } = useTheme()
  const isDark = theme === 'dark'

  const toggleTheme = useCallback(() => {
    if (!document.startViewTransition || prefersReducedMotion()) {
      flipTheme()
      return
    }
    injectStyles(createCircleAnimation(start, blur))
    // flushSync so the new theme is in the DOM before the "new" snapshot is taken.
    document.startViewTransition(() => flushSync(flipTheme))
  }, [flipTheme, start, blur])

  return { isDark, toggleTheme }
}

export default function ThemeToggleButton({ className, start = 'top-right', blur = false }) {
  const { isDark, toggleTheme } = useThemeToggle({ start, blur })
  const hint = useDiscoveryHint()
  const label = isDark ? 'Switch to light theme' : 'Switch to dark theme'
  const wiggle = hint.show && !prefersReducedMotion()

  function handleClick() {
    hint.dismiss()
    toggleTheme()
  }

  return (
    <div className="relative shrink-0">
      {/* Pulsing rings while the hint is up */}
      <AnimatePresence>
        {wiggle &&
          [0, 0.8].map((delay) => (
            <motion.span
              key={delay}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{ boxShadow: `0 0 0 1.5px ${ACCENT}` }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [0.8, 1.7], opacity: [0.7, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.6, delay, repeat: Infinity, ease: 'easeOut' }}
            />
          ))}
      </AnimatePresence>

      <button
        type="button"
        onClick={handleClick}
        aria-label={label}
        title={label}
        className={cn(
          'relative size-7 cursor-pointer rounded-md flex items-center justify-center transition-colors hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)] active:scale-95',
          hint.show ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]',
          className,
        )}
      >
        {/* Drawn in currentColor so it matches the neighbouring lucide icons. */}
        <motion.svg
          viewBox="0 0 240 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="size-4"
          animate={wiggle ? { rotate: [0, -25, 25, -15, 0] } : { rotate: 0 }}
          transition={wiggle ? { duration: 0.9, repeat: Infinity, repeatDelay: 1.4 } : { duration: 0.2 }}
        >
          <motion.g
            animate={{ rotate: isDark ? -180 : 0 }}
            transition={{ ease: 'easeInOut', duration: 0.5 }}
          >
            <path
              d="M120 67.5C149.25 67.5 172.5 90.75 172.5 120C172.5 149.25 149.25 172.5 120 172.5"
              fill="currentColor"
            />
            {/* Invisible half keeps the group's bounding box centred so it rotates in place. */}
            <path
              d="M120 67.5C90.75 67.5 67.5 90.75 67.5 120C67.5 149.25 90.75 172.5 120 172.5"
              fill="transparent"
            />
          </motion.g>
          <motion.path
            animate={{ rotate: isDark ? 180 : 0 }}
            transition={{ ease: 'easeInOut', duration: 0.5 }}
            d="M120 3.75C55.5 3.75 3.75 55.5 3.75 120C3.75 184.5 55.5 236.25 120 236.25C184.5 236.25 236.25 184.5 236.25 120C236.25 55.5 184.5 3.75 120 3.75ZM120 214.5V172.5C90.75 172.5 67.5 149.25 67.5 120C67.5 90.75 90.75 67.5 120 67.5V25.5C172.5 25.5 214.5 67.5 214.5 120C214.5 172.5 172.5 214.5 120 214.5Z"
            fill="currentColor"
          />
        </motion.svg>
      </button>

      {/* "Try light mode" bubble pointing at the button */}
      <AnimatePresence>
        {hint.show && (
          <motion.button
            type="button"
            onClick={handleClick}
            initial={{ opacity: 0, y: -6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className="absolute right-0 top-full z-50 mt-2.5 whitespace-nowrap rounded-lg border border-solid px-2.5 py-1.5 font-mono text-[10px] shadow-lg backdrop-blur-sm cursor-pointer"
            style={{
              color: ACCENT,
              backgroundColor: 'var(--bg-panel)',
              borderColor: `color-mix(in oklch, ${ACCENT} 35%, transparent)`,
            }}
          >
            {/* Arrow, centred under the 28px button */}
            <span
              aria-hidden="true"
              className="absolute -top-[5px] right-[9px] size-2.5 rotate-45 border-l border-t border-solid"
              style={{
                backgroundColor: 'var(--bg-panel)',
                borderColor: `color-mix(in oklch, ${ACCENT} 35%, transparent)`,
              }}
            />
            {isDark ? '☀ Try light mode' : '☾ Try dark mode'}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
