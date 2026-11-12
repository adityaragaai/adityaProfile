/**
 * Terminal-style text scramble: each letter cycles through random glyphs, then
 * locks into place left to right. Re-runs on hover.
 *
 * Every letter sits in a slot sized by the real (invisible) letter, with the
 * random glyph drawn on top, so the line never changes width while it scrambles.
 * Screen readers get the plain text via aria-label.
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

// Random glyphs match the real letter's case so they stay close to its width
// (a capital "W" in the slot of an "i" would spill over its neighbours).
const UPPER_GLYPHS = 'ABCDEFGHKLNOPRSTUXYZ0123456789#$%&'
const LOWER_GLYPHS = 'abcdeghknopqrsuvxyz0123456789<>/=+*'
const FRAME_MS = 45

function randomGlyph(ch) {
  const pool = ch === ch.toUpperCase() && ch !== ch.toLowerCase() ? UPPER_GLYPHS : LOWER_GLYPHS
  return pool[Math.floor(Math.random() * pool.length)]
}

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}

export default function ScrambleText({
  text,
  duration = 1100, // total time until the last letter locks
  delay = 150,
  scrambleOnHover = true,
  className,
  glyphClassName,
}) {
  const letters = [...text]
  // null = letter is locked and shows the real character. Start already scrambled
  // so the real name doesn't flash for a frame before the effect kicks in.
  const [glyphs, setGlyphs] = useState(() =>
    prefersReducedMotion() ? letters.map(() => null) : letters.map((ch) => (ch === ' ' ? null : randomGlyph(ch))),
  )
  const rafRef = useRef(0)
  const runningRef = useRef(false)

  const run = useCallback(() => {
    if (runningRef.current || prefersReducedMotion()) return
    runningRef.current = true

    const chars = [...text]
    // Spread lock times evenly across the duration, with a little jitter.
    const lockAt = chars.map((_, i) => ((i + 1) / chars.length) * duration * (0.85 + Math.random() * 0.15))
    const startedAt = performance.now()
    let lastFrame = 0

    const tick = (now) => {
      const elapsed = now - startedAt
      if (now - lastFrame >= FRAME_MS) {
        lastFrame = now
        setGlyphs(chars.map((ch, i) => (ch === ' ' || elapsed >= lockAt[i] ? null : randomGlyph(ch))))
      }
      if (elapsed < duration) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setGlyphs(chars.map(() => null))
        runningRef.current = false
      }
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [text, duration])

  useEffect(() => {
    const t = setTimeout(run, delay)
    return () => {
      clearTimeout(t)
      cancelAnimationFrame(rafRef.current)
      runningRef.current = false
    }
  }, [run, delay])

  return (
    <span
      aria-label={text}
      role="text"
      className={cn('inline-block', className)}
      onMouseEnter={scrambleOnHover ? run : undefined}
    >
      {letters.map((ch, i) => {
        const glyph = glyphs[i]
        return (
          <span key={i} aria-hidden="true" className="relative inline-block whitespace-pre">
            <span className={glyph ? 'invisible' : undefined}>{ch}</span>
            {glyph && (
              <span
                className={cn(
                  'absolute inset-0 flex items-center justify-center',
                  glyphClassName,
                )}
              >
                {glyph}
              </span>
            )}
          </span>
        )
      })}
    </span>
  )
}
