"use client"

import { useCallback, useEffect, useReducer, useRef } from "react"
import DiagnosticoQuiz from "@/components/diagnostico/DiagnosticoQuiz"
import DiagnosticoRedirecionando from "@/components/diagnostico/DiagnosticoRedirecionando"
import {
  pushDataLayerEvent,
  trackDiagnosticoLead,
  trackDiagnosticoViewContent,
  trackQualifiedLead,
  trackQuizStart,
} from "@/lib/analytics"
import {
  computeScore,
  classify,
  buildWhatsAppUrl,
  buildWhatsAppMessage,
  generateId,
  syncDiagnosticoLead,
  QUESTIONS,
  type Answers,
  type QuestionId,
  type DiagnosticoLeadSheetPayload,
  type Classification,
} from "@/lib/diagnostico"

type Step = "nome" | "whatsapp" | "quiz" | "redirecionando"

interface DiagnosticoState {
  step: Step
  questionIndex: number
  nome: string
  whatsapp: string
  leadId: string | null
  answers: Answers
  score: number
  classification: Classification
}

type Action =
  | { type: "SET_NOME"; nome: string }
  | { type: "SET_WHATSAPP"; whatsapp: string; leadId: string }
  | { type: "ANSWER"; id: QuestionId; value: string }
  | { type: "BACK" }
  | { type: "COMPLETE"; id: QuestionId; value: string; score: number; classification: Classification }

const initialState: DiagnosticoState = {
  step: "nome",
  questionIndex: 0,
  nome: "",
  whatsapp: "",
  leadId: null,
  answers: {},
  score: 0,
  // Nunca lido antes de "COMPLETE" definir o valor real — placeholder inofensivo.
  classification: "frio",
}

function getAttributionParams() {
  if (typeof window === "undefined") {
    return {
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_content: "",
      utm_term: "",
      placement: "",
      pagina: "/diagnostico",
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

function buildDiagnosticoEventParams(answers: Answers, score: number, classification: Classification) {
  return {
    score,
    temperatura: classification,
    possui_site: answers.possui_site ?? "",
    prazo: answers.prazo ?? "",
    investimento: answers.investimento ?? "",
  }
}

function buildDiagnosticoDataLayerParams(answers: Answers, score: number, classification: Classification) {
  return {
    ...buildDiagnosticoEventParams(answers, score, classification),
    ...getAttributionParams(),
  }
}

function buildPartialSheetPayload(
  leadId: string,
  eventId: string,
  nome: string,
  whatsapp: string,
): DiagnosticoLeadSheetPayload {
  return {
    lead_id: leadId,
    event_id: eventId,
    status: "iniciou_diagnostico",
    nome,
    whatsapp,
    email: "",
    empresa: "",
    cidade: "",
    estado: "",
    tipo_negocio: "",
    possui_site: "",
    objetivo: "",
    prazo: "",
    decisor: "",
    investimento: "",
    momento_negocio: "",
    score: 0,
    temperatura: "pendente",
    mensagem_whatsapp: "",
    ...getAttributionParams(),
  }
}

function buildFinalSheetPayload(
  leadId: string,
  eventId: string,
  nome: string,
  whatsapp: string,
  answers: Answers,
  score: number,
  classification: Classification,
): DiagnosticoLeadSheetPayload {
  return {
    lead_id: leadId,
    event_id: eventId,
    status: "finalizou_diagnostico",
    nome,
    whatsapp,
    email: "",
    empresa: "",
    cidade: "",
    estado: "",
    tipo_negocio: "",
    possui_site: answers.possui_site ?? "",
    objetivo: "",
    prazo: answers.prazo ?? "",
    decisor: "",
    investimento: answers.investimento ?? "",
    momento_negocio: "",
    score,
    temperatura: classification,
    mensagem_whatsapp: buildWhatsAppMessage(classification),
    ...getAttributionParams(),
  }
}

function reducer(state: DiagnosticoState, action: Action): DiagnosticoState {
  switch (action.type) {
    case "SET_NOME":
      return { ...state, nome: action.nome, step: "whatsapp" }
    case "SET_WHATSAPP":
      return { ...state, whatsapp: action.whatsapp, leadId: action.leadId, step: "quiz", questionIndex: 0 }
    case "ANSWER":
      return {
        ...state,
        answers: { ...state.answers, [action.id]: action.value },
        questionIndex: state.questionIndex + 1,
      }
    case "BACK":
      if (state.step === "whatsapp") return { ...state, step: "nome" }
      if (state.step === "quiz") {
        if (state.questionIndex === 0) return { ...state, step: "whatsapp" }
        return { ...state, questionIndex: state.questionIndex - 1 }
      }
      return state
    case "COMPLETE":
      return {
        ...state,
        step: "redirecionando",
        answers: { ...state.answers, [action.id]: action.value },
        score: action.score,
        classification: action.classification,
      }
    default:
      return state
  }
}

export default function DiagnosticoPage() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const viewContentTrackedRef = useRef(false)
  const quizStartTrackedRef = useRef(false)
  const leadSubmittedRef = useRef(false)

  useEffect(() => {
    if (viewContentTrackedRef.current) return
    viewContentTrackedRef.current = true
    trackDiagnosticoViewContent()
  }, [])

  const handleSubmitNome = useCallback((nome: string) => {
    dispatch({ type: "SET_NOME", nome })
  }, [])

  const handleSubmitWhatsapp = useCallback(
    (whatsapp: string) => {
      const leadId = state.leadId ?? generateId()

      if (!leadSubmittedRef.current) {
        leadSubmittedRef.current = true
        const leadEventId = generateId()
        const attributionParams = getAttributionParams()
        pushDataLayerEvent("lead_submit", attributionParams)
        // Só dispara o Pixel Lead depois que a planilha/CAPI confirmar o registro
        // do lead — evita Lead no Pixel sem o lead correspondente salvo.
        void syncDiagnosticoLead(buildPartialSheetPayload(leadId, leadEventId, state.nome, whatsapp)).then((ok) => {
          if (ok) trackDiagnosticoLead(attributionParams, leadEventId)
        })
      }

      dispatch({ type: "SET_WHATSAPP", whatsapp, leadId })
    },
    [state.nome, state.leadId],
  )

  const handleAnswer = useCallback(
    (id: QuestionId, value: string) => {
      if (!quizStartTrackedRef.current) {
        quizStartTrackedRef.current = true
        trackQuizStart()
      }

      const isLastQuestion = state.questionIndex === QUESTIONS.length - 1
      if (!isLastQuestion) {
        dispatch({ type: "ANSWER", id, value })
        return
      }

      const finalAnswers: Answers = { ...state.answers, [id]: value }
      const score = computeScore(finalAnswers)
      const classification = classify(score)
      const eventParams = buildDiagnosticoEventParams(finalAnswers, score, classification)
      const dataLayerParams = buildDiagnosticoDataLayerParams(finalAnswers, score, classification)
      const qualifiedLeadEventId = generateId()
      const isQualified = classification === "morno" || classification === "quente"

      if (state.leadId) {
        void syncDiagnosticoLead(
          buildFinalSheetPayload(
            state.leadId,
            qualifiedLeadEventId,
            state.nome,
            state.whatsapp,
            finalAnswers,
            score,
            classification,
          ),
        ).then((ok) => {
          if (ok && isQualified) {
            pushDataLayerEvent("qualified_lead", dataLayerParams)
            trackQualifiedLead(eventParams, qualifiedLeadEventId)
          }
        })
      }

      dispatch({ type: "COMPLETE", id, value, score, classification })
    },
    [state.answers, state.questionIndex, state.leadId, state.nome, state.whatsapp],
  )

  const handleBack = useCallback(() => dispatch({ type: "BACK" }), [])

  if (state.step === "redirecionando") {
    return (
      <DiagnosticoRedirecionando
        classification={state.classification}
        whatsAppUrl={buildWhatsAppUrl(state.classification)}
      />
    )
  }

  return (
    <DiagnosticoQuiz
      step={state.step}
      questionIndex={state.questionIndex}
      nome={state.nome}
      whatsapp={state.whatsapp}
      answers={state.answers}
      onSubmitNome={handleSubmitNome}
      onSubmitWhatsapp={handleSubmitWhatsapp}
      onAnswer={handleAnswer}
      onBack={handleBack}
    />
  )
}
