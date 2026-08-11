// ─── Config central da seção "Solicitar análise do meu projeto" (Home) ───────

export interface SelectOption {
  value: string
  label: string
}

export const SITUACOES: SelectOption[] = [
  { value: "sem_site", label: "Ainda não temos um site" },
  { value: "modernizar", label: "Já temos, mas queremos modernizar" },
  { value: "vender_online", label: "Precisamos vender produtos pela internet" },
  { value: "personalizado", label: "Precisamos de uma solução personalizada" },
]

export const SOLUCOES: SelectOption[] = [
  { value: "site_institucional", label: "Site institucional" },
  { value: "landing_page", label: "Landing page" },
  { value: "catalogo", label: "Catálogo online" },
  { value: "loja_virtual", label: "Loja virtual" },
  { value: "sistema_personalizado", label: "Sistema personalizado" },
  { value: "nao_sei", label: "Ainda não sei / preciso de orientação" },
]

export function labelForSituacao(value: string): string {
  return SITUACOES.find((s) => s.value === value)?.label ?? ""
}

export function labelForSolucao(value: string): string {
  return SOLUCOES.find((s) => s.value === value)?.label ?? ""
}

// Payload enviado para a planilha via webhook do Google Sheets.
export interface AnaliseProjetoPayload {
  lead_id: string
  event_id: string
  nome: string
  whatsapp: string
  empresa: string
  segmento: string
  situacao: string
  solucao: string
  link_site_atual: string
  descricao: string
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_content: string
  utm_term: string
  placement: string
  pagina: string
}

export function generateId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID()
  }
  return `id_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
}

// Retorna se a rota respondeu com sucesso depois que /api/analise-projeto
// confirmar o registro do lead.
export async function syncAnaliseProjeto(payload: AnaliseProjetoPayload): Promise<boolean> {
  try {
    const response = await fetch("/api/analise-projeto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    })
    return response.ok
  } catch {
    return false
  }
}
