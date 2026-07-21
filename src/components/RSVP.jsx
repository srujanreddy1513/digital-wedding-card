import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * RSVP
 * onSubmit(data) — wire this to your backend / email service.
 * Shows a thank-you confirmation state on success.
 */
export default function RSVP({ onSubmit }) {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', guests: '1', event: 'All Events', message: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (onSubmit) await onSubmit(form)
    setSubmitted(true)
  }

  return (
   <section id="rsvp" className="section bg-ivory-fade rsvp-section">
      {/* floating flowers decoration */}
      {['15%', '80%', '40%'].map((left, i) => (
        <motion.span
          key={i}
          className="absolute text-3xl opacity-30 pointer-events-none select-none"
          style={{ left, top: `${10 + i * 25}%` }}
          animate={{ y: [0, -16, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut' }}
        >
          ✿
        </motion.span>
      ))}

      <div className="relative max-w-xl mx-auto">
        <div className="text-center mb-12">
          <span className="eyebrow">Kindly Respond</span>
          <h2 className="display-title text-5xl md:text-6xl mt-3">RSVP</h2>
          <div className="divider-line mt-6" />
        </div>

        <div className="glass-card !bg-white/50 p-8 sm:p-12">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
              >
                <div>
                  <label className="font-eyebrow text-[0.65rem] tracking-widest2 uppercase text-gold-deep">
                    Full Name
                  </label>
                  <input
                    required
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full mt-2 bg-transparent border-b border-gold-deep/40 py-2 focus:outline-none focus:border-gold-deep transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="font-eyebrow text-[0.65rem] tracking-widest2 uppercase text-gold-deep">
                    Number of Guests
                  </label>
                  <select
                    name="guests"
                    value={form.guests}
                    onChange={handleChange}
                    className="w-full mt-2 bg-transparent border-b border-gold-deep/40 py-2 focus:outline-none focus:border-gold-deep"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-eyebrow text-[0.65rem] tracking-widest2 uppercase text-gold-deep">
                    Attending
                  </label>
                  <select
                    name="event"
                    value={form.event}
                    onChange={handleChange}
                    className="w-full mt-2 bg-transparent border-b border-gold-deep/40 py-2 focus:outline-none focus:border-gold-deep"
                  >
                    <option>All Events</option>
                    <option>Wedding Only</option>
                    <option>Reception Only</option>
                  </select>
                </div>

                <div>
                  <label className="font-eyebrow text-[0.65rem] tracking-widest2 uppercase text-gold-deep">
                    Message (optional)
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full mt-2 bg-transparent border-b border-gold-deep/40 py-2 focus:outline-none focus:border-gold-deep resize-none"
                    placeholder="A blessing for the couple..."
                  />
                </div>

                <button type="submit" className="gold-btn mt-4 self-center">
                  <span>Confirm Attendance</span>
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center py-6"
              >
                <motion.svg width="60" height="60" viewBox="0 0 60 60" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <motion.circle
                    cx="30" cy="30" r="26" fill="none" stroke="#C6A15B" strokeWidth="1.5"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }}
                  />
                  <motion.path
                    d="M18 30 L26 38 L42 20" fill="none" stroke="#C6A15B" strokeWidth="2" strokeLinecap="round"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.8, duration: 0.6 }}
                  />
                </motion.svg>
                <h3 className="display-title text-3xl mt-6 mb-2">Thank You, {form.name.split(' ')[0] || 'Friend'}</h3>
                <p className="text-luxblack/60 font-light">We can't wait to celebrate with you.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
