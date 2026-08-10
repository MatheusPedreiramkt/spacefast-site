"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import {
  ArrowDown,
  ArrowRight,
  Bell,
  Blocks,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  ClipboardList,
  FileSpreadsheet,
  Gauge,
  GitBranch,
  KanbanSquare,
  LayoutDashboard,
  Link2,
  LockKeyhole,
  MessageCircle,
  MousePointerClick,
  Network,
  Repeat2,
  ShieldCheck,
  Sparkles,
  TableProperties,
  UsersRound,
  Workflow,
  type LucideIcon,
} from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import OrcamentoForm from "@/components/OrcamentoForm"
import WhatsAppButton from "@/components/WhatsAppButton"
import { SECTION_ANIM, VIEWPORT, EASE, fadeUp, stagger } from "@/lib/motion"

const PAINS = [
  "Várias planilhas para controlar partes diferentes da operação.",
  "Informações importantes perdidas em conversas de WhatsApp.",
  "Tarefas repetitivas consumindo tempo da equipe.",
  "Dificuldade para acompanhar clientes, etapas e responsáveis.",
  "Retrabalho porque cada pessoa usa uma ferramenta diferente.",
  "Falta de visão clara sobre o que está acontecendo no negócio.",
  "Sistemas prontos que não acompanham o processo real da empresa.",
] as const

const POSSIBILITIES: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: UsersRound,
    title: "CRM personalizado",
    text: "Controle de clientes, oportunidades, histórico e follow-ups.",
  },
  {
    icon: ClipboardList,
    title: "Gestão de orçamentos",
    text: "Criação, aprovação, acompanhamento e histórico de propostas.",
  },
  {
    icon: LayoutDashboard,
    title: "Painéis e dashboards",
    text: "Indicadores e informações importantes centralizadas.",
  },
  {
    icon: CircleDollarSign,
    title: "Controle financeiro/operacional",
    text: "Processos internos adaptados à necessidade da empresa.",
  },
  {
    icon: LockKeyhole,
    title: "Portais para clientes",
    text: "Área individual para acompanhamento de informações e serviços.",
  },
  {
    icon: KanbanSquare,
    title: "Gestão de tarefas e processos",
    text: "Status, responsáveis, etapas e acompanhamento.",
  },
  {
    icon: Repeat2,
    title: "Automação de processos",
    text: "Redução de tarefas repetitivas e movimentação automática de informações.",
  },
  {
    icon: Link2,
    title: "Integrações",
    text: "Conexão entre ferramentas e serviços quando tecnicamente possível.",
  },
]

const BEFORE = ["Planilhas", "WhatsApp", "Anotações", "Informações duplicadas", "Processos manuais", "Dificuldade para acompanhar"]
const AFTER = ["Sistema centralizado", "Histórico organizado", "Etapas definidas", "Dados acessíveis", "Automação", "Indicadores"]

const FLOW = ["Novo contato", "Cliente cadastrado", "Orçamento", "Follow-up", "Aprovação", "Execução", "Financeiro", "Indicadores"] as const

const AUTOMATIONS = [
  "alterar status automaticamente",
  "gerar registros",
  "enviar notificações",
  "organizar follow-ups",
  "conectar formulários",
  "centralizar informações",
  "gerar relatórios",
  "integrar serviços através de APIs quando possível",
] as const

const INTEGRATIONS: { icon: LucideIcon; label: string }[] = [
  { icon: MessageCircle, label: "WhatsApp" },
  { icon: Bell, label: "E-mail" },
  { icon: ClipboardList, label: "Formulários" },
  { icon: FileSpreadsheet, label: "Google Sheets" },
  { icon: MousePointerClick, label: "Plataformas de anúncios" },
  { icon: CircleDollarSign, label: "Meios de pagamento" },
  { icon: Network, label: "APIs de terceiros" },
  { icon: Blocks, label: "Ferramentas da empresa" },
]

const PROCESS = [
  {
    number: "01",
    title: "Entendemos o processo",
    text: "Mapeamos como a empresa trabalha hoje, onde estão os gargalos e quais informações precisam ser controladas.",
  },
  {
    number: "02",
    title: "Planejamos a solução",
    text: "Definimos usuários, etapas, funcionalidades, permissões e fluxos.",
  },
  {
    number: "03",
    title: "Desenvolvemos por etapas",
    text: "Construímos a solução priorizando as funcionalidades mais importantes.",
  },
  {
    number: "04",
    title: "Testamos e evoluímos",
    text: "Validamos o sistema no uso real e realizamos ajustes previstos no escopo.",
  },
] as const

const FITS = [
  "sua empresa depende demais de planilhas",
  "sua equipe realiza muitas tarefas manuais",
  "informações ficam espalhadas",
  "você precisa acompanhar etapas específicas do negócio",
  "softwares prontos não atendem bem seu processo",
  "você precisa integrar diferentes partes da operação",
  "deseja ter mais controle sobre clientes e processos",
] as const

const QUALIFICATION = [
  "Clientes e vendas",
  "Orçamentos e propostas",
  "Processos internos",
  "Financeiro/operacional",
  "Automação de tarefas",
  "Outro processo",
] as const

const FAQ_ITEMS = [
  {
    question: "O que é um sistema personalizado?",
    answer:
      "É um sistema desenvolvido para atender processos específicos da empresa, como controle de clientes, propostas, tarefas, financeiro, operação ou acompanhamento interno.",
  },
  {
    question: "Qual a diferença entre um sistema pronto e um sistema sob medida?",
    answer:
      "Um sistema pronto já nasce com regras definidas para muitos negócios. Um sistema sob medida é planejado em torno do processo real da sua empresa, quando há necessidades específicas.",
  },
  {
    question: "Que tipos de sistemas vocês desenvolvem?",
    answer:
      "Podemos desenvolver CRMs personalizados, controles de orçamentos, dashboards, portais para clientes, gestão de tarefas, fluxos operacionais e automações conforme o escopo do projeto.",
  },
  {
    question: "É possível integrar com ferramentas que minha empresa já utiliza?",
    answer:
      "Dependendo do projeto e das APIs disponíveis, podemos integrar com WhatsApp, e-mail, formulários, Google Sheets, meios de pagamento e outras ferramentas usadas pela empresa.",
  },
  {
    question: "O sistema funciona pelo celular?",
    answer:
      "Sim. O sistema pode ser desenvolvido com experiência responsiva para uso no celular, tablet e computador, conforme a necessidade dos usuários.",
  },
  {
    question: "Como é definido o valor de um sistema personalizado?",
    answer:
      "O valor depende das funcionalidades, quantidade de usuários, permissões, integrações, complexidade dos fluxos e nível de evolução previsto para o projeto.",
  },
] as const

function scrollToId(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

function HeroSystemVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[calc(100vw-3rem)] overflow-hidden sm:max-w-[560px]">
      <div className="absolute left-1/2 top-8 h-44 w-44 -translate-x-1/2 rounded-full border border-cyan-300/12" />
      <div className="relative rounded-[1.4rem] border border-white/10 bg-[#07111f]/88 p-3 shadow-2xl shadow-black/45 backdrop-blur-xl sm:p-4">
        <div className="mb-4 flex items-center justify-between border-b border-white/8 pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-cyan-300/18 bg-cyan-400/10">
              <Workflow className="h-4 w-4 text-cyan-200" aria-hidden />
            </span>
            <div>
              <div className="text-xs font-semibold text-white">Operação centralizada</div>
              <div className="text-[10px] text-gray-600">Clientes, etapas e indicadores</div>
            </div>
          </div>
          <div className="rounded-full border border-emerald-400/20 bg-emerald-400/8 px-3 py-1 text-[10px] font-medium text-emerald-200">
            online
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-3">
            {[
              { label: "Novos leads", value: "24", icon: UsersRound },
              { label: "Propostas", value: "11", icon: ClipboardList },
              { label: "Pendências", value: "03", icon: Bell },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/8 bg-white/[0.035] p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[11px] text-gray-500">{item.label}</span>
                  <item.icon className="h-3.5 w-3.5 text-cyan-300" aria-hidden />
                </div>
                <div className="text-2xl font-black text-white">{item.value}</div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-cyan-300/14 bg-cyan-400/[0.045] p-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-cyan-200">Fluxo</span>
              <Gauge className="h-4 w-4 text-cyan-200" aria-hidden />
            </div>
            <div className="space-y-2.5">
              {[
                ["Contato recebido", "100%"],
                ["Orçamento enviado", "72%"],
                ["Follow-up programado", "48%"],
                ["Execução iniciada", "31%"],
              ].map(([label, width]) => (
                <div key={label} className="rounded-xl border border-white/8 bg-[#030712]/45 p-3">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="min-w-0 text-xs text-gray-300">{label}</span>
                    <span className="text-[10px] text-gray-600">status</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/8">
                    <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-300" style={{ width }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          {["Vendas", "Operação", "Financeiro"].map((item, index) => (
            <div key={item} className="relative rounded-xl border border-white/8 bg-white/[0.03] px-2 py-3 text-center text-[10px] text-gray-500">
              <span className="mb-1 block text-xs font-semibold text-gray-300">{String(index + 1).padStart(2, "0")}</span>
              {item}
            </div>
          ))}
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
            Sistemas Personalizados
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
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-45" />
      <div className="absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-cyan-600/10 via-blue-500/5 to-transparent" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 overflow-hidden px-4 pb-16 pt-8 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8 lg:pb-24 lg:pt-14">
        <div className="min-w-0 text-center lg:text-left">
          <motion.div {...anim(0)} className="mb-5 flex justify-center lg:justify-start">
            <span className="inline-flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan-300 sm:text-sm sm:tracking-[0.15em]">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" aria-hidden />
              Sistemas Personalizados
            </span>
          </motion.div>

          <motion.h1
            {...anim(0.08)}
            className="mx-auto max-w-[18rem] text-[1.62rem] font-black leading-[1.12] tracking-tighter text-white sm:max-w-none sm:text-[3rem] sm:leading-[1.08] lg:mx-0 lg:text-[3.6rem]"
          >
            <span className="block sm:inline">Um sistema </span>
            <span className="block sm:inline">desenvolvido para </span>
            <span className="block sm:inline">a forma como </span>
            <span className="block sm:inline">sua empresa </span>
            <span className="block sm:inline">realmente </span>
            <span className="gradient-text-brand">trabalha</span>
          </motion.h1>

          <motion.p
            {...anim(0.16)}
            className="mx-auto mt-5 max-w-[20rem] text-[0.98rem] leading-[1.7] text-gray-400 sm:max-w-[620px] sm:text-[1.04rem] lg:mx-0"
          >
            Criamos sistemas personalizados para organizar processos, centralizar informações, automatizar tarefas
            e substituir controles que hoje dependem de planilhas, mensagens e trabalho manual.
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
              className="group inline-flex w-full max-w-[calc(100vw-3rem)] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-4 text-[0.9rem] font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5 hover:from-blue-500 hover:to-cyan-400 hover:shadow-blue-500/40 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712] sm:w-auto sm:px-7 sm:text-[0.95rem]"
            >
              Quero entender minha solução
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </a>
            <a
              href="#possibilidades"
              onClick={(e) => {
                e.preventDefault()
                scrollToId("#possibilidades")
              }}
              className="group inline-flex w-full max-w-[calc(100vw-3rem)] items-center justify-center gap-2 rounded-full border border-white/22 bg-white/[0.05] px-5 py-4 text-[0.9rem] font-semibold text-white/80 transition-all hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/[0.09] hover:text-white focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712] sm:w-auto sm:px-7 sm:text-[0.95rem]"
            >
              Ver possibilidades
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={prefersReduced ? undefined : { opacity: 0, y: 18, scale: 0.98 }}
          animate={prefersReduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.16, ease: EASE }}
        >
          <HeroSystemVisual />
        </motion.div>
      </div>
    </section>
  )
}

function PainSection() {
  return (
    <section className="relative overflow-hidden bg-[#030712] py-20 lg:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/7 to-transparent" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
        <motion.div {...SECTION_ANIM} viewport={VIEWPORT}>
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/8 px-4 py-1.5 text-sm font-medium text-amber-200">
            <FileSpreadsheet className="h-4 w-4" aria-hidden />
            Processos manuais
          </span>
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Sua empresa cresceu, mas os processos continuaram manuais?
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-gray-400">
            Quando a operação depende de controles improvisados, a equipe trabalha mais para enxergar menos.
            O problema não é só a planilha, é a falta de um fluxo claro.
          </p>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={VIEWPORT} className="grid gap-3">
          {PAINS.map((pain) => (
            <motion.div key={pain} variants={fadeUp} className="flex gap-3 rounded-2xl border border-white/8 bg-white/[0.035] p-4">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan-300" aria-hidden />
              <p className="text-sm leading-relaxed text-gray-400">{pain}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function CustomSystemSection() {
  return (
    <section className="relative overflow-hidden bg-[#030712] py-20 lg:py-28">
      <div className="absolute inset-0 bg-dots opacity-25" />
      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <motion.div {...SECTION_ANIM} viewport={VIEWPORT} className="rounded-3xl border border-white/8 bg-white/[0.035] p-7 sm:p-9">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/8 px-4 py-1.5 text-sm font-medium text-cyan-300">
            <GitBranch className="h-4 w-4" aria-hidden />
            Sob medida
          </span>
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Em vez de adaptar sua empresa ao sistema, o sistema se adapta à sua empresa
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-gray-400">
            Sistemas prontos resolvem muitos problemas e podem ser a melhor escolha em vários cenários. Mas alguns
            negócios têm etapas, regras e controles próprios. Nesses casos, um sistema personalizado pode ser
            desenvolvido em torno do fluxo real da empresa.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 text-sm">
            <Link href="/criacao-de-sites" className="rounded-full border border-white/10 px-4 py-2 text-gray-400 transition-colors hover:border-cyan-300/25 hover:text-cyan-200">
              Também precisa de um site institucional?
            </Link>
            <Link href="/landing-pages" className="rounded-full border border-white/10 px-4 py-2 text-gray-400 transition-colors hover:border-cyan-300/25 hover:text-cyan-200">
              Vai usar campanhas? Veja landing pages
            </Link>
          </div>
        </motion.div>

        <motion.div {...SECTION_ANIM} viewport={VIEWPORT} className="grid gap-3">
          {[
            ["Processo real", "Mapeado como a equipe trabalha hoje."],
            ["Regras do negócio", "Permissões, etapas e campos definidos conforme a operação."],
            ["Evolução", "A solução pode crescer por fases dentro do escopo planejado."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-2xl border border-white/8 bg-[#07111f]/82 p-5">
              <h3 className="text-base font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">{text}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function PossibilitiesSection() {
  return (
    <section id="possibilidades" className="relative overflow-hidden bg-[#030712] py-20 lg:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/18 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...SECTION_ANIM} viewport={VIEWPORT} className="mb-12 max-w-3xl">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            O que podemos desenvolver
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-gray-400">
            Estes são exemplos de soluções. Cada sistema web personalizado é planejado conforme o processo, prioridade e escopo do projeto.
          </p>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={VIEWPORT} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {POSSIBILITIES.map((item) => (
            <motion.article key={item.title} variants={fadeUp} className="rounded-2xl border border-white/8 bg-white/[0.035] p-5 transition-all hover:border-white/15 hover:bg-white/[0.055]">
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

function BeforeAfterSection() {
  return (
    <section className="relative overflow-hidden bg-[#030712] py-20 lg:py-28">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...SECTION_ANIM} viewport={VIEWPORT} className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Do processo improvisado para uma operação organizada
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-gray-400">
            Uma representação da transformação possível quando informações, etapas e responsabilidades passam a viver em um fluxo único.
          </p>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-2">
          <motion.article {...SECTION_ANIM} viewport={VIEWPORT} className="rounded-3xl border border-red-400/12 bg-red-400/[0.035] p-6">
            <h3 className="mb-5 text-xl font-bold text-white">Antes</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {BEFORE.map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-2xl border border-white/8 bg-[#030712]/45 p-4 text-sm text-gray-400">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-red-300/80" aria-hidden />
                  {item}
                </div>
              ))}
            </div>
          </motion.article>

          <motion.article {...SECTION_ANIM} viewport={VIEWPORT} className="rounded-3xl border border-emerald-400/16 bg-emerald-400/[0.045] p-6">
            <h3 className="mb-5 text-xl font-bold text-white">Depois</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {AFTER.map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-2xl border border-white/8 bg-[#030712]/45 p-4 text-sm text-gray-300">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-300" aria-hidden />
                  {item}
                </div>
              ))}
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  )
}

function FlowSection() {
  return (
    <section className="relative overflow-hidden bg-[#030712] py-20 lg:py-28">
      <div className="absolute inset-0 bg-dots opacity-25" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div {...SECTION_ANIM} viewport={VIEWPORT} className="mx-auto mb-12 max-w-3xl text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/28 bg-blue-500/8 px-4 py-1.5 text-sm font-medium text-blue-300">
            <Network className="h-4 w-4" aria-hidden />
            Exemplo de fluxo
          </span>
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Tudo conectado em um único fluxo
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-gray-400">
            Este é apenas um exemplo. Cada sistema é planejado conforme o negócio, as etapas e as informações que precisam ser acompanhadas.
          </p>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={VIEWPORT} className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {FLOW.map((step, index) => (
            <motion.div key={step} variants={fadeUp} className="relative rounded-2xl border border-white/8 bg-[#07111f]/90 p-4">
              <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/22 bg-cyan-400/8 text-xs font-bold text-cyan-200">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-sm font-semibold text-white">{step}</h3>
              {index < FLOW.length - 1 && (
                <ArrowRight className="absolute right-4 top-7 hidden h-4 w-4 text-cyan-300/35 lg:block" aria-hidden />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function AutomationsSection() {
  return (
    <section className="relative overflow-hidden bg-[#030712] py-20 lg:py-28">
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <motion.div {...SECTION_ANIM} viewport={VIEWPORT}>
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/8 px-4 py-1.5 text-sm font-medium text-cyan-300">
            <Repeat2 className="h-4 w-4" aria-hidden />
            Automações
          </span>
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Menos trabalho repetitivo. Mais controle.
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-gray-400">
            Podemos desenvolver automações para reduzir tarefas manuais, dependendo do projeto, das regras do negócio
            e das integrações disponíveis.
          </p>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={VIEWPORT} className="grid gap-3 sm:grid-cols-2">
          {AUTOMATIONS.map((item) => (
            <motion.div key={item} variants={fadeUp} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.035] p-4 text-sm text-gray-300">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden />
              {item}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function IntegrationsSection() {
  return (
    <section className="relative overflow-hidden bg-[#030712] py-20 lg:py-28">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...SECTION_ANIM} viewport={VIEWPORT} className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Seu sistema não precisa trabalhar sozinho
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-gray-400">
            Dependendo do projeto e das APIs disponíveis, podemos integrar o sistema com ferramentas externas usadas pela empresa.
          </p>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={VIEWPORT} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {INTEGRATIONS.map((item) => (
            <motion.div key={item.label} variants={fadeUp} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.035] p-4 text-sm font-medium text-gray-300">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-cyan-300/15 bg-cyan-400/8">
                <item.icon className="h-4 w-4 text-cyan-200" aria-hidden />
              </span>
              {item.label}
            </motion.div>
          ))}
        </motion.div>
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
            Como desenvolvemos um sistema personalizado
          </h2>
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

function FitSection() {
  return (
    <section className="relative overflow-hidden bg-[#030712] py-20 lg:py-28">
      <div className="absolute inset-0 bg-dots opacity-25" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
        <motion.div {...SECTION_ANIM} viewport={VIEWPORT}>
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/28 bg-blue-500/8 px-4 py-1.5 text-sm font-medium text-blue-300">
            <BriefcaseBusiness className="h-4 w-4" aria-hidden />
            Encaixe do projeto
          </span>
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Quando um sistema personalizado pode fazer sentido?
          </h2>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={VIEWPORT} className="grid gap-3">
          {FITS.map((item) => (
            <motion.div key={item} variants={fadeUp} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.035] p-4 text-sm text-gray-300">
              <ShieldCheck className="h-4 w-4 shrink-0 text-cyan-300" aria-hidden />
              {item}
            </motion.div>
          ))}
        </motion.div>
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
            O que você gostaria de organizar na sua empresa?
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-gray-400">
            Selecione uma prioridade inicial. Essa informação entra na mensagem do WhatsApp junto com seus dados.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                className={`min-h-28 rounded-2xl border p-5 text-left transition-all focus-visible:ring-2 focus-visible:ring-blue-400 ${
                  selected
                    ? "border-cyan-300/40 bg-cyan-400/10 shadow-lg shadow-cyan-500/10"
                    : "border-white/8 bg-white/[0.035] hover:border-white/16 hover:bg-white/[0.055]"
                }`}
              >
                <TableProperties className={`mb-4 h-5 w-5 ${selected ? "text-cyan-200" : "text-gray-500"}`} aria-hidden />
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
            Perguntas sobre sistemas personalizados
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
            <Sparkles className="h-4 w-4" aria-hidden />
            Operação mais organizada
          </span>
          <h2 className="text-4xl font-black leading-[1.1] tracking-tighter text-white sm:text-5xl lg:text-6xl">
            Talvez sua empresa não precise de mais uma planilha
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[1.1rem] leading-relaxed text-gray-400">
            Conte como você controla seus processos hoje. Podemos avaliar se um sistema personalizado pode simplificar sua operação.
          </p>
          <a
            href="#orcamento"
            onClick={(e) => {
              e.preventDefault()
              scrollToId("#orcamento")
            }}
            className="group mt-9 inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 text-base font-semibold text-white shadow-2xl shadow-blue-500/30 transition-all hover:-translate-y-0.5 hover:from-blue-500 hover:to-cyan-400 hover:shadow-blue-500/50 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
          >
            Quero falar sobre meu sistema
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default function SistemasPersonalizadosPage() {
  const [selectedGoal, setSelectedGoal] = useState("")

  return (
    <>
      <Header />
      <main>
        <Breadcrumbs />
        <HeroSection />
        <PainSection />
        <CustomSystemSection />
        <PossibilitiesSection />
        <BeforeAfterSection />
        <FlowSection />
        <AutomationsSection />
        <IntegrationsSection />
        <ProcessSection />
        <FitSection />
        <QualificationSection selectedGoal={selectedGoal} onSelect={setSelectedGoal} />
        <OrcamentoForm
          title="Vamos entender seu sistema?"
          subtitle="Preencha os dados para abrir uma mensagem no WhatsApp com as informações iniciais do seu projeto."
          defaultInterest="sistema_personalizado"
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
