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
    comecando_agora: 15,
    pesquisando: -20,
  },
  p2: {
    prestador_servico: 20,
    loja_fisica: 20,
    loja_online: 20,
    clinica_consultorio: 25,
    restaurante_delivery: 15,
    empresa_b2b: 25,
    autonomo: 15,
    outro: 10,
  },
  p3: {
    nao_tenho_site: 25,
    site_antigo: 30,
    site_nao_gera_resultado: 30,
    quero_melhorar: 20,
    apenas_instagram_whatsapp: 25,
  },
  p4: {
    passar_confianca: 20,
    receber_clientes_whatsapp: 25,
    aparecer_google: 20,
    apresentar_produtos_servicos: 15,
    vender_online: 20,
    presenca_profissional: 20,
  },
  p5: {
    quanto_antes: 30,
    esta_semana: 25,
    este_mes: 20,
    proximos_meses: 5,
    pesquisando: -20,
  },
  p6: {
    eu_decido: 25,
    decido_junto: 15,
    pesquisando_para_outra_pessoa: 0,
  },
  p7: {
    ciente_800: 30,
    posso_investir_mais: 40,
    preciso_avaliar: 10,
    procuro_mais_barato: -40,
  },
  p8: {
    vendo_todos_os_meses: 25,
    tenho_clientes_quero_crescer: 25,
    comecando_agora: 10,
    ainda_nao_vendo: -20,
    prefiro_nao_informar: 0,
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
    question: "Você já tem uma empresa ou negócio ativo?",
    options: [
      { value: "empresa_ativa", label: "Sim, tenho empresa ativa" },
      { value: "comecando_agora", label: "Estou começando agora" },
      { value: "pesquisando", label: "Ainda estou apenas pesquisando" },
    ],
  },
  {
    id: "p2",
    question: "Qual é o tipo do seu negócio?",
    options: [
      { value: "prestador_servico", label: "Prestador de serviço" },
      { value: "loja_fisica", label: "Loja física" },
      { value: "loja_online", label: "Loja online" },
      { value: "clinica_consultorio", label: "Clínica ou consultório" },
      { value: "restaurante_delivery", label: "Restaurante ou delivery" },
      { value: "empresa_b2b", label: "Empresa B2B" },
      { value: "autonomo", label: "Profissional autônomo" },
      { value: "outro", label: "Outro" },
    ],
  },
  {
    id: "p3",
    question: "Hoje sua empresa já tem site?",
    options: [
      { value: "nao_tenho_site", label: "Não tenho site" },
      { value: "site_antigo", label: "Tenho, mas está antigo" },
      { value: "site_nao_gera_resultado", label: "Tenho, mas não gera resultado" },
      { value: "quero_melhorar", label: "Tenho e quero melhorar" },
      { value: "apenas_instagram_whatsapp", label: "Uso apenas Instagram/WhatsApp" },
    ],
  },
  {
    id: "p4",
    question: "Qual é o principal objetivo do site?",
    options: [
      { value: "passar_confianca", label: "Passar mais confiança" },
      { value: "receber_clientes_whatsapp", label: "Receber mais clientes pelo WhatsApp" },
      { value: "aparecer_google", label: "Aparecer melhor no Google" },
      { value: "apresentar_produtos_servicos", label: "Apresentar produtos ou serviços" },
      { value: "vender_online", label: "Vender online" },
      { value: "presenca_profissional", label: "Ter uma presença mais profissional" },
    ],
  },
  {
    id: "p5",
    question: "Quando você pretende iniciar?",
    options: [
      { value: "quanto_antes", label: "O quanto antes" },
      { value: "esta_semana", label: "Esta semana" },
      { value: "este_mes", label: "Este mês" },
      { value: "proximos_meses", label: "Nos próximos meses" },
      { value: "pesquisando", label: "Ainda estou pesquisando" },
    ],
  },
  {
    id: "p6",
    question: "Você é a pessoa responsável por decidir a contratação?",
    options: [
      { value: "eu_decido", label: "Sim, eu decido" },
      { value: "decido_junto", label: "Decido junto com sócio/família" },
      { value: "pesquisando_para_outra_pessoa", label: "Estou pesquisando para outra pessoa" },
    ],
  },
  {
    id: "p7",
    question: `Você está ciente de que um site profissional começa a partir de R$${DIAGNOSTICO_PRICE}?`,
    options: [
      { value: "ciente_800", label: "Sim, estou ciente" },
      { value: "posso_investir_mais", label: "Sim, e posso investir mais se fizer sentido" },
      { value: "preciso_avaliar", label: "Ainda preciso avaliar" },
      { value: "procuro_mais_barato", label: "No momento procuro algo mais barato" },
    ],
  },
  {
    id: "p8",
    question: "Qual é o faturamento ou momento atual do negócio?",
    options: [
      { value: "vendo_todos_os_meses", label: "Já vendo todos os meses" },
      { value: "tenho_clientes_quero_crescer", label: "Tenho clientes, mas quero crescer" },
      { value: "comecando_agora", label: "Estou começando agora" },
      { value: "ainda_nao_vendo", label: "Ainda não vendo" },
      { value: "prefiro_nao_informar", label: "Prefiro não informar" },
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
  if (score >= 100) return "quente"
  if (score >= 60) return "morno"
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
  email?: string
  cidade?: string
  empresa?: string
  instagram?: string
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

  if (answers.p2) lines.push(`Segmento: ${labelFor("p2", answers.p2)}`)
  if (answers.p3) lines.push(`Já tenho site: ${labelFor("p3", answers.p3)}`)
  if (answers.p5) lines.push(`Quero começar: ${labelFor("p5", answers.p5)}`)

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
