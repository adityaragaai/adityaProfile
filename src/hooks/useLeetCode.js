import { useState, useEffect, useCallback, useRef } from 'react'
import { fetchLeetCodeData } from '../lib/leetcode'

const CACHE_TTL = 5 * 60 * 1000 // 5 min

export function useLeetCode(username) {
  const [data, setData]               = useState(null)
  const [loading, setLoading]         = useState(true)
  const [error, setError]             = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)
  const timerRef = useRef(null)

  const load = useCallback(async (bypass = false) => {
    const key = `lc_${username}`

    if (!bypass) {
      try {
        const cached = sessionStorage.getItem(key)
        if (cached) {
          const { data: d, ts } = JSON.parse(cached)
          if (Date.now() - ts < CACHE_TTL) {
            setData(d)
            setLastUpdated(new Date(ts))
            setLoading(false)
            return
          }
        }
      } catch { /* ignore bad cache */ }
    }

    setLoading(true)
    setError(null)
    try {
      const result = await fetchLeetCodeData(username)
      const ts = Date.now()
      try { sessionStorage.setItem(key, JSON.stringify({ data: result, ts })) } catch { /* storage full */ }
      setData(result)
      setLastUpdated(new Date(ts))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [username])

  useEffect(() => {
    load()
    timerRef.current = setInterval(() => load(true), CACHE_TTL)
    return () => clearInterval(timerRef.current)
  }, [load])

  return { data, loading, error, refresh: () => load(true), lastUpdated }
}

// Count-up hook with easing
export function useCountUp(target, duration = 1200, enabled = true) {
  const [value, setValue] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!enabled || target === 0) { setValue(target); return }
    const start = performance.now()
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3) // ease-out cubic
      setValue(Math.round(target * eased))
      if (t < 1) rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration, enabled])

  return value
}
