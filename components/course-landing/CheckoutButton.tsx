'use client'

import { CHECKOUT_URL } from '@/lib/course-config'
import { pushDataLayerEvent } from '@/lib/analytics'

function buildCheckoutUrl(base: string): string {
  if (typeof window === 'undefined') return base
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
  const current = new URLSearchParams(window.location.search)
  const dest = new URL(base)
  utmKeys.forEach((key) => {
    const val = current.get(key)
    if (val) dest.searchParams.set(key, val)
  })
  return dest.toString()
}

function fireEvents() {
  try {
    pushDataLayerEvent('begin_checkout')
  } catch {}
}

interface CheckoutButtonProps {
  label: string
  className?: string
  icon?: React.ReactNode
}

export default function CheckoutButton({ label, className, icon }: CheckoutButtonProps) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
    fireEvents()
    window.location.href = buildCheckoutUrl(CHECKOUT_URL)
  }

  return (
    <a
      href={CHECKOUT_URL}
      onClick={handleClick}
      rel="noopener noreferrer"
      className={className}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      {label}
    </a>
  )
}
