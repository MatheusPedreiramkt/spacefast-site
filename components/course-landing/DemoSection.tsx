'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, CheckCircle } from 'lucide-react'

const stats = [
  { label: 'Pesquisa executada', detail: 'Google Maps API retorna empresas da região' },
  { label: 'Contatos adicionados', detail: 'Dados organizados na planilha automaticamente' },
  { label: 'Mensagem enviada', detail: 'Sistema lê a planilha e dispara via WhatsApp' },
  { label: 'Status atualizado', detail: 'Contato marcado como \'Enviado\' na planilha' },
]

function fireVideoClick() {
  try {
    const win = window as Window & { gtag?: (...a: unknown[]) => void; fbq?: (...a: unknown[]) => void }
    if (win.gtag) win.gtag('event', 'video_play', { event_category: 'engagement' })
    if (win.fbq) win.fbq('track', 'ViewContent', { content_name: 'demo_video' })
  } catch {}
}

export default function DemoSection() {
  const [playing, setPlaying] = useState(false)

  function handlePlay() {
    fireVideoClick()
    setPlaying(true)
  }

  return (
    <section className="relative py-20 lg:py-28" style={{ background: '#0d0d0d' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{ color: '#00e676', border: '1px solid rgba(0,230,118,0.25)', background: 'rgba(0,230,118,0.06)' }}
          >
            Demonstração
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-white"
            style={{ fontFamily: 'var(--font-jakarta)' }}
          >
            Veja o sistema funcionando{' '}
            <span className="text-neon-gradient">na prática</span>
          </h2>
        </motion.div>

        {/* Video player */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden mb-10"
          style={{
            border: '1px solid rgba(0,230,118,0.15)',
            background: '#111',
            aspectRatio: '16/9',
          }}
        >
          {/* Replace src with real video path when available */}
          {/* Video file: /public/videos/course/demo.mp4 */}
          {playing ? (
            <video
              src="/videos/course/demo.mp4"
              controls
              autoPlay
              className="w-full h-full object-cover"
              playsInline
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {/* Placeholder thumbnail bg */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(0,230,118,0.05) 0%, transparent 70%)',
                }}
              />
              <div className="absolute inset-0 grid-bg-dark opacity-50" />

              {/* Play button */}
              <button
                onClick={handlePlay}
                className="relative z-10 flex flex-col items-center gap-4 group cursor-pointer"
                aria-label="Reproduzir vídeo de demonstração"
              >
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.96 }}
                  className="w-20 h-20 rounded-full flex items-center justify-center glow-neon"
                  style={{ background: '#00e676' }}
                >
                  <Play size={28} className="text-black ml-1" fill="black" />
                </motion.div>
                <span className="text-sm text-white/50 group-hover:text-white/70 transition-colors">
                  Assistir demonstração
                </span>
              </button>
            </div>
          )}
        </motion.div>

        {/* Stats below video */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map(({ label, detail }) => (
            <div
              key={label}
              className="dark-card rounded-xl p-4 flex items-start gap-3"
            >
              <CheckCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: '#00e676' }} />
              <div>
                <p className="text-sm font-semibold text-white mb-0.5">{label}</p>
                <p className="text-xs text-white/40 leading-snug">{detail}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
