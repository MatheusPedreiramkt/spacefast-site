import type { DiagnosticoLeadSheetPayload } from "@/lib/diagnostico"

export const runtime = "nodejs"

// Esta rota só repassa o payload para o webhook do Google Sheets — o mesmo
// lead_id é enviado duas vezes (status "iniciou_diagnostico" e depois
// "finalizou_diagnostico"). O Apps Script que recebe o webhook precisa
// localizar a linha pelo lead_id e atualizá-la na segunda chamada, em vez de
// sempre adicionar uma linha nova.

type SheetField = keyof DiagnosticoLeadSheetPayload

function stringValue(value: unknown): string {
  return typeof value === "string" ? value : ""
}

function numberValue(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0
}

function normalizePayload(body: unknown): DiagnosticoLeadSheetPayload {
  const input = body && typeof body === "object" ? (body as Partial<Record<SheetField, unknown>>) : {}

  return {
    lead_id: stringValue(input.lead_id),
    status: stringValue(input.status) as DiagnosticoLeadSheetPayload["status"],
    nome: stringValue(input.nome),
    whatsapp: stringValue(input.whatsapp),
    email: stringValue(input.email),
    empresa: stringValue(input.empresa),
    cidade: stringValue(input.cidade),
    estado: stringValue(input.estado),
    tipo_negocio: stringValue(input.tipo_negocio),
    possui_site: stringValue(input.possui_site),
    objetivo: stringValue(input.objetivo),
    prazo: stringValue(input.prazo),
    decisor: stringValue(input.decisor),
    investimento: stringValue(input.investimento),
    momento_negocio: stringValue(input.momento_negocio),
    score: numberValue(input.score),
    temperatura: stringValue(input.temperatura) as DiagnosticoLeadSheetPayload["temperatura"],
    mensagem_whatsapp: stringValue(input.mensagem_whatsapp),
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
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL

  let payload: DiagnosticoLeadSheetPayload
  try {
    payload = normalizePayload(await request.json())
  } catch (error) {
    console.error("[diagnostico-leads] payload inválido", error)
    return Response.json({ ok: false }, { status: 400 })
  }

  if (!webhookUrl) {
    console.error("[diagnostico-leads] GOOGLE_SHEETS_WEBHOOK_URL não configurada")
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
    console.error("[diagnostico-leads] falha ao enviar lead para Google Sheets", error)
    return Response.json({ ok: true, forwarded: false })
  }
}
