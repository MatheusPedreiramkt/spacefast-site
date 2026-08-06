"use client"

import { useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { CheckCircle2, ArrowRight, Sparkles, Send } from "lucide-react"
import { stagger, fadeUp, VIEWPORT, SECTION_ANIM, EASE } from "@/lib/motion"
import { WHATSAPP_URL, WHATSAPP_MESSAGE_TEXT, WHATSAPP_NUMBER } from "@/lib/constants"
import { WhatsAppSVG } from "@/components/ui/WhatsAppSVG"
import { trackFormSubmit, trackAnaliseProjetoLead, pushDataLayerEvent } from "@/lib/analytics"
import { openWhatsAppWithTracking } from "@/lib/cqc"
import {
  SITUACOES,
  SOLUCOES,
  labelForSituacao,
  labelForSolucao,
  generateId,
  syncAnaliseProjeto,
  type AnaliseProjetoPayload,
} from "@/lib/analiseProjeto"

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-[0.92rem] placeholder:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus:border-blue-400/50 transition-colors"

const labelClass = "block text-sm font-medium text-gray-300 mb-1.5"

function getAttributionParams() {
  if (typeof window === "undefined") {
    return {
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_content: "",
      utm_term: "",
      placement: "",
      pagina: "/",
    }
  }

  const params = new URLSearchParams(window.location.search)

  return {
    utm_source: params.get("utm_source") ?? "",
    utm_medium: params.get("utm_medium") ?? "",
    utm_campaign: params.get("utm_campaign") ?? "",
    utm_content: params.get("utm_content") ?? "",
    utm_term: params.get("utm_term") ?? "",
    placement: params.get("placement") ?? "",
    pagina: window.location.href,
  }
}

function buildWhatsAppMessage(data: {
  empresa: string
  situacao: string
  solucao: string
  descricao: string
}) {
  const lines = [
    "Olá! Preenchi o formulário de análise de projeto no site da SpaceFast.",
  ]
  if (data.empresa) lines.push(`Empresa: ${data.empresa}`)
  if (data.situacao) lines.push(`Situação atual: ${labelForSituacao(data.situacao)}`)
  if (data.solucao) lines.push(`Solução que procuro: ${labelForSolucao(data.solucao)}`)
  if (data.descricao) lines.push(`Sobre o projeto: ${data.descricao}`)
  return lines.join("\n")
}

export default function QualificacaoForm() {
  const prefersReduced = useReducedMotion()
  const formRef = useRef<HTMLFormElement>(null)
  const nomeInputRef = useRef<HTMLInputElement>(null)

  const [nome, setNome] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [empresa, setEmpresa] = useState("")
  const [segmento, setSegmento] = useState("")
  const [situacao, setSituacao] = useState("")
  const [solucao, setSolucao] = useState("")
  const [linkSite, setLinkSite] = useState("")
  const [descricao, setDescricao] = useState("")

  const [error, setError] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle")
  const leadIdRef = useRef<string | null>(null)

  function handleSituacaoClick(value: string) {
    setSituacao(value)
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    window.setTimeout(() => nomeInputRef.current?.focus(), 400)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!nome.trim() || !whatsapp.trim()) {
      setError("Preencha nome e WhatsApp para continuar.")
      return
    }
    setError("")
    setStatus("sending")

    const leadId = leadIdRef.current ?? generateId()
    leadIdRef.current = leadId
    const eventId = generateId()
    const attribution = getAttributionParams()

    const payload: AnaliseProjetoPayload = {
      lead_id: leadId,
      event_id: eventId,
      nome: nome.trim(),
      whatsapp: whatsapp.trim(),
      empresa: empresa.trim(),
      segmento: segmento.trim(),
      situacao,
      solucao,
      link_site_atual: linkSite.trim(),
      descricao: descricao.trim(),
      ...attribution,
    }

    pushDataLayerEvent("lead_submit", { form_name: "analise_projeto", ...attribution })
    trackFormSubmit("analise_projeto")

    void syncAnaliseProjeto(payload).then((ok) => {
      if (ok) trackAnaliseProjetoLead(attribution, eventId)
    })

    setStatus("sent")
    openWhatsAppWithTracking(
      buildWhatsAppMessage({ empresa: payload.empresa, situacao, solucao, descricao: payload.descricao }),
      WHATSAPP_NUMBER,
    )
  }

  return (
    <section id="situacao" className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#060d1f] to-[#030712]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/7 to-transparent" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Qualificação ──────────────────────────────────────────────── */}
        <motion.div
          {...SECTION_ANIM}
          viewport={VIEWPORT}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/8 text-blue-300 text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
            Fale sobre seu projeto
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight tracking-tight">
            Em qual situação{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              sua empresa está?
            </span>
          </h2>
          <p className="text-gray-400 text-[1.05rem] leading-relaxed">
            Escolha a opção mais próxima da sua realidade — isso já pré-preenche o formulário abaixo.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid sm:grid-cols-2 gap-4 mb-20"
        >
          {SITUACOES.map((opt) => {
            const isSelected = situacao === opt.value
            return (
              <motion.div key={opt.value} variants={fadeUp}>
                <button
                  type="button"
                  onClick={() => handleSituacaoClick(opt.value)}
                  className={`group flex items-center justify-between gap-3 w-full text-left px-6 py-5 rounded-2xl border transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400 ${
                    isSelected
                      ? "border-blue-500/50 bg-blue-500/10 text-white"
                      : "glass border-white/8 text-gray-200 hover:border-blue-500/25 hover:bg-white/[0.06]"
                  }`}
                >
                  <span className="text-[0.98rem] font-medium leading-snug">{opt.label}</span>
                  <span
                    className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                      isSelected ? "border-blue-400 bg-blue-500" : "border-white/20"
                    }`}
                    aria-hidden
                  >
                    {isSelected && <CheckCircle2 className="w-full h-full text-white" strokeWidth={2.5} />}
                  </span>
                </button>
              </motion.div>
            )
          })}
        </motion.div>

        {/* ── Formulário ────────────────────────────────────────────────── */}
        <motion.div
          initial={prefersReduced ? undefined : { opacity: 0, y: 24 }}
          whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.65, ease: EASE }}
          className="glass-strong rounded-3xl border border-white/8 p-6 sm:p-10"
        >
          {status === "sent" ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Recebemos sua solicitação!</h3>
              <p className="text-gray-400 max-w-md mx-auto mb-6">
                Abrimos o WhatsApp com sua mensagem pronta. Se não abriu automaticamente, clique no botão
                abaixo para continuar a conversa.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault()
                  openWhatsAppWithTracking(WHATSAPP_MESSAGE_TEXT, WHATSAPP_NUMBER)
                }}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-[0.95rem] hover:from-blue-500 hover:to-cyan-400 transition-all shadow-lg shadow-blue-500/25"
              >
                <WhatsAppSVG className="w-4 h-4" />
                Continuar no WhatsApp
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
              </a>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1.5">
                  Solicite a análise do seu projeto
                </h3>
                <p className="text-gray-400 text-sm">
                  Conte um pouco sobre sua empresa. Respondemos com a estrutura mais indicada para o seu
                  momento.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass} htmlFor="qf-nome">
                    Nome
                  </label>
                  <input
                    id="qf-nome"
                    ref={nomeInputRef}
                    type="text"
                    autoComplete="name"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="qf-whatsapp">
                    WhatsApp
                  </label>
                  <input
                    id="qf-whatsapp"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="(00) 00000-0000"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass} htmlFor="qf-empresa">
                    Nome da empresa
                  </label>
                  <input
                    id="qf-empresa"
                    type="text"
                    autoComplete="organization"
                    value={empresa}
                    onChange={(e) => setEmpresa(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="qf-segmento">
                    Segmento
                  </label>
                  <input
                    id="qf-segmento"
                    type="text"
                    placeholder="Ex: clínica, advocacia, comércio..."
                    value={segmento}
                    onChange={(e) => setSegmento(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass} htmlFor="qf-situacao">
                    Situação atual
                  </label>
                  <select
                    id="qf-situacao"
                    value={situacao}
                    onChange={(e) => setSituacao(e.target.value)}
                    className={`${inputClass} appearance-none`}
                  >
                    <option value="" className="bg-[#0b1222]">
                      Selecione
                    </option>
                    {SITUACOES.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-[#0b1222]">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass} htmlFor="qf-solucao">
                    Qual solução está procurando?
                  </label>
                  <select
                    id="qf-solucao"
                    value={solucao}
                    onChange={(e) => setSolucao(e.target.value)}
                    className={`${inputClass} appearance-none`}
                  >
                    <option value="" className="bg-[#0b1222]">
                      Selecione
                    </option>
                    {SOLUCOES.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-[#0b1222]">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass} htmlFor="qf-link">
                  Link do site atual <span className="text-gray-600">(caso exista)</span>
                </label>
                <input
                  id="qf-link"
                  type="text"
                  placeholder="https://"
                  value={linkSite}
                  onChange={(e) => setLinkSite(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="qf-descricao">
                  Explique brevemente o projeto
                </label>
                <textarea
                  id="qf-descricao"
                  rows={4}
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={status === "sending"}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-[0.95rem] hover:from-blue-500 hover:to-cyan-400 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
              >
                <Send className="w-4 h-4" />
                {status === "sending" ? "Enviando..." : "Solicitar análise do meu projeto"}
              </button>
              <p className="text-xs text-gray-500">
                Orçamento 100% gratuito · Resposta em minutos · Sem compromisso
              </p>
            </form>
          )}
        </motion.div>

        {/* ── Pacote de entrada ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="mt-8 glass rounded-2xl border border-white/8 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-5 sm:gap-6 text-center sm:text-left"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-500/12 border border-amber-500/25 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6 text-amber-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-semibold text-lg mb-1">
              Precisa apenas de uma presença digital objetiva?
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Também desenvolvemos sites essenciais de uma página, com projetos a partir de{" "}
              <span className="text-white font-semibold">R$ 500</span>.
            </p>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault()
              openWhatsAppWithTracking(
                "Olá! Vi que vocês fazem sites a partir de R$ 500 e quero saber mais.",
                WHATSAPP_NUMBER,
              )
            }}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 text-white/85 text-sm font-medium hover:bg-white/[0.06] hover:border-white/25 transition-all"
          >
            Saber mais
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
