'use client'

import { motion } from 'framer-motion'
import { Map, Sheet, MessageSquare, ArrowRight } from 'lucide-react'
import { stagger, fadeInUp } from '@/lib/animations'

const steps = [
  {
    number: '01',
    icon: Map,
    title: 'Encontre empresas',
    text: 'Pesquise empresas no Google Maps por segmento, cidade, bairro ou região.',
    tag: 'Google Maps',
    tagColor: '#4285F4',
  },
  {
    number: '02',
    icon: Sheet,
    title: 'Organize os contatos',
    text: 'Nome, telefone, endereço, site e avaliação são organizados automaticamente em uma planilha.',
    tag: 'Google Sheets',
    tagColor: '#0F9D58',
  },
  {
    number: '03',
    icon: MessageSquare,
    title: 'Faça a prospecção',
    text: 'O sistema lê a lista, envia as mensagens e atualiza o status de cada contato.',
    tag: 'WhatsApp',
    tagColor: '#25D366',
  },
]

export default function HowItWorks() {
  return (
    <section className="relative py-20 lg:py-28" style={{ background: '#080808' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{ color: '#00e676', border: '1px solid rgba(0,230,118,0.25)', background: 'rgba(0,230,118,0.06)' }}
          >
            Como funciona
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-white"
            style={{ fontFamily: 'var(--font-jakarta)' }}
          >
            Um sistema completo em{' '}
            <span className="text-neon-gradient">três etapas</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid md:grid-cols-3 gap-6 items-start"
        >
          {steps.map(({ number, icon: Icon, title, text, tag, tagColor }, i) => (
            <div key={title} className="flex md:flex-col md:items-center gap-4 md:gap-0">
              <motion.div
                variants={fadeInUp}
                className="dark-card rounded-2xl p-6 flex-1 md:w-full relative overflow-hidden group cursor-default"
              >
                {/* Number */}
                <span
                  className="absolute top-4 right-4 text-5xl font-extrabold leading-none select-none"
                  style={{ color: 'rgba(255,255,255,0.04)', fontFamily: 'var(--font-jakarta)' }}
                >
                  {number}
                </span>

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${tagColor}18`, border: `1px solid ${tagColor}30` }}
                >
                  <Icon size={22} style={{ color: tagColor }} />
                </div>

                <h3
                  className="text-lg font-bold text-white mb-2"
                  style={{ fontFamily: 'var(--font-jakarta)' }}
                >
                  {title}
                </h3>
                <p className="text-sm text-white/55 leading-relaxed mb-4">{text}</p>

                <span
                  className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: `${tagColor}15`, color: tagColor, border: `1px solid ${tagColor}25` }}
                >
                  {tag}
                </span>
              </motion.div>

              {/* Arrow connector */}
              {i < steps.length - 1 && (
                <div className="hidden md:flex items-center justify-center -mx-3 z-10 mt-[-50%]">
                  <ArrowRight size={18} style={{ color: '#00e676', opacity: 0.5 }} />
                </div>
              )}
            </div>
          ))}
        </motion.div>

        {/* Flow label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex items-center justify-center gap-3 text-xs text-white/30"
        >
          <span>Google Maps</span>
          <ArrowRight size={12} style={{ color: '#00e676' }} />
          <span>Google Sheets</span>
          <ArrowRight size={12} style={{ color: '#00e676' }} />
          <span>WhatsApp</span>
        </motion.div>
      </div>
    </section>
  )
}
