import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const LINKS = [
  { label: 'Our Story', href: '#love-story' },
  { label: 'Events', href: '#events' },
  { label: 'Venue', href: '#venue' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'RSVP', href: '#rsvp' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.6, duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'backdrop-blur-xl bg-ivory/70 shadow-glass py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-12 lg:px-20">
        <a href="#hero" className="font-display text-xl tracking-widest2 gold-text">
          INVITWO
        </a>

        <ul className="hidden md:flex items-center gap-10">
          {LINKS.map((link) => (
            <li key={link.href} className="relative group">
              <a href={link.href} className="font-eyebrow text-[0.7rem] tracking-widest2 uppercase text-luxblack/80">
                {link.label}
              </a>
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold-deep transition-all duration-300 group-hover:w-full" />
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 w-7"
          aria-label="Toggle menu"
        >
          <span className={`h-[1.5px] bg-luxblack transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`h-[1.5px] bg-luxblack transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`h-[1.5px] bg-luxblack transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {open && (
        <ul className="md:hidden flex flex-col items-center gap-6 py-8 bg-ivory/95 backdrop-blur-xl">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-eyebrow text-xs tracking-widest2 uppercase"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </motion.nav>
  )
}
