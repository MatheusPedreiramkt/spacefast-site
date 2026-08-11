// Funções centralizadas de rastreamento.
// Seguras para SSR — nenhum acesso a `window` no escopo do módulo.
// Importe e chame apenas em event handlers ou useEffect (componentes client).

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

type Params = Record<string, unknown>

// ─── Wrappers internos ────────────────────────────────────────────────────────

export function pushDataLayerEvent(event: string, params?: Params) {
  if (typeof window === "undefined") return

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event,
    ...(params ?? {}),
  })
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
 * Eventos de WhatsApp serão configurados separadamente no GTM.
 */
export function trackWhatsAppClick(source = "generic", params?: Params) {
  void source
  void params
}

/**
 * Clique no link do Instagram.
 */
export function trackInstagramClick() {
  pushDataLayerEvent("instagram_click")
}

/**
 * Envio de formulário.
 * Eventos de formulário serão configurados separadamente no GTM.
 */
export function trackFormSubmit(formName = "contato") {
  void formName
}

/**
 * Usuário rolou 75% da página — dispara uma vez por sessão.
 */
export function trackScroll75() {
  if (!once("sf_scroll75")) return
  pushDataLayerEvent("scroll_75")
}

/**
 * Progresso do vídeo do Hero (Home) — dispara apenas uma vez por sessão.
 */
export function trackHeroVideoEvent(
  event: "hero_video_play" | "hero_video_25" | "hero_video_50" | "hero_video_75" | "hero_video_complete",
) {
  if (!once(`sf_${event}`)) return
  pushDataLayerEvent(event)
}

/**
 * Clique em "Ver Projeto" no portfólio.
 */
export function trackPortfolioClick(projectName: string) {
  pushDataLayerEvent("portfolio_click", { project_name: projectName })
}

/**
 * Clique em "Solicitar orçamento" ou "Plano mensal".
 */
export function trackPlanClick(planName: string) {
  pushDataLayerEvent("plan_click", { plan_name: planName })
}

// ─── Funções genéricas reutilizáveis ─────────────────────────────────────────

export function trackCustomEvent(eventName: string, params?: Params) {
  pushDataLayerEvent(eventName, params)
}

/**
 * Envio do formulário "Solicitar análise do meu projeto" (Home).
 * Eventos de formulário serão configurados separadamente no GTM.
 */
export function trackAnaliseProjetoLead(params?: Params, eventId?: string) {
  void params
  void eventId
}

/**
 * Visualização da página /criacao-de-sites — evento de topo de funil para
 * mensuração dentro do GTM.
 */
export function trackCriacaoSitesView() {
  pushDataLayerEvent("criacao_sites_view")
}

/**
 * Conversão principal da landing page /criacao-de-sites: envio bem-sucedido
 * do formulário curto de orçamento. Disparado somente após confirmação do
 * backend — nunca ao simples clique no botão.
 * Eventos de formulário serão configurados separadamente no GTM.
 */
export function trackOrcamentoSiteLead(params?: Params, eventId?: string) {
  void params
  void eventId
}
