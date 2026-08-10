"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  FileText,
  Gauge,
  Goal,
  Layers3,
  Megaphone,
  MessageCircle,
  MousePointerClick,
  PanelTop,
  Rocket,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  type LucideIcon,
} from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import OrcamentoForm from "@/components/OrcamentoForm"
import WhatsAppButton from "@/components/WhatsAppButton"
import { portfolioProjects } from "@/lib/data"
import { SECTION_ANIM, VIEWPORT, EASE, fadeUp, stagger } from "@/lib/motion"

const PROBLEMS = [
  "A página demora para carregar e perde visitantes antes da primeira leitura.",
  "O conteúdo não transmite confiança suficiente para justificar o contato.",
  "Há informação demais e nenhum caminho claro para a conversão.",
  "A experiência no celular dificulta leitura, formulário e WhatsApp.",
  "As conversões não são acompanhadas com clareza para otimizar campanhas.",
] as const

const USE_CASES: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Search, title: "Google Ads", text: "Páginas alinhadas à intenção de busca e à oferta anunciada." },
  { icon: Megaphone, title: "Facebook e Instagram Ads", text: "Experiência criada para transformar atenção em ação." },
  { icon: ClipboardCheck, title: "Captação de leads", text: "Formulários e CTAs posicionados para facilitar a solicitação." },
  { icon: BadgeCheck, title: "Venda de serviços", text: "Argumentos claros para explicar valor, confiança e próximo passo." },
  { icon: Rocket, title: "Lançamentos e produtos", text: "Estrutura focada em oferta, benefícios, prova e decisão." },
  { icon: Send, title: "Solicitação de orçamento", text: "Fluxo direto para WhatsApp ou formulário, conforme a estratégia." },
]

const ESSENTIALS: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Target, title: "Proposta clara", text: "O visitante precisa entender rápido o que está sendo oferecido." },
  { icon: FileText, title: "Texto estratégico", text: "A copy conversa com a dor, necessidade e contexto do cliente." },
  { icon: MousePointerClick, title: "CTA forte", text: "Cada chamada para ação precisa indicar o próximo passo." },
  { icon: ShieldCheck, title: "Confiança", text: "Prova social, benefícios e acabamento visual reduzem insegurança." },
  { icon: MessageCircle, title: "Contato simples", text: "WhatsApp e formulário devem ser fáceis de encontrar e usar." },
  { icon: Gauge, title: "Performance", text: "Carregamento rápido e experiência mobile ajudam tráfego pago e SEO." },
]

const FLOW = ["Hero", "Problema", "Solução", "Benefícios", "Prova social", "Oferta", "CTA", "FAQ"] as const

const PROCESS = [
  {
    number: "01",
    title: "Entendemos a oferta",
    text: "Analisamos serviço, produto, público, campanha e objetivo.",
  },
  {
    number: "02",
    title: "Estruturamos a página",
    text: "Organizamos argumentos, seções, CTAs e jornada de conversão.",
  },
  {
    number: "03",
    title: "Design e desenvolvimento",
    text: "Criamos uma experiência profissional, responsiva e rápida.",
  },
  {
    number: "04",
    title: "Publicação e rastreamento",
    text: "Publicamos a página e, quando fizer parte do projeto, configuramos o rastreamento das principais ações.",
  },
] as const

const DIFFERENTIALS = [
  "Design personalizado",
  "Desenvolvimento responsivo",
  "Foco em conversão",
  "Performance",
  "Estrutura para SEO quando aplicável",
  "Integração com WhatsApp",
  "Formulários",
  "Estrutura para tracking",
  "Compatibilidade com campanhas de tráfego",
] as const

const QUALIFICATION = [
  "Receber contatos pelo WhatsApp",
  "Captar leads através de formulário",
  "Vender um produto ou serviço",
  "Usar em campanhas de Google ou Meta Ads",
] as const

const FAQ_ITEMS = [
  {
    question: "O que é uma landing page?",
    answer:
      "É uma página criada para uma ação específica, como solicitar orçamento, preencher um formulário, chamar no WhatsApp ou comprar. Ela reduz distrações e organiza a mensagem para conversão.",
  },
  {
    question: "Qual a diferença entre landing page e site?",
    answer:
      "O site apresenta a empresa de forma ampla, com várias páginas e caminhos. A landing page é focada em uma oferta, campanha ou objetivo específico.",
  },
  {
    question: "Posso usar a landing page no Google Ads?",
    answer:
      "Sim. A landing page pode ser estruturada para receber campanhas de Google Ads, mantendo coerência entre busca, anúncio, oferta e conversão.",
  },
  {
    question: "A landing page funciona no celular?",
    answer:
      "Sim. A experiência mobile é parte central do projeto, porque grande parte dos cliques de campanhas vem do celular.",
  },
  {
    question: "É possível integrar com WhatsApp?",
    answer:
      "Sim. Podemos incluir botões, chamadas e mensagens direcionadas para WhatsApp conforme a estratégia da página.",
  },
  {
    question: "Vocês configuram o rastreamento das conversões?",
    answer:
      "Quando fizer parte do escopo, podem ser configurados GTM, GA4, Meta Pixel e eventos importantes, como cliques no WhatsApp e ações em formulários.",
  },
] as const

function scrollToId(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[calc(100vw-3rem)] overflow-hidden sm:max-w-[520px]">
      <div className="absolute inset-x-8 top-6 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />

      <div className="relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#07111f]/85 p-3 shadow-2xl shadow-black/45 backdrop-blur-xl sm:p-4">
        <div className="mb-4 flex items-center justify-between border-b border-white/8 pb-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <div className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-medium text-cyan-200">
            campanha ativa
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-[1fr_0.82fr]">
          <div className="space-y-3">
            <div className="rounded-2xl border border-white/8 bg-white/[0.045] p-4">
              <div className="mb-3 h-2 w-24 rounded-full bg-cyan-300/60" />
              <div className="space-y-2">
                <div className="h-3 w-full rounded-full bg-white/18" />
                <div className="h-3 w-10/12 rounded-full bg-white/12" />
                <div className="h-3 w-7/12 rounded-full bg-white/8" />
              </div>
              <button
                type="button"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-blue-500/20"
              >
                Solicitar proposta
                <ArrowRight className="h-3 w-3" aria-hidden />
              </button>
            </div>

            <div className="grid min-w-0 grid-cols-3 gap-2">
              {["Oferta", "Prova", "CTA"].map((item) => (
                <div key={item} className="min-w-0 rounded-xl border border-white/8 bg-white/[0.035] px-2 py-3 text-center text-[11px] text-gray-400 sm:px-3">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/8 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[11px] text-emerald-200">Conversões</span>
                <TrendingUp className="h-4 w-4 text-emerald-300" aria-hidden />
              </div>
              <div className="text-3xl font-black text-white">+38%</div>
              <div className="mt-2 h-1.5 rounded-full bg-white/10">
                <div className="h-full w-9/12 rounded-full bg-emerald-300" />
              </div>
            </div>

            <div className="rounded-2xl border border-blue-400/18 bg-blue-400/8 p-4">
              <div className="mb-3 text-[11px] text-blue-200">Jornada</div>
              <div className="space-y-2">
                {["Anúncio", "Página", "Lead"].map((item, index) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-gray-300">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/8 text-[10px] text-cyan-200">
                      {index + 1}
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Breadcrumbs() {
  return (
    <div className="relative bg-[#030712] pt-20">
      <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center gap-1.5 text-xs text-gray-500">
          <li>
            <Link href="/" className="transition-colors hover:text-gray-300">
              Início
            </Link>
          </li>
          <li aria-hidden className="text-gray-700">/</li>
          <li className="text-gray-400" aria-current="page">
            Landing Pages
          </li>
        </ol>
      </nav>
    </div>
  )
}

function HeroSection() {
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
    <section id="inicio" className="relative overflow-hidden bg-[#030712]">
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-50" />
      <div className="absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-blue-600/12 via-cyan-500/5 to-transparent" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 overflow-hidden px-4 pb-16 pt-8 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:pb-24 lg:pt-14">
        <div className="min-w-0 text-center lg:text-left">
          <motion.div {...anim(0)} className="mb-5 flex justify-center lg:justify-start">
            <span className="inline-flex max-w-[19rem] items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-400 sm:max-w-none sm:text-sm sm:tracking-[0.15em]">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" aria-hidden />
              Landing Pages de Alta Conversão
            </span>
          </motion.div>

          <motion.h1
            {...anim(0.08)}
            className="mx-auto max-w-[18.5rem] text-[1.72rem] font-black leading-[1.12] tracking-tighter text-white sm:max-w-none sm:text-[3rem] sm:leading-[1.08] lg:mx-0 lg:text-[3.65rem]"
          >
            <span className="block sm:inline">Landing pages </span>
            <span className="block sm:inline">criadas para </span>
            <span className="block sm:inline">transformar </span>
            <span className="block sm:inline">cliques em </span>
            <span className="gradient-text-brand">oportunidades</span>
          </motion.h1>

          <motion.p
            {...anim(0.16)}
            className="mx-auto mt-5 max-w-[21rem] text-[1rem] leading-[1.7] text-gray-400 sm:max-w-[590px] sm:text-[1.04rem] lg:mx-0"
          >
            Desenvolvemos landing pages rápidas, estratégicas e profissionais para empresas que querem gerar mais
            contatos, leads e vendas através do Google Ads, Facebook e Instagram.
          </motion.p>

          <motion.div
            {...anim(0.24)}
            className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start"
          >
            <a
              href="#orcamento"
              onClick={(e) => {
                e.preventDefault()
                scrollToId("#orcamento")
              }}
              className="group inline-flex w-full max-w-[calc(100vw-2rem)] items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 text-[0.95rem] font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5 hover:from-blue-500 hover:to-cyan-400 hover:shadow-blue-500/40 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712] sm:w-auto sm:px-7"
            >
              Quero minha landing page
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </a>
            <a
              href="#como-funciona"
              onClick={(e) => {
                e.preventDefault()
                scrollToId("#como-funciona")
              }}
              className="group inline-flex w-full max-w-[calc(100vw-2rem)] items-center justify-center gap-2.5 rounded-full border border-white/22 bg-white/[0.05] px-6 py-4 text-[0.95rem] font-semibold text-white/80 transition-all hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/[0.09] hover:text-white focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712] sm:w-auto sm:px-7"
            >
              Entender como funciona
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={prefersReduced ? undefined : { opacity: 0, y: 18, scale: 0.98 }}
          animate={prefersReduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.16, ease: EASE }}
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  )
}

function ProblemSection() {
  return (
    <section className="relative overflow-hidden bg-[#030712] py-20 lg:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/7 to-transparent" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <motion.div {...SECTION_ANIM} viewport={VIEWPORT}>
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-400/8 px-4 py-1.5 text-sm font-medium text-red-200">
            <MousePointerClick className="h-4 w-4" aria-hidden />
            Tráfego sem conversão custa caro
          </span>
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Você pode estar pagando por cliques que não viram clientes
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-gray-400">
            Investir em tráfego no Google ou na Meta só faz sentido quando a página recebe o visitante com clareza,
            confiança e um caminho objetivo para contato ou compra.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid gap-3"
        >
          {PROBLEMS.map((problem) => (
            <motion.div key={problem} variants={fadeUp} className="flex gap-3 rounded-2xl border border-white/8 bg-white/[0.035] p-4">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan-300" aria-hidden />
              <p className="text-sm leading-relaxed text-gray-400">{problem}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function CompareSection() {
  return (
    <section className="relative overflow-hidden bg-[#030712] py-20 lg:py-28">
      <div className="absolute inset-0 bg-dots opacity-25" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...SECTION_ANIM} viewport={VIEWPORT} className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Qual a diferença entre um site e uma landing page?
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-gray-400">
            As duas soluções são importantes. A escolha depende do objetivo da sua empresa naquele momento.
          </p>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-2">
          <motion.article {...SECTION_ANIM} viewport={VIEWPORT} className="rounded-3xl border border-white/8 bg-white/[0.035] p-7">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-300/18 bg-blue-400/10">
              <Layers3 className="h-6 w-6 text-blue-200" aria-hidden />
            </div>
            <h3 className="text-2xl font-bold text-white">Site</h3>
            <p className="mt-4 leading-relaxed text-gray-400">
              Apresenta a empresa, serviços, informações institucionais e diversas possibilidades de navegação.
            </p>
            <Link
              href="/criacao-de-sites"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition-colors hover:text-cyan-200"
            >
              Precisa de um site completo? Conheça nosso serviço de criação de sites.
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </motion.article>

          <motion.article {...SECTION_ANIM} viewport={VIEWPORT} className="rounded-3xl border border-cyan-300/18 bg-cyan-400/[0.055] p-7">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10">
              <Goal className="h-6 w-6 text-cyan-200" aria-hidden />
            </div>
            <h3 className="text-2xl font-bold text-white">Landing page</h3>
            <p className="mt-4 leading-relaxed text-gray-400">
              É criada com um objetivo específico, conduzindo o visitante para uma ação como solicitar orçamento,
              preencher um formulário, chamar no WhatsApp ou comprar.
            </p>
          </motion.article>
        </div>
      </div>
    </section>
  )
}

function UseCasesSection() {
  return (
    <section className="relative overflow-hidden bg-[#030712] py-20 lg:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/18 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...SECTION_ANIM} viewport={VIEWPORT} className="mb-12 max-w-2xl">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Para que criamos landing pages
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-gray-400">
            Cada página nasce com uma finalidade comercial clara, seja para anúncio, oferta, lead ou orçamento.
          </p>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={VIEWPORT} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.map((item) => (
            <motion.article key={item.title} variants={fadeUp} className="glass glass-hover rounded-2xl border border-white/8 p-5">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500">
                <item.icon className="h-5 w-5 text-white" aria-hidden />
              </div>
              <h3 className="text-base font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">{item.text}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function EssentialsSection() {
  return (
    <section className="relative overflow-hidden bg-[#030712] py-20 lg:py-28">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...SECTION_ANIM} viewport={VIEWPORT} className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Cada elemento precisa ter um objetivo
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-gray-400">
            Uma página de alta conversão combina mensagem, experiência, confiança e ação em uma sequência simples de seguir.
          </p>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={VIEWPORT} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {ESSENTIALS.map((item) => (
            <motion.article key={item.title} variants={fadeUp} className="rounded-2xl border border-white/8 bg-[#07111f]/80 p-5">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/15 bg-cyan-400/8">
                  <item.icon className="h-5 w-5 text-cyan-200" aria-hidden />
                </span>
                <h3 className="text-base font-semibold text-white">{item.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-gray-500">{item.text}</p>
            </motion.article>
          ))}
        </motion.div>

        <div className="mt-8 grid gap-3 rounded-3xl border border-white/8 bg-white/[0.03] p-4 sm:grid-cols-2 lg:grid-cols-4">
          {["Formulário estratégico", "WhatsApp", "Mobile bem resolvido", "Rastreamento de conversões"].map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PaidTrafficSection() {
  return (
    <section className="relative overflow-hidden bg-[#030712] py-20 lg:py-28">
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <motion.div {...SECTION_ANIM} viewport={VIEWPORT}>
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/8 px-4 py-1.5 text-sm font-medium text-blue-300">
            <BarChart3 className="h-4 w-4" aria-hidden />
            Tráfego pago
          </span>
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Preparada para Google Ads, Facebook e Instagram
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-gray-400">
            Uma landing page para tráfego pago precisa manter coerência entre anúncio, oferta, página e conversão.
            Recursos como GTM, GA4, Meta Pixel, eventos de conversão, WhatsApp e formulários podem ser configurados
            conforme o escopo do projeto.
          </p>
        </motion.div>

        <motion.div {...SECTION_ANIM} viewport={VIEWPORT} className="rounded-3xl border border-white/8 bg-white/[0.035] p-6">
          <div className="grid gap-3">
            {["Anúncio", "Oferta", "Página", "Conversão"].map((step, index) => (
              <div key={step} className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-sm font-black text-white">
                  {index + 1}
                </div>
                <div className="min-w-0 flex-1 rounded-2xl border border-white/8 bg-[#030712]/50 px-4 py-3">
                  <div className="text-sm font-semibold text-white">{step}</div>
                  <div className="mt-1 h-1.5 rounded-full bg-white/8">
                    <div className="h-full rounded-full bg-cyan-300" style={{ width: `${92 - index * 12}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function FlowSection() {
  return (
    <section className="relative overflow-hidden bg-[#030712] py-20 lg:py-28">
      <div className="absolute inset-0 bg-dots opacity-25" />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div {...SECTION_ANIM} viewport={VIEWPORT} className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Uma página construída para conduzir o visitante
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-gray-400">
            A estrutura guia a atenção, resolve objeções e aproxima o visitante da decisão.
          </p>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={VIEWPORT} className="relative">
          <div className="absolute left-5 top-5 hidden h-[calc(100%-2.5rem)] w-px bg-gradient-to-b from-cyan-300/60 via-blue-400/25 to-transparent sm:block" />
          <div className="grid gap-3">
            {FLOW.map((item, index) => (
              <motion.div key={item} variants={fadeUp} className="relative flex items-center gap-4 rounded-2xl border border-white/8 bg-[#07111f]/88 p-4">
                <span className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-300/25 bg-[#030712] text-xs font-bold text-cyan-200">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-base font-semibold text-white">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ProjectsSection() {
  const projects = portfolioProjects.slice(0, 4)

  return (
    <section id="portfolio" className="relative overflow-hidden bg-[#030712] py-20 lg:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/7 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...SECTION_ANIM} viewport={VIEWPORT} className="mx-auto mb-12 max-w-3xl text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/8 px-4 py-1.5 text-sm font-medium text-cyan-300">
            <Sparkles className="h-4 w-4" aria-hidden />
            Projetos SpaceFast
          </span>
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Design que transmite confiança
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-gray-400">
            Projetos reais usados como referência de qualidade em design, responsividade, experiência, acabamento e desenvolvimento.
          </p>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={VIEWPORT} className="grid gap-5 sm:grid-cols-2">
          {projects.map((project) => (
            <motion.article key={project.name} variants={fadeUp} className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0b1222] shadow-xl shadow-black/25">
              <div className="relative aspect-[16/9] bg-[#07111f]">
                <Image
                  src={project.image}
                  alt={`Preview do projeto ${project.name}, desenvolvido pela SpaceFast`}
                  fill
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 560px"
                  className="object-contain p-2"
                />
              </div>
              <div className="p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-600">{project.category}</p>
                <h3 className="mt-2 text-xl font-bold text-white">{project.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{project.description}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <div className="mt-10 text-center">
          <a
            href="#orcamento"
            onClick={(e) => {
              e.preventDefault()
              scrollToId("#orcamento")
            }}
            className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-4 text-[0.95rem] font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5 hover:from-blue-500 hover:to-cyan-400 hover:shadow-blue-500/40 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
          >
            Quero uma página assim para minha empresa
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  )
}

function ProcessSection() {
  return (
    <section id="como-funciona" className="relative overflow-hidden bg-[#030712] py-20 lg:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...SECTION_ANIM} viewport={VIEWPORT} className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Como criamos sua landing page
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-gray-400">
            Processo direto para transformar uma oferta em uma página profissional pronta para receber tráfego.
          </p>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={VIEWPORT} className="grid gap-4 lg:grid-cols-4">
          {PROCESS.map((step) => (
            <motion.article key={step.number} variants={fadeUp} className="rounded-2xl border border-white/8 bg-white/[0.035] p-5">
              <div className="mb-5 text-3xl font-black text-cyan-300">{step.number}</div>
              <h3 className="text-base font-semibold text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">{step.text}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function DifferentialsSection() {
  return (
    <section className="relative overflow-hidden bg-[#030712] py-20 lg:py-28">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...SECTION_ANIM} viewport={VIEWPORT} className="mb-12 max-w-3xl">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Landing page não é apenas uma página bonita
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-gray-400">
            O design precisa sustentar uma mensagem clara, carregar bem, funcionar no celular e estar preparado para campanhas.
          </p>
        </motion.div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {DIFFERENTIALS.map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.035] p-4 text-sm text-gray-300">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function QualificationSection({
  selectedGoal,
  onSelect,
}: {
  selectedGoal: string
  onSelect: (goal: string) => void
}) {
  return (
    <section className="relative overflow-hidden bg-[#030712] py-20 lg:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...SECTION_ANIM} viewport={VIEWPORT} className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Qual é o objetivo da sua landing page?
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-gray-400">
            Selecione uma direção inicial e continue pelo formulário. Essa escolha entra na mensagem enviada ao WhatsApp.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {QUALIFICATION.map((goal) => {
            const selected = selectedGoal === goal
            return (
              <button
                type="button"
                key={goal}
                onClick={() => {
                  onSelect(goal)
                  window.setTimeout(() => scrollToId("#orcamento"), 80)
                }}
                className={`min-h-32 rounded-2xl border p-5 text-left transition-all focus-visible:ring-2 focus-visible:ring-blue-400 ${
                  selected
                    ? "border-cyan-300/40 bg-cyan-400/10 shadow-lg shadow-cyan-500/10"
                    : "border-white/8 bg-white/[0.035] hover:border-white/16 hover:bg-white/[0.055]"
                }`}
              >
                <Target className={`mb-4 h-5 w-5 ${selected ? "text-cyan-200" : "text-gray-500"}`} aria-hidden />
                <span className="text-sm font-semibold leading-snug text-white">{goal}</span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="relative overflow-hidden bg-[#030712] py-20 lg:py-28">
      <div className="absolute inset-0 bg-dots opacity-25" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...SECTION_ANIM} viewport={VIEWPORT} className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Perguntas sobre criação de landing pages
          </h2>
        </motion.div>

        <div className="mx-auto max-w-3xl space-y-2.5">
          {FAQ_ITEMS.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div key={faq.question} className="rounded-2xl border border-white/8 bg-white/[0.035]">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 rounded-2xl px-6 py-5 text-left focus-visible:ring-2 focus-visible:ring-blue-400"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold leading-snug text-white">{faq.question}</span>
                  <ChevronDown className={`h-4 w-4 shrink-0 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.24, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm leading-[1.75] text-gray-400">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function FinalCtaSection() {
  return (
    <section id="contato" className="relative overflow-hidden bg-[#030712] py-24 lg:py-36">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/7 to-transparent" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div {...SECTION_ANIM} viewport={VIEWPORT} className="rounded-3xl border border-white/8 bg-white/[0.04] px-6 py-12 shadow-2xl shadow-blue-500/5 sm:px-12">
          <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-500/28 bg-blue-500/8 px-4 py-1.5 text-sm font-medium text-blue-300">
            <PanelTop className="h-4 w-4" aria-hidden />
            Página pronta para campanha
          </span>
          <h2 className="text-4xl font-black leading-[1.1] tracking-tighter text-white sm:text-5xl lg:text-6xl">
            Seu anúncio merece uma página preparada para converter
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[1.1rem] leading-relaxed text-gray-400">
            Transforme o próximo clique da sua campanha em uma oportunidade real para sua empresa.
          </p>
          <a
            href="#orcamento"
            onClick={(e) => {
              e.preventDefault()
              scrollToId("#orcamento")
            }}
            className="group mt-9 inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 text-base font-semibold text-white shadow-2xl shadow-blue-500/30 transition-all hover:-translate-y-0.5 hover:from-blue-500 hover:to-cyan-400 hover:shadow-blue-500/50 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
          >
            Quero criar minha landing page
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default function LandingPagesPage() {
  const [selectedGoal, setSelectedGoal] = useState("")

  return (
    <>
      <Header />
      <main>
        <Breadcrumbs />
        <HeroSection />
        <ProblemSection />
        <CompareSection />
        <UseCasesSection />
        <EssentialsSection />
        <PaidTrafficSection />
        <FlowSection />
        <ProjectsSection />
        <ProcessSection />
        <DifferentialsSection />
        <QualificationSection selectedGoal={selectedGoal} onSelect={setSelectedGoal} />
        <OrcamentoForm
          title="Vamos criar sua landing page?"
          subtitle="Preencha os dados para abrir uma mensagem no WhatsApp com as informações do seu projeto."
          defaultInterest="landing_page"
          projectGoal={selectedGoal}
        />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
