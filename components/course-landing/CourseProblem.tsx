'use client'

import { motion } from 'framer-motion'
import { X, ChevronRight } from 'lucide-react'
import { stagger, fadeInUp } from '@/lib/animations'

const problems = [
  {
    title: 'Horas buscando empresas',
    text: 'Você pesquisa manualmente no Google e perde muito tempo sem organização.',
  },
  {
    title: 'Cópia de telefone por telefone',
    text: 'Cada contato é anotado à mão, aumentando o risco de erros e duplicatas.',
  },
  {
    title: 'Contatos sem organização',
    text: 'Sem um sistema, os leads se perdem em bloco de notas, planilhas avulsas ou favoritos.',
  },
  {
    title: 'Rotina de prospecção irregular',
    text: 'Sem processo definido, a prospecção fica em segundo plano e os resultados são inconsistentes.',
  },
]

export default function CourseProblem() {
  return (
    <section className="relative py-20 lg:py-28" style={{ background: '#0d0d0d' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-white mb-4"
            style={{ fontFamily: 'var(--font-jakarta)' }}
          >
            Você ainda procura clientes{' '}
            <span className="text-neon-gradient">manualmente?</span>
          </h2>
        </motion.div>

        {/* Problem cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid sm:grid-cols-2 gap-4 mb-12"
        >
          {problems.map(({ title, text }) => (
            <motion.div
              key={title}
              variants={fadeInUp}
              className="dark-card rounded-2xl p-6 flex gap-4"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)' }}
              >
                <X size={14} className="text-red-400" />
              </div>
              <div>
                <h3
                  className="text-base font-bold text-white mb-1"
                  style={{ fontFamily: 'var(--font-jakarta)' }}
                >
                  {title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">{text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Solution statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto rounded-2xl p-6 sm:p-8 text-center"
          style={{ border: '1px solid rgba(0,230,118,0.2)', background: 'rgba(0,230,118,0.05)' }}
        >
          <ChevronRight size={20} className="mx-auto mb-3" style={{ color: '#00e676' }} />
          <p className="text-base sm:text-lg text-white/80 leading-relaxed">
            Com o sistema ensinado no curso, esse processo se transforma em um fluxo mais{' '}
            <span style={{ color: '#00e676' }} className="font-semibold">organizado, prático e automatizado</span>.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
