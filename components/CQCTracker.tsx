"use client"

import { useEffect } from "react"
import { captureAndPersistClickData } from "@/lib/cqc"

/** Captura fbclid/UTMs/fbp/fbc da URL de entrada e salva no localStorage (30 dias). */
export default function CQCTracker() {
  useEffect(() => {
    captureAndPersistClickData()
  }, [])

  return null
}
