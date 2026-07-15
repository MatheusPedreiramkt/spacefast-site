"use client"

import { useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import { EASE } from "@/lib/motion"
import DiagnosticoProgressBar from "./DiagnosticoProgressBar"
import { QUESTIONS, TOTAL_STEPS, type Answers, type QuestionId } from "@/lib/diagnostico"

const SELECT_DELAY = 320 // ms — tempo para o usuário ver a opção marcada antes de avançar

const inputClass =
  "w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border text-white text-[0.95rem] placeholder:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 transition-colors"

function NomeStep({ value, onSubmit }: { value: string; onSubmit: (nome: string) => void }) {
  const [nome, setNome] = useState(value)
  const [error, setError] = useState("")
  const prefersReduced = useReducedMotion()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!nome.trim()) {
      setError("Informe seu nome.")
      return
    }
    onSubmit(nome.trim())
  }

  return (
    <motion.form
      key="nome-step"
      onSubmit={handleSubmit}
      noValidate
      initial={prefersReduced ? undefined : { opacity: 0, x: 24 }}
      animate={prefersReduced ? undefined : { opacity: 1, x: 0 }}
      exit={prefersReduced ? undefined : { opacity: 0, x: -24 }}
      transition={{ duration: 0.32, ease: EASE }}
      className="flex flex-col gap-4"
    >
      <div className="mb-2">
        <h1 className="text-lg sm:text-xl font-bold text-white leading-snug mb-2">
          Diagnóstico rápido para site profissional
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed">
          Responda algumas perguntas rápidas e descubra qual estrutura faz mais sentido para sua
          empresa.
        </p>
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug mb-1">Seu nome</h2>

      <div>
        <input
          id="df-nome"
          type="text"
          autoComplete="name"
          autoFocus
          value={nome}
          onChange={(e) => {
            setNome(e.target.value)
            if (error) setError("")
          }}
          className={`${inputClass} ${error ? "border-red-500/60" : "border-white/10"}`}
          aria-invalid={!!error}
          aria-describedby={error ? "df-nome-error" : undefined}
        />
        {error && (
          <p id="df-nome-error" className="text-red-400 text-xs mt-1.5">
            {error}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="mt-2 inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-[0.95rem] hover:from-blue-500 hover:to-cyan-400 transition-all shadow-lg shadow-blue-500/25 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
      >
        Continuar
      </button>
    </motion.form>
  )
}

function isValidWhatsApp(value: string) {
  return value.replace(/\D/g, "").length >= 10
}

function WhatsappStep({ value, onSubmit }: { value: string; onSubmit: (whatsapp: string) => void }) {
  const [whatsapp, setWhatsapp] = useState(value)
  const [error, setError] = useState("")
  const prefersReduced = useReducedMotion()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!whatsapp.trim()) {
      setError("Informe seu WhatsApp.")
      return
    }
    if (!isValidWhatsApp(whatsapp)) {
      setError("Informe um WhatsApp válido, com DDD.")
      return
    }
    onSubmit(whatsapp.trim())
  }

  return (
    <motion.form
      key="whatsapp-step"
      onSubmit={handleSubmit}
      noValidate
      initial={prefersReduced ? undefined : { opacity: 0, x: 24 }}
      animate={prefersReduced ? undefined : { opacity: 1, x: 0 }}
      exit={prefersReduced ? undefined : { opacity: 0, x: -24 }}
      transition={{ duration: 0.32, ease: EASE }}
      className="flex flex-col gap-4"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug mb-1">Seu WhatsApp</h2>
      <p className="text-gray-500 text-sm mb-2">
        Vamos usar esse contato apenas para enviar sua análise e conversar sobre o site.
      </p>

      <div>
        <input
          id="df-whatsapp"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          autoFocus
          placeholder="(00) 00000-0000"
          value={whatsapp}
          onChange={(e) => {
            setWhatsapp(e.target.value)
            if (error) setError("")
          }}
          className={`${inputClass} ${error ? "border-red-500/60" : "border-white/10"}`}
          aria-invalid={!!error}
          aria-describedby={error ? "df-whatsapp-error" : undefined}
        />
        {error && (
          <p id="df-whatsapp-error" className="text-red-400 text-xs mt-1.5">
            {error}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="mt-2 inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-[0.95rem] hover:from-blue-500 hover:to-cyan-400 transition-all shadow-lg shadow-blue-500/25 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
      >
        Continuar
      </button>
    </motion.form>
  )
}

function McQuestion({
  questionIndex,
  answers,
  onAnswer,
}: {
  questionIndex: number
  answers: Answers
  onAnswer: (id: QuestionId, value: string) => void
}) {
  const question = QUESTIONS[questionIndex]
  const [pendingValue, setPendingValue] = useState<string | null>(null)
  const prefersReduced = useReducedMotion()

  const currentAnswer = pendingValue ?? answers[question.id]

  function handleSelect(value: string) {
    if (pendingValue) return
    setPendingValue(value)
    window.setTimeout(() => {
      onAnswer(question.id, value)
      setPendingValue(null)
    }, SELECT_DELAY)
  }

  return (
    <motion.div
      key={question.id}
      initial={prefersReduced ? undefined : { opacity: 0, x: 24 }}
      animate={prefersReduced ? undefined : { opacity: 1, x: 0 }}
      exit={prefersReduced ? undefined : { opacity: 0, x: -24 }}
      transition={{ duration: 0.32, ease: EASE }}
    >
      <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug mb-6">
        {question.question}
      </h2>

      <div className="flex flex-col gap-2.5" role="radiogroup" aria-label={question.question}>
        {question.options.map((opt) => {
          const isSelected = currentAnswer === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => handleSelect(opt.value)}
              className={`group flex items-center justify-between gap-3 w-full text-left px-5 py-4 rounded-2xl border transition-all duration-150 focus-visible:ring-2 focus-visible:ring-blue-400 ${
                isSelected
                  ? "border-blue-500/50 bg-blue-500/10 text-white"
                  : "border-white/10 bg-white/[0.03] text-gray-300 hover:border-white/20 hover:bg-white/[0.06] active:scale-[0.99]"
              }`}
            >
              <span className="text-[0.95rem] font-medium leading-snug">{opt.label}</span>
              <span
                className={`shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                  isSelected ? "border-blue-400 bg-blue-500" : "border-white/20"
                }`}
                aria-hidden
              >
                {isSelected && <CheckCircle2 className="w-full h-full text-white" strokeWidth={2.5} />}
              </span>
            </button>
          )
        })}
      </div>
    </motion.div>
  )
}

export default function DiagnosticoQuiz({
  step,
  questionIndex,
  nome,
  whatsapp,
  answers,
  onSubmitNome,
  onSubmitWhatsapp,
  onAnswer,
  onBack,
}: {
  step: "nome" | "whatsapp" | "quiz"
  questionIndex: number
  nome: string
  whatsapp: string
  answers: Answers
  onSubmitNome: (nome: string) => void
  onSubmitWhatsapp: (whatsapp: string) => void
  onAnswer: (id: QuestionId, value: string) => void
  onBack: () => void
}) {
  const current = step === "nome" ? 1 : step === "whatsapp" ? 2 : 2 + questionIndex + 1
  const label =
    step === "nome"
      ? "Vamos começar"
      : step === "whatsapp"
        ? "Seu contato"
        : `Pergunta ${questionIndex + 1} de ${QUESTIONS.length}`

  return (
    <section className="relative min-h-screen bg-[#030712] overflow-hidden">
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-40" />
      <div
        className="absolute inset-x-0 top-0 h-[420px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 55% at 50% -5%, rgba(59,130,246,0.14) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-xl mx-auto px-4 sm:px-6 py-8 sm:py-12 min-h-screen flex flex-col">
        <div className="mb-8">
          <DiagnosticoProgressBar
            current={current}
            total={TOTAL_STEPS}
            label={label}
            showBack={step !== "nome"}
            onBack={onBack}
          />
        </div>

        <div className="flex-1">
          <AnimatePresence mode="wait">
            {step === "nome" && <NomeStep value={nome} onSubmit={onSubmitNome} />}
            {step === "whatsapp" && <WhatsappStep value={whatsapp} onSubmit={onSubmitWhatsapp} />}
            {step === "quiz" && (
              <McQuestion questionIndex={questionIndex} answers={answers} onAnswer={onAnswer} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
