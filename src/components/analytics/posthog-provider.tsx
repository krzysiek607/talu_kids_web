"use client"

import { useEffect, useCallback } from "react"
import posthog from "posthog-js"

const POSTHOG_KEY = "phc_BL81wy8lEm6vrX1OVV2Y7oINDk99N1wubbhsLEVA3pg"
const POSTHOG_HOST = "https://eu.i.posthog.com"

function initPostHog() {
  if (posthog.__loaded) return

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: "identified_only",
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: false,
    disable_session_recording: true,
    persistence: "localStorage",
    respect_dnt: true,
  })
}

export function PostHogProvider() {
  const handleConsentChange = useCallback(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (consent === "accepted") {
      initPostHog()
    } else if (consent === "declined" && posthog.__loaded) {
      posthog.opt_out_capturing()
    }
  }, [])

  useEffect(() => {
    // Sprawdź consent na starcie
    handleConsentChange()

    // Nasłuchuj zmian consent (custom event z cookie-consent)
    window.addEventListener("cookie-consent-changed", handleConsentChange)
    return () => window.removeEventListener("cookie-consent-changed", handleConsentChange)
  }, [handleConsentChange])

  return null
}
