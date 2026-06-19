'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Shield, Zap, BookOpen } from 'lucide-react'
import { stagger, fadeInUp, fadeInRight } from '@/lib/animations'
import CheckoutButton from './CheckoutButton'

function MapsMockup() {
  return (
    <div className="relative rounded-2xl overflow-hidden border" style={{ borderColor: 'rgba(0,230,118,0.15)', background: '#111' }}>
      {/* Browser bar */}
      <div className="flex items-center gap-2 px-3 py-2.5" style={{ background: '#0d0d0d', borderBottom: '1px solid #1e1e1e' }}>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>
        <div className="flex-1 rounded-full text-[10px] text-white/30 px-2.5 py-1 flex items-center gap-1.5" style={{ background: '#1a1a1a' }}>
          <span className="text-neon opacity-50">🔒</span> maps.googleapis.com
        </div>
      </div>
      {/* Map area */}
      <div className="relative h-48 overflow-hidden" style={{ background: '#1a2035' }}>
        {/* Grid simulating map */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 300 200">
          <defs>
            <pattern id="mapgrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#4ade80" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="300" height="200" fill="url(#mapgrid)"/>
          <path d="M 50 20 Q 100 10 150 30 Q 200 50 250 20" stroke="#22c55e" strokeWidth="2" fill="none" opacity="0.5"/>
          <path d="M 20 80 Q 80 70 140 90 Q 200 110 260 80" stroke="#22c55e" strokeWidth="1.5" fill="none" opacity="0.3"/>
          <path d="M 10 140 Q 90 120 160 150 Q 230 170 290 140" stroke="#22c55e" strokeWidth="1.5" fill="none" opacity="0.3"/>
        </svg>
        {/* Map pins */}
        {[
          { x: '20%', y: '30%' },
          { x: '45%', y: '20%' },
          { x: '65%', y: '45%' },
          { x: '35%', y: '60%' },
          { x: '75%', y: '25%' },
          { x: '55%', y: '70%' },
        ].map((pin, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.15, duration: 0.3 }}
            className="absolute flex flex-col items-center"
            style={{ left: pin.x, top: pin.y }}
          >
            <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center" style={{ background: '#00e676' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-black" />
            </div>
            <div className="w-0.5 h-2 bg-white/60" />
          </motion.div>
        ))}
        {/* Info panel */}
        <div className="absolute bottom-2 left-2 right-2 rounded-xl p-2.5" style={{ background: 'rgba(8,8,8,0.9)', border: '1px solid rgba(0,230,118,0.2)' }}>
          <p className="text-[10px] text-neon font-semibold mb-1">6 empresas encontradas</p>
          <div className="space-y-1">
            {['Academia FitLife', 'Clínica Saúde Total', 'Studio Beleza+'].map((name) => (
              <div key={name} className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00e676' }} />
                <span className="text-[9px] text-white/60">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function SheetMockup() {
  const rows = [
    { name: 'Academia FitLife', phone: '(11) 9999-0001', status: 'Novo' },
    { name: 'Clínica Saúde Total', phone: '(11) 9999-0002', status: 'Enviado' },
    { name: 'Studio Beleza+', phone: '(11) 9999-0003', status: 'Novo' },
  ]
  return (
    <div className="rounded-xl overflow-hidden border" style={{ border: '1px solid #1e1e1e', background: '#0d0d0d' }}>
      {/* Sheet header */}
      <div className="flex items-center gap-2 px-3 py-2" style={{ background: '#111', borderBottom: '1px solid #1e1e1e' }}>
        <div className="w-3 h-3 rounded-sm" style={{ background: '#22c55e' }} />
        <span className="text-[10px] text-white/40">leads-empresas.xlsx</span>
      </div>
      {/* Columns */}
      <div className="grid grid-cols-3 px-2 py-1" style={{ borderBottom: '1px solid #1e1e1e' }}>
        {['Nome', 'Telefone', 'Status'].map((col) => (
          <span key={col} className="text-[9px] font-bold text-white/30 uppercase tracking-wider">{col}</span>
        ))}
      </div>
      {/* Rows */}
      {rows.map((row, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 + i * 0.2 }}
          className="grid grid-cols-3 px-2 py-1.5"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
        >
          <span className="text-[9px] text-white/70 truncate">{row.name}</span>
          <span className="text-[9px] text-white/50">{row.phone}</span>
          <span
            className="text-[9px] font-semibold"
            style={{ color: row.status === 'Enviado' ? '#00e676' : '#facc15' }}
          >
            {row.status}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

function WhatsAppMockup() {
  return (
    <div className="rounded-xl overflow-hidden border" style={{ border: '1px solid #1e1e1e', background: '#111' }}>
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2" style={{ background: '#128C7E' }}>
        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
          <span className="text-[8px]">🏢</span>
        </div>
        <span className="text-[10px] text-white font-medium">Academia FitLife</span>
        <div className="ml-auto flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[9px] text-white/70">online</span>
        </div>
      </div>
      {/* Messages */}
      <div className="p-2 space-y-1.5" style={{ background: '#0b141a' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="max-w-[90%] rounded-lg px-2.5 py-1.5 ml-auto"
          style={{ background: '#005c4b' }}
        >
          <p className="text-[9px] text-white/90 leading-relaxed">
            Olá! Vi que vocês estão na região e gostaria de apresentar uma solução...
          </p>
          <span className="text-[8px] text-white/40 flex justify-end mt-0.5">09:41 ✓✓</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
          className="max-w-[85%] rounded-lg px-2.5 py-1.5"
          style={{ background: '#1f2c33' }}
        >
          <p className="text-[9px] text-white/80">Olá! Pode enviar mais detalhes?</p>
          <span className="text-[8px] text-white/40 flex justify-end mt-0.5">09:43</span>
        </motion.div>
      </div>
    </div>
  )
}

function HeroVisual() {
  return (
    <div className="relative w-full">
      {/* Maps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="w-full"
      >
        <MapsMockup />
      </motion.div>

      {/* Arrow Maps → Sheet */}
      <div className="flex items-center gap-2 my-2 px-2">
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, #00e676, transparent)' }} />
        <svg viewBox="0 0 16 16" className="w-4 h-4 flex-shrink-0" style={{ color: '#00e676' }}>
          <path fill="currentColor" d="M8 0l8 8-8 8-1.4-1.4L12.2 9H0V7h12.2L6.6 1.4z"/>
        </svg>
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, #00e676)' }} />
      </div>

      {/* Sheet */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
      >
        <SheetMockup />
      </motion.div>

      {/* Arrow Sheet → WA */}
      <div className="flex items-center gap-2 my-2 px-2">
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, #00e676, transparent)' }} />
        <svg viewBox="0 0 16 16" className="w-4 h-4 flex-shrink-0" style={{ color: '#00e676' }}>
          <path fill="currentColor" d="M8 0l8 8-8 8-1.4-1.4L12.2 9H0V7h12.2L6.6 1.4z"/>
        </svg>
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, #00e676)' }} />
      </div>

      {/* WhatsApp */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.7 }}
      >
        <WhatsAppMockup />
      </motion.div>

      {/* Neon glow behind */}
      <div
        className="absolute inset-0 pointer-events-none -z-10 rounded-3xl"
        style={{ boxShadow: '0 0 120px rgba(0,230,118,0.06), 0 0 60px rgba(0,230,118,0.04)' }}
      />
    </div>
  )
}

export default function CourseHero() {
  return (
    <section
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden grid-bg-dark"
      aria-label="Hero"
    >
      {/* Subtle radial bg glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center top, rgba(0,230,118,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — text */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="space-y-7"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp}>
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                style={{
                  border: '1px solid rgba(0,230,118,0.3)',
                  background: 'rgba(0,230,118,0.08)',
                  color: '#00e676',
                }}
              >
                <span className="w-2 h-2 rounded-full bg-neon animate-pulse-glow" />
                Sistema prático de prospecção
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-[3.2rem] font-extrabold leading-tight tracking-tight text-white"
              style={{ fontFamily: 'var(--font-jakarta)' }}
            >
              Encontre empresas no{' '}
              <span className="text-neon-gradient">Google Maps</span>{' '}
              e organize sua prospecção pelo{' '}
              <span className="text-neon-gradient">WhatsApp</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p variants={fadeInUp} className="text-base sm:text-lg text-white/60 leading-relaxed max-w-xl">
              Aprenda passo a passo a capturar contatos de empresas, organizar os leads em uma
              planilha e configurar um sistema de mensagens automáticas no WhatsApp.
            </motion.p>

            {/* CTA */}
            <motion.div variants={fadeInUp}>
              <CheckoutButton
                label="QUERO ACESSAR O CURSO"
                className="neon-btn inline-flex items-center gap-3 px-8 py-4 rounded-xl text-sm cursor-pointer"
                icon={<ArrowRight size={18} />}
              />
              <p className="mt-3 text-xs text-white/35">
                Acesso imediato &bull; Aulas práticas &bull; Códigos e arquivos incluídos
              </p>
            </motion.div>

            {/* Trust strip */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 pt-1">
              {[
                { icon: Shield, label: 'Pagamento seguro' },
                { icon: Zap, label: 'Acesso imediato' },
                { icon: BookOpen, label: 'Aulas completas' },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 text-xs text-white/40 px-3 py-1.5 rounded-lg"
                  style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)' }}
                >
                  <Icon size={12} className="text-neon" style={{ color: '#00e676' }} />
                  {label}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — visual */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
            className="w-full max-w-md mx-auto lg:mx-0"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
