"use client"

import { Suspense, useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import Script from "next/script"

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

type WindowWithGtag = Window & {
  gtag?: (...args: unknown[]) => void
  __spacefastLastGaPageView?: string
}

export function GoogleAnalytics() {
  const [isReady, setIsReady] = useState(false)

  if (!GA_ID) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        onReady={() => setIsReady(true)}
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: false });
        `}
      </Script>
      <Suspense fallback={null}>
        <GoogleAnalyticsPageView isReady={isReady} />
      </Suspense>
    </>
  )
}

function GoogleAnalyticsPageView({ isReady }: { isReady: boolean }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const search = searchParams.toString()

  useEffect(() => {
    if (!GA_ID || !isReady || !pathname) return

    const pagePath = search ? `${pathname}?${search}` : pathname
    const win = window as WindowWithGtag

    if (win.__spacefastLastGaPageView === pagePath) return
    win.__spacefastLastGaPageView = pagePath

    win.gtag?.("event", "page_view", {
      page_path: pagePath,
      page_location: win.location.href,
      page_title: document.title,
    })
  }, [isReady, pathname, search])

  return null
}
