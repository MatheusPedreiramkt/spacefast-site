'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'
import CheckoutButton from './CheckoutButton'

export default function CourseHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div
        className={`px-4 sm:px-6 py-4 flex items-center justify-between max-w-6xl mx-auto transition-all duration-300 ${
          scrolled
            ? 'py-3'
            : ''
        }`}
        style={{
          background: scrolled ? 'rgba(8,8,8,0.92)' : 'rgba(8,8,8,0.7)',
          backdropFilter: scrolled ? 'blur(20px)' : 'blur(12px)',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'blur(12px)',
          borderBottom: scrolled ? '1px solid rgba(0,230,118,0.1)' : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <a
          href="https://www.spacefast.com.br"
          className="flex items-center gap-2.5"
          aria-label="SpaceFast"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon to-neon-dark flex items-center justify-center flex-shrink-0">
            <Zap size={16} className="text-black" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col leading-none">
            <span
              className="text-base font-extrabold tracking-tight text-white"
              style={{ fontFamily: 'var(--font-jakarta)' }}
            >
              Space<span className="text-neon-gradient">Fast</span>
            </span>
            <span className="text-[10px] text-white/40 font-medium hidden sm:block">
              Treinamento Online
            </span>
          </div>
        </a>

        {/* CTA */}
        <CheckoutButton
          label="Acessar o curso"
          className="neon-btn text-sm px-4 py-2 rounded-xl cursor-pointer"
        />
      </div>
    </motion.header>
  )
}
