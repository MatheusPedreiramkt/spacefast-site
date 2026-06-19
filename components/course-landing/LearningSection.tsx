'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { stagger, fadeInUp } from '@/lib/animations'
import { LEARNING_ITEMS } from '@/lib/course-config'

export default function LearningSection() {
  return (
    <section className="relative py-20 lg:py-28" style={{ background: '#080808' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
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
            Conteúdo
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-white"
            style={{ fontFamily: 'var(--font-jakarta)' }}
          >
            O que você vai{' '}
            <span className="text-neon-gradient">aprender</span>
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {LEARNING_ITEMS.map((item) => (
            <motion.div
              key={item}
              variants={fadeInUp}
              className="dark-card rounded-xl px-5 py-4 flex items-center gap-3"
            >
              <CheckCircle size={16} className="flex-shrink-0" style={{ color: '#00e676' }} />
              <span className="text-sm text-white/80 font-medium">{item}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
