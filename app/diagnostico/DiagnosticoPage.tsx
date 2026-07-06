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
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  onLeadComplete,
  type Answers,
  type QuestionId,
  type DiagnosticoLead,
  type DiagnosticoLeadSheetPayload,
  type QualifiedDiagnosticoLead,
  type Classification,
} from "@/lib/diagnostico"

type Step = "quiz" | "redirecionando"

interface DiagnosticoState {
  step: Step
  questionIndex: number
  answers: Answers
  score: number
  classification: Classification | null
  lead: QualifiedDiagnosticoLead | null
}

type Action =
  | { type: "ANSWER"; id: QuestionId; value: string }
  | { type: "BACK" }
  | {
      type: "SUBMIT_LEAD"
      lead: QualifiedDiagnosticoLead
      score: number
      classification: Classification
    }

const initialState: DiagnosticoState = {
  step: "quiz",
  questionIndex: 0,
  answers: {},
  score: 0,
  classification: null,
  lead: null,
}

function buildDiagnosticoEventParams(
  answers: Answers,
  score: number,
  classification: Classification,
) {
  return {
    score,
    temperatura: classification,
    tipo_negocio: "",
    objetivo: answers.p3 ?? "",
    prazo: answers.p4 ?? "",
    investimento: answers.p5 ?? "",
    possui_site: answers.p2 ?? "",
    decisor: "",
    momento_negocio: answers.p1 ?? "",
  }
}

function buildDiagnosticoDataLayerParams(
  answers: Answers,
  score: number,
  classification: Classification,
) {
  const attributionParams = getAttributionParams()

  return {
    ...buildDiagnosticoEventParams(answers, score, classification),
    utm_source: attributionParams.utm_source,
    utm_medium: attributionParams.utm_medium,
    utm_campaign: attributionParams.utm_campaign,
    utm_content: attributionParams.utm_content,
    utm_term: attributionParams.utm_term,
    placement: attributionParams.placement,
  }
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

function buildSheetPayload(
  lead: DiagnosticoLead,
  answers: Answers,
  score: number,
  classification: Classification,
): DiagnosticoLeadSheetPayload {
  return {
    nome: lead.nome,
    whatsapp: lead.whatsapp,
    email: "",
    empresa: lead.empresa ?? "",
    cidade: "",
    estado: "",
    tipo_negocio: "",
    possui_site: answers.p2 ?? "",
    objetivo: answers.p3 ?? "",
    prazo: answers.p4 ?? "",
    decisor: "",
    investimento: answers.p5 ?? "",
    momento_negocio: answers.p1 ?? "",
    score,
    temperatura: classification,
    mensagem_whatsapp: buildWhatsAppMessage(answers),
    ...getAttributionParams(),
  }
}

function reducer(state: DiagnosticoState, action: Action): DiagnosticoState {
  switch (action.type) {
    case "ANSWER":
      return {
        ...state,
        answers: { ...state.answers, [action.id]: action.value },
        questionIndex: state.questionIndex + 1,
      }
    case "BACK":
      return state.questionIndex === 0 ? state : { ...state, questionIndex: state.questionIndex - 1 }
    case "SUBMIT_LEAD":
      return {
        ...state,
        step: "redirecionando",
        lead: action.lead,
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

  const handleAnswer = useCallback((id: QuestionId, value: string) => {
    if (!quizStartTrackedRef.current) {
      quizStartTrackedRef.current = true
      trackQuizStart()
    }
    dispatch({ type: "ANSWER", id, value })
  }, [])
  const handleBack = useCallback(() => dispatch({ type: "BACK" }), [])

  const handleSubmitForm = useCallback(
    async (lead: DiagnosticoLead) => {
      if (leadSubmittedRef.current) return
      leadSubmittedRef.current = true

      const score = computeScore(state.answers)
      const classification = classify(score)
      const eventParams = buildDiagnosticoEventParams(state.answers, score, classification)
      const dataLayerParams = buildDiagnosticoDataLayerParams(state.answers, score, classification)
      const sheetPayload = buildSheetPayload(lead, state.answers, score, classification)
      const qualifiedLead: QualifiedDiagnosticoLead = {
        ...lead,
        score,
        temperatura: classification,
      }

      console.log("[Meta Pixel] Lead fired from diagnostico submit")
      pushDataLayerEvent("lead_submit", dataLayerParams)
      trackDiagnosticoLead(eventParams)

      if (classification === "morno" || classification === "quente") {
        pushDataLayerEvent("qualified_lead", dataLayerParams)
        trackQualifiedLead(eventParams)
      }

      await onLeadComplete(sheetPayload)
      dispatch({ type: "SUBMIT_LEAD", lead: qualifiedLead, score, classification })
    },
    [state.answers],
  )

  if (state.step === "redirecionando" && state.lead && state.classification) {
    return (
      <DiagnosticoRedirecionando
        classification={state.classification}
        whatsAppUrl={buildWhatsAppUrl(state.answers)}
      />
    )
  }

  return (
    <DiagnosticoQuiz
      questionIndex={state.questionIndex}
      answers={state.answers}
      onAnswer={handleAnswer}
      onBack={handleBack}
      onSubmitForm={handleSubmitForm}
    />
  )
}
