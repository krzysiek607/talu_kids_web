"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { EnvelopeSimple, Lock, SignIn, ShieldCheck } from "@phosphor-icons/react"
import { supabase } from "@/lib/supabase"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    if (authError) {
      setError(mapError(authError.message))
    }

    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500 shadow-lg shadow-purple-500/25">
            <ShieldCheck size={32} weight="fill" className="text-white" />
          </div>
          <h1
            className="text-3xl font-extrabold text-purple-600 mb-2"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Panel Rodzica
          </h1>
          <p className="text-text-muted">
            Zaloguj się, aby zobaczyć postępy dziecka
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-text-light">
              Email
            </label>
            <div className="relative">
              <EnvelopeSimple
                size={18}
                weight="bold"
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400"
              />
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rodzic@email.com"
                className="w-full rounded-xl border-2 border-purple-100 bg-white py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-purple-400 placeholder:text-gray-300"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-text-light">
              Hasło
            </label>
            <div className="relative">
              <Lock
                size={18}
                weight="bold"
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400"
              />
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Twoje hasło"
                className="w-full rounded-xl border-2 border-purple-100 bg-white py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-purple-400 placeholder:text-gray-300"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-500/25 transition-all hover:bg-purple-600 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ fontFamily: "var(--font-baloo)" }}
          >
            {loading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              <>
                <SignIn size={18} weight="bold" />
                Zaloguj się
              </>
            )}
          </button>
        </form>

        {/* Help text */}
        <div className="mt-8 rounded-2xl bg-purple-50/70 border border-purple-100 p-5">
          <h3 className="text-sm font-bold text-text mb-2">Nie masz jeszcze konta?</h3>
          <p className="text-xs text-text-muted leading-relaxed">
            Otwórz aplikację TaLu Kids na telefonie, wejdź w{" "}
            <strong>Ustawienia → Konto rodzica</strong> i podaj swój email oraz hasło.
            Następnie wróć tutaj i zaloguj się tymi samymi danymi.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

function mapError(message: string): string {
  if (message.includes("Invalid login")) {
    return "Nieprawidłowy email lub hasło. Sprawdź dane i spróbuj ponownie."
  }
  if (message.includes("Email not confirmed")) {
    return "Potwierdź swój email klikając w link aktywacyjny."
  }
  return "Wystąpił błąd. Spróbuj ponownie za chwilę."
}
