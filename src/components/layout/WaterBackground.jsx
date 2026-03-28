import { useEffect, useRef } from 'react'

export default function WaterBackground() {
  const bgRef = useRef(null)

  useEffect(() => {
    const container = bgRef.current
    if (!container) return
    for (let i = 0; i < 15; i++) {
      const bubble = document.createElement('div')
      bubble.className = 'bubble'
      const size = Math.random() * 60 + 20
      bubble.style.width = size + 'px'
      bubble.style.height = size + 'px'
      bubble.style.left = Math.random() * 100 + '%'
      bubble.style.bottom = '-100px'
      bubble.style.animationDelay = Math.random() * 5 + 's'
      bubble.style.animationDuration = (Math.random() * 5 + 8) + 's'
      container.appendChild(bubble)
    }
  }, [])

  return (
    <div className="water-bg" ref={bgRef}>
      <div className="carriedo-bg" />
      <div className="wave-overlay" />
      <div className="wave-layer wave-1" />
      <div className="wave-layer wave-2" />
      <div className="wave-layer wave-3" />
    </div>
  )
}
