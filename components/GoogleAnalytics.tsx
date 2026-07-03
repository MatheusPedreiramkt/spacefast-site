"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import Script from "next/script"

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

type WindowWithGtag = Window & {
  gtag?: (...args: unknown[]) => void
}

export function GoogleAnalytics() {
  const pathname = usePathname()
  const previousPathname = useRef<string | null>(null)

  useEffect(() => {
    if (!GA_ID || !pathname) return

    if (previousPathname.current === null) {
      previousPathname.current = pathname
      return
    }

    if (previousPathname.current === pathname) return
    previousPathname.current = pathname

    ;(window as WindowWithGtag).gtag?.("config", GA_ID, {
      page_path: pathname,
    })
  }, [pathname])

  if (!GA_ID) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  )
}
