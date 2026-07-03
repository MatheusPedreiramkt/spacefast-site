// Rastreamento CQC manual — captura dados de clique (fbc/fbp/UTMs) no site
// e gera um código de rastreio para casar o lead qualificado na planilha
// com os dados de atribuição do Meta Ads. Client-only.

const STORAGE_KEY = "sf_cqc_click_data"
const CODE_KEY = "sf_cqc_tracking_code"
const TTL_MS = 30 * 24 * 60 * 60 * 1000 // 30 dias
const TRACKING_ENDPOINT = "/api/cqc/track-click"

export interface CQCClickData {
  fbclid: string
  fbc: string
  fbp: string
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_content: string
  utm_term: string
  utm_id: string
  ad_id: string
  adset_id: string
  placement: string
  page_url: string
  user_agent: string
  saved_at: number
}

function readCookie(name: string): string {
  if (typeof document === "undefined") return ""
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : ""
}

function readStorage(): CQCClickData | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as CQCClickData
    if (!data.saved_at || Date.now() - data.saved_at > TTL_MS) return null
    return data
  } catch {
    return null
  }
}

function writeStorage(data: CQCClickData) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // localStorage indisponível (modo privado) — ignora
  }
}

/**
 * Captura fbclid/UTMs da URL atual e cookies _fbp/_fbc, mescla com o que já
 * está salvo (mantém dados anteriores quando a URL atual não traz novos
 * parâmetros de campanha) e persiste por 30 dias.
 */
export function captureAndPersistClickData(): CQCClickData {
  const previous = readStorage()
  const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams()

  const fbclid = params.get("fbclid") || previous?.fbclid || ""
  let fbc = readCookie("_fbc") || previous?.fbc || ""
  const fbp = readCookie("_fbp") || previous?.fbp || ""

  if (!fbc && fbclid) {
    fbc = `fb.1.${Date.now()}.${fbclid}`
  }

  const data: CQCClickData = {
    fbclid,
    fbc,
    fbp,
    utm_source: params.get("utm_source") || previous?.utm_source || "",
    utm_medium: params.get("utm_medium") || previous?.utm_medium || "",
    utm_campaign: params.get("utm_campaign") || previous?.utm_campaign || "",
    utm_content: params.get("utm_content") || previous?.utm_content || "",
    utm_term: params.get("utm_term") || previous?.utm_term || "",
    utm_id: params.get("utm_id") || previous?.utm_id || "",
    ad_id: params.get("ad_id") || previous?.ad_id || "",
    adset_id: params.get("adset_id") || previous?.adset_id || "",
    placement: params.get("placement") || previous?.placement || "",
    page_url: typeof window !== "undefined" ? window.location.href : previous?.page_url || "",
    user_agent: typeof navigator !== "undefined" ? navigator.userAgent : previous?.user_agent || "",
    saved_at: Date.now(),
  }

  writeStorage(data)
  return data
}

function getStoredClickData(): CQCClickData | null {
  return readStorage()
}

function generateTrackingCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789" // sem 0/O/1/I para evitar ambiguidade
  let code = ""
  for (let i = 0; i < 5; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return `SF-${code}`
}

export function getOrCreateTrackingCode(): string {
  try {
    const existing = window.localStorage.getItem(CODE_KEY)
    if (existing) return existing
  } catch {
    // ignora
  }

  const code = generateTrackingCode()

  try {
    window.localStorage.setItem(CODE_KEY, code)
  } catch {
    // localStorage indisponível — código ainda funciona só para esta sessão
  }

  return code
}

function sendTrackingBeacon(code: string, clickData: CQCClickData | null) {
  if (typeof window === "undefined") return

  const payload = JSON.stringify({ code, ...clickData })

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: "application/json" })
      const sent = navigator.sendBeacon(TRACKING_ENDPOINT, blob)
      if (sent) return
    }
  } catch {
    // cai para fetch abaixo
  }

  fetch(TRACKING_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    keepalive: true,
  }).catch(() => {})
}

/**
 * Gera/recupera o código de rastreio, envia os dados de atribuição para a
 * planilha (via API route interna) e retorna o código para compor a
 * mensagem do WhatsApp.
 */
export function trackWhatsAppRedirect(): string {
  const code = getOrCreateTrackingCode()
  const clickData = getStoredClickData()
  sendTrackingBeacon(code, clickData)
  return code
}

/**
 * Gera/recupera o código de rastreio, dispara o envio para a planilha e abre
 * o WhatsApp com a mensagem informada + o código de rastreio anexado.
 */
export function openWhatsAppWithTracking(message: string, whatsappNumber: string) {
  const code = trackWhatsAppRedirect()
  const fullMessage = `${message} Código: ${code}`
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(fullMessage)}`
  window.open(url, "_blank", "noopener,noreferrer")
}
