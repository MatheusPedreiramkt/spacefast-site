import type { AnaliseProjetoPayload } from "@/lib/analiseProjeto"

export const runtime = "nodejs"

type PayloadField = keyof AnaliseProjetoPayload

function stringValue(value: unknown): string {
  return typeof value === "string" ? value : ""
}

function normalizePayload(body: unknown): AnaliseProjetoPayload {
  const input = body && typeof body === "object" ? (body as Partial<Record<PayloadField, unknown>>) : {}

  return {
    lead_id: stringValue(input.lead_id),
    event_id: stringValue(input.event_id),
    nome: stringValue(input.nome),
    whatsapp: stringValue(input.whatsapp),
    empresa: stringValue(input.empresa),
    segmento: stringValue(input.segmento),
    situacao: stringValue(input.situacao),
    solucao: stringValue(input.solucao),
    link_site_atual: stringValue(input.link_site_atual),
    descricao: stringValue(input.descricao),
    utm_source: stringValue(input.utm_source),
    utm_medium: stringValue(input.utm_medium),
    utm_campaign: stringValue(input.utm_campaign),
    utm_content: stringValue(input.utm_content),
    utm_term: stringValue(input.utm_term),
    placement: stringValue(input.placement),
    pagina: stringValue(input.pagina),
  }
}

export async function POST(request: Request) {
  const webhookUrl = process.env.ANALISE_PROJETO_WEBHOOK_URL

  let payload: AnaliseProjetoPayload
  try {
    payload = normalizePayload(await request.json())
  } catch (error) {
    console.error("[analise-projeto] payload inválido", error)
    return Response.json({ ok: false }, { status: 400 })
  }

  if (!webhookUrl) {
    console.error("[analise-projeto] ANALISE_PROJETO_WEBHOOK_URL não configurada")
    return Response.json({ ok: true, forwarded: false })
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    })

    if (!response.ok) {
      const responseText = await response.text().catch(() => "")
      throw new Error(`Google Sheets webhook retornou ${response.status}: ${responseText}`)
    }

    return Response.json({ ok: true, forwarded: true })
  } catch (error) {
    console.error("[analise-projeto] falha ao enviar lead para Google Sheets", error)
    return Response.json({ ok: true, forwarded: false })
  }
}
