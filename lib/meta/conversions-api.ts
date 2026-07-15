// ─── Meta Conversions API (server-side) ─────────────────────────────────────
// Envia eventos para a Meta em complemento ao Pixel do navegador, usando
// dados hasheados (telefone/nome) e não hasheados (fbp, fbc, IP, user agent)
// para melhorar a correspondência de eventos (EMQ).
//
// Requer META_PIXEL_ID e META_CAPI_ACCESS_TOKEN. Se qualquer um estiver
// ausente, o envio é pulado silenciosamente (nunca lança erro) — o restante
// do fluxo (planilha, redirecionamento) segue normalmente.

import { createHash } from "crypto"

const GRAPH_API_VERSION = "v20.0"

// ─── Normalização e hashing ──────────────────────────────────────────────────

export function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex")
}

/** Normaliza telefone brasileiro para dígitos com código do país (55), sem símbolos. */
export function normalizePhoneBR(whatsapp: string): string {
  const digits = whatsapp.replace(/\D/g, "")
  if (!digits) return ""
  if (digits.startsWith("55") && digits.length >= 12) return digits
  return `55${digits}`
}

export function splitName(nome: string): { firstName: string; lastName: string } {
  const parts = nome.trim().split(/\s+/).filter(Boolean)
  return {
    firstName: parts[0] ?? "",
    lastName: parts.slice(1).join(" "),
  }
}

/** lowercase, sem acentos, sem espaços/pontuação — formato esperado pela Meta antes do hash. */
function normalizeForHash(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "")
}

// ─── Captura de request (IP, user agent, fbp/fbc) ────────────────────────────

export function getClientIpFromRequest(request: Request): string | undefined {
  const forwardedFor = request.headers.get("x-forwarded-for")
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim()
    if (first) return first
  }

  const realIp = request.headers.get("x-real-ip")
  if (realIp?.trim()) return realIp.trim()

  const cfConnectingIp = request.headers.get("cf-connecting-ip")
  if (cfConnectingIp?.trim()) return cfConnectingIp.trim()

  return undefined
}

function parseCookies(cookieHeader: string | null): Record<string, string> {
  if (!cookieHeader) return {}

  const cookies: Record<string, string> = {}
  for (const pair of cookieHeader.split(";")) {
    const separatorIndex = pair.indexOf("=")
    if (separatorIndex === -1) continue
    const key = pair.slice(0, separatorIndex).trim()
    const value = pair.slice(separatorIndex + 1).trim()
    if (!key) continue
    try {
      cookies[key] = decodeURIComponent(value)
    } catch {
      cookies[key] = value
    }
  }
  return cookies
}

export function getFbpFbcFromCookies(request: Request): { fbp?: string; fbc?: string } {
  const cookies = parseCookies(request.headers.get("cookie"))
  return {
    fbp: cookies["_fbp"] || undefined,
    fbc: cookies["_fbc"] || undefined,
  }
}

/** Formato oficial esperado pela Meta quando não existe cookie _fbc: fb.1.{timestamp_ms}.{fbclid} */
export function buildFbcFromFbclid(fbclid: string): string {
  return `fb.1.${Date.now()}.${fbclid}`
}

// ─── Envio do evento ──────────────────────────────────────────────────────────

export interface MetaUserDataInput {
  whatsapp?: string
  nome?: string
  fbp?: string
  fbc?: string
  clientIpAddress?: string
  clientUserAgent?: string
}

export interface MetaConversionEventInput {
  eventName: string
  eventId: string
  eventSourceUrl?: string
  userData: MetaUserDataInput
  customData?: Record<string, unknown>
}

export interface MetaConversionResult {
  ok: boolean
  skipped?: boolean
  error?: string
}

function removeEmpty<T extends Record<string, unknown>>(data: T): Partial<T> {
  const out: Partial<T> = {}
  for (const key of Object.keys(data) as (keyof T)[]) {
    const value = data[key]
    if (value === undefined || value === null || value === "") continue
    out[key] = value
  }
  return out
}

function buildUserData(input: MetaUserDataInput): Record<string, string> {
  const userData: Record<string, string> = {}

  if (input.whatsapp) {
    const phone = normalizePhoneBR(input.whatsapp)
    if (phone) userData.ph = sha256(phone)
  }

  if (input.nome) {
    const { firstName, lastName } = splitName(input.nome)
    const normalizedFirstName = normalizeForHash(firstName)
    if (normalizedFirstName) userData.fn = sha256(normalizedFirstName)

    const normalizedLastName = normalizeForHash(lastName)
    if (normalizedLastName) userData.ln = sha256(normalizedLastName)
  }

  // fbp, fbc, IP e user agent NÃO são hasheados.
  if (input.fbp) userData.fbp = input.fbp
  if (input.fbc) userData.fbc = input.fbc
  if (input.clientIpAddress) userData.client_ip_address = input.clientIpAddress
  if (input.clientUserAgent) userData.client_user_agent = input.clientUserAgent

  return userData
}

/** Envia um evento para a Meta Conversions API. Nunca lança — falhas retornam { ok: false }. */
export async function sendMetaConversionEvent({
  eventName,
  eventId,
  eventSourceUrl,
  userData,
  customData,
}: MetaConversionEventInput): Promise<MetaConversionResult> {
  const pixelId = process.env.META_PIXEL_ID
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN
  const isDev = process.env.NODE_ENV !== "production"

  if (!pixelId || !accessToken) {
    return { ok: true, skipped: true }
  }

  const eventPayload = removeEmpty({
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    action_source: "website",
    event_source_url: eventSourceUrl,
    user_data: buildUserData(userData),
    custom_data: customData ? removeEmpty(customData) : undefined,
  })

  const body: Record<string, unknown> = {
    data: [eventPayload],
    access_token: accessToken,
  }

  const testEventCode = process.env.META_TEST_EVENT_CODE
  if (testEventCode) body.test_event_code = testEventCode

  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${pixelId}/events`

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    })

    if (!response.ok) {
      const errorText = await response.text().catch(() => "")
      if (isDev) {
        console.error(`[meta-capi] ${eventName} falhou (status ${response.status})`, errorText)
      } else {
        console.error(`[meta-capi] ${eventName} falhou (status ${response.status})`)
      }
      return { ok: false, error: `status_${response.status}` }
    }

    if (isDev) {
      console.log(`[meta-capi] ${eventName} enviado (event_id=${eventId})`)
    }

    return { ok: true }
  } catch (error) {
    if (isDev) {
      console.error(`[meta-capi] ${eventName} erro de rede`, error)
    } else {
      console.error(`[meta-capi] ${eventName} erro de rede`)
    }
    return { ok: false, error: "network_error" }
  }
}
