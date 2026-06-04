// Shared Framer Motion config — all animation primitives live here.
// Inspired by Linear / Stripe / Framer's pacing: slow, deliberate, confident.

// ── Easing ────────────────────────────────────────────────────────────────────
export const EASE = [0.16, 1, 0.3, 1] as const        // spring-like, snappy end
export const EASE_SMOOTH = [0.25, 0.1, 0.25, 1] as const  // classic ease-in-out

// ── Section heading entrance ───────────────────────────────────────────────
// Spread directly onto motion.div: <motion.div {...SECTION_ANIM} viewport={VIEWPORT}>
export const SECTION_ANIM = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE },
} as const

// ── Variants ──────────────────────────────────────────────────────────────────

// Primary entrance — cards, paragraphs, general elements
export const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

// Reversed — elements descending into view
export const fadeDown = {
  hidden:  { opacity: 0, y: -22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

// Horizontal — from off-right
export const fadeLeft = {
  hidden:  { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE } },
}

// Horizontal — from off-left
export const fadeRight = {
  hidden:  { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE } },
}

// Pure opacity — subtle, for aggregate lines / badges
export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.65, ease: EASE } },
}

// Scale entrance — CTAs, highlighted cards, badges
export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.93 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } },
}

// ── Backward-compatible aliases ───────────────────────────────────────────────
export const scaleUp    = scaleIn
export const slideLeft  = fadeRight
export const slideRight = fadeLeft

// ── Stagger containers ────────────────────────────────────────────────────────

// Standard grid of cards — 0.11s between each child
export const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
}

// Dense feature lists — tighter cadence
export const staggerFast = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0 } },
}

// ── Viewport config ───────────────────────────────────────────────────────────
// amount: 0.15 → starts when 15% of element enters the extended trigger zone
// margin: "-80px" → trigger zone begins 80px before the element hits the viewport
export const VIEWPORT = { once: true, margin: "-80px", amount: 0.15 } as const
