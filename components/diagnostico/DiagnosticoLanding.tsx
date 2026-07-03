"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import {
  ArrowRight,
  ChevronRight,
  PlayCircle,
  ShieldCheck,
  Layout,
  Image as ImageIcon,
  MessageCircle,
  Megaphone,
  CheckCircle2,
  XCircle,
  Search,
  Zap,
} from "lucide-react"
import { stagger, fadeUp, VIEWPORT, EASE, SECTION_ANIM } from "@/lib/motion"
import { DIAGNOSTICO_PRICE } from "@/lib/diagnostico"

// Abaixo da dobra — code-split para reduzir o JS crítico da carga inicial.
const Portfolio = dynamic(() => import("@/components/Portfolio"))

// ─── Solução — 6 itens ─────────────────────────────────────────────────────
const SOLUCAO_ITEMS = [
  { icon: ShieldCheck, title: "Apresenta sua empresa", description: "Um espaço profissional que apresenta seu negócio da forma certa, antes mesmo do primeiro contato." },
  { icon: Layout, title: "Mostra seus serviços", description: "Estrutura clara para o visitante entender exatamente o que você oferece." },
  { icon: ImageIcon, title: "Exibe fotos e diferenciais", description: "Seu trabalho, seus produtos e o que te diferencia da concorrência, em destaque." },
  { icon: MessageCircle, title: "Conecta com WhatsApp", description: "Botões e CTAs estratégicos levam o visitante direto para uma conversa com você." },
  { icon: CheckCircle2, title: "Ajuda na confiança", description: "Design profissional transmite credibilidade e reduz a desconfiança do cliente." },
  { icon: Megaphone, title: "Integra com tráfego pago", description: "Estrutura pronta para receber anúncios do Facebook e Google e converter visitas em contatos." },
] as const

// ─── Para quem é ─────────────────────────────────────────────────────────────
const PARA_QUEM_E = [
  "Empresas que querem passar mais confiança",
  "Prestadores de serviço",
  "Lojas físicas e online",
  "Clínicas e consultórios",
  "Restaurantes",
  "Empresas locais",
  "Quem quer receber mais contatos pelo WhatsApp",
] as const

// ─── Para quem não é ─────────────────────────────────────────────────────────
const PARA_QUEM_NAO_E = [
  "Quem procura site extremamente barato",
  "Quem ainda não tem ideia de negócio",
  "Quem não pretende investir em presença digital",
  "Quem quer só \"olhar preço\"",
] as const

function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  function handlePlay() {
    videoRef.current?.play()
    setIsPlaying(true)
  }

  return (
    <div className="relative w-full max-w-[240px] sm:max-w-[340px] mx-auto select-none">
      <div className="absolute -inset-10 bg-gradient-to-br from-blue-600/22 via-purple-600/10 to-cyan-600/14 blur-3xl rounded-full" />
      <div className="relative aspect-[9/16] rounded-2xl overflow-hidden border border-white/12 shadow-2xl shadow-black/70 bg-[#0a0f1c]">
        <video
          ref={videoRef}
          src="/video-apresentacao.mp4"
          poster="/video-apresentacao-poster.jpg"
          preload="metadata"
          playsInline
          controls={isPlaying}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          className="absolute inset-0 w-full h-full object-cover"
        >
          Seu navegador não suporta vídeo.
        </video>

        {!isPlaying && (
          <button
            type="button"
            onClick={handlePlay}
            aria-label="Reproduzir vídeo de apresentação"
            className="absolute inset-0 z-10 flex items-center justify-center bg-black/15 hover:bg-black/25 transition-colors"
          >
            <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 border border-white/25 backdrop-blur-sm flex items-center justify-center focus-visible:ring-2 focus-visible:ring-blue-400">
              <PlayCircle className="w-9 h-9 sm:w-11 sm:h-11 text-white" strokeWidth={1.5} />
            </span>
          </button>
        )}
      </div>
    </div>
  )
}

function HeroSection({ onStart, onViewPortfolio }: { onStart: () => void; onViewPortfolio: () => void }) {
  return (
    <section
      id="inicio"
      aria-label="Diagnóstico gratuito"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#030712] pt-16"
    >
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-60" />
      <div
        className="absolute inset-x-0 top-0 h-[700px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 55% at 50% -5%, rgba(59,130,246,0.19) 0%, rgba(139,92,246,0.07) 52%, transparent 70%)",
        }}
      />
      <div className="absolute top-1/3 -left-64 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-64 w-[700px] h-[700px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-10 items-center">
          <div className="space-y-6 lg:space-y-7 text-center lg:text-left">
            <h1 className="text-[1.85rem] sm:text-[2.8rem] lg:text-[3.2rem] font-black leading-[1.1] tracking-normal text-white">
              Descubra se sua empresa está pronta para ter um{" "}
              <span className="gradient-text">site profissional</span>
            </h1>

            <div className="lg:hidden">
              <HeroVideo />
            </div>

            <p className="text-[1.05rem] text-gray-400 leading-[1.75] max-w-[480px] mx-auto lg:mx-0">
              Responda um diagnóstico rápido e veja qual estrutura de site faz mais sentido para o
              seu negócio. Projetos a partir de{" "}
              <span className="text-gray-200 font-medium">R${DIAGNOSTICO_PRICE}</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 items-center lg:items-start">
              <button
                type="button"
                onClick={onStart}
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-[0.95rem] hover:from-blue-500 hover:to-cyan-400 transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712] w-full sm:w-auto"
              >
                Fazer diagnóstico gratuito
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200 shrink-0" />
              </button>

              <button
                type="button"
                onClick={onViewPortfolio}
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full border border-white/22 bg-white/[0.05] backdrop-blur-sm text-white/80 font-semibold text-[0.95rem] hover:bg-white/[0.09] hover:border-white/35 hover:text-white transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712] w-full sm:w-auto"
              >
                Ver exemplos de sites
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200 shrink-0" />
              </button>
            </div>

            <p className="text-xs text-gray-500">
              Leva menos de 2 minutos. Sem compromisso.
            </p>
          </div>

          <div className="hidden lg:block">
            <HeroVideo />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#030712] to-transparent pointer-events-none" />
    </section>
  )
}

function ProblemaSection() {
  return (
    <section className="relative py-20 lg:py-28 bg-[#030712] overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-red-700/7 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div {...SECTION_ANIM} viewport={VIEWPORT}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/28 bg-red-500/8 text-red-300 text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
            O problema real
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-5 leading-tight tracking-tight">
            Sua empresa pode estar perdendo confiança antes mesmo do primeiro contato
          </h2>
          <p className="text-gray-400 text-[1.05rem] leading-[1.75]">
            Hoje o cliente pesquisa antes de comprar. Sem uma página profissional, ele escolhe o
            concorrente que parece mais preparado — mesmo que seu trabalho seja igual ou melhor.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function SolucaoSection() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#060d1f] to-[#030712]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/18 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...SECTION_ANIM} viewport={VIEWPORT} className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/8 text-blue-300 text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
            A solução
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-5 leading-tight tracking-tight">
            Um site profissional organiza sua presença digital
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {SOLUCAO_ITEMS.map((item, i) => (
            <motion.div key={i} variants={fadeUp}>
              <div className="glass rounded-2xl p-6 h-full border border-white/8 hover:border-blue-500/22 transition-all duration-300 group">
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/18 flex items-center justify-center mb-4 group-hover:bg-blue-500/18 group-hover:border-blue-500/32 transition-all" aria-hidden>
                  <item.icon className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-white font-semibold text-[0.95rem] mb-2 leading-snug">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ParaQuemSection() {
  return (
    <section className="relative py-20 lg:py-28 bg-[#030712] overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-30" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.55, ease: EASE }}
            className="glass rounded-2xl p-7 border border-emerald-500/15"
          >
            <h3 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" aria-hidden />
              Para quem é
            </h3>
            <ul className="space-y-3">
              {PARA_QUEM_E.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-gray-300 text-sm leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
            className="glass rounded-2xl p-7 border border-red-500/12"
          >
            <h3 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-400 shrink-0" aria-hidden />
              Para quem não é
            </h3>
            <ul className="space-y-3">
              {PARA_QUEM_NAO_E.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-gray-400 text-sm leading-relaxed">
                  <XCircle className="w-4 h-4 text-red-400/80 mt-0.5 shrink-0" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function PrecoSection() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#060d1f] to-[#030712]" />
      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div {...SECTION_ANIM} viewport={VIEWPORT}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/8 text-blue-300 text-sm font-medium mb-6">
            <Zap className="w-3.5 h-3.5 shrink-0" />
            Investimento
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-5 leading-tight tracking-tight">
            Projetos a partir de R${DIAGNOSTICO_PRICE}
          </h2>
          <p className="text-gray-400 text-[1.05rem] leading-[1.75]">
            O valor final depende da estrutura do site, do número de páginas, das funcionalidades
            e das integrações necessárias para o seu negócio.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function CTAFinalSection({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#030712]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/7 to-transparent" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 90% 60% at 50% 50%, rgba(59,130,246,0.1) 0%, transparent 65%)",
        }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.85, ease: EASE }}
          className="text-center glass-strong rounded-3xl border border-white/8 px-8 py-14 sm:px-14"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tighter mb-6">
            Descubra qual site faz sentido para{" "}
            <span className="gradient-text">o seu negócio</span>
          </h2>
          <p className="text-gray-400 text-[1.05rem] max-w-lg mx-auto leading-relaxed mb-10">
            Responda o diagnóstico gratuito e receba uma recomendação personalizada em menos de 2
            minutos.
          </p>

          <button
            type="button"
            onClick={onStart}
            className="group inline-flex items-center gap-3 px-9 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-base hover:from-blue-500 hover:to-cyan-400 transition-all shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
          >
            Fazer diagnóstico gratuito
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
          </button>

          <p className="mt-4 text-xs text-gray-600 flex items-center justify-center gap-1.5">
            <Search className="w-3.5 h-3.5 shrink-0" aria-hidden />
            Leva menos de 2 minutos · Sem compromisso
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default function DiagnosticoLanding({
  onStart,
  scrollToPortfolio,
  onScrolled,
}: {
  onStart: () => void
  scrollToPortfolio: boolean
  onScrolled: () => void
}) {
  useEffect(() => {
    if (!scrollToPortfolio) return
    const el = document.querySelector("#portfolio")
    el?.scrollIntoView({ behavior: "smooth" })
    onScrolled()
  }, [scrollToPortfolio, onScrolled])

  function handleViewPortfolio() {
    document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main>
      <HeroSection onStart={onStart} onViewPortfolio={handleViewPortfolio} />
      <ProblemaSection />
      <SolucaoSection />
      <Portfolio onCtaClick={onStart} />
      <ParaQuemSection />
      <PrecoSection />
      <CTAFinalSection onStart={onStart} />
    </main>
  )
}
