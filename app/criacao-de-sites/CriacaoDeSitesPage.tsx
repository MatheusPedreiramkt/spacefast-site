"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import {
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Globe,
  Clock,
  XCircle,
  FileText,
  Target,
  Smartphone,
  Share2,
  Building2,
  Briefcase,
  Rocket,
  LayoutTemplate,
  PenTool,
  Gauge,
  Search,
  MessageCircle,
  Megaphone,
  BarChart3,
  MousePointerClick,
  Factory,
  MapPin,
  Users,
  Store,
} from "lucide-react"
import Header from "@/components/Header"
import Portfolio from "@/components/Portfolio"
import Process from "@/components/Process"
import QualificacaoForm from "@/components/QualificacaoForm"
import Footer from "@/components/Footer"
import WhatsAppButton from "@/components/WhatsAppButton"
import { WhatsAppSVG } from "@/components/ui/WhatsAppSVG"
import { WHATSAPP_URL, WHATSAPP_MESSAGE_TEXT, WHATSAPP_NUMBER } from "@/lib/constants"
import { stagger, fadeUp, VIEWPORT, EASE, SECTION_ANIM } from "@/lib/motion"
import { trackWhatsAppClick } from "@/lib/analytics"
import { openWhatsAppWithTracking } from "@/lib/cqc"

// ─── Breadcrumbs ────────────────────────────────────────────────────────────

function Breadcrumbs() {
  return (
    <div className="relative bg-[#030712] pt-20">
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center gap-1.5 text-xs text-gray-500">
          <li>
            <Link href="/" className="hover:text-gray-300 transition-colors">
              Início
            </Link>
          </li>
          <li aria-hidden className="text-gray-700">
            /
          </li>
          <li className="text-gray-400" aria-current="page">
            Criação de Sites
          </li>
        </ol>
      </nav>
    </div>
  )
}

// ─── Hero: composição visual com projetos reais ──────────────────────────────

function RealProjectsShowcase() {
  return (
    <div className="relative w-full max-w-[440px] mx-auto select-none">
      <div
        className="absolute -inset-10 bg-gradient-to-br from-blue-600/20 via-cyan-500/10 to-emerald-600/12 blur-3xl rounded-full pointer-events-none"
        aria-hidden
      />

      {/* Card secundário — espiando atrás */}
      <div
        className="absolute -right-3 -bottom-7 w-[58%] aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 rotate-3 z-0"
        style={{ background: "linear-gradient(150deg,#0a1630 0%,#070d1c 55%)" }}
      >
        <Image
          src="/projects/nm-corretora.webp"
          alt="Site institucional da NM Corretora, desenvolvido pela SpaceFast"
          fill
          sizes="260px"
          className="object-contain p-2"
        />
      </div>

      {/* Card principal */}
      <div
        className="relative z-10 rounded-2xl overflow-hidden border border-white/12 shadow-2xl shadow-black/60"
        style={{ background: "linear-gradient(150deg,#071a10 0%,#070d1c 55%)" }}
      >
        <div className="aspect-[16/10] relative">
          <Image
            src="/projects/green-irrigation.webp"
            alt="Site institucional da Green Irrigation, desenvolvido pela SpaceFast"
            fill
            sizes="(max-width: 1024px) 78vw, 440px"
            className="object-contain p-3"
            priority
          />
        </div>
      </div>
    </div>
  )
}

// ─── Section 1: Hero ──────────────────────────────────────────────────────────

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
      className="relative overflow-hidden bg-[#030712]"
    >
      {/* Backgrounds */}
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-60" />
      <div
        className="absolute inset-x-0 top-0 h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 55% at 50% -5%, rgba(59,130,246,0.19) 0%, rgba(139,92,246,0.07) 52%, transparent 70%)",
        }}
      />
      <div className="absolute top-1/3 -left-64 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-64 w-[700px] h-[700px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-10 items-center">

          {/* Left: Text */}
          <div className="space-y-6 lg:space-y-7 text-center lg:text-left">

            {/* Identification */}
            <motion.div {...anim(0)} className="flex justify-center lg:justify-start">
              <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-[0.15em] text-blue-400 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" aria-hidden />
                Criação de Sites Profissionais
              </span>
            </motion.div>

            {/* H1 — única, com a keyword principal no início */}
            <motion.div {...anim(0.1)}>
              <h1 className="text-[2.3rem] sm:text-[2.9rem] lg:text-[3.4rem] xl:text-[3.8rem] font-black leading-[1.1] tracking-tighter">
                <span className="text-white">Criação de sites que</span>
                <br />
                <span className="gradient-text-brand">transformam sua presença digital</span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              {...anim(0.2)}
              className="text-[1.05rem] text-gray-400 leading-[1.75] max-w-[500px] mx-auto lg:mx-0"
            >
              Desenvolvemos sites modernos, rápidos e estratégicos para empresas que querem
              transmitir mais credibilidade, apresentar seus serviços profissionalmente e
              transformar visitantes em novos contatos.
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
                Quero criar meu site
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
          </div>

          {/* Right: Visual */}
          <motion.div
            initial={prefersReduced ? undefined : { opacity: 0, x: 32 }}
            animate={prefersReduced ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
            className="relative"
          >
            <RealProjectsShowcase />
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#030712] to-transparent pointer-events-none" />
    </section>
  )
}

// ─── Section 2: Problema / Contexto ───────────────────────────────────────────

const SITE_PROBLEMS = [
  { icon: Globe, label: "Empresa ainda sem site próprio" },
  { icon: Clock, label: "Site antigo e desatualizado" },
  { icon: XCircle, label: "Aparência pouco profissional" },
  { icon: FileText, label: "Dificuldade para apresentar os serviços" },
  { icon: Target, label: "Falta de contatos e orçamentos" },
  { icon: Smartphone, label: "Experiência ruim no celular" },
  { icon: Share2, label: "Dependência apenas do Instagram e redes sociais" },
] as const

function ProblemaSection() {
  return (
    <section className="relative py-20 lg:py-28 bg-[#030712] overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-30" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          {...SECTION_ANIM}
          viewport={VIEWPORT}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-[1.75rem] sm:text-4xl lg:text-[2.75rem] font-bold text-white mb-5 leading-tight tracking-tight">
            Seu site precisa trabalhar{" "}
            <span className="gradient-text-brand">a favor da sua empresa</span>
          </h2>
          <p className="text-gray-400 text-[1.02rem] leading-relaxed">
            Um site não deve existir apenas para &ldquo;estar na internet&rdquo;. Ele precisa
            apresentar sua empresa com profissionalismo e transformar visitantes em contatos
            reais. Reconhece algum desses problemas?
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid sm:grid-cols-2 gap-x-8 gap-y-5 max-w-3xl mx-auto"
        >
          {SITE_PROBLEMS.map((p, i) => (
            <motion.div key={i} variants={fadeUp} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                <p.icon className="w-4 h-4 text-red-400" aria-hidden />
              </div>
              <p className="text-gray-300 text-[0.95rem] leading-snug pt-1.5">{p.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Section 3: O que desenvolvemos ──────────────────────────────────────────

const O_QUE_DESENVOLVEMOS = [
  {
    icon: Building2,
    title: "Sites institucionais",
    description: "Apresentam sua empresa, serviços e diferenciais com credibilidade.",
  },
  {
    icon: Briefcase,
    title: "Sites para prestadores de serviços",
    description: "Focados em gerar contatos qualificados via WhatsApp.",
  },
  {
    icon: Rocket,
    title: "Landing pages",
    description: "Páginas de alta conversão para campanhas específicas.",
  },
  {
    icon: LayoutTemplate,
    title: "Sites catálogo",
    description: "Exibem produtos e serviços de forma organizada e visual.",
  },
  {
    icon: PenTool,
    title: "Sites personalizados",
    description: "Projetos sob medida para necessidades específicas do seu negócio.",
  },
] as const

function OQueDesenvolvemos() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#060d1f] to-[#030712]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/7 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          {...SECTION_ANIM}
          viewport={VIEWPORT}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight tracking-tight">
            O que{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              desenvolvemos
            </span>
          </h2>
          <p className="text-gray-400 text-[1.05rem] leading-relaxed">
            Soluções sob medida para diferentes necessidades e momentos da sua empresa.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid grid-cols-2 lg:grid-cols-5 gap-4"
        >
          {O_QUE_DESENVOLVEMOS.map((item, i) => (
            <motion.div key={i} variants={fadeUp}>
              <div className="glass rounded-2xl p-5 h-full border border-white/8 hover:border-white/16 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 p-px mb-4 shrink-0">
                  <div className="w-full h-full rounded-[11px] bg-[#080e1e] flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-white" aria-hidden />
                  </div>
                </div>
                <h3 className="text-white font-semibold text-[0.9rem] mb-1.5 leading-snug">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Section 5: Diferenciais ──────────────────────────────────────────────────

const DIFERENCIAIS = [
  { icon: PenTool, title: "Design profissional e personalizado" },
  { icon: Smartphone, title: "Responsivo para celular, tablet e desktop" },
  { icon: Gauge, title: "Foco em velocidade e performance" },
  { icon: Search, title: "Estrutura preparada para SEO" },
  { icon: MessageCircle, title: "Integração com WhatsApp" },
  { icon: Megaphone, title: "Estrutura para Google Ads e Meta Ads" },
  { icon: BarChart3, title: "Analytics e rastreamento quando contratado/configurado" },
  { icon: MousePointerClick, title: "Experiência pensada para conversão" },
] as const

function DiferenciaisSection() {
  return (
    <section className="relative py-20 lg:py-28 bg-[#030712] overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-30" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/7 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          {...SECTION_ANIM}
          viewport={VIEWPORT}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight tracking-tight">
            Mais do que{" "}
            <span className="gradient-text-brand">um site bonito</span>
          </h2>
          <p className="text-gray-400 text-[1.05rem] leading-relaxed">
            Cada detalhe pensado para representar bem sua empresa e gerar resultado real.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {DIFERENCIAIS.map((d, i) => (
            <motion.div key={i} variants={fadeUp}>
              <div className="group glass glass-hover rounded-2xl p-5 border border-white/8 hover:border-blue-500/22 transition-all h-full">
                <div
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center mb-4 shadow-lg"
                  aria-hidden
                >
                  <d.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-white font-semibold text-[0.88rem] leading-snug">{d.title}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Section 8: Para quem é ───────────────────────────────────────────────────

const SEGMENTOS = [
  { icon: Briefcase, label: "Prestadores de serviços" },
  { icon: Factory, label: "Indústrias" },
  { icon: MapPin, label: "Empresas locais" },
  { icon: Users, label: "Profissionais liberais" },
  { icon: Store, label: "Comércio" },
  { icon: Building2, label: "Empresas B2B" },
  { icon: Megaphone, label: "Negócios que anunciam no Google e Meta" },
] as const

function ParaQuemESection() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#060d1f] to-[#030712]" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          {...SECTION_ANIM}
          viewport={VIEWPORT}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight tracking-tight">
            Sites para empresas de{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              diferentes segmentos
            </span>
          </h2>
          <p className="text-gray-400 text-[1.05rem] leading-relaxed">
            Desenvolvemos projetos de criação de site para empresas de todos os tamanhos e áreas
            de atuação.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="flex flex-wrap justify-center gap-3"
        >
          {SEGMENTOS.map((s, i) => (
            <motion.span
              key={i}
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 bg-white/[0.03] text-gray-300 text-sm"
            >
              <s.icon className="w-4 h-4 text-blue-400 shrink-0" aria-hidden />
              {s.label}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Section 9: FAQ ───────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    question: "Quanto custa criar um site profissional?",
    answer:
      "O investimento varia de acordo com o escopo, as funcionalidades e os objetivos do seu projeto. Solicite um orçamento gratuito e personalizado pelo WhatsApp — sem compromisso.",
  },
  {
    question: "O prazo para desenvolver um site é de quanto tempo?",
    answer:
      "O prazo depende da complexidade e do escopo do projeto. Definimos um cronograma claro logo na conversa inicial, para que você saiba exatamente quando o site ficará pronto.",
  },
  {
    question: "O site funciona bem no celular?",
    answer:
      "Com certeza. Todos os nossos sites são 100% responsivos — funcionam perfeitamente em smartphones, tablets e computadores. Desenvolvemos com abordagem mobile-first, já que a maior parte dos acessos vem de dispositivos móveis.",
  },
  {
    question: "O site pode aparecer no Google?",
    answer:
      "Sim. Todos os sites são desenvolvidos com boas práticas de SEO técnico — estrutura semântica, meta tags otimizadas, sitemap e velocidade de carregamento — a base para o site ser bem indexado e ranquear ao longo do tempo.",
  },
  {
    question: "Vocês fazem integração com WhatsApp?",
    answer:
      "Sim! Todos os sites já saem com botão flutuante do WhatsApp e CTAs estratégicos posicionados ao longo da página, para transformar visitantes em conversas reais.",
  },
  {
    question: "Depois que o site estiver pronto, consigo fazer alterações?",
    answer:
      "Sim! Você recebe orientações para atualizar textos e informações, e também conta com suporte direto para ajustes — sem depender de terceiros para pequenas mudanças.",
  },
] as const

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="relative py-20 lg:py-28 bg-[#030712] overflow-hidden">
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

// ─── Section 10: CTA Final ─────────────────────────────────────────────────────

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
              Vamos criar um site{" "}
              <span className="gradient-text">à altura da sua empresa</span>?
            </h2>

            <p className="text-gray-400 text-[1.1rem] max-w-xl mx-auto leading-relaxed mb-10">
              Conte um pouco sobre o seu projeto e vamos avaliar a melhor solução para transformar
              sua presença digital.
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
              Falar sobre meu projeto
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
            </a>
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
        <Breadcrumbs />
        <HeroSEO />
        <ProblemaSection />
        <OQueDesenvolvemos />
        <Portfolio
          heading={
            <>
              Sites que já{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                desenvolvemos
              </span>
            </>
          }
          subtitle="Projetos reais, de segmentos diferentes, desenvolvidos com estratégia e design premium."
        />
        <DiferenciaisSection />
        <Process />
        <QualificacaoForm />
        <ParaQuemESection />
        <FaqSection />
        <CTASEOFinal />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
