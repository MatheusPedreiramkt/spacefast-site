import type { AnaliseProjetoPayload } from "@/lib/analiseProjeto"
import {
  buildFbcFromFbclid,
  getClientIpFromRequest,
  getFbpFbcFromCookies,
  sendMetaConversionEvent,
} from "@/lib/meta/conversions-api"

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

function extractFbclidFromUrl(url: string): string | undefined {
  if (!url) return undefined
  try {
    return new URL(url).searchParams.get("fbclid") ?? undefined
  } catch {
    return undefined
  }
}

// Envia o lead (Lead) para a Meta Conversions API, reaproveitando o mesmo
// event_id gerado no navegador para o Pixel — permite à Meta deduplicar os
// dois disparos do mesmo evento. Nunca lança: sendMetaConversionEvent já
// captura seus próprios erros.
async function sendCapiEvent(request: Request, payload: AnaliseProjetoPayload) {
  if (!payload.event_id) return

  const { fbp, fbc: cookieFbc } = getFbpFbcFromCookies(request)
  const fbclid = extractFbclidFromUrl(payload.pagina)
  const fbc = cookieFbc || (fbclid ? buildFbcFromFbclid(fbclid) : undefined)

  await sendMetaConversionEvent({
    eventName: "Lead",
    eventId: payload.event_id,
    eventSourceUrl: payload.pagina,
    userData: {
      whatsapp: payload.whatsapp,
      nome: payload.nome,
      fbp,
      fbc,
      clientIpAddress: getClientIpFromRequest(request),
      clientUserAgent: request.headers.get("user-agent") ?? undefined,
    },
    customData: {
      lead_id: payload.lead_id,
      content_name: "Análise de Projeto",
      empresa: payload.empresa,
      segmento: payload.segmento,
      situacao: payload.situacao,
      solucao: payload.solucao,
      pagina: payload.pagina,
      utm_source: payload.utm_source,
      utm_medium: payload.utm_medium,
      utm_campaign: payload.utm_campaign,
      utm_content: payload.utm_content,
      utm_term: payload.utm_term,
      placement: payload.placement,
    },
  })
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

  const capiPromise = sendCapiEvent(request, payload).catch((error) => {
    console.error("[analise-projeto] falha inesperada ao enviar evento para a Meta CAPI", error)
  })

  if (!webhookUrl) {
    console.error("[analise-projeto] ANALISE_PROJETO_WEBHOOK_URL não configurada")
    await capiPromise
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

    await capiPromise
    return Response.json({ ok: true, forwarded: true })
  } catch (error) {
    console.error("[analise-projeto] falha ao enviar lead para Google Sheets", error)
    await capiPromise
    return Response.json({ ok: true, forwarded: false })
  }
}
