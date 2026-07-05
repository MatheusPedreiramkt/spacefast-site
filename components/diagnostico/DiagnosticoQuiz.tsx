"use client"

import { useRef, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import { EASE } from "@/lib/motion"
import DiagnosticoProgressBar from "./DiagnosticoProgressBar"
import {
  QUESTIONS,
  TOTAL_STEPS,
  type Answers,
  type QuestionId,
  type DiagnosticoLead,
} from "@/lib/diagnostico"

const SELECT_DELAY = 320 // ms — tempo para o usuário ver a opção marcada antes de avançar

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

function isValidWhatsApp(value: string) {
  return value.replace(/\D/g, "").length >= 10
}

function LeadForm({ onSubmitForm }: { onSubmitForm: (lead: DiagnosticoLead) => void }) {
  const [fields, setFields] = useState({
    nome: "",
    whatsapp: "",
    empresa: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const hasSubmittedRef = useRef(false)
  const prefersReduced = useReducedMotion()

  function update(key: keyof typeof fields, value: string) {
    setFields((f) => ({ ...f, [key]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (hasSubmittedRef.current || isSubmitting) return

    const nextErrors: Record<string, string> = {}

    if (!fields.nome.trim()) nextErrors.nome = "Informe seu nome."
    if (!fields.whatsapp.trim()) {
      nextErrors.whatsapp = "Informe seu WhatsApp."
    } else if (!isValidWhatsApp(fields.whatsapp)) {
      nextErrors.whatsapp = "Informe um WhatsApp válido, com DDD."
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    hasSubmittedRef.current = true
    setIsSubmitting(true)

    onSubmitForm({
      nome: fields.nome.trim(),
      whatsapp: fields.whatsapp.trim(),
      empresa: fields.empresa.trim() || undefined,
    })
  }

  const inputClass =
    "w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border text-white text-[0.95rem] placeholder:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 transition-colors"

  return (
    <motion.form
      key="lead-form"
      onSubmit={handleSubmit}
      noValidate
      initial={prefersReduced ? undefined : { opacity: 0, x: 24 }}
      animate={prefersReduced ? undefined : { opacity: 1, x: 0 }}
      transition={{ duration: 0.32, ease: EASE }}
      className="flex flex-col gap-4"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug mb-1">
        Qual é o melhor contato?
      </h2>
      <p className="text-gray-500 text-sm mb-2">
        Últimos dados para prepararmos sua recomendação.
      </p>

      <div>
        <label htmlFor="df-nome" className="block text-sm text-gray-400 mb-1.5">
          Nome *
        </label>
        <input
          id="df-nome"
          type="text"
          autoComplete="name"
          value={fields.nome}
          onChange={(e) => update("nome", e.target.value)}
          className={`${inputClass} ${errors.nome ? "border-red-500/60" : "border-white/10"}`}
          aria-invalid={!!errors.nome}
          aria-describedby={errors.nome ? "df-nome-error" : undefined}
        />
        {errors.nome && (
          <p id="df-nome-error" className="text-red-400 text-xs mt-1.5">
            {errors.nome}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="df-whatsapp" className="block text-sm text-gray-400 mb-1.5">
          WhatsApp *
        </label>
        <input
          id="df-whatsapp"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="(00) 00000-0000"
          value={fields.whatsapp}
          onChange={(e) => update("whatsapp", e.target.value)}
          className={`${inputClass} ${errors.whatsapp ? "border-red-500/60" : "border-white/10"}`}
          aria-invalid={!!errors.whatsapp}
          aria-describedby={errors.whatsapp ? "df-whatsapp-error" : undefined}
        />
        {errors.whatsapp && (
          <p id="df-whatsapp-error" className="text-red-400 text-xs mt-1.5">
            {errors.whatsapp}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="df-empresa" className="block text-sm text-gray-400 mb-1.5">
          Nome da empresa
        </label>
        <input
          id="df-empresa"
          type="text"
          autoComplete="organization"
          value={fields.empresa}
          onChange={(e) => update("empresa", e.target.value)}
          className={`${inputClass} border-white/10`}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-[0.95rem] hover:from-blue-500 hover:to-cyan-400 transition-all shadow-lg shadow-blue-500/25 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
      >
        {isSubmitting ? "Enviando..." : "Ver meu resultado"}
      </button>
    </motion.form>
  )
}

export default function DiagnosticoQuiz({
  questionIndex,
  answers,
  onAnswer,
  onBack,
  onSubmitForm,
}: {
  questionIndex: number
  answers: Answers
  onAnswer: (id: QuestionId, value: string) => void
  onBack: () => void
  onSubmitForm: (lead: DiagnosticoLead) => void
}) {
  const isForm = questionIndex >= QUESTIONS.length

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
            current={questionIndex + 1}
            total={TOTAL_STEPS}
            label={isForm ? "Últimos dados" : `Pergunta ${questionIndex + 1} de ${QUESTIONS.length}`}
            onBack={onBack}
          />
        </div>

        <div className="flex-1">
          <AnimatePresence mode="wait">
            {isForm ? (
              <LeadForm onSubmitForm={onSubmitForm} />
            ) : (
              <McQuestion questionIndex={questionIndex} answers={answers} onAnswer={onAnswer} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
