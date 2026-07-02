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
  trackDiagnosticoLead,
  trackDiagnosticoViewContent,
  trackQualifiedLead,
  trackQuizStart,
} from "@/lib/analytics"
import {
  computeScore,
  classify,
  buildWhatsAppUrl,
  labelFor,
  onLeadComplete,
  type Answers,
  type QuestionId,
  type DiagnosticoLead,
  type Classification,
} from "@/lib/diagnostico"

type Step = "landing" | "quiz" | "analisando" | "resultado"

interface DiagnosticoState {
  step: Step
  questionIndex: number
  answers: Answers
  score: number
  classification: Classification | null
  lead: DiagnosticoLead | null
}

type Action =
  | { type: "START_QUIZ" }
  | { type: "ANSWER"; id: QuestionId; value: string }
  | { type: "BACK" }
  | { type: "SUBMIT_LEAD"; lead: DiagnosticoLead; score: number; classification: Classification }
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
  const params: Record<string, unknown> = {
    score,
    temperatura: classification,
  }

  const addAnswer = (key: string, id: QuestionId) => {
    const value = answers[id]
    if (!value) return
    params[key] = labelFor(id, value)
    params[`${key}_value`] = value
  }

  addAnswer("segmento", "p2")
  addAnswer("objetivo", "p4")
  addAnswer("prazo", "p5")
  addAnswer("orcamento", "p7")

  return params
}

function buildEventId(eventName: string) {
  return `diagnostico_${eventName}_${Date.now()}_${Math.random().toString(36).slice(2)}`
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
      const leadEventId = buildEventId("lead")

      dispatch({ type: "SUBMIT_LEAD", lead, score, classification })
      trackDiagnosticoLead(eventParams, { eventID: leadEventId })

      if (classification === "morno" || classification === "quente") {
        trackQualifiedLead(eventParams, { eventID: buildEventId("qualified_lead") })
      }

      // Fire-and-forget — não bloqueia a transição para a tela "Analisando".
      void onLeadComplete(lead, score, classification)
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
        lead={state.lead}
        whatsAppUrl={buildWhatsAppUrl(state.lead, state.answers)}
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
