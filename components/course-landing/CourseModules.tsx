'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { MODULES } from '@/lib/course-config'

export default function CourseModules() {
  const [open, setOpen] = useState<number | null>(null)

  function toggle(num: number) {
    setOpen((prev) => (prev === num ? null : num))
  }

  return (
    <section className="relative py-20 lg:py-28" style={{ background: '#0d0d0d' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{ color: '#00e676', border: '1px solid rgba(0,230,118,0.25)', background: 'rgba(0,230,118,0.06)' }}
          >
            Módulos
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-white"
            style={{ fontFamily: 'var(--font-jakarta)' }}
          >
            Conteúdo completo,{' '}
            <span className="text-neon-gradient">do zero ao sistema funcionando</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          {MODULES.map((mod) => {
            const isOpen = open === mod.number
            return (
              <div
                key={mod.number}
                className="rounded-xl overflow-hidden"
                style={{
                  border: `1px solid ${isOpen ? 'rgba(0,230,118,0.25)' : '#1e1e1e'}`,
                  background: isOpen ? 'rgba(0,230,118,0.04)' : '#111',
                  transition: 'border-color 0.25s, background 0.25s',
                }}
              >
                <button
                  onClick={() => toggle(mod.number)}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span
                    className="text-xs font-bold flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{
                      background: isOpen ? 'rgba(0,230,118,0.15)' : 'rgba(255,255,255,0.06)',
                      color: isOpen ? '#00e676' : 'rgba(255,255,255,0.4)',
                      fontFamily: 'var(--font-jakarta)',
                    }}
                  >
                    {String(mod.number).padStart(2, '0')}
                  </span>
                  <span
                    className="flex-1 text-sm font-semibold"
                    style={{ color: isOpen ? '#fff' : 'rgba(255,255,255,0.75)' }}
                  >
                    {mod.title}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={16} style={{ color: isOpen ? '#00e676' : 'rgba(255,255,255,0.3)' }} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p className="px-5 pb-4 pl-[68px] text-sm text-white/50 leading-relaxed">
                        {mod.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
