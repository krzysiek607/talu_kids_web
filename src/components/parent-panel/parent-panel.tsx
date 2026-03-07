"use client"

import { useState, useEffect } from "react"
import type { User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"
import { LoginForm } from "./login-form"
import { Dashboard } from "./dashboard"

export function ParentPanel() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-200 border-t-purple-500" />
      </div>
    )
  }

  return (
    <main className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-purple-50/40 via-white to-pink-50/30">
      <div className="mx-auto max-w-5xl px-6">
        {user ? (
          <Dashboard user={user} onLogout={handleLogout} />
        ) : (
          <LoginForm />
        )}
      </div>
    </main>
  )
}
