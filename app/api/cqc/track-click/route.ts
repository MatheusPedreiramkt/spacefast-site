export const runtime = "nodejs"

interface TrackClickBody {
  code?: string
  fbclid?: string
  fbc?: string
  fbp?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
  utm_id?: string
  ad_id?: string
  adset_id?: string
  placement?: string
  page_url?: string
  user_agent?: string
}

function stringValue(value: unknown): string {
  return typeof value === "string" ? value : ""
}

export async function POST(request: Request) {
  const appsScriptUrl = process.env.CQC_APPS_SCRIPT_URL
  const secret = process.env.CQC_TRACKING_SECRET

  let body: TrackClickBody
  try {
    body = await request.json()
  } catch (error) {
    console.error("[cqc/track-click] payload inválido", error)
    return Response.json({ ok: false }, { status: 400 })
  }

  const code = stringValue(body.code)
  if (!code) {
    return Response.json({ ok: false, error: "code obrigatório" }, { status: 400 })
  }

  if (!appsScriptUrl || !secret) {
    console.error("[cqc/track-click] CQC_APPS_SCRIPT_URL ou CQC_TRACKING_SECRET não configurados")
    return Response.json({ ok: true, forwarded: false })
  }

  const payload = {
    secret,
    code,
    fbclid: stringValue(body.fbclid),
    fbc: stringValue(body.fbc),
    fbp: stringValue(body.fbp),
    utm_source: stringValue(body.utm_source),
    utm_medium: stringValue(body.utm_medium),
    utm_campaign: stringValue(body.utm_campaign),
    utm_content: stringValue(body.utm_content),
    utm_term: stringValue(body.utm_term),
    utm_id: stringValue(body.utm_id),
    ad_id: stringValue(body.ad_id),
    adset_id: stringValue(body.adset_id),
    placement: stringValue(body.placement),
    page_url: stringValue(body.page_url),
    user_agent: stringValue(body.user_agent),
  }

  try {
    const response = await fetch(appsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    })

    if (!response.ok) {
      const responseText = await response.text().catch(() => "")
      throw new Error(`Apps Script retornou ${response.status}: ${responseText}`)
    }

    return Response.json({ ok: true, forwarded: true })
  } catch (error) {
    console.error("[cqc/track-click] falha ao enviar para Apps Script", error)
    return Response.json({ ok: true, forwarded: false })
  }
}
