"use client"

import { useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, ChevronRight, Pause, Play, Volume2, VolumeX } from "lucide-react"
import { EASE } from "@/lib/motion"
import { trackCustomEvent, trackHeroVideoEvent } from "@/lib/analytics"

function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasStarted, setHasStarted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  function handleStart() {
    const video = videoRef.current
    if (!video) return
    if (!hasStarted) {
      setHasStarted(true)
      trackHeroVideoEvent("hero_video_play")
    }
    void video
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false))
  }

  function togglePlay() {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      void video.play().then(() => setIsPlaying(true)).catch(() => {})
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  function toggleMute() {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  function handleTimeUpdate() {
    const video = videoRef.current
    if (!video || !video.duration) return
    const pct = (video.currentTime / video.duration) * 100
    if (pct >= 75) trackHeroVideoEvent("hero_video_75")
    else if (pct >= 50) trackHeroVideoEvent("hero_video_50")
    else if (pct >= 25) trackHeroVideoEvent("hero_video_25")
  }

  return (
    <div className="relative select-none">
      {/* Ambient glow behind card */}
      <div
        className="absolute -inset-10 bg-gradient-to-br from-blue-600/20 via-cyan-500/10 to-purple-600/12 blur-3xl rounded-full pointer-events-none"
        aria-hidden
      />

      {/* Auxiliary phrase */}
      <p className="relative text-center text-[13px] text-gray-500 mb-2.5 max-w-[280px] mx-auto">
        Assista e entenda qual solução pode fazer sentido para sua empresa
      </p>

      {/* Video card */}
      <div
        className="relative mx-auto w-[82vw] sm:w-[300px] lg:w-[320px] xl:w-[340px] [@media(max-height:800px)]:lg:w-[290px] max-w-[380px] aspect-[9/16] rounded-[28px] overflow-hidden border border-white/12 bg-[#0a0f1c]"
        style={{
          boxShadow:
            "0 30px 70px -20px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.03), 0 0 45px rgba(6,182,212,0.10)",
        }}
      >
        <video
          ref={videoRef}
          poster="/hero-video-poster.jpg"
          preload="none"
          playsInline
          muted={isMuted}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => {
            setIsPlaying(false)
            trackHeroVideoEvent("hero_video_complete")
          }}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-video-web.mp4" type="video/mp4" />
        </video>

        {/* Center play button — shown before first play */}
        {!hasStarted && (
          <button
            type="button"
            onClick={handleStart}
            aria-label="Assistir vídeo de apresentação"
            className="absolute inset-0 z-10 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors"
          >
            <span className="w-16 h-16 rounded-full bg-white/10 border border-white/25 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-black/40">
              <Play className="w-7 h-7 text-white ml-0.5" fill="currentColor" />
            </span>
          </button>
        )}

        {/* Minimal custom controls — shown after playback starts */}
        {hasStarted && (
          <div className="absolute bottom-0 inset-x-0 z-10 flex items-center justify-between px-3 py-2.5 bg-gradient-to-t from-black/55 to-transparent">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pausar vídeo" : "Reproduzir vídeo"}
              className="w-8 h-8 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 text-white" fill="currentColor" />
              ) : (
                <Play className="w-3.5 h-3.5 text-white ml-0.5" fill="currentColor" />
              )}
            </button>
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? "Ativar som" : "Desativar som"}
              className="w-8 h-8 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-white" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-white" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* Identification */}
      <div className="relative mt-3 flex flex-col items-center gap-0.5 text-center">
        <span className="inline-flex items-center gap-1.5 text-[11px] text-blue-300/80 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
          Fundador da Spacefast
        </span>
        <p className="text-sm font-semibold text-white">Matheus Pedreira</p>
        <p className="text-xs text-gray-500">Desenvolvimento &amp; Estratégia Digital</p>
      </div>
    </div>
  )
}

export default function Hero() {
  const prefersReduced = useReducedMotion()

  const animProps = (delay = 0) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay, ease: EASE },
        }

  return (
    <section
      id="inicio"
      aria-label="Início"
      className="relative min-h-[100svh] flex items-center overflow-hidden bg-[#030712] pt-16"
    >
      {/* Layered backgrounds */}
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-60" />

      {/* Radial top glow — deeper, dual-tone */}
      <div
        className="absolute inset-x-0 top-0 h-[700px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 55% at 50% -5%, rgba(59,130,246,0.19) 0%, rgba(139,92,246,0.07) 52%, transparent 70%)",
        }}
      />
      {/* Left + right ambient glows */}
      <div className="absolute top-1/3 -left-64 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-64 w-[700px] h-[700px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      {/* Subtle center-bottom warmth */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[280px] bg-blue-900/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:pt-8 lg:pb-12 [@media(max-height:800px)]:lg:pt-5 [@media(max-height:800px)]:lg:pb-8 w-full">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-8 [@media(max-height:800px)]:lg:gap-6 items-center">

          {/* ── Left: Text ─────────────────────────────────────────────────── */}
          <div className="space-y-7 lg:space-y-6 [@media(max-height:800px)]:lg:space-y-4 text-center lg:text-left">

            {/* Identification */}
            <motion.div {...animProps(0)} className="flex justify-center lg:justify-start">
              <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-[0.15em] text-blue-400 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" aria-hidden />
                Criação de Sites Profissionais
              </span>
            </motion.div>

            {/* H1 */}
            <motion.div {...animProps(0.1)}>
              <h1 className="text-[2.6rem] sm:text-[3.2rem] lg:text-[3.8rem] xl:text-[4.2rem] font-black leading-[1.08] tracking-tighter">
                <span className="text-white">Sua empresa precisa de um site</span>
                <br />
                <span className="gradient-text-brand">que realmente gere resultados?</span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              {...animProps(0.2)}
              className="text-[1.05rem] text-gray-400 leading-[1.75] max-w-[480px] mx-auto lg:mx-0"
            >
              Desenvolvo sites modernos, rápidos e estratégicos para transformar sua presença
              digital em mais credibilidade, contatos e oportunidades para sua empresa.
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...animProps(0.3)}
              className="flex flex-col sm:flex-row gap-3 items-center lg:items-start"
            >
              {/* Primary CTA */}
              <a
                href="#situacao"
                onClick={(e) => {
                  e.preventDefault()
                  trackCustomEvent("cta_click", { source: "hero_solicitar_analise" })
                  document.querySelector("#situacao")?.scrollIntoView({ behavior: "smooth" })
                }}
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-[0.95rem] hover:from-blue-500 hover:to-cyan-400 transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
              >
                Quero criar meu site
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200 shrink-0" />
              </a>

              {/* Secondary CTA — glass + visible border + animated arrow */}
              <a
                href="#portfolio"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" })
                }}
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full border border-white/22 bg-white/[0.05] backdrop-blur-sm text-white/80 font-semibold text-[0.95rem] hover:bg-white/[0.09] hover:border-white/35 hover:text-white transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
              >
                Ver portfólio
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200 shrink-0" />
              </a>
            </motion.div>

            {/* Pointer to portfolio */}
            <motion.p
              {...animProps(0.45)}
              className="text-sm text-gray-500 pt-1"
            >
              Veja abaixo alguns dos projetos que já desenvolvemos.
            </motion.p>
          </div>

          {/* ── Right: Visual ──────────────────────────────────────────────── */}
          <motion.div
            initial={prefersReduced ? undefined : { opacity: 0, x: 32, scale: 0.97 }}
            animate={prefersReduced ? undefined : { opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
            className="relative"
          >
            <HeroVideo />
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={prefersReduced ? undefined : { opacity: 0 }}
        animate={prefersReduced ? undefined : { opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        aria-hidden
      >
        <span className="text-[10px] text-gray-600 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={prefersReduced ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-6 bg-gradient-to-b from-gray-600 to-transparent"
        />
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#030712] to-transparent pointer-events-none" />
    </section>
  )
}
