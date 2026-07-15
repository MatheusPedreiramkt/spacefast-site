// ─── Config central da página /diagnostico ─────────────────────────────────
// Ajuste pontuações, perguntas e copy de resultado por aqui.

import { WHATSAPP_NUMBER } from "@/lib/constants"

// Usado no Hero da /diagnostico/apresentacao.
export const DIAGNOSTICO_PRICE = "500"

// ─── Score ───────────────────────────────────────────────────────────────────
// Mapeia cada opção de cada pergunta ao seu valor de pontuação.
export const SCORING = {
  possui_site: {
    nao_tenho_site: 30,
    apenas_instagram_whatsapp: 30,
    site_antigo: 25,
    site_nao_gera_resultado: 30,
    quero_melhorar: 20,
  },
  prazo: {
    quanto_antes: 35,
    esta_semana: 30,
    este_mes: 20,
    proximos_meses: 5,
    pesquisando: -15,
  },
  investimento: {
    acima_1000: 40,
    entre_500_1000: 35,
    preciso_avaliar: 10,
    abaixo_500: -40,
  },
} as const

export type QuestionId = keyof typeof SCORING

export interface QuizOption {
  value: string
  label: string
}

export interface QuizQuestion {
  id: QuestionId
  question: string
  options: QuizOption[]
}

export const QUESTIONS: QuizQuestion[] = [
  {
    id: "possui_site",
    question: "Você já tem site?",
    options: [
      { value: "nao_tenho_site", label: "Não tenho site" },
      { value: "apenas_instagram_whatsapp", label: "Tenho só Instagram/WhatsApp" },
      { value: "site_antigo", label: "Tenho site, mas está antigo" },
      { value: "site_nao_gera_resultado", label: "Tenho site, mas não gera resultado" },
      { value: "quero_melhorar", label: "Já tenho site e quero melhorar" },
    ],
  },
  {
    id: "prazo",
    question: "Quando quer começar?",
    options: [
      { value: "quanto_antes", label: "O quanto antes" },
      { value: "esta_semana", label: "Ainda esta semana" },
      { value: "este_mes", label: "Este mês" },
      { value: "proximos_meses", label: "Nos próximos meses" },
      { value: "pesquisando", label: "Estou só pesquisando" },
    ],
  },
  {
    id: "investimento",
    question: "Quanto pretende investir em um site profissional?",
    options: [
      { value: "acima_1000", label: "Acima de R$1.000 se fizer sentido" },
      { value: "entre_500_1000", label: "Entre R$500 e R$1.000" },
      { value: "preciso_avaliar", label: "Ainda preciso avaliar" },
      { value: "abaixo_500", label: "Menos de R$500" },
    ],
  },
]

// Nome + WhatsApp (2 etapas) + as perguntas do quiz.
export const TOTAL_STEPS = 2 + QUESTIONS.length

export function labelFor(id: QuestionId, value?: string): string {
  if (!value) return "-"
  return QUESTIONS.find((q) => q.id === id)?.options.find((o) => o.value === value)?.label ?? "-"
}

export type Answers = Partial<Record<QuestionId, string>>

export function computeScore(answers: Answers): number {
  let total = 0
  for (const q of QUESTIONS) {
    const value = answers[q.id]
    if (!value) continue
    total += (SCORING[q.id] as Record<string, number>)[value] ?? 0
  }
  return total
}

// ─── Classificação ────────────────────────────────────────────────────────────
export type Classification = "quente" | "morno" | "frio" | "desqualificado"

// Temperatura possível na planilha, incluindo o estado do lead parcial.
export type LeadTemperatura = Classification | "pendente"

export function classify(score: number): Classification {
  if (score >= 80) return "quente"
  if (score >= 45) return "morno"
  if (score >= 0) return "frio"
  return "desqualificado"
}

// ─── Copy de resultado (usado por DiagnosticoResultado, mantido por compatibilidade) ──
export interface ResultCopy {
  eyebrow: string
  title: string
  subtitle: string
  primaryCta: { label: string; type: "whatsapp" | "portfolio" }
  secondaryCta?: { label: string; type: "whatsapp" | "portfolio" }
}

export const RESULT_COPY: Record<Classification, ResultCopy> = {
  quente: {
    eyebrow: "Diagnóstico concluído",
    title: "Sua empresa parece pronta para ter um site profissional",
    subtitle:
      "Pelas suas respostas, sua empresa já tem um bom perfil para receber uma proposta de site. O próximo passo é falar com a gente no WhatsApp para entendermos melhor a estrutura ideal.",
    primaryCta: { label: "Falar agora no WhatsApp", type: "whatsapp" },
  },
  morno: {
    eyebrow: "Diagnóstico concluído",
    title: "Sua empresa pode se beneficiar de um site profissional",
    subtitle:
      "Pelas suas respostas, talvez uma página profissional simples já ajude sua empresa a passar mais confiança e organizar melhor sua presença online.",
    primaryCta: { label: "Conversar no WhatsApp", type: "whatsapp" },
  },
  frio: {
    eyebrow: "Diagnóstico concluído",
    title: "Talvez ainda seja melhor entender o momento certo para investir",
    subtitle:
      "Pelas suas respostas, talvez ainda seja interessante avaliar melhor a estrutura do seu negócio antes de investir em um site completo.",
    primaryCta: { label: "Ver exemplos de sites", type: "portfolio" },
    secondaryCta: { label: "Falar no WhatsApp", type: "whatsapp" },
  },
  desqualificado: {
    eyebrow: "Diagnóstico concluído",
    title: "Talvez ainda não seja o melhor momento",
    subtitle:
      "Pelas suas respostas, talvez o ideal agora seja organizar melhor sua oferta, fotos, serviços e canais de atendimento antes de investir em um site profissional.",
    primaryCta: { label: "Ver exemplos de sites", type: "portfolio" },
  },
}

// ─── Mensagens do WhatsApp por temperatura ────────────────────────────────────
export const WHATSAPP_MESSAGES: Record<Classification, string> = {
  quente:
    "Olá, preenchi o formulário. Pelo resultado, quero iniciar a criação do meu site.",
  morno:
    "Olá, preenchi o formulário. Pelo resultado, gostaria de ver alguns modelos e entender o melhor a criação do site.",
  frio:
    "Olá, preenchi o formulário. Gostaria de receber uma orientação sobre o melhor momento para criar um site profissional.",
  desqualificado:
    "Olá, preenchi o formulário. Gostaria de receber uma orientação sobre o melhor momento para criar um site profissional.",
}

export function buildWhatsAppMessage(classification: Classification): string {
  return WHATSAPP_MESSAGES[classification]
}

export function buildWhatsAppUrl(classification: Classification): string {
  const text = buildWhatsAppMessage(classification)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

// ─── Lead ──────────────────────────────────────────────────────────────────────
export interface DiagnosticoLead {
  nome: string
  whatsapp: string
}

export type DiagnosticoLeadStatus = "iniciou_diagnostico" | "finalizou_diagnostico"

// Payload enviado para a planilha (via webhook do Google Sheets).
// Mantém os campos antigos (email, empresa, cidade, estado, tipo_negocio,
// objetivo, decisor, momento_negocio) vazios para não quebrar as colunas já
// existentes na planilha atual. lead_id e status são novos.
export interface DiagnosticoLeadSheetPayload {
  lead_id: string
  event_id: string
  status: DiagnosticoLeadStatus
  nome: string
  whatsapp: string
  email: string
  empresa: string
  cidade: string
  estado: string
  tipo_negocio: string
  possui_site: string
  objetivo: string
  prazo: string
  decisor: string
  investimento: string
  momento_negocio: string
  score: number
  temperatura: LeadTemperatura
  mensagem_whatsapp: string
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_content: string
  utm_term: string
  placement: string
  pagina: string
}

// Gerador de ID genérico — usado tanto para lead_id quanto para event_id
// (deduplicação Pixel ↔ Conversions API).
export function generateId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID()
  }
  return `id_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
}

// ─── Gancho de integração — envia lead parcial e lead final ──────────────────
// Usado tanto para salvar o lead parcial (nome + whatsapp) quanto para
// atualizar o mesmo lead ao final do quiz (mesmo lead_id).
export async function syncDiagnosticoLead(payload: DiagnosticoLeadSheetPayload) {
  try {
    await fetch("/api/diagnostico-leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    })
  } catch {
    // A rota server-side registra falhas do webhook. Não bloqueia o fluxo do usuário.
  }
}
