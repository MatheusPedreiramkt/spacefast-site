import type { ReactNode } from "react"

/**
 * Painel de resposta do FAQ que permanece no DOM (e no HTML do servidor)
 * mesmo fechado. O recolhimento é visual: grid-template-rows 0fr → 1fr com a
 * mesma curva (EASE de lib/motion) usada antes pelo Framer Motion.
 * Fechado, o painel fica `inert` — fora da navegação por teclado e da árvore
 * de acessibilidade, como um accordion recolhido.
 */
export function FaqPanel({
  id,
  labelledBy,
  isOpen,
  durationMs,
  children,
}: {
  id: string
  labelledBy: string
  isOpen: boolean
  durationMs: number
  children: ReactNode
}) {
  return (
    <div
      id={id}
      role="region"
      aria-labelledby={labelledBy}
      inert={!isOpen}
      style={{ transitionDuration: `${durationMs}ms` }}
      className={`grid transition-[grid-template-rows,opacity] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  )
}
