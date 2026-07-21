import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Loading Screen
 * - Draws a gold monogram/ring, then splits like curtains opening
 *   to reveal the Hero underneath.
 * - Swap COUPLE_INITIALS with props when wiring real data.
 */
export default function Loader({ onFinish, coupleInitials = 'A & R' }) {
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 2600)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {!done && (
        <div className="fixed inset-0 z-[100] flex">
          {/* left curtain */}
          <motion.div
            initial={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="w-1/2 h-full bg-luxblack"
          />
          {/* right curtain */}
          <motion.div
            initial={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="w-1/2 h-full bg-luxblack"
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
            <motion.svg
              width="90"
              height="90"
              viewBox="0 0 90 90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.circle
                cx="45"
                cy="45"
                r="38"
                fill="none"
                stroke="#C6A15B"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.6, ease: 'easeInOut' }}
              />
            </motion.svg>

            <motion.p
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              animate={{ opacity: 1, letterSpacing: '0.4em' }}
              transition={{ delay: 0.4, duration: 1 }}
              className="font-display text-3xl text-ivory"
            >
              {coupleInitials}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="eyebrow text-ivory/70"
            >
              are getting married
            </motion.p>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
