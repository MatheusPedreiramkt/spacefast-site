'use client'

import { motion } from 'framer-motion'
import { Code2, FileSpreadsheet, Monitor, Apple, BookOpen, MessageSquare, HeadphonesIcon, Package } from 'lucide-react'
import { stagger, fadeInUp } from '@/lib/animations'
import { MATERIALS } from '@/lib/course-config'

const iconMap: Record<string, React.ElementType> = {
  code: Code2,
  sheet: FileSpreadsheet,
  windows: Monitor,
  apple: Apple,
  book: BookOpen,
  message: MessageSquare,
  support: HeadphonesIcon,
}

export default function MaterialsSection() {
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
            Materiais incluídos
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-white"
            style={{ fontFamily: 'var(--font-jakarta)' }}
          >
            Você não recebe{' '}
            <span className="text-neon-gradient">apenas as aulas</span>
          </h2>
        </motion.div>

        {/* Package visual */}
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {/* Icon grid */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:w-auto lg:flex-1"
          >
            {MATERIALS.map(({ label, icon }) => {
              const Icon = iconMap[icon] ?? Package
              return (
                <motion.div
                  key={label}
                  variants={fadeInUp}
                  className="dark-card rounded-2xl p-5 flex flex-col items-center text-center gap-3 group"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)' }}
                  >
                    <Icon size={20} style={{ color: '#00e676' }} />
                  </div>
                  <span className="text-xs font-medium text-white/65 leading-snug">{label}</span>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Delivery visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-72 flex-shrink-0"
          >
            <div
              className="rounded-2xl p-6 text-center"
              style={{ border: '1px solid rgba(0,230,118,0.25)', background: 'rgba(0,230,118,0.05)' }}
            >
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5 glow-neon-sm"
                style={{ background: 'rgba(0,230,118,0.12)', border: '1px solid rgba(0,230,118,0.3)' }}
              >
                <Package size={36} style={{ color: '#00e676' }} />
              </div>
              <h3
                className="text-lg font-bold text-white mb-2"
                style={{ fontFamily: 'var(--font-jakarta)' }}
              >
                Pacote completo
              </h3>
              <p className="text-sm text-white/50 leading-relaxed mb-4">
                Tudo que você precisa para instalar e usar o sistema está incluso no treinamento.
              </p>
              <div className="space-y-1.5">
                {['Código-fonte', 'Planilhas', 'Manual', 'Suporte'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-white/50">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#00e676' }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
