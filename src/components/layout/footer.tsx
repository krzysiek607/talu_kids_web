"use client"

import { Envelope, Heart, Cookie } from "@phosphor-icons/react"
import Image from "next/image"
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants"
import { href } from "@/lib/utils"

export function Footer() {
  return (
    <footer className="relative border-t border-pink-100 bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-pink-50/30 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <a href={href("/")} className="flex items-center gap-2">
              <Image
                src={href("/images/talu_kids_icon.png")}
                alt="TaLu Kids"
                width={40}
                height={40}
                className="rounded-xl"
              />
              <span
                className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-teal-500 bg-clip-text text-transparent"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                {SITE_CONFIG.name}
              </span>
            </a>
            <p className="text-sm text-text-muted leading-relaxed max-w-xs">
              {SITE_CONFIG.tagline} w codziennym rozwoju. Bezpieczna edukacja
              przez zabawę dla dzieci {SITE_CONFIG.ageRange}.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3
              className="text-sm font-bold uppercase tracking-wider text-text-light"
              style={{ fontFamily: "var(--font-baloo)" }}
            >
              Nawigacja
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group text-sm text-text-muted hover:text-pink-500 transition-colors inline-flex items-center gap-1"
                  >
                    {link.label}
                    <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-pink-400">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Contact */}
          <div className="space-y-4">
            <h3
              className="text-sm font-bold uppercase tracking-wider text-text-light"
              style={{ fontFamily: "var(--font-baloo)" }}
            >
              Informacje
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={href("/panel-rodzica")}
                  className="group text-sm text-text-muted hover:text-purple-500 transition-colors inline-flex items-center gap-1"
                >
                  Panel Rodzica
                  <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-purple-400">→</span>
                </a>
              </li>
              <li>
                <a
                  href={href("/polityka-prywatnosci")}
                  className="group text-sm text-text-muted hover:text-pink-500 transition-colors inline-flex items-center gap-1"
                >
                  Polityka prywatności
                  <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-pink-400">→</span>
                </a>
              </li>
              <li>
                <a
                  href={href("/regulamin")}
                  className="group text-sm text-text-muted hover:text-pink-500 transition-colors inline-flex items-center gap-1"
                >
                  Regulamin
                  <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-pink-400">→</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-pink-500 transition-colors"
                >
                  <Envelope size={14} weight="bold" />
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <button
                  onClick={() => {
                    localStorage.removeItem("cookie-consent")
                    window.dispatchEvent(new CustomEvent("cookie-consent-reset"))
                  }}
                  className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-pink-500 transition-colors"
                >
                  <Cookie size={14} weight="bold" />
                  Ustawienia cookies
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-pink-50 pt-8 sm:flex-row">
          <p className="text-xs text-text-muted">{SITE_CONFIG.copyright}</p>
          <p className="flex items-center gap-1 text-xs text-text-muted">
            Stworzone z <Heart size={12} weight="fill" className="text-pink-500" /> dla
            dzieci
          </p>
        </div>
      </div>
    </footer>
  )
}
