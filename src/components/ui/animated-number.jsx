/**
 * Odometer-style number that rolls up from a start value once it scrolls into view.
 * Adapted from Skiper UI — Skiper 37 "Animated number" (AnimatedNumber_004),
 * https://skiper-ui.com, author @gurvinder-singh02. Free version; attribution required.
 * Built on Number Flow (https://number-flow.barvian.me/).
 *
 * Changes from upstream: uses framer-motion's useInView instead of
 * react-intersection-observer, animates once, and lets NumberFlow roll the digits
 * itself instead of re-rendering every frame. NumberFlow already honours
 * prefers-reduced-motion.
 */
import { useRef } from 'react'
import NumberFlow from '@number-flow/react'
import { useInView } from 'framer-motion'

export default function AnimatedNumber({ value, from = 0, decimals = 0, prefix, suffix, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })

  return (
    <span ref={ref} className={className}>
      <NumberFlow
        value={inView ? value : from}
        prefix={prefix}
        suffix={suffix}
        format={{ minimumFractionDigits: decimals, maximumFractionDigits: decimals }}
        transformTiming={{ duration: 1200, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        spinTiming={{ duration: 1200, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      />
    </span>
  )
}
