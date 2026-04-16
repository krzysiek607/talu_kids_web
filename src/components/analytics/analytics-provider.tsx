"use client"

import { useEffect, useCallback } from "react"

const CLARITY_ID = "vw9xxthfa5"
const GA4_ID = "G-NKL03J0Y87"

function loadClarity() {
  if (document.getElementById("clarity-script")) return

  const script = document.createElement("script")
  script.id = "clarity-script"
  script.innerHTML = `
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window,document,"clarity","script","${CLARITY_ID}");
  `
  document.head.appendChild(script)
}

function loadGA4() {
  if (document.getElementById("ga4-script")) return

  const gtagScript = document.createElement("script")
  gtagScript.id = "ga4-script"
  gtagScript.async = true
  gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`
  document.head.appendChild(gtagScript)

  const initScript = document.createElement("script")
  initScript.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA4_ID}');
  `
  document.head.appendChild(initScript)
}

function disableGA4() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(window as any)[`ga-disable-${GA4_ID}`] = true
}

export function AnalyticsProvider() {
  const handleConsentChange = useCallback(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (consent === "accepted") {
      loadGA4()
    } else if (consent === "declined") {
      disableGA4()
    }
  }, [])

  useEffect(() => {
    // Clarity ładuje się zawsze — nie używa cookies third-party, respektuje DNT
    loadClarity()

    // GA4 czeka na cookie consent
    handleConsentChange()

    window.addEventListener("cookie-consent-changed", handleConsentChange)
    return () => window.removeEventListener("cookie-consent-changed", handleConsentChange)
  }, [handleConsentChange])

  return null
}
