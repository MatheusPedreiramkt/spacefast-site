"use client"

import { useCallback, useEffect, useReducer, useRef, useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import WhatsAppButton from "@/components/WhatsAppButton"
import DiagnosticoLanding from "@/components/diagnostico/DiagnosticoLanding"
import DiagnosticoQuiz from "@/components/diagnostico/DiagnosticoQuiz"
import DiagnosticoAnalisando from "@/components/diagnostico/DiagnosticoAnalisando"
import DiagnosticoResultado from "@/components/diagnostico/DiagnosticoResultado"
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

type Step = "landing" | "quiz" | "analisando" | "resultado"

interface DiagnosticoState {
  step: Step
  questionIndex: number
  answers: Answers
  score: number
  classification: Classification | null
  lead: QualifiedDiagnosticoLead | null
}

type Action =
  | { type: "START_QUIZ" }
  | { type: "ANSWER"; id: QuestionId; value: string }
  | { type: "BACK" }
  | {
      type: "SUBMIT_LEAD"
      lead: QualifiedDiagnosticoLead
      score: number
      classification: Classification
    }
  | { type: "FINISH_ANALYSIS" }
  | { type: "BACK_TO_LANDING" }

const initialState: DiagnosticoState = {
  step: "landing",
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
    tipo_negocio: answers.p2 ?? "",
    objetivo: answers.p4 ?? "",
    prazo: answers.p5 ?? "",
    investimento: answers.p7 ?? "",
    possui_site: answers.p3 ?? "",
    decisor: answers.p6 ?? "",
    momento_negocio: answers.p8 ?? "",
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

function splitCidadeEstado(value?: string) {
  const normalized = value?.trim() ?? ""
  if (!normalized) return { cidade: "", estado: "" }

  const match = normalized.match(/^(.*?)(?:\s*[-/,]\s*)([A-Za-z]{2})$/)
  if (!match) return { cidade: normalized, estado: "" }

  return {
    cidade: match[1].trim(),
    estado: match[2].toUpperCase(),
  }
}

function buildSheetPayload(
  lead: DiagnosticoLead,
  answers: Answers,
  score: number,
  classification: Classification,
): DiagnosticoLeadSheetPayload {
  const { cidade, estado } = splitCidadeEstado(lead.cidade)

  return {
    nome: lead.nome,
    whatsapp: lead.whatsapp,
    email: lead.email ?? "",
    empresa: lead.empresa ?? "",
    cidade,
    estado,
    tipo_negocio: answers.p2 ?? "",
    possui_site: answers.p3 ?? "",
    objetivo: answers.p4 ?? "",
    prazo: answers.p5 ?? "",
    decisor: answers.p6 ?? "",
    investimento: answers.p7 ?? "",
    momento_negocio: answers.p8 ?? "",
    score,
    temperatura: classification,
    mensagem_whatsapp: buildWhatsAppMessage(answers),
    ...getAttributionParams(),
  }
}

function reducer(state: DiagnosticoState, action: Action): DiagnosticoState {
  switch (action.type) {
    case "START_QUIZ":
      return { ...state, step: "quiz", questionIndex: 0 }
    case "ANSWER":
      return {
        ...state,
        answers: { ...state.answers, [action.id]: action.value },
        questionIndex: state.questionIndex + 1,
      }
    case "BACK":
      return state.questionIndex === 0
        ? { ...state, step: "landing" }
        : { ...state, questionIndex: state.questionIndex - 1 }
    case "SUBMIT_LEAD":
      return {
        ...state,
        step: "analisando",
        lead: action.lead,
        score: action.score,
        classification: action.classification,
      }
    case "FINISH_ANALYSIS":
      return { ...state, step: "resultado" }
    case "BACK_TO_LANDING":
      return { ...state, step: "landing" }
    default:
      return state
  }
}

export default function DiagnosticoPage() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [scrollToPortfolio, setScrollToPortfolio] = useState(false)
  const viewContentTrackedRef = useRef(false)
  const quizStartTrackedRef = useRef(false)
  const leadSubmittedRef = useRef(false)

  useEffect(() => {
    if (viewContentTrackedRef.current) return
    viewContentTrackedRef.current = true
    trackDiagnosticoViewContent()
  }, [])

  const handleStart = useCallback(() => {
    if (!quizStartTrackedRef.current) {
      quizStartTrackedRef.current = true
      trackQuizStart()
    }
    dispatch({ type: "START_QUIZ" })
  }, [])
  const handleAnswer = useCallback(
    (id: QuestionId, value: string) => dispatch({ type: "ANSWER", id, value }),
    [],
  )
  const handleBack = useCallback(() => dispatch({ type: "BACK" }), [])

  const handleSubmitForm = useCallback(
    (lead: DiagnosticoLead) => {
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

      dispatch({ type: "SUBMIT_LEAD", lead: qualifiedLead, score, classification })
      console.log("[Meta Pixel] Lead fired from diagnostico submit")
      pushDataLayerEvent("lead_submit", dataLayerParams)
      trackDiagnosticoLead(eventParams)

      if (classification === "morno" || classification === "quente") {
        pushDataLayerEvent("qualified_lead", dataLayerParams)
        trackQualifiedLead(eventParams)
      }

      // Fire-and-forget — não bloqueia a transição para a tela "Analisando".
      void onLeadComplete(sheetPayload)
    },
    [state.answers],
  )

  const handleFinishAnalysis = useCallback(() => dispatch({ type: "FINISH_ANALYSIS" }), [])

  const handleViewPortfolio = useCallback(() => {
    setScrollToPortfolio(true)
    dispatch({ type: "BACK_TO_LANDING" })
  }, [])

  const handleScrolled = useCallback(() => setScrollToPortfolio(false), [])

  if (state.step === "quiz") {
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

  if (state.step === "analisando") {
    return <DiagnosticoAnalisando onDone={handleFinishAnalysis} />
  }

  if (state.step === "resultado" && state.lead && state.classification) {
    return (
      <DiagnosticoResultado
        classification={state.classification}
        whatsAppUrl={buildWhatsAppUrl(state.answers)}
        onViewPortfolio={handleViewPortfolio}
      />
    )
  }

  return (
    <>
      <Header pixelContentName="WhatsApp Header - Diagnóstico" />
      <DiagnosticoLanding
        onStart={handleStart}
        scrollToPortfolio={scrollToPortfolio}
        onScrolled={handleScrolled}
      />
      <Footer />
      <WhatsAppButton pixelContentName="WhatsApp Flutuante - Diagnóstico" />
    </>
  )
}
