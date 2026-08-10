"use client"

import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ChevronDown, Send } from "lucide-react"
import { SECTION_ANIM, VIEWPORT, EASE } from "@/lib/motion"
import { WHATSAPP_NUMBER } from "@/lib/constants"
import { trackWhatsAppClick, trackOrcamentoSiteLead } from "@/lib/analytics"
import { trackWhatsAppRedirect } from "@/lib/cqc"

const INTERESSES = [
  { value: "criar_site_novo", label: "Criar um site novo" },
  { value: "refazer_site_atual", label: "Refazer meu site atual" },
  { value: "landing_page", label: "Landing page" },
  { value: "sistema_personalizado", label: "Sistema personalizado" },
  { value: "ainda_nao_sei", label: "Ainda não sei" },
]

const inputClass =
  "w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-base placeholder:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus:border-blue-400/50 transition-colors"

const labelClass = "block text-sm font-medium text-gray-300 mb-1.5"

function formatWhatsApp(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 11)
  const len = digits.length
  if (len === 0) return ""
  if (len <= 2) return `(${digits}`
  if (len <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (len <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

function buildWhatsAppMessage({
  nome,
  whatsapp,
  solucao,
  projectGoal,
  code,
}: {
  nome: string
  whatsapp: string
  solucao: string
  projectGoal?: string
  code: string
}) {
  const lines = ["Olá! Vim pelo site da SpaceFast e gostaria de falar sobre um projeto.", ""]

  if (nome) lines.push(`Nome: ${nome}`)
  if (whatsapp) lines.push(`WhatsApp: ${whatsapp}`)
  if (solucao) lines.push(`Tenho interesse em: ${solucao}`)
  if (projectGoal) lines.push(`Objetivo: ${projectGoal}`)

  lines.push("", `Código: ${code}`)

  return lines.join("\n")
}

export default function OrcamentoForm({
  title = "Receba um orçamento para seu site",
  subtitle = "Preencha os dados abaixo para abrir uma mensagem no WhatsApp.",
  defaultInterest = "",
  projectGoal = "",
}: {
  title?: string
  subtitle?: string
  defaultInterest?: string
  projectGoal?: string
} = {}) {
  const prefersReduced = useReducedMotion()

  const [nome, setNome] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [interesse, setInteresse] = useState(defaultInterest)
  const [error, setError] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const whatsappDigits = whatsapp.replace(/\D/g, "")
    if (!nome.trim() || whatsappDigits.length < 10 || !interesse) {
      setError("Preencha nome, WhatsApp e o que você precisa para continuar.")
      return
    }
    setError("")

    const interesseLabel = INTERESSES.find((i) => i.value === interesse)?.label ?? interesse
    const code = trackWhatsAppRedirect()
    const message = buildWhatsAppMessage({
      nome: nome.trim(),
      whatsapp: whatsapp.trim(),
      solucao: interesseLabel,
      projectGoal,
      code,
    })

    trackOrcamentoSiteLead({ form_id: "of-orcamento", form_name: "orcamento_criacao_sites" })
    trackWhatsAppClick("form_orcamento_criacao_sites")
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    )
  }

  return (
    <section id="orcamento" className="relative py-16 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#060d1f] to-[#030712]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/7 to-transparent" />

      <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...SECTION_ANIM} viewport={VIEWPORT} className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight tracking-tight">
            {title}
          </h2>
          <p className="text-gray-400 text-[1.02rem] leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={prefersReduced ? undefined : { opacity: 0, y: 24 }}
          whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.65, ease: EASE }}
          className="glass-strong rounded-3xl border border-white/8 p-6 sm:p-8"
        >
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label className={labelClass} htmlFor="of-nome">
                Nome
              </label>
              <input
                id="of-nome"
                type="text"
                autoComplete="name"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="of-whatsapp">
                WhatsApp
              </label>
              <input
                id="of-whatsapp"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
                placeholder="(00) 00000-0000"
                value={whatsapp}
                onChange={(e) => setWhatsapp(formatWhatsApp(e.target.value))}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="of-interesse">
                O que você precisa?
              </label>
              <div className="relative">
                <select
                  id="of-interesse"
                  required
                  value={interesse}
                  onChange={(e) => setInteresse(e.target.value)}
                  className={`${inputClass} appearance-none pr-10`}
                >
                  <option value="" className="bg-[#0b1222]">
                    Selecione
                  </option>
                  {INTERESSES.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-[#0b1222]">
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
                  aria-hidden
                />
              </div>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-[0.95rem] tracking-wide hover:from-blue-500 hover:to-cyan-400 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
            >
              <Send className="w-4 h-4" />
              RECEBER ORÇAMENTO
            </button>
            <p className="text-xs text-gray-500 text-center">
              Sem compromisso • Atendimento pelo WhatsApp
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
