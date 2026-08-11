const ATTRIBUTION_STORAGE_KEY = "sf_attribution"

export interface AttributionParams {
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_term: string
  utm_content: string
  gclid: string
  gbraid: string
  wbraid: string
}

const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "gbraid",
  "wbraid",
] as const

function emptyAttribution(): AttributionParams {
  return {
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
    gclid: "",
    gbraid: "",
    wbraid: "",
  }
}

function readStoredAttribution(): AttributionParams {
  if (typeof window === "undefined") return emptyAttribution()

  try {
    const raw = window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY)
    if (!raw) return emptyAttribution()
    const stored = JSON.parse(raw) as Partial<AttributionParams>
    return {
      ...emptyAttribution(),
      ...stored,
    }
  } catch {
    return emptyAttribution()
  }
}

function writeStoredAttribution(attribution: AttributionParams) {
  try {
    window.localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(attribution))
  } catch {
    // localStorage indisponível: os valores ainda podem ser lidos da URL atual.
  }
}

export function captureAndPersistAttribution(): AttributionParams {
  if (typeof window === "undefined") return emptyAttribution()

  const params = new URLSearchParams(window.location.search)
  const attribution = readStoredAttribution()

  for (const key of ATTRIBUTION_KEYS) {
    const value = params.get(key)
    if (value) attribution[key] = value
  }

  writeStoredAttribution(attribution)
  return attribution
}

export function getPersistedAttribution(): AttributionParams {
  if (typeof window === "undefined") return emptyAttribution()
  return captureAndPersistAttribution()
}
