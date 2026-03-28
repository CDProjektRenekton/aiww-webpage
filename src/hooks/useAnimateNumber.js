import { useState, useEffect, useRef } from 'react'

export function useAnimateNumber(target, duration = 2000, startOnMount = true) {
  const [value, setValue] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!startOnMount) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [startOnMount, started])

  useEffect(() => {
    if (!started) return
    const steps = 60
    const interval = duration / steps
    let step = 0
    const counter = setInterval(() => {
      step++
      const progress = Math.min(1, step / steps)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(eased * target))
      if (step >= steps) {
        clearInterval(counter)
        setValue(target)
      }
    }, interval)
    return () => clearInterval(counter)
  }, [started, target, duration])

  return { value, ref }
}
