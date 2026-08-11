// Compatibilidade para os botões existentes de WhatsApp.
// O tracking de WhatsApp será configurado separadamente no GTM.

export function captureAndPersistClickData(): null {
  return null
}

export function trackWhatsAppRedirect(): string {
  return ""
}

export function openWhatsAppWithTracking(message: string, whatsappNumber: string) {
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
  window.open(url, "_blank", "noopener,noreferrer")
}
