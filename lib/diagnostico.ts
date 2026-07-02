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
    comecando: 10,
    pesquisando: -20,
  },
  p2: {
    prestador: 20,
    loja_fisica: 20,
    loja_online: 0,
    clinica: 25,
    restaurante: 15,
    b2b: 25,
    autonomo: 15,
    outro: 0,
  },
  p3: {
    sem_site: 25,
    site_antigo: 30,
    sem_resultado: 30,
    quer_melhorar: 15,
    so_redes: 25,
  },
  p4: {
    confianca: 20,
    whatsapp: 25,
    google: 20,
    apresentar: 15,
    vender_online: 15,
    presenca: 15,
  },
  p5: {
    quanto_antes: 30,
    esta_semana: 25,
    este_mes: 20,
    proximos_meses: 5,
    pesquisando: -20,
  },
  p6: {
    decisor: 25,
    decide_junto: 15,
    pesquisa_outro: 0,
  },
  p7: {
    ciente: 30,
    pode_investir_mais: 40,
    precisa_avaliar: 10,
    mais_barato: -40,
  },
  p8: {
    vende_todo_mes: 25,
    tem_clientes: 25,
    comecando: 10,
    nao_vende: -20,
    nao_informar: 0,
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
      { value: "comecando", label: "Estou começando agora" },
      { value: "pesquisando", label: "Ainda estou apenas pesquisando" },
    ],
  },
  {
    id: "p2",
    question: "Qual é o tipo do seu negócio?",
    options: [
      { value: "prestador", label: "Prestador de serviço" },
      { value: "loja_fisica", label: "Loja física" },
      { value: "loja_online", label: "Loja online" },
      { value: "clinica", label: "Clínica ou consultório" },
      { value: "restaurante", label: "Restaurante ou delivery" },
      { value: "b2b", label: "Empresa B2B" },
      { value: "autonomo", label: "Profissional autônomo" },
      { value: "outro", label: "Outro" },
    ],
  },
  {
    id: "p3",
    question: "Hoje sua empresa já tem site?",
    options: [
      { value: "sem_site", label: "Não tenho site" },
      { value: "site_antigo", label: "Tenho, mas está antigo" },
      { value: "sem_resultado", label: "Tenho, mas não gera resultado" },
      { value: "quer_melhorar", label: "Tenho e quero melhorar" },
      { value: "so_redes", label: "Uso apenas Instagram/WhatsApp" },
    ],
  },
  {
    id: "p4",
    question: "Qual é o principal objetivo do site?",
    options: [
      { value: "confianca", label: "Passar mais confiança" },
      { value: "whatsapp", label: "Receber mais clientes pelo WhatsApp" },
      { value: "google", label: "Aparecer melhor no Google" },
      { value: "apresentar", label: "Apresentar produtos ou serviços" },
      { value: "vender_online", label: "Vender online" },
      { value: "presenca", label: "Ter uma presença mais profissional" },
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
      { value: "decisor", label: "Sim, eu decido" },
      { value: "decide_junto", label: "Decido junto com sócio/família" },
      { value: "pesquisa_outro", label: "Estou pesquisando para outra pessoa" },
    ],
  },
  {
    id: "p7",
    question: `Você está ciente de que um site profissional começa a partir de R$${DIAGNOSTICO_PRICE}?`,
    options: [
      { value: "ciente", label: "Sim, estou ciente" },
      { value: "pode_investir_mais", label: "Sim, e posso investir mais se fizer sentido" },
      { value: "precisa_avaliar", label: "Ainda preciso avaliar" },
      { value: "mais_barato", label: "No momento procuro algo mais barato" },
    ],
  },
  {
    id: "p8",
    question: "Qual é o faturamento ou momento atual do negócio?",
    options: [
      { value: "vende_todo_mes", label: "Já vendo todos os meses" },
      { value: "tem_clientes", label: "Tenho clientes, mas quero crescer" },
      { value: "comecando", label: "Estou começando agora" },
      { value: "nao_vende", label: "Ainda não vendo" },
      { value: "nao_informar", label: "Prefiro não informar" },
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
      "Pelas suas respostas, seu negócio já tem um bom perfil para receber uma proposta de site.",
    primaryCta: { label: "Falar agora no WhatsApp", type: "whatsapp" },
  },
  morno: {
    eyebrow: "Diagnóstico concluído",
    title: "Seu negócio tem um bom potencial para crescer com um site",
    subtitle:
      "Vamos conversar para entender juntos a melhor estrutura de site para o seu momento atual.",
    primaryCta: { label: "Conversar no WhatsApp", type: "whatsapp" },
  },
  frio: {
    eyebrow: "Diagnóstico concluído",
    title: "Ainda dá tempo de organizar a presença digital da sua empresa",
    subtitle:
      "Antes de investir, veja como outros negócios como o seu já estão usando um site para gerar mais confiança e contatos.",
    primaryCta: { label: "Ver exemplos de sites", type: "portfolio" },
    secondaryCta: { label: "Falar no WhatsApp", type: "whatsapp" },
  },
  desqualificado: {
    eyebrow: "Diagnóstico concluído",
    title: "Obrigado por responder o nosso diagnóstico",
    subtitle:
      "No momento seu perfil não é o foco dos nossos projetos, mas fique à vontade para conhecer nosso trabalho.",
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

export function buildWhatsAppUrl(lead: DiagnosticoLead, answers: Answers): string {
  const text = `Olá, preenchi o diagnóstico para criação de site.

Nome: ${lead.nome}
Empresa: ${lead.empresa?.trim() || "-"}
Segmento: ${labelFor("p2", answers.p2)}
Objetivo: ${labelFor("p4", answers.p4)}
Prazo: ${labelFor("p5", answers.p5)}
Investimento: ${labelFor("p7", answers.p7)}

Gostaria de entender qual site faz mais sentido para minha empresa.`

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

// ─── Gancho de integração — fim do quiz ───────────────────────────────────────
// Chamado assim que o lead conclui o formulário (P9), antes da tela "Analisando".
export async function onLeadComplete(
  lead: DiagnosticoLead,
  score: number,
  classificacao: Classification,
) {
  void lead
  void score
  void classificacao
  // TODO: disparar evento Meta CAPI + persistir lead (Apps Script/CAPI)
}
