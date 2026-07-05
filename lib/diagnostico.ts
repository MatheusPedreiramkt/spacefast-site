// ─── Config central da página /diagnostico ─────────────────────────────────
// Ajuste pontuações, perguntas e copy de resultado por aqui.

import { WHATSAPP_NUMBER } from "@/lib/constants"

// Usado no Hero, no bloco de Preço e na pergunta P7 do quiz.
export const DIAGNOSTICO_PRICE = "500"

// ─── Score ───────────────────────────────────────────────────────────────────
// Mapeia cada opção de cada pergunta ao seu valor de pontuação.
export const SCORING = {
  p1: {
    empresa_ativa: 30,
    comecando_agora: 10,
    pesquisando: -20,
  },
  p2: {
    apenas_instagram_whatsapp: 25,
    nao_tenho_site: 25,
    site_antigo: 30,
    site_nao_gera_resultado: 30,
    quero_melhorar: 20,
  },
  p3: {
    passar_confianca: 20,
    receber_clientes_whatsapp: 25,
    aparecer_google: 20,
    apresentar_produtos_servicos: 15,
    vender_online: 20,
  },
  p4: {
    quanto_antes: 30,
    esta_semana: 25,
    este_mes: 15,
    proximos_meses: 5,
    pesquisando: -20,
  },
  p5: {
    consigo_investir_500: 40,
    preciso_alinhar_com_outra_pessoa: 25,
    preciso_entender_melhor: 10,
    procuro_mais_barato: -40,
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
    id: "p1",
    question: "Hoje você já tem um negócio ativo?",
    options: [
      { value: "empresa_ativa", label: "Sim, já tenho empresa/negócio ativo" },
      { value: "comecando_agora", label: "Estou começando agora" },
      { value: "pesquisando", label: "Ainda estou apenas pesquisando" },
    ],
  },
  {
    id: "p2",
    question: "Como está sua presença online hoje?",
    options: [
      { value: "apenas_instagram_whatsapp", label: "Tenho só Instagram/WhatsApp" },
      { value: "nao_tenho_site", label: "Não tenho site" },
      { value: "site_antigo", label: "Tenho site, mas está antigo" },
      { value: "site_nao_gera_resultado", label: "Tenho site, mas não gera resultado" },
      { value: "quero_melhorar", label: "Já tenho site e quero melhorar" },
    ],
  },
  {
    id: "p3",
    question: "Qual é o principal objetivo do site?",
    options: [
      { value: "passar_confianca", label: "Passar mais confiança" },
      { value: "receber_clientes_whatsapp", label: "Receber mais clientes pelo WhatsApp" },
      { value: "aparecer_google", label: "Aparecer melhor no Google" },
      { value: "apresentar_produtos_servicos", label: "Apresentar produtos ou serviços" },
      { value: "vender_online", label: "Vender online" },
    ],
  },
  {
    id: "p4",
    question: "Quando você pretende iniciar?",
    options: [
      { value: "quanto_antes", label: "O quanto antes" },
      { value: "esta_semana", label: "Ainda esta semana" },
      { value: "este_mes", label: "Este mês" },
      { value: "proximos_meses", label: "Nos próximos meses" },
      { value: "pesquisando", label: "Estou só pesquisando" },
    ],
  },
  {
    id: "p5",
    question: "Pensando no investimento, qual dessas opções mais combina com seu momento?",
    options: [
      {
        value: "consigo_investir_500",
        label: `Se fizer sentido para o meu negócio, consigo investir a partir de R$${DIAGNOSTICO_PRICE}`,
      },
      {
        value: "preciso_alinhar_com_outra_pessoa",
        label: "Tenho interesse, mas preciso alinhar esse investimento com outra pessoa",
      },
      { value: "preciso_entender_melhor", label: "Ainda preciso entender melhor antes de definir o investimento" },
      { value: "procuro_mais_barato", label: "No momento estou procurando algo mais barato" },
    ],
  },
]

export const TOTAL_STEPS = QUESTIONS.length + 1 // 8 perguntas de múltipla escolha + formulário

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

export function classify(score: number): Classification {
  if (score >= 90) return "quente"
  if (score >= 55) return "morno"
  if (score >= 0) return "frio"
  return "desqualificado"
}

// ─── Copy de resultado — edite livremente por aqui ────────────────────────────
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

// ─── Lead ──────────────────────────────────────────────────────────────────────
export interface DiagnosticoLead {
  nome: string
  whatsapp: string
  empresa?: string
}

export interface QualifiedDiagnosticoLead extends DiagnosticoLead {
  score: number
  temperatura: Classification
}

export interface DiagnosticoLeadSheetPayload {
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
  temperatura: Classification
  mensagem_whatsapp: string
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_content: string
  utm_term: string
  placement: string
  pagina: string
}

export function buildWhatsAppMessage(answers: Answers): string {
  const lines = ["Oi! Fiz o diagnóstico e quero um site pro meu negócio. Como funciona? 🚀", ""]

  if (answers.p2) lines.push(`Presença online: ${labelFor("p2", answers.p2)}`)
  if (answers.p3) lines.push(`Objetivo do site: ${labelFor("p3", answers.p3)}`)
  if (answers.p4) lines.push(`Quero começar: ${labelFor("p4", answers.p4)}`)

  return lines.join("\n")
}

export function buildWhatsAppUrl(answers: Answers): string {
  const text = buildWhatsAppMessage(answers)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

// ─── Gancho de integração — fim do quiz ───────────────────────────────────────
// Chamado assim que o lead conclui o formulário (P9), antes da tela "Analisando".
export async function onLeadComplete(payload: DiagnosticoLeadSheetPayload) {
  try {
    await fetch("/api/diagnostico-leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    })
  } catch {
    // A rota server-side registra falhas do webhook. Não bloqueia a tela de resultado.
  }
}
