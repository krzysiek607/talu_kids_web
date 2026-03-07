"use client"

import { useState, useRef, useEffect, type FormEvent } from "react"
import { motion } from "framer-motion"
import { Envelope, PaperPlaneRight, CheckCircle, ChatCircle, WarningCircle } from "@phosphor-icons/react"
import { SITE_CONFIG } from "@/lib/constants"

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [website, setWebsite] = useState("")

  const formLoadedAt = useRef(0)

  useEffect(() => {
    formLoadedAt.current = Math.floor(Date.now() / 1000)
  }, [])

  const validate = (): string | null => {
    if (name.trim().length < 2 || name.trim().length > 100) {
      return "Imię musi mieć od 2 do 100 znaków"
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      return "Podaj prawidłowy adres email"
    }

    if (message.trim().length < 10 || message.trim().length > 5000) {
      return "Wiadomość musi mieć od 10 do 5000 znaków"
    }

    return null
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch("/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          website,
          _t: formLoadedAt.current,
        }),
      })

      const data = await res.json()

      if (data.success) {
        setIsSubmitted(true)
      } else {
        setError(data.error || "Coś poszło nie tak. Spróbuj ponownie.")
      }
    } catch {
      setError("Nie udało się wysłać wiadomości. Sprawdź połączenie internetowe lub napisz na kontakt@talukids.pl")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-2xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-500">
            <ChatCircle size={32} weight="duotone" className="text-white" />
          </div>
          <h1
            className="text-4xl font-bold text-pink-600 mb-3"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Skontaktuj się z nami
          </h1>
          <p className="text-text-muted">
            Masz pytanie lub sugestię? Chętnie pomożemy!
          </p>
        </motion.div>

        {isSubmitted ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="rounded-3xl border-2 border-green-200 bg-green-50 p-12 text-center"
          >
            <CheckCircle size={64} weight="duotone" className="mx-auto mb-4 text-green-500" />
            <h2
              className="text-2xl font-bold text-text mb-2"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Wiadomość wysłana!
            </h2>
            <p className="text-text-muted">
              Odpowiemy najszybciej jak to możliwe. Dziękujemy za kontakt!
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="rounded-3xl border-2 border-pink-100 bg-white p-8 shadow-xl shadow-pink-500/5"
          >
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-sm font-bold text-text"
                >
                  Imię
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  minLength={2}
                  maxLength={100}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Twoje imię"
                  className="w-full rounded-xl border-2 border-gray-100 bg-gray-50 px-4 py-3 text-text transition-all focus:border-pink-300 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-bold text-text"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="twoj@email.pl"
                  className="w-full rounded-xl border-2 border-gray-100 bg-gray-50 px-4 py-3 text-text transition-all focus:border-pink-300 focus:bg-white focus:outline-none"
                />
              </div>

              {/* Honeypot - ukryte pole dla botów */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-bold text-text"
                >
                  Wiadomość
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  minLength={10}
                  maxLength={5000}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Napisz do nas..."
                  className="w-full rounded-xl border-2 border-gray-100 bg-gray-50 px-4 py-3 text-text transition-all focus:border-pink-300 focus:bg-white focus:outline-none resize-none"
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4"
                  role="alert"
                  aria-live="polite"
                >
                  <WarningCircle size={20} weight="bold" className="shrink-0 text-red-500 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-pink-500 px-8 py-4 font-bold text-white shadow-lg shadow-pink-500/25 transition-all hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] disabled:opacity-70"
                style={{ fontFamily: "var(--font-baloo)" }}
              >
                {isLoading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <>
                    Wyślij wiadomość
                    <PaperPlaneRight size={16} weight="bold" />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm text-text-muted">
            Możesz też napisać bezpośrednio na{" "}
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="inline-flex items-center gap-1 text-pink-500 hover:underline font-semibold"
            >
              <Envelope size={14} weight="bold" />
              {SITE_CONFIG.email}
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
