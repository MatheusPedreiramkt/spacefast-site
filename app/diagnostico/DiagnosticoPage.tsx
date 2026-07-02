"use client"

import { useCallback, useReducer, useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import WhatsAppButton from "@/components/WhatsAppButton"
import DiagnosticoLanding from "@/components/diagnostico/DiagnosticoLanding"
import DiagnosticoQuiz from "@/components/diagnostico/DiagnosticoQuiz"
import DiagnosticoAnalisando from "@/components/diagnostico/DiagnosticoAnalisando"
import DiagnosticoResultado from "@/components/diagnostico/DiagnosticoResultado"
import { trackFormSubmit } from "@/lib/analytics"
import {
  computeScore,
  classify,
  buildWhatsAppUrl,
  onLeadComplete,
  QUESTIONS,
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
  | { type: "START_FORM" }
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

function reducer(state: DiagnosticoState, action: Action): DiagnosticoState {
  switch (action.type) {
    case "START_QUIZ":
      return { ...state, step: "quiz", questionIndex: 0 }
    case "START_FORM":
      return { ...state, step: "quiz", questionIndex: QUESTIONS.length }
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

  const handleStart = useCallback(() => dispatch({ type: "START_QUIZ" }), [])
  const handleStartForm = useCallback(() => dispatch({ type: "START_FORM" }), [])
  const handleAnswer = useCallback(
    (id: QuestionId, value: string) => dispatch({ type: "ANSWER", id, value }),
    [],
  )
  const handleBack = useCallback(() => dispatch({ type: "BACK" }), [])

  const handleSubmitForm = useCallback(
    (lead: DiagnosticoLead) => {
      const score = computeScore(state.answers)
      const classification = classify(score)
      dispatch({ type: "SUBMIT_LEAD", lead, score, classification })
      trackFormSubmit("diagnostico")
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
      <Header />
      <DiagnosticoLanding
        onStart={handleStart}
        onStartForm={handleStartForm}
        scrollToPortfolio={scrollToPortfolio}
        onScrolled={handleScrolled}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
