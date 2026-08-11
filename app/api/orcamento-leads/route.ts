import {
  ORCAMENTO_LEAD_DEFAULT_STATUS,
  ORCAMENTO_LEAD_ORIGIN,
  type OrcamentoLeadPayload,
  validateOrcamentoLeadPayload,
} from "@/lib/orcamentoLead"

export const runtime = "nodejs"

const WEBHOOK_TIMEOUT_MS = 10000

type PayloadField = keyof OrcamentoLeadPayload

function stringValue(value: unknown): string {
  return typeof value === "string" ? value.trim() : ""
}

function normalizePayload(body: unknown): OrcamentoLeadPayload {
  const input = body && typeof body === "object" ? (body as Partial<Record<PayloadField, unknown>>) : {}

  return {
    lead_id: stringValue(input.lead_id),
    nome: stringValue(input.nome),
    whatsapp: stringValue(input.whatsapp),
    interesse: stringValue(input.interesse),
    origem: stringValue(input.origem) || ORCAMENTO_LEAD_ORIGIN,
    pagina: stringValue(input.pagina),
    utm_source: stringValue(input.utm_source),
    utm_medium: stringValue(input.utm_medium),
    utm_campaign: stringValue(input.utm_campaign),
    utm_term: stringValue(input.utm_term),
    utm_content: stringValue(input.utm_content),
    gclid: stringValue(input.gclid),
    gbraid: stringValue(input.gbraid),
    wbraid: stringValue(input.wbraid),
    status: stringValue(input.status) || ORCAMENTO_LEAD_DEFAULT_STATUS,
  }
}

async function postToWebhook(webhookUrl: string, payload: OrcamentoLeadPayload) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS)

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new Error(`webhook_http_${response.status}`)
    }

    const data = (await response.json().catch(() => null)) as { ok?: unknown } | null
    if (data?.ok !== true) {
      throw new Error("webhook_ok_false")
    }
  } finally {
    clearTimeout(timeout)
  }
}

export async function POST(request: Request) {
  const webhookUrl = process.env.ORCAMENTO_LEADS_WEBHOOK_URL

  if (!webhookUrl) {
    console.error("[orcamento-leads] ORCAMENTO_LEADS_WEBHOOK_URL não configurada")
    return Response.json({ ok: false, error: "webhook_not_configured" }, { status: 500 })
  }

  let payload: OrcamentoLeadPayload
  try {
    payload = normalizePayload(await request.json())
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 })
  }

  const validationError = validateOrcamentoLeadPayload(payload)
  if (validationError) {
    return Response.json({ ok: false, error: validationError }, { status: 400 })
  }

  try {
    await postToWebhook(webhookUrl, payload)
    return Response.json({ ok: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown_error"
    console.error("[orcamento-leads] falha ao salvar lead", message)
    return Response.json({ ok: false, error: "webhook_failed" }, { status: 502 })
  }
}
