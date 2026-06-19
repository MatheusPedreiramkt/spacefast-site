'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import CheckoutButton from './CheckoutButton'
import { COURSE_PRICE } from '@/lib/course-config'

export default function MobileCheckoutBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const sentinel = document.getElementById('hero-bottom-sentinel')
    if (!sentinel) {
      // Fallback: show after 400px scroll
      const handler = () => setVisible(window.scrollY > 400)
      window.addEventListener('scroll', handler, { passive: true })
      return () => window.removeEventListener('scroll', handler)
    }

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed bottom-0 left-0 right-0 z-40 sm:hidden"
          style={{
            background: 'rgba(8,8,8,0.97)',
            borderTop: '1px solid rgba(0,230,118,0.2)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          }}
        >
          <div className="flex items-center justify-between gap-4 px-4 py-3">
            <div>
              <p className="text-xs text-white/40 leading-none mb-0.5">Curso completo</p>
              <p className="text-base font-extrabold text-white" style={{ fontFamily: 'var(--font-jakarta)' }}>
                {COURSE_PRICE}
              </p>
            </div>
            <CheckoutButton
              label="Quero acessar"
              className="neon-btn flex items-center gap-2 px-5 py-3 rounded-xl text-sm cursor-pointer flex-shrink-0"
              icon={<ArrowRight size={15} />}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
