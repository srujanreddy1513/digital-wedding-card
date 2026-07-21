import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * The site's signature motif: a single gold thread that winds down the
 * page like a wedding program timeline, drawing itself as the visitor
 * scrolls. A small ring travels along the tip of the drawn path.
 *
 * The path "d" is a gentle S-curve repeated down a tall viewBox so it
 * weaves left/right past section content. It is purely decorative and
 * pointer-events:none, so it never blocks clicks.
 */
export default function GoldenThread() {
  const pathRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const path = pathRef.current
    const ring = ringRef.current
    const length = path.getTotalLength()

    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })

    const st = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.6,
      onUpdate: (self) => {
        const offset = length * (1 - self.progress)
        gsap.set(path, { strokeDashoffset: offset })
        const point = path.getPointAtLength(length * self.progress)
        gsap.set(ring, { x: point.x, y: point.y })
      },
    })

    return () => st.kill()
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-10 hidden md:block">
      <svg
        className="absolute left-0 top-0 h-full w-full"
        viewBox="0 0 100 4000"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d="M 92 0
             C 60 150, 20 250, 50 400
             S 90 650, 55 800
             S 15 1050, 50 1200
             S 88 1450, 52 1600
             S 12 1850, 50 2000
             S 90 2250, 55 2400
             S 15 2650, 50 2800
             S 88 3050, 52 3200
             S 20 3450, 50 3600
             S 85 3850, 60 4000"
          fill="none"
          stroke="#C6A15B"
          strokeWidth="0.15"
          strokeLinecap="round"
          opacity="0.55"
        />
        <g ref={ringRef}>
          <circle r="0.9" fill="none" stroke="#C6A15B" strokeWidth="0.25" opacity="0.9" />
          <circle r="0.25" fill="#C6A15B" opacity="0.9" />
        </g>
      </svg>
    </div>
  )
}
