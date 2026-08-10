"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import {
  ArrowRight,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Smartphone,
  PenTool,
  Gauge,
  Search,
  MessageCircle,
  Megaphone,
  BarChart3,
  MousePointerClick,
} from "lucide-react"
import Header from "@/components/Header"
import { HeroVideo } from "@/components/Hero"
import Portfolio from "@/components/Portfolio"
import Process from "@/components/Process"
import OrcamentoForm from "@/components/OrcamentoForm"
import Footer from "@/components/Footer"
import WhatsAppButton from "@/components/WhatsAppButton"
import { WhatsAppSVG } from "@/components/ui/WhatsAppSVG"
import { WHATSAPP_URL, WHATSAPP_MESSAGE_TEXT, WHATSAPP_NUMBER } from "@/lib/constants"
import { stagger, fadeUp, VIEWPORT, EASE, SECTION_ANIM } from "@/lib/motion"
import { trackCriacaoSitesView } from "@/lib/analytics"
import { openWhatsAppWithTracking } from "@/lib/cqc"

// ─── Section 1: Hero ──────────────────────────────────────────────────────────

const HERO_BENEFITS = [
  "Site responsivo para celular",
  "Integração com WhatsApp",
  "Design profissional",
  "Orçamento sem compromisso",
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
      aria-label="Criação de Sites Profissionais a partir de R$500"
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-10 pb-6 sm:pb-14 lg:py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-10 items-center">

          {/* Left: Text */}
          <div className="space-y-3 sm:space-y-5 lg:space-y-6 text-center lg:text-left">

            {/* Identification */}
            <motion.div {...anim(0)} className="flex justify-center lg:justify-start">
              <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-[0.15em] text-blue-400 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" aria-hidden />
                Criação de Sites Profissionais
              </span>
            </motion.div>

            {/* H1 — headline com a keyword principal + preço acima da dobra */}
            <motion.div {...anim(0.1)}>
              <h1 className="text-[1.85rem] sm:text-[2.75rem] lg:text-[3.2rem] xl:text-[3.6rem] font-black leading-[1.08] sm:leading-[1.12] tracking-tighter">
                <span className="text-white">Criação de Sites Profissionais</span>
                <br />
                <span className="gradient-text-brand">a partir de R$500</span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              {...anim(0.18)}
              className="text-[0.95rem] sm:text-[1.05rem] text-gray-400 leading-[1.5] sm:leading-[1.7] max-w-[480px] mx-auto lg:mx-0"
            >
              Tenha um site moderno, responsivo e integrado ao WhatsApp para apresentar sua
              empresa e conquistar novos clientes.
            </motion.p>

            {/* Benefits checklist */}
            <motion.ul
              {...anim(0.26)}
              className="flex flex-col sm:grid sm:grid-cols-2 gap-x-5 gap-y-1.5 sm:gap-y-2.5 max-w-[480px] mx-auto lg:mx-0"
            >
              {HERO_BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2 justify-center lg:justify-start">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden />
                  <span className="text-gray-300 text-sm">{benefit}</span>
                </li>
              ))}
            </motion.ul>

            {/* CTAs */}
            <motion.div
              {...anim(0.34)}
              className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center justify-center lg:justify-start pt-1"
            >
              <a
                href="#orcamento"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector("#orcamento")?.scrollIntoView({ behavior: "smooth", block: "start" })
                }}
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-[0.95rem] tracking-wide hover:from-blue-500 hover:to-cyan-400 transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
              >
                RECEBER ORÇAMENTO
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200 shrink-0" />
              </a>

              <a
                href="#portfolio"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" })
                }}
                className="group inline-flex items-center justify-center gap-2 sm:gap-2.5 px-5 py-2.5 sm:px-7 sm:py-4 rounded-full border border-white/12 sm:border-white/22 bg-transparent sm:bg-white/[0.05] backdrop-blur-sm text-white/60 sm:text-white/80 font-medium sm:font-semibold text-[0.85rem] sm:text-[0.95rem] hover:bg-white/[0.09] hover:border-white/35 hover:text-white transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
              >
                Ver projetos
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200 shrink-0" />
              </a>
            </motion.div>
          </div>

          {/* Right: Visual */}
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

      <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#030712] to-transparent pointer-events-none" />
    </section>
  )
}

// ─── Section: Diferenciais ────────────────────────────────────────────────────

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

// ─── Section: FAQ ───────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    question: "Quanto custa um site?",
    answer:
      "Nossos projetos de criação de site começam a partir de R$500, com o valor final definido conforme as funcionalidades e o escopo do seu projeto. Solicite um orçamento gratuito e sem compromisso pelo formulário desta página.",
  },
  {
    question: "Em quanto tempo o site fica pronto?",
    answer:
      "O prazo varia conforme a complexidade do projeto. Assim que enviamos o orçamento, você já recebe um cronograma claro, para saber exatamente quando o site ficará pronto.",
  },
  {
    question: "O site funciona no celular?",
    answer:
      "Sim. Todos os sites são 100% responsivos e desenvolvidos com abordagem mobile-first, garantindo uma boa experiência em celular, tablet e computador.",
  },
  {
    question: "O site terá botão para WhatsApp?",
    answer:
      "Sim. Todo site sai com botão de WhatsApp integrado e CTAs estratégicos posicionados ao longo da página, para transformar visitantes em conversas reais com sua empresa.",
  },
  {
    question: "Preciso já possuir domínio?",
    answer:
      "Não. Se você ainda não tem domínio nem hospedagem, nós te orientamos e ajudamos a providenciar tudo durante o processo de criação do site.",
  },
  {
    question: "Posso solicitar alterações?",
    answer:
      "Sim. Depois que o site é entregue, você recebe orientações para atualizar textos e informações, além de contar com suporte direto para ajustes.",
  },
  {
    question: "Vocês atendem empresas de todo o Brasil?",
    answer:
      "Sim. Atendemos empresas de todo o Brasil — todo o processo de criação de site é feito remotamente, do orçamento até a entrega.",
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

// ─── Section: CTA Final ─────────────────────────────────────────────────────

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
              Solicite um orçamento gratuito, a partir de R$500, e vamos avaliar a melhor solução
              para o seu site profissional. Se o foco for uma campanha específica, conheça também nossa{" "}
              <Link href="/landing-pages" className="text-cyan-300 underline underline-offset-4 transition-colors hover:text-cyan-200">
                criação de landing pages
              </Link>
              .
            </p>

            <a
              href="#orcamento"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector("#orcamento")?.scrollIntoView({ behavior: "smooth", block: "start" })
              }}
              className="group inline-flex items-center gap-3 px-9 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-base tracking-wide hover:from-blue-500 hover:to-cyan-400 transition-all shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
            >
              <WhatsAppSVG className="w-5 h-5 shrink-0" />
              RECEBER ORÇAMENTO
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
  useEffect(() => {
    trackCriacaoSitesView()
  }, [])

  return (
    <>
      <Header compact />
      <main>
        <HeroSEO />
        <Portfolio
          heading={
            <>
              Alguns sites que já{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                desenvolvemos
              </span>
            </>
          }
          subtitle="Projetos reais, de segmentos diferentes, desenvolvidos com estratégia e design premium."
        />
        <OrcamentoForm />
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
