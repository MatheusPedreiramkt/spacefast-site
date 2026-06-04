// Shared Framer Motion variants — centralizes animation config across all components.
// Using a custom spring-like ease inspired by Stripe / Linear's feel.
export const EASE = [0.16, 1, 0.3, 1] as const

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
}

export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0 } },
}

export const staggerFast = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
}

export const scaleUp = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: EASE } },
}

export const slideLeft = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } },
}

export const slideRight = {
  hidden: { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } },
}

export const VIEWPORT = { once: true, margin: "-80px" } as const
