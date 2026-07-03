"use client"

import { useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import {
  ArrowRight,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Clock,
  Share2,
  Zap,
  Search,
  Target,
  MessageCircle,
  Headphones,
  Globe,
  Award,
  TrendingUp,
  Shield,
} from "lucide-react"
import Header from "@/components/Header"
import Portfolio from "@/components/Portfolio"
import Process from "@/components/Process"
import Footer from "@/components/Footer"
import WhatsAppButton from "@/components/WhatsAppButton"
import { WhatsAppSVG } from "@/components/ui/WhatsAppSVG"
import { WHATSAPP_URL, WHATSAPP_MESSAGE_TEXT, WHATSAPP_NUMBER } from "@/lib/constants"
import { stagger, fadeUp, VIEWPORT, EASE, SECTION_ANIM } from "@/lib/motion"
import { trackWhatsAppClick } from "@/lib/analytics"
import { openWhatsAppWithTracking } from "@/lib/cqc"

// ─── Hero: Laptop mockup ──────────────────────────────────────────────────────
function LaptopMockup() {
  return (
    <div className="relative w-full max-w-[560px] mx-auto select-none">
      <div className="absolute -inset-10 bg-gradient-to-br from-blue-600/22 via-purple-600/10 to-cyan-600/14 blur-3xl rounded-full" />
      <div className="absolute -inset-3 bg-gradient-to-b from-blue-500/10 to-transparent blur-xl rounded-2xl" />

      <div className="relative bg-[#111827] rounded-2xl p-2.5 border border-white/12 shadow-2xl shadow-black/70">
        <div className="rounded-xl overflow-hidden bg-[#0d1117]">
          {/* Browser chrome */}
          <div className="h-8 bg-[#161b22] border-b border-white/6 flex items-center gap-2 px-3">
            <div className="flex gap-1.5 shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/85" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/85" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/85" />
            </div>
            <div className="flex-1 max-w-[210px] mx-auto h-5 bg-[#21262d] rounded-md flex items-center gap-1.5 px-2">
              <div className="w-2 h-2 rounded-full border border-green-500/60 shrink-0" />
              <span className="text-[9px] text-white/28 font-mono tracking-wide truncate">
                spacefast.com.br/seu-site
              </span>
            </div>
            <div className="flex gap-1 ml-auto shrink-0">
              {(["bg-white/6", "bg-white/6", "bg-white/6"] as const).map((bg, i) => (
                <div key={i} className={`w-4 h-4 rounded ${bg}`} />
              ))}
            </div>
          </div>

          {/* Website preview */}
          <div className="aspect-[16/9] bg-gradient-to-br from-[#090e1c] to-[#0c1630] p-3.5 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-blue-600/12 to-transparent pointer-events-none" />

            {/* Fake navbar */}
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-md bg-gradient-to-br from-blue-400 to-cyan-400 shrink-0" />
                <div className="w-16 h-2 bg-white/22 rounded-full" />
              </div>
              <div className="hidden sm:flex gap-2.5">
                {[28, 32, 24, 28].map((w, i) => (
                  <div key={i} className="h-1.5 bg-white/10 rounded-full" style={{ width: w }} />
                ))}
              </div>
              <div className="w-14 h-5 rounded-full bg-gradient-to-r from-blue-500/55 to-cyan-500/55" />
            </div>

            {/* Headline skeleton */}
            <div className="space-y-2 mb-4 relative z-10">
              <div className="h-4 bg-gradient-to-r from-white/38 to-white/18 rounded" style={{ width: "72%" }} />
              <div className="h-3.5 bg-white/24 rounded" style={{ width: "50%" }} />
              <div className="h-2 bg-white/10 rounded mt-1" style={{ width: "88%" }} />
              <div className="h-2 bg-white/7 rounded" style={{ width: "60%" }} />
            </div>

            {/* CTA skeleton */}
            <div className="flex gap-2 mb-4 relative z-10">
              <div className="h-5 w-20 rounded-full bg-gradient-to-r from-blue-500/65 to-cyan-500/65" />
              <div className="h-5 w-16 rounded-full border border-white/18" />
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-2 relative z-10">
              {[
                { g: "from-blue-600/35", n: "SEO", l: "Otimizado" },
                { g: "from-emerald-600/35", n: "100%", l: "Responsivo" },
                { g: "from-purple-600/35", n: "Fast", l: "Performance" },
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

      {/* Laptop base */}
      <div className="h-2.5 bg-gradient-to-b from-[#111827] to-[#0d1117] mx-6 border-x border-white/8" />
      <div className="h-1.5 bg-[#0a0f1c] rounded-b-xl mx-2 border border-white/6" />
      <div className="h-0.5 bg-[#0d1117]/60 rounded-full mx-10 shadow-xl shadow-black/60" />
    </div>
  )
}

// ─── Section 1: Hero SEO ──────────────────────────────────────────────────────

const TRUST_PILLS = [
  { label: "Responsivo", textColor: "text-blue-300", border: "border-blue-500/25", bg: "bg-blue-500/8" },
  { label: "SEO Otimizado", textColor: "text-emerald-300", border: "border-emerald-500/25", bg: "bg-emerald-500/8" },
  { label: "WhatsApp", textColor: "text-green-300", border: "border-green-500/25", bg: "bg-green-500/8" },
  { label: "Alta Performance", textColor: "text-cyan-300", border: "border-cyan-500/25", bg: "bg-cyan-500/8" },
] as const

function HeroSEO() {
  const prefersReduced = useReducedMotion()

  const anim = (delay = 0) =>
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
      aria-label="Criação de Sites Profissionais para Empresas"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#030712] pt-16"
    >
      {/* Backgrounds */}
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-10 items-center">

          {/* Left: Text */}
          <div className="space-y-7 lg:space-y-8 text-center lg:text-left">

            {/* Badge */}
            <motion.div {...anim(0)} className="flex justify-center lg:justify-start">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/8 text-blue-300 text-sm font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shrink-0" />
                Agência de Criação de Sites
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </span>
            </motion.div>

            {/* H1 — keyword-rich, multi-line */}
            <motion.div {...anim(0.1)}>
              <h1 className="text-[2.4rem] sm:text-[3rem] lg:text-[3.6rem] xl:text-[4rem] font-black leading-[1.08] tracking-tighter">
                <span className="gradient-text">Criação de Sites</span>
                <br />
                <span className="text-white">Profissionais</span>
                <br />
                <span className="gradient-text-brand">para Empresas</span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              {...anim(0.2)}
              className="text-[1.05rem] text-gray-400 leading-[1.75] max-w-[480px] mx-auto lg:mx-0"
            >
              Desenvolvemos sites{" "}
              <span className="text-gray-200 font-medium">rápidos, modernos e focados</span> em
              geração de clientes para empresas de qualquer segmento.
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...anim(0.3)}
              className="flex flex-col sm:flex-row gap-3 items-center lg:items-start"
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault()
                  trackWhatsAppClick("hero_criacao_sites")
                  openWhatsAppWithTracking(WHATSAPP_MESSAGE_TEXT, WHATSAPP_NUMBER)
                }}
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-[0.95rem] hover:from-blue-500 hover:to-cyan-400 transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
              >
                <WhatsAppSVG className="w-4 h-4" />
                Solicitar orçamento
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200 shrink-0" />
              </a>

              <a
                href="#portfolio"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" })
                }}
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full border border-white/22 bg-white/[0.05] backdrop-blur-sm text-white/80 font-semibold text-[0.95rem] hover:bg-white/[0.09] hover:border-white/35 hover:text-white transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
              >
                Ver projetos
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200 shrink-0" />
              </a>
            </motion.div>

            {/* Trust pills */}
            <motion.div
              {...anim(0.38)}
              className="flex flex-wrap gap-2 justify-center lg:justify-start"
            >
              {TRUST_PILLS.map((pill) => (
                <span
                  key={pill.label}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border ${pill.border} ${pill.bg} ${pill.textColor} text-xs font-medium`}
                >
                  <CheckCircle2 className="w-3 h-3 shrink-0" aria-hidden />
                  {pill.label}
                </span>
              ))}
            </motion.div>

            {/* Microcopy */}
            <motion.p {...anim(0.45)} className="text-xs text-gray-500 -mt-4">
              Orçamento 100% gratuito · Resposta em minutos · Sem compromisso
            </motion.p>
          </div>

          {/* Right: Laptop visual */}
          <motion.div
            initial={prefersReduced ? undefined : { opacity: 0, x: 32 }}
            animate={prefersReduced ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
            className="relative"
          >
            <LaptopMockup />
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

      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#030712] to-transparent pointer-events-none" />
    </section>
  )
}

// ─── Section 2: Problemas ─────────────────────────────────────────────────────

const SITE_PROBLEMS = [
  {
    icon: Clock,
    title: "Sites antigos e desatualizados",
    description:
      "Um site com visual dos anos 2010 passa desconfiança imediata. O cliente percebe o descuido e vai embora em silêncio antes mesmo de entrar em contato.",
  },
  {
    icon: Zap,
    title: "Sites lentos que espantam visitantes",
    description:
      "Mais de 53% dos usuários abandonam um site que demora mais de 3 segundos. Velocidade é critério eliminatório — não é opcional.",
  },
  {
    icon: Search,
    title: "Sem SEO, invisível no Google",
    description:
      "Sites sem otimização simplesmente não aparecem nas buscas. Quem não é encontrado no Google perde clientes para concorrentes todos os dias.",
  },
  {
    icon: Target,
    title: "Sem estratégia de conversão",
    description:
      "Site bonito sem CTA claro, fluxo de contato ou WhatsApp bem posicionado não gera clientes. Visitante sem próximo passo definido sai sem agir.",
  },
  {
    icon: Share2,
    title: "Dependência total do Instagram",
    description:
      "Alcance orgânico cai, algoritmos mudam, contas são bloqueadas. Sem site próprio, sua empresa depende de plataformas que você não controla.",
  },
] as const

function ProblemaSection() {
  return (
    <section className="relative py-20 lg:py-32 bg-[#030712] overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-red-700/7 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -left-48 w-[500px] h-[400px] bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.55, ease: EASE }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/28 bg-red-500/8 text-red-300 text-sm font-medium mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
            O problema real
          </div>

          <h2 className="text-[1.75rem] sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight tracking-tight">
            Por que muitas empresas não conseguem{" "}
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              resultados online?
            </span>
          </h2>

          <p className="text-gray-400 text-[1rem] sm:text-[1.05rem] leading-[1.75]">
            A maioria dos sites empresariais falha nos mesmos pontos. Identificar esses erros é o
            primeiro passo para transformar seu site em uma fonte real de clientes.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {SITE_PROBLEMS.map((p, i) => (
            <motion.div key={i} variants={fadeUp}>
              <div className="relative rounded-2xl p-6 h-full border border-red-500/10 bg-gradient-to-br from-red-950/18 via-transparent to-transparent hover:border-red-500/30 hover:from-red-950/28 hover:shadow-lg hover:shadow-red-950/20 transition-all duration-300 group overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
                <div
                  className="w-11 h-11 rounded-xl bg-red-500/12 border border-red-500/22 flex items-center justify-center mb-4 group-hover:bg-red-500/20 group-hover:border-red-500/38 transition-all duration-300"
                  aria-hidden
                >
                  <p.icon className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-white font-semibold text-[0.95rem] mb-2 leading-snug">
                  {p.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{p.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Section 3: Benefícios ────────────────────────────────────────────────────

const BENEFICIOS = [
  {
    icon: Shield,
    title: "Mais credibilidade",
    description:
      "Transmita profissionalismo e confiança antes mesmo do primeiro contato. Clientes compram de empresas que transmitem autoridade online.",
    color: "from-blue-500 to-blue-600",
    border: "border-blue-500/15",
  },
  {
    icon: MessageCircle,
    title: "Mais contatos",
    description:
      "CTAs estratégicos e integração com WhatsApp transformam visitantes em leads qualificados prontos para conversar com você.",
    color: "from-emerald-500 to-teal-500",
    border: "border-emerald-500/15",
  },
  {
    icon: Search,
    title: "Mais presença no Google",
    description:
      "Estrutura SEO técnica que faz seu site aparecer nas buscas para quem está ativamente procurando o que você oferece.",
    color: "from-orange-500 to-amber-500",
    border: "border-orange-500/15",
  },
  {
    icon: Award,
    title: "Mais autoridade",
    description:
      "Um site premium posiciona sua empresa como referência no segmento, diferenciando dos concorrentes e justificando seus preços.",
    color: "from-purple-500 to-violet-500",
    border: "border-purple-500/15",
  },
  {
    icon: TrendingUp,
    title: "Mais oportunidades de venda",
    description:
      "Com jornada de navegação bem estruturada, cada visita tem mais chance de virar contato — e cada contato, uma venda.",
    color: "from-cyan-500 to-blue-500",
    border: "border-cyan-500/15",
  },
  {
    icon: Headphones,
    title: "Atendimento automatizado",
    description:
      "Seu site trabalha 24 horas. Visitantes encontram informações e entram em contato a qualquer hora, sem você precisar estar online.",
    color: "from-pink-500 to-rose-500",
    border: "border-pink-500/15",
  },
] as const

function BeneficiosSection() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#060d1f] to-[#030712]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/18 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          {...SECTION_ANIM}
          viewport={VIEWPORT}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/8 text-blue-300 text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
            Benefícios
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight tracking-tight">
            O que um site profissional pode{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              fazer pelo seu negócio
            </span>
          </h2>
          <p className="text-gray-400 text-[1.05rem] leading-relaxed">
            Um site bem construído não é custo — é investimento que gera retorno mensurável mês após mês.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {BENEFICIOS.map((b, i) => (
            <motion.div key={i} variants={fadeUp}>
              <div
                className={`glass rounded-2xl p-6 h-full border ${b.border} hover:border-white/12 transition-all duration-300 group`}
              >
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${b.color} flex items-center justify-center mb-4 shadow-lg`}
                  aria-hidden
                >
                  <b.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-white font-semibold text-[0.95rem] mb-2 leading-snug">
                  {b.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{b.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Section 6: Diferenciais ──────────────────────────────────────────────────

const DIFERENCIAIS = [
  {
    icon: Award,
    title: "Design Premium",
    description:
      "Visual moderno, clean e com identidade. Seu site vai se destacar em qualquer mercado e transmitir autoridade desde o primeiro acesso.",
    color: "from-blue-500 to-cyan-500",
    number: "01",
  },
  {
    icon: Zap,
    title: "Performance Máxima",
    description:
      "Sites rápidos, otimizados e com boa pontuação no Core Web Vitals para melhor experiência do usuário e melhor ranqueamento no Google.",
    color: "from-orange-500 to-amber-500",
    number: "02",
  },
  {
    icon: Search,
    title: "SEO Estruturado",
    description:
      "Código semântico, meta tags otimizadas, Schema.org e estrutura técnica que o Google entende, indexa e ranqueia com mais facilidade.",
    color: "from-emerald-500 to-teal-500",
    number: "03",
  },
  {
    icon: MessageCircle,
    title: "Integração WhatsApp",
    description:
      "Botão flutuante e CTAs estratégicos posicionados ao longo do site para maximizar conversões direto no WhatsApp.",
    color: "from-green-500 to-emerald-500",
    number: "04",
  },
  {
    icon: Headphones,
    title: "Suporte Real",
    description:
      "Atendimento direto após a entrega. Sem chatbot, sem burocracia — você fala com quem desenvolveu o seu site.",
    color: "from-purple-500 to-violet-500",
    number: "05",
  },
  {
    icon: Globe,
    title: "Múltiplos Segmentos",
    description:
      "Experiência comprovada em clínicas, corretoras, serviços, comércio, construção, advocacia e muito mais.",
    color: "from-cyan-500 to-blue-500",
    number: "06",
  },
] as const

function DiferenciaisSection() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#060d1f] to-[#030712]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/7 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          {...SECTION_ANIM}
          viewport={VIEWPORT}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/8 text-blue-300 text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
            Por que a SpaceFast
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight tracking-tight">
            Por que escolher a{" "}
            <span className="gradient-text-brand">SpaceFast</span>
          </h2>
          <p className="text-gray-400 text-[1.05rem] leading-relaxed">
            Não entregamos só um site — entregamos resultado. Cada projeto é tratado como se fosse o nosso.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {DIFERENCIAIS.map((d, i) => (
            <motion.div key={i} variants={fadeUp}>
              <div className="group glass glass-hover rounded-2xl p-6 border border-white/8 hover:border-blue-500/22 transition-all h-full relative overflow-hidden">
                <span
                  aria-hidden
                  className="absolute -right-2 -top-3 text-7xl font-black text-white/4 select-none font-mono leading-none group-hover:text-white/7 transition-colors"
                >
                  {d.number}
                </span>
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${d.color} flex items-center justify-center mb-4 shadow-lg`}
                  aria-hidden
                >
                  <d.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-white font-semibold text-[0.95rem] mb-2">{d.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{d.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Section 7: FAQ SEO ───────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    question: "Quanto custa criar um site profissional?",
    answer:
      "O investimento varia conforme a complexidade do projeto. Sites one page partem de R$997. Sites completos com várias páginas e funcionalidades avançadas custam entre R$1.997 e R$4.997. Temos também o plano mensal por R$597/mês, que inclui site + domínio + hospedagem + anúncios. Solicite um orçamento gratuito pelo WhatsApp — sem compromisso.",
  },
  {
    question: "Quanto tempo leva para criar um site?",
    answer:
      "Depende do projeto. Sites one page ficam prontos em 5 a 7 dias. Sites com várias páginas levam de 10 a 20 dias úteis. Landing pages entregamos em até 5 dias. O prazo exato é combinado na conversa inicial — e cumprimos o que prometemos.",
  },
  {
    question: "O site aparece no Google após a criação?",
    answer:
      "Sim. Todos os sites que criamos incluem SEO técnico básico: estrutura semântica correta, meta tags otimizadas, sitemap.xml, robots.txt, Schema.org e velocidade de carregamento. O site é submetido ao Google Search Console. O posicionamento orgânico melhora progressivamente após a publicação.",
  },
  {
    question: "Vocês fazem SEO junto com a criação do site?",
    answer:
      "Sim! Todo site já sai otimizado para SEO: estrutura de headings correta, meta descriptions, títulos, dados estruturados Schema.org, velocidade de carregamento e responsividade mobile-first. Para estratégias de SEO contínuo — produção de conteúdo, link building e posicionamento competitivo — temos serviços específicos.",
  },
  {
    question: "Posso atualizar o conteúdo do site depois?",
    answer:
      "Sim! Dependendo da tecnologia utilizada, entregamos acesso ao painel de administração para você atualizar textos, imagens e informações. Também oferecemos suporte pós-entrega para ajustes e atualizações — você não precisa depender de terceiros para fazer pequenas mudanças.",
  },
  {
    question: "O site funciona bem no celular?",
    answer:
      "Com certeza. Todos os nossos sites são 100% responsivos — funcionam perfeitamente em smartphones, tablets e computadores. Desenvolvemos com abordagem mobile-first, priorizando a experiência do usuário no celular, pois mais de 70% dos acessos vêm de dispositivos móveis.",
  },
] as const

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="relative py-20 lg:py-32 bg-[#030712] overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-30" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/7 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          {...SECTION_ANIM}
          viewport={VIEWPORT}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/8 text-blue-300 text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
            Dúvidas frequentes
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight tracking-tight">
            Perguntas sobre{" "}
            <span className="gradient-text-brand">criação de sites</span>
          </h2>
          <p className="text-gray-400 text-[1.05rem]">
            Não encontrou o que precisa?{" "}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault()
                openWhatsAppWithTracking(WHATSAPP_MESSAGE_TEXT, WHATSAPP_NUMBER)
              }}
              className="text-blue-400 hover:text-blue-300 transition-colors underline underline-offset-2"
            >
              Fale diretamente conosco
            </a>
            .
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.65, delay: 0.12 }}
          className="max-w-3xl mx-auto space-y-2.5"
        >
          {FAQ_ITEMS.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div
                key={i}
                className={`glass rounded-2xl border transition-all duration-200 ${
                  isOpen
                    ? "border-blue-500/22 shadow-lg shadow-blue-500/5"
                    : "border-white/7 hover:border-white/14"
                }`}
              >
                <button
                  type="button"
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-inset rounded-2xl"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="text-white font-medium text-sm leading-snug">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.22, ease: EASE }}
                    className="shrink-0"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-colors duration-150 ${
                        isOpen ? "text-blue-400" : "text-gray-600"
                      }`}
                      aria-hidden
                    />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-gray-400 text-sm leading-[1.75]">
                        {faq.answer}
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

// ─── Section 8: CTA Final ─────────────────────────────────────────────────────

const TRUST_BADGES = [
  { color: "bg-emerald-500", label: "Resposta em até 2h" },
  { color: "bg-blue-500", label: "Sem compromisso" },
  { color: "bg-purple-500", label: "Orçamento gratuito" },
  { color: "bg-cyan-500", label: "Suporte humano" },
] as const

function CTASEOFinal() {
  return (
    <section id="contato" className="relative py-24 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-[#030712]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/7 to-transparent" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 90% 60% at 50% 50%, rgba(59,130,246,0.1) 0%, transparent 65%)",
            "radial-gradient(ellipse 40% 30% at 20% 80%, rgba(139,92,246,0.08) 0%, transparent 60%)",
            "radial-gradient(ellipse 40% 30% at 80% 20%, rgba(6,182,212,0.08) 0%, transparent 60%)",
          ].join(", "),
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <div className="text-center glass-strong rounded-3xl border border-white/8 px-8 py-14 sm:px-14 shadow-2xl shadow-blue-500/5">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={VIEWPORT}
              transition={{ delay: 0.12, duration: 0.6, ease: EASE }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/28 bg-blue-500/8 text-blue-300 text-sm font-medium mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shrink-0" />
              Pronto para começar?
            </motion.div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tighter mb-6">
              Pronto para ter um site que{" "}
              <span className="gradient-text">gera resultados</span>?
            </h2>

            <p className="text-gray-400 text-[1.1rem] max-w-xl mx-auto leading-relaxed mb-10">
              Vamos criar um site profissional para sua empresa gerar mais confiança, contatos
              qualificados e oportunidades de venda. Rápido, sem complicação e com suporte direto.
            </p>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault()
                trackWhatsAppClick("cta_final_criacao_sites")
                openWhatsAppWithTracking(WHATSAPP_MESSAGE_TEXT, WHATSAPP_NUMBER)
              }}
              className="group inline-flex items-center gap-3 px-9 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-base hover:from-blue-500 hover:to-cyan-400 transition-all shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
            >
              <WhatsAppSVG className="w-5 h-5 shrink-0" />
              Falar com especialista
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
            </a>

            <p className="mt-4 text-xs text-gray-600">
              Mais de 40 empresas atendidas · Orçamento gratuito · Resposta em até 2h
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2.5">
              {TRUST_BADGES.map((b) => (
                <span key={b.label} className="flex items-center gap-1.5 text-sm text-gray-500">
                  <span className={`w-1.5 h-1.5 rounded-full ${b.color} shrink-0`} aria-hidden />
                  {b.label}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Page root ────────────────────────────────────────────────────────────────

export default function CriacaoDeSitesPage() {
  return (
    <>
      <Header />
      <main>
        <HeroSEO />
        <ProblemaSection />
        <BeneficiosSection />
        <Portfolio />
        <Process />
        <DiferenciaisSection />
        <FaqSection />
        <CTASEOFinal />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
