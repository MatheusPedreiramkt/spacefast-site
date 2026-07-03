"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, ChevronRight, TrendingUp, Zap, Users, Star } from "lucide-react"
import { WHATSAPP_URL, WHATSAPP_MESSAGE_TEXT, WHATSAPP_NUMBER } from "@/lib/constants"
import { WhatsAppSVG } from "@/components/ui/WhatsAppSVG"
import { EASE } from "@/lib/motion"
import { trackWhatsAppClick } from "@/lib/analytics"
import { openWhatsAppWithTracking } from "@/lib/cqc"

// All positions and classes are static so Tailwind can extract them at build time.
const METRIC_CARDS = [
  {
    icon: Zap,
    label: "Velocidade",
    value: "+247%",
    textColor: "text-cyan-300",
    borderColor: "border-cyan-500/30",
    bgColor: "bg-cyan-500/12",
    iconBg: "bg-cyan-500/20 border-cyan-500/40",
    glowShadow: "0 8px 28px rgba(6,182,212,0.20), 0 2px 8px rgba(6,182,212,0.12), inset 0 1px 0 rgba(6,182,212,0.08)",
    position: "-top-5 -left-4 lg:-left-10",
    delay: 0.55,
    floatDuration: 3.1,
  },
  {
    icon: TrendingUp,
    label: "Conversão",
    value: "+180%",
    textColor: "text-blue-300",
    borderColor: "border-blue-500/30",
    bgColor: "bg-blue-500/12",
    iconBg: "bg-blue-500/20 border-blue-500/40",
    glowShadow: "0 8px 28px rgba(59,130,246,0.20), 0 2px 8px rgba(59,130,246,0.12), inset 0 1px 0 rgba(59,130,246,0.08)",
    position: "top-1/4 -right-4 lg:-right-10",
    delay: 0.7,
    floatDuration: 3.7,
  },
  {
    icon: Users,
    label: "Leads",
    value: "+3x",
    textColor: "text-purple-300",
    borderColor: "border-purple-500/30",
    bgColor: "bg-purple-500/12",
    iconBg: "bg-purple-500/20 border-purple-500/40",
    glowShadow: "0 8px 28px rgba(139,92,246,0.20), 0 2px 8px rgba(139,92,246,0.12), inset 0 1px 0 rgba(139,92,246,0.08)",
    position: "bottom-1/3 -left-4 lg:-left-12",
    delay: 0.62,
    floatDuration: 4.0,
  },
  {
    icon: Star,
    label: "Autoridade",
    value: "5 ★",
    textColor: "text-amber-300",
    borderColor: "border-amber-500/30",
    bgColor: "bg-amber-500/12",
    iconBg: "bg-amber-500/20 border-amber-500/40",
    glowShadow: "0 8px 28px rgba(245,158,11,0.20), 0 2px 8px rgba(245,158,11,0.12), inset 0 1px 0 rgba(245,158,11,0.08)",
    position: "-bottom-3 right-6",
    delay: 0.78,
    floatDuration: 3.4,
  },
] as const

function LaptopMockup() {
  return (
    <div className="relative w-full max-w-[560px] mx-auto select-none">
      {/* Multi-layer glow behind screen — stronger to match larger mockup */}
      <div className="absolute -inset-10 bg-gradient-to-br from-blue-600/22 via-purple-600/10 to-cyan-600/14 blur-3xl rounded-full" />
      <div className="absolute -inset-3 bg-gradient-to-b from-blue-500/10 to-transparent blur-xl rounded-2xl" />

      {/* Screen bezel */}
      <div className="relative bg-[#111827] rounded-2xl p-2.5 border border-white/12 shadow-2xl shadow-black/70">
        {/* Screen */}
        <div className="rounded-xl overflow-hidden bg-[#0d1117]">
          {/* Browser chrome */}
          <div className="h-8 bg-[#161b22] border-b border-white/6 flex items-center gap-2 px-3">
            <div className="flex gap-1.5 shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/85" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/85" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/85" />
            </div>
            {/* URL bar */}
            <div className="flex-1 max-w-[210px] mx-auto h-5 bg-[#21262d] rounded-md flex items-center gap-1.5 px-2">
              <div className="w-2 h-2 rounded-full border border-green-500/60 shrink-0" />
              <span className="text-[9px] text-white/28 font-mono tracking-wide truncate">
                spacefast.com.br
              </span>
            </div>
            {/* Toolbar icons */}
            <div className="flex gap-1 ml-auto shrink-0">
              {["bg-white/6", "bg-white/6", "bg-white/6"].map((bg, i) => (
                <div key={i} className={`w-4 h-4 rounded ${bg}`} />
              ))}
            </div>
          </div>

          {/* Website preview */}
          <div className="aspect-[16/9] bg-gradient-to-br from-[#090e1c] to-[#0c1630] p-3.5 relative overflow-hidden">
            {/* Ambient gradient */}
            <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-blue-600/12 to-transparent pointer-events-none" />

            {/* Fake navbar */}
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-md bg-gradient-to-br from-blue-400 to-cyan-400 shrink-0" />
                <div className="w-14 h-2 bg-white/22 rounded-full" />
              </div>
              <div className="hidden sm:flex gap-2.5">
                {[28, 32, 24, 28].map((w, i) => (
                  <div key={i} className="h-1.5 bg-white/10 rounded-full" style={{ width: w }} />
                ))}
              </div>
              <div className="w-14 h-4.5 rounded-full bg-gradient-to-r from-blue-500/55 to-cyan-500/55" />
            </div>

            {/* Hero headline skeleton */}
            <div className="space-y-2 mb-4 relative z-10">
              <div className="h-4 bg-gradient-to-r from-white/38 to-white/18 rounded" style={{ width: "75%" }} />
              <div className="h-3.5 bg-white/24 rounded" style={{ width: "55%" }} />
              <div className="h-2 bg-white/10 rounded mt-1" style={{ width: "90%" }} />
              <div className="h-2 bg-white/7 rounded" style={{ width: "65%" }} />
            </div>

            {/* CTA buttons skeleton */}
            <div className="flex gap-2 mb-4 relative z-10">
              <div className="h-5 w-18 rounded-full bg-gradient-to-r from-blue-500/65 to-cyan-500/65" />
              <div className="h-5 w-16 rounded-full border border-white/18" />
            </div>

            {/* Stats cards skeleton */}
            <div className="grid grid-cols-3 gap-2 relative z-10">
              {[
                { g: "from-blue-600/35", n: "+247%", l: "Speed" },
                { g: "from-purple-600/35", n: "+180%", l: "Conv." },
                { g: "from-cyan-600/35", n: "×3", l: "Leads" },
              ].map((s, i) => (
                <div
                  key={i}
                  className={`rounded-lg bg-gradient-to-br ${s.g} to-transparent border border-white/10 p-2`}
                >
                  <div className="w-3 h-3 rounded bg-white/20 mb-1" />
                  <div className="text-[8px] font-bold text-white/65">{s.n}</div>
                  <div className="text-[7px] text-white/30 mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Laptop hinge + base */}
      <div className="h-2.5 bg-gradient-to-b from-[#111827] to-[#0d1117] mx-6 border-x border-white/8" />
      <div className="h-1.5 bg-[#0a0f1c] rounded-b-xl mx-2 border border-white/6" />
      <div className="h-0.5 bg-[#0d1117]/60 rounded-full mx-10 shadow-xl shadow-black/60" />
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
      className="relative min-h-screen flex items-center overflow-hidden bg-[#030712] pt-16"
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-10 items-center">

          {/* ── Left: Text ─────────────────────────────────────────────────── */}
          <div className="space-y-7 lg:space-y-8 text-center lg:text-left">

            {/* Badge */}
            <motion.div {...animProps(0)} className="flex justify-center lg:justify-start">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/8 text-blue-300 text-sm font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shrink-0" />
                Especialistas em Geração de Clientes
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </span>
            </motion.div>

            {/* H1 */}
            <motion.div {...animProps(0.1)}>
              <h1 className="text-[2.6rem] sm:text-[3.2rem] lg:text-[3.8rem] xl:text-[4.2rem] font-black leading-[1.08] tracking-tighter">
                <span className="gradient-text">Sites que trazem</span>
                <br />
                <span className="text-white">clientes para</span>
                <br />
                <span className="gradient-text-brand">o seu negócio</span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              {...animProps(0.2)}
              className="text-[1.05rem] text-gray-400 leading-[1.75] max-w-[480px] mx-auto lg:mx-0"
            >
              A SpaceFast cria sites estratégicos que{" "}
              <span className="text-gray-200 font-medium">trabalham por você 24h</span> —
              convertendo visitantes em leads qualificados, fortalecendo sua{" "}
              <span className="text-gray-200 font-medium">autoridade de marca</span> e gerando
              mais vendas.
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...animProps(0.3)}
              className="flex flex-col sm:flex-row gap-3 items-center lg:items-start"
            >
              {/* Primary CTA */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault()
                  trackWhatsAppClick("hero_cta")
                  openWhatsAppWithTracking(WHATSAPP_MESSAGE_TEXT, WHATSAPP_NUMBER)
                }}
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-[0.95rem] hover:from-blue-500 hover:to-cyan-400 transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
              >
                <WhatsAppSVG className="w-4 h-4" />
                Falar com especialista
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

            {/* Microcopy */}
            <motion.p {...animProps(0.35)} className="text-xs text-gray-400 -mt-4">
              Orçamento 100% gratuito · Resposta em minutos · Sem compromisso
            </motion.p>

            {/* Social proof */}
            <motion.div
              {...animProps(0.45)}
              className="flex items-center gap-4 pt-1 justify-center lg:justify-start"
            >
              <div className="flex -space-x-2.5" aria-hidden>
                {(["bg-blue-500", "bg-indigo-500", "bg-cyan-500", "bg-violet-500"] as const).map(
                  (c, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-full ${c} border-2 border-[#030712] flex items-center justify-center text-white text-[10px] font-bold`}
                    />
                  ),
                )}
              </div>
              <div className="text-sm">
                <span className="text-white font-semibold">Sites criados</span>{" "}
                <span className="text-gray-500">para empresas que querem crescer</span>
              </div>
            </motion.div>
          </div>

          {/* ── Right: Visual ──────────────────────────────────────────────── */}
          <motion.div
            initial={prefersReduced ? undefined : { opacity: 0, x: 32 }}
            animate={prefersReduced ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
            className="relative"
          >
            <LaptopMockup />

            {/* Floating metric cards */}
            {METRIC_CARDS.map((card, i) => (
              <motion.div
                key={i}
                initial={prefersReduced ? undefined : { opacity: 0, scale: 0.85 }}
                animate={prefersReduced ? undefined : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, delay: card.delay, ease: EASE }}
                className={`absolute ${card.position} z-20`}
              >
                <motion.div
                  animate={prefersReduced ? undefined : { y: [0, -7, 0] }}
                  transition={{
                    duration: card.floatDuration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: card.delay + 0.5,
                  }}
                  className={`glass-card rounded-xl p-2.5 flex items-center gap-2.5 border ${card.borderColor}`}
                  style={{ boxShadow: card.glowShadow }}
                >
                  <div
                    className={`w-8 h-8 rounded-lg ${card.iconBg} border flex items-center justify-center shrink-0`}
                  >
                    <card.icon className={`w-4 h-4 ${card.textColor}`} />
                  </div>
                  <div>
                    <p className={`text-sm font-bold leading-none ${card.textColor}`}>
                      {card.value}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5 leading-none">{card.label}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
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
