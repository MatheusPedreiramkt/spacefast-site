// Funções centralizadas de rastreamento.
// Seguras para SSR — nenhum acesso a `window` no escopo do módulo.
// Importe e chame apenas em event handlers ou useEffect (componentes client).

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
    dataLayer?: Record<string, unknown>[]
  }
}

type Params = Record<string, unknown>
type PixelOptions = Record<string, unknown>

// ─── Wrappers internos ────────────────────────────────────────────────────────

function ga(event: string, params?: Params) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return
  window.gtag("event", event, params ?? {})
}

function callPixel(command: "track" | "trackCustom", event: string, params?: Params, options?: PixelOptions) {
  if (typeof window === "undefined") return

  if (typeof window.fbq === "function") {
    if (options) {
      window.fbq(command, event, params ?? {}, options)
    } else {
      window.fbq(command, event, params ?? {})
    }
    return
  }

  window.setTimeout(() => {
    if (typeof window.fbq !== "function") return
    if (options) {
      window.fbq(command, event, params ?? {}, options)
    } else {
      window.fbq(command, event, params ?? {})
    }
  }, 750)
}

function pixel(event: string, params?: Params, options?: PixelOptions) {
  callPixel("track", event, params, options)
}

function pixelCustom(event: string, params?: Params, options?: PixelOptions) {
  callPixel("trackCustom", event, params, options)
}

/** Retorna true e marca na sessão — garante disparo único por session. */
function once(key: string): boolean {
  try {
    if (sessionStorage.getItem(key)) return false
    sessionStorage.setItem(key, "1")
    return true
  } catch {
    return true // sessionStorage indisponível (modo privado) → permite disparar
  }
}

// ─── API pública ──────────────────────────────────────────────────────────────

/**
 * Clique em qualquer botão de WhatsApp.
 * GA4: whatsapp_click  |  Meta: Contact
 * @param source identifica qual botão disparou (ex: "hero_cta", "botao_flutuante")
 */
export function trackWhatsAppClick(source = "generic", params?: Params) {
  const eventParams = { content_name: "WhatsApp Click", source, ...params }
  ga("whatsapp_click", { source })
  pixel("Contact", eventParams)
}

/**
 * Clique no link do Instagram.
 * GA4: instagram_click  |  Meta: ViewContent
 */
export function trackInstagramClick() {
  ga("instagram_click")
  pixel("ViewContent", { content_name: "Instagram" })
}

/**
 * Envio de formulário.
 * GA4: form_submit  |  Meta: Lead
 */
export function trackFormSubmit(formName = "contato") {
  ga("form_submit", { form_name: formName })
  pixel("Lead", { content_name: formName })
}

/**
 * Usuário rolou 75% da página — dispara uma vez por sessão.
 * GA4: scroll_75
 */
export function trackScroll75() {
  if (!once("sf_scroll75")) return
  ga("scroll_75")
}

/**
 * Clique em "Ver Projeto" no portfólio.
 * GA4: portfolio_click  |  project_name: nome do projeto
 */
export function trackPortfolioClick(projectName: string) {
  ga("portfolio_click", { project_name: projectName })
}

/**
 * Clique em "Solicitar orçamento" ou "Plano mensal".
 * GA4: plan_click  |  Meta: ViewContent
 */
export function trackPlanClick(planName: string) {
  ga("plan_click", { plan_name: planName })
  pixel("ViewContent", { content_name: planName })
}

// ─── Funções genéricas reutilizáveis ─────────────────────────────────────────

export function trackLead(params?: Params) {
  ga("generate_lead", params)
  pixel("Lead", params)
}

export function trackContact(params?: Params) {
  ga("contact", params)
  pixel("Contact", params)
}

export function trackPageView() {
  ga("page_view")
  pixel("PageView")
}

export function trackCustomEvent(eventName: string, params?: Params) {
  ga(eventName, params)
  pixelCustom(eventName, params)
}

export function trackDiagnosticoViewContent() {
  pixel("ViewContent", {
    content_name: "Diagnóstico",
    content_category: "quiz",
  })
}

export function trackQuizStart(params?: Params) {
  ga("quiz_start", params)
  pixelCustom("QuizStart", {
    content_name: "Diagnóstico",
    content_category: "quiz",
    ...params,
  })
}

export function trackDiagnosticoLead(params?: Params) {
  ga("generate_lead", params)
  pixel(
    "Lead",
    {
      content_name: "Diagnóstico",
      content_category: "quiz",
      ...params,
    },
  )
}

export function trackQualifiedLead(params?: Params) {
  ga("qualified_lead", params)
  pixelCustom(
    "QualifiedLead",
    {
      content_name: "Diagnóstico",
      content_category: "quiz",
      ...params,
    },
  )
}
