# Invitwo — Cinematic Wedding Invitation Site

A React + Tailwind build implementing the brief's flow:
Loader → Hero → Love Story → Wedding Journey → Countdown → Venue → Gallery →
Wedding Events → Families → RSVP → Blessings → Footer, wrapped in a global
smooth-scroll layer (Lenis + GSAP ScrollTrigger) and a signature "Golden
Thread" motif that draws itself down the page as you scroll.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build      # production build to /dist
```

## File map (one component = one section)

```
src/
  App.jsx                 – wires sections together in order, mounts Loader/Nav/Thread
  hooks/useLenis.js        – smooth-scroll + GSAP ScrollTrigger sync (used once)
  index.css                – design tokens as utility classes (gold-text, glass-card, gold-btn, section, eyebrow, display-title...)
  components/
    Loader.jsx              – curtain-open loading screen
    Navigation.jsx           – transparent → glass nav on scroll
    GoldenThread.jsx          – signature scroll-drawn gold line + ring (fixed overlay)
    Hero.jsx                   – 100vh hero, mouse-parallax layers, floating particles, music toggle
    LoveStory.jsx               – vertical timeline, alternating polaroid frames
    WeddingJourney.jsx           – GSAP-pinned horizontal milestone strip (falls back to swipe on touch)
    Countdown.jsx                 – night sky (stars/moon/fireflies) + live countdown
    Venue.jsx                      – animated map/path illustration + directions CTA
    Gallery.jsx                     – masonry grid, 3D tilt-on-hover photo frames
    WeddingEvents.jsx                – Haldi/Mehendi/Sangeet/Nikah/Reception cards
    Families.jsx                      – bride & groom family cards
    RSVP.jsx                           – glass form → animated thank-you state
    Blessings.jsx                       – guest wishes grid
    Footer.jsx                           – monogram, socials, copyright
```

## Customizing content

Every section component takes props with sensible defaults (see the
`DEFAULT_*` constants at the top of each file), so you can redevelop just
the data without touching markup:

```jsx
<Hero coupleNames={{ bride: 'Aanya', groom: 'Rohan' }} weddingDate="12 . 12 . 2026" />
<Countdown weddingDateISO="2026-12-12T18:00:00" />
<Venue venue={{ name: '...', address: '...', mapUrl: '...' }} />
<LoveStory moments={[{ year, title, text, image }]} />
<WeddingEvents events={[{ name, date, desc, accent }]} />
<Families families={{ bride: {...}, groom: {...} }} />
<Gallery photos={[{ id, src, tall }]} />
<Blessings blessings={[{ text, from }]} />
<RSVP onSubmit={async (formData) => { /* call your API */ }} />
```

## Design tokens (Tailwind config)

Colors: `ivory`, `pearl`, `champagne`, `cream`, `gold` / `gold-light` /
`gold-deep`, `rosegold`, `maroon`, `royalgreen`, `luxblack`.
Fonts: `font-display` (Cormorant Garamond), `font-eyebrow` (Cinzel),
`font-body` (Poppins). Change these once in `tailwind.config.js` and every
section updates.

## Extending to full 3D (React Three Fiber)

Sections are intentionally built with CSS/SVG "2.5D" (parallax layers,
tilt-on-hover, glass morphism) rather than a heavy `@react-three/fiber`
scene, so the site stays light and easy to hand off. The brief's true 3D
moments (floating roses/rings in Hero, a real 3D map in Venue, a chandelier
in Countdown's night sky) are the best places to swap in an R3F `<Canvas>`:

```bash
npm install three @react-three/fiber @react-three/drei
```

Then replace the "mid layer" `<motion.div>` in `Hero.jsx` with a `<Canvas>`
containing your 3D rings/flowers model — the parallax/mouse-tracking logic
already there can drive `camera.position` or a group's rotation instead of
CSS `x`/`y`.

## Animation stack

- **Framer Motion** — section reveals (`whileInView`), hover states, the
  Loader curtain, RSVP thank-you transition.
- **GSAP + ScrollTrigger** — the Golden Thread draw, the pinned Wedding
  Journey strip.
- **Lenis** — global smooth scrolling, synced to ScrollTrigger in `useLenis.js`.

`prefers-reduced-motion` is respected globally in `index.css`.
