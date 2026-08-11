export const ORCAMENTO_LEAD_ORIGIN = "Landing Criação de Sites"
export const ORCAMENTO_LEAD_DEFAULT_STATUS = "Novo"

const VALID_BRAZILIAN_DDDS = new Set([
  "11", "12", "13", "14", "15", "16", "17", "18", "19",
  "21", "22", "24", "27", "28",
  "31", "32", "33", "34", "35", "37", "38",
  "41", "42", "43", "44", "45", "46", "47", "48", "49",
  "51", "53", "54", "55",
  "61", "62", "63", "64", "65", "66", "67", "68", "69",
  "71", "73", "74", "75", "77", "79",
  "81", "82", "83", "84", "85", "86", "87", "88", "89",
  "91", "92", "93", "94", "95", "96", "97", "98", "99",
])

export interface OrcamentoLeadPayload {
  lead_id: string
  nome: string
  whatsapp: string
  interesse: string
  origem: string
  pagina: string
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_term: string
  utm_content: string
  gclid: string
  gbraid: string
  wbraid: string
  status: string
}

export function onlyDigits(value: string): string {
  return value.replace(/\D/g, "")
}

export function generateLeadId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID()
  }
  return `id_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
}

export function isValidLeadId(leadId: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(leadId)
}

export function isValidBrazilianMobile(raw: string): boolean {
  const digits = onlyDigits(raw)
  if (digits.length !== 11) return false

  const ddd = digits.slice(0, 2)
  const subscriberNumber = digits.slice(2)
  if (!VALID_BRAZILIAN_DDDS.has(ddd)) return false
  if (!subscriberNumber.startsWith("9")) return false

  const uniqueFullDigits = new Set(digits)
  if (uniqueFullDigits.size === 1) return false

  const digitCounts = new Map<string, number>()
  for (const digit of subscriberNumber) {
    digitCounts.set(digit, (digitCounts.get(digit) ?? 0) + 1)
  }

  const highestRepeatedCount = Math.max(...digitCounts.values())
  return highestRepeatedCount < 8
}

export function validateOrcamentoLeadPayload(payload: OrcamentoLeadPayload): string | null {
  const nome = payload.nome.trim()
  const interesse = payload.interesse.trim()

  if (!isValidLeadId(payload.lead_id)) return "lead_id inválido"
  if (nome.length < 2 || nome.length > 120) return "nome inválido"
  if (!isValidBrazilianMobile(payload.whatsapp)) return "whatsapp inválido"
  if (interesse.length < 2 || interesse.length > 120) return "interesse inválido"

  return null
}

export async function syncOrcamentoLead(
  payload: OrcamentoLeadPayload,
  timeoutMs = 10000,
): Promise<boolean> {
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch("/api/orcamento-leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    if (!response.ok) return false

    const data = (await response.json().catch(() => null)) as { ok?: unknown } | null
    return data?.ok === true
  } catch {
    return false
  } finally {
    window.clearTimeout(timeout)
  }
}
