"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import {
  GameController,
  Trophy,
  Fire,
  Calendar,
  Heart,
  Drop,
  Lightning,
  Sparkle,
  SignOut,
  ArrowClockwise,
  Star,
  Users,
} from "@phosphor-icons/react"
import type { User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"

interface ChildLink {
  id: string
  child_user_id: string
  child_name: string
}

interface ParentStats {
  gameStats: Record<string, number>
  totalGamesPlayed: number
  totalRewards: number
  favoriteGame: string
  dailySessions: Record<string, number>
  currentStreak: number
  petState: {
    hunger: number
    happiness: number
    energy: number
    hygiene: number
    evolutionPoints: number
  } | null
  isLoading: boolean
}

const GAME_LABELS: Record<string, string> = {
  maze: "Labirynt",
  matching: "Memory",
  dots: "Łączenie kropek",
  drawing: "Rysowanie",
  letters: "Literki",
  tracing: "Szlaczki",
  coloring: "Kolorowanie",
}

function dateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
}

function calculateStreak(daysWithGames: Set<string>): number {
  if (daysWithGames.size === 0) return 0
  let streak = 0
  const now = new Date()
  for (let i = 0; i < 365; i++) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    const key = dateKey(date)
    if (daysWithGames.has(key)) {
      streak++
    } else {
      if (i === 0) continue
      break
    }
  }
  return streak
}

export function Dashboard({
  user,
  onLogout,
}: {
  user: User
  onLogout: () => void
}) {
  const [children, setChildren] = useState<ChildLink[]>([])
  const [selectedChild, setSelectedChild] = useState<ChildLink | null>(null)
  const [loadingChildren, setLoadingChildren] = useState(true)
  const [stats, setStats] = useState<ParentStats>({
    gameStats: {},
    totalGamesPlayed: 0,
    totalRewards: 0,
    favoriteGame: "",
    dailySessions: {},
    currentStreak: 0,
    petState: null,
    isLoading: false,
  })

  // Load children linked to this parent
  useEffect(() => {
    async function loadChildren() {
      const { data } = await supabase
        .from("parent_links")
        .select("id, child_user_id, child_name")
        .eq("parent_email", user.email ?? "")
        .order("created_at", { ascending: true })

      const list = (data ?? []) as ChildLink[]
      setChildren(list)
      if (list.length > 0) {
        setSelectedChild(list[0])
      }
      setLoadingChildren(false)
    }
    loadChildren()
  }, [user.email])

  const loadStats = useCallback(
    async (childUserId: string) => {
      setStats((prev) => ({ ...prev, isLoading: true }))

      try {
        const [gameStartRes, rewardRes, petRes] = await Promise.all([
          supabase
            .from("analytics_events")
            .select("parameters, created_at")
            .eq("user_id", childUserId)
            .eq("event_name", "game_start"),
          supabase
            .from("analytics_events")
            .select("id")
            .eq("user_id", childUserId)
            .eq("event_name", "reward_earned"),
          supabase
            .from("pet_states")
            .select("hunger, happiness, energy, hygiene, evolution_points")
            .eq("user_id", childUserId)
            .maybeSingle(),
        ])

        const gameCount: Record<string, number> = {}
        const dailyMap: Record<string, number> = {}
        const daysWithGames = new Set<string>()

        for (const event of gameStartRes.data ?? []) {
          const params = event.parameters as Record<string, string> | null
          if (params?.game_name) {
            gameCount[params.game_name] =
              (gameCount[params.game_name] ?? 0) + 1
          }
          if (event.created_at) {
            const date = new Date(event.created_at)
            const key = dateKey(date)
            dailyMap[key] = (dailyMap[key] ?? 0) + 1
            daysWithGames.add(key)
          }
        }

        let favorite = ""
        let maxPlays = 0
        for (const [game, count] of Object.entries(gameCount)) {
          if (count > maxPlays) {
            maxPlays = count
            favorite = game
          }
        }

        const last7: Record<string, number> = {}
        const now = new Date()
        for (let i = 6; i >= 0; i--) {
          const date = new Date(now)
          date.setDate(date.getDate() - i)
          const key = dateKey(date)
          last7[key] = dailyMap[key] ?? 0
        }

        const pet = petRes.data
          ? {
              hunger: petRes.data.hunger as number,
              happiness: petRes.data.happiness as number,
              energy: petRes.data.energy as number,
              hygiene: petRes.data.hygiene as number,
              evolutionPoints: (petRes.data.evolution_points as number) ?? 0,
            }
          : null

        setStats({
          gameStats: gameCount,
          totalGamesPlayed: Object.values(gameCount).reduce(
            (a, b) => a + b,
            0
          ),
          totalRewards: rewardRes.data?.length ?? 0,
          favoriteGame: favorite,
          dailySessions: last7,
          currentStreak: calculateStreak(daysWithGames),
          petState: pet,
          isLoading: false,
        })
      } catch {
        setStats((prev) => ({ ...prev, isLoading: false }))
      }
    },
    []
  )

  // Load stats when selected child changes
  useEffect(() => {
    if (selectedChild) {
      loadStats(selectedChild.child_user_id)
    }
  }, [selectedChild, loadStats])

  if (loadingChildren) {
    return (
      <div className="flex flex-col items-center gap-4 py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-200 border-t-purple-500" />
        <p className="text-sm text-text-muted">Ładowanie...</p>
      </div>
    )
  }

  if (children.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center py-20 text-center"
      >
        <Users size={48} weight="duotone" className="text-purple-300 mb-4" />
        <h2
          className="text-2xl font-bold text-text mb-2"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          Brak połączonych dzieci
        </h2>
        <p className="text-text-muted max-w-sm mb-6">
          Otwórz aplikację TaLu Kids na telefonie dziecka, wejdź w{" "}
          <strong>Ustawienia → Konto rodzica</strong> i podaj ten sam email:{" "}
          <strong>{user.email}</strong>
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-1.5 rounded-xl bg-purple-500 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-purple-600"
          >
            <ArrowClockwise size={16} weight="bold" />
            Odśwież
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 rounded-xl border-2 border-gray-100 bg-white px-4 py-2.5 text-sm font-semibold text-text-muted transition-colors hover:bg-gray-50"
          >
            <SignOut size={16} weight="bold" />
            Wyloguj
          </button>
        </div>
      </motion.div>
    )
  }

  const maxSessions = Math.max(...Object.values(stats.dailySessions), 1)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1
            className="text-3xl font-extrabold text-purple-600 sm:text-4xl"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Panel Rodzica
          </h1>
          <p className="text-sm text-text-muted mt-1">{user.email}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() =>
              selectedChild && loadStats(selectedChild.child_user_id)
            }
            className="flex items-center gap-1.5 rounded-xl border-2 border-purple-100 bg-white px-4 py-2.5 text-sm font-semibold text-purple-500 transition-colors hover:bg-purple-50"
          >
            <ArrowClockwise size={16} weight="bold" />
            Odśwież
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 rounded-xl border-2 border-gray-100 bg-white px-4 py-2.5 text-sm font-semibold text-text-muted transition-colors hover:bg-gray-50"
          >
            <SignOut size={16} weight="bold" />
            Wyloguj
          </button>
        </div>
      </div>

      {/* Child selector */}
      {children.length > 1 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {children.map((child) => (
            <button
              key={child.id}
              onClick={() => setSelectedChild(child)}
              className={`rounded-xl px-5 py-2.5 text-sm font-bold transition-all ${
                selectedChild?.id === child.id
                  ? "bg-purple-500 text-white shadow-lg shadow-purple-500/25"
                  : "bg-white border-2 border-purple-100 text-purple-500 hover:bg-purple-50"
              }`}
            >
              {child.child_name}
            </button>
          ))}
        </div>
      )}

      {/* Single child name badge */}
      {children.length === 1 && selectedChild && (
        <div className="mb-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-4 py-1.5 text-sm font-semibold text-purple-600">
            <Users size={14} weight="bold" />
            {selectedChild.child_name}
          </span>
        </div>
      )}

      {stats.isLoading ? (
        <div className="flex flex-col items-center gap-4 py-16">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-200 border-t-purple-500" />
          <p className="text-sm text-text-muted">Ładowanie statystyk...</p>
        </div>
      ) : (
        <>
          {/* Stats cards */}
          <div className="mb-6 grid gap-4 grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={
                <GameController
                  size={22}
                  weight="duotone"
                  className="text-pink-500"
                />
              }
              label="Gier zagrano"
              value={String(stats.totalGamesPlayed)}
              color="pink"
            />
            <StatCard
              icon={
                <Trophy
                  size={22}
                  weight="duotone"
                  className="text-yellow-500"
                />
              }
              label="Nagrody"
              value={String(stats.totalRewards)}
              color="yellow"
            />
            <StatCard
              icon={
                <Fire
                  size={22}
                  weight="duotone"
                  className="text-orange-500"
                />
              }
              label="Seria dni"
              value={`${stats.currentStreak}`}
              color="orange"
            />
            <StatCard
              icon={
                <Star
                  size={22}
                  weight="duotone"
                  className="text-purple-500"
                />
              }
              label="Ulubiona gra"
              value={
                (GAME_LABELS[stats.favoriteGame] ?? stats.favoriteGame) || "–"
              }
              color="purple"
              small
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Activity chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border-2 border-purple-100 bg-white p-6 shadow-sm"
            >
              <h2
                className="text-lg font-bold text-text mb-4"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                <Calendar
                  size={20}
                  weight="duotone"
                  className="inline-block mr-2 text-purple-500 -mt-0.5"
                />
                Aktywność (ostatnie 7 dni)
              </h2>
              <div className="flex items-end gap-2 h-32">
                {Object.entries(stats.dailySessions).map(([date, count]) => {
                  const dayName = new Date(date).toLocaleDateString("pl-PL", {
                    weekday: "short",
                  })
                  const height =
                    maxSessions > 0 ? (count / maxSessions) * 100 : 0
                  return (
                    <div
                      key={date}
                      className="flex flex-1 flex-col items-center gap-1"
                    >
                      <span className="text-xs font-bold text-purple-500">
                        {count > 0 ? count : ""}
                      </span>
                      <div
                        className="w-full rounded-t-lg bg-purple-100 relative"
                        style={{ height: "100px" }}
                      >
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                          className="absolute bottom-0 w-full rounded-t-lg bg-purple-400"
                        />
                      </div>
                      <span className="text-[10px] font-semibold text-text-muted uppercase">
                        {dayName}
                      </span>
                    </div>
                  )
                })}
              </div>
            </motion.div>

            {/* Pet state */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border-2 border-teal-100 bg-white p-6 shadow-sm"
            >
              <h2
                className="text-lg font-bold text-text mb-4"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                <Sparkle
                  size={20}
                  weight="duotone"
                  className="inline-block mr-2 text-teal-500 -mt-0.5"
                />
                Stan zwierzaka
              </h2>
              {stats.petState ? (
                <div className="space-y-3">
                  <PetBar
                    icon={
                      <Heart
                        size={16}
                        weight="fill"
                        className="text-pink-500"
                      />
                    }
                    label="Głód"
                    value={stats.petState.hunger}
                    color="bg-pink-400"
                  />
                  <PetBar
                    icon={
                      <Sparkle
                        size={16}
                        weight="fill"
                        className="text-yellow-500"
                      />
                    }
                    label="Szczęście"
                    value={stats.petState.happiness}
                    color="bg-yellow-400"
                  />
                  <PetBar
                    icon={
                      <Lightning
                        size={16}
                        weight="fill"
                        className="text-orange-500"
                      />
                    }
                    label="Energia"
                    value={stats.petState.energy}
                    color="bg-orange-400"
                  />
                  <PetBar
                    icon={
                      <Drop
                        size={16}
                        weight="fill"
                        className="text-blue-500"
                      />
                    }
                    label="Higiena"
                    value={stats.petState.hygiene}
                    color="bg-blue-400"
                  />
                  <div className="mt-4 rounded-xl bg-teal-50 p-3 text-center">
                    <p className="text-xs text-text-muted">Punkty ewolucji</p>
                    <p className="text-2xl font-bold text-teal-600">
                      {stats.petState.evolutionPoints}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-text-muted py-8 text-center">
                  Dziecko nie rozpoczęło jeszcze przygody ze zwierzakiem.
                </p>
              )}
            </motion.div>

            {/* Games breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl border-2 border-pink-100 bg-white p-6 shadow-sm lg:col-span-2"
            >
              <h2
                className="text-lg font-bold text-text mb-4"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                <GameController
                  size={20}
                  weight="duotone"
                  className="inline-block mr-2 text-pink-500 -mt-0.5"
                />
                Gry — szczegóły
              </h2>
              {Object.keys(stats.gameStats).length > 0 ? (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {Object.entries(stats.gameStats)
                    .sort(([, a], [, b]) => b - a)
                    .map(([game, count]) => (
                      <div
                        key={game}
                        className="flex items-center justify-between rounded-xl bg-pink-50/70 px-4 py-3"
                      >
                        <span className="text-sm font-semibold text-text">
                          {GAME_LABELS[game] ?? game}
                        </span>
                        <span className="text-sm font-bold text-pink-500">
                          {count}x
                        </span>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-sm text-text-muted py-8 text-center">
                  Brak danych o grach. Dziecko jeszcze nie grało.
                </p>
              )}
            </motion.div>
          </div>
        </>
      )}
    </motion.div>
  )
}

function StatCard({
  icon,
  label,
  value,
  color,
  small,
}: {
  icon: React.ReactNode
  label: string
  value: string
  color: string
  small?: boolean
}) {
  const bgMap: Record<string, string> = {
    pink: "bg-pink-50 border-pink-100",
    yellow: "bg-yellow-50 border-yellow-100",
    orange: "bg-orange-50 border-orange-100",
    purple: "bg-purple-50 border-purple-100",
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`rounded-2xl border-2 ${bgMap[color]} p-4 shadow-sm`}
    >
      <div className="mb-2">{icon}</div>
      <p className={`${small ? "text-base" : "text-2xl"} font-bold text-text`}>
        {value}
      </p>
      <p className="text-xs text-text-muted">{label}</p>
    </motion.div>
  )
}

function PetBar({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode
  label: string
  value: number
  color: string
}) {
  const pct = Math.round(Math.max(0, Math.min(100, value)))

  return (
    <div className="flex items-center gap-3">
      {icon}
      <div className="flex-1">
        <div className="mb-0.5 flex justify-between">
          <span className="text-xs font-semibold text-text-light">{label}</span>
          <span className="text-xs font-bold text-text">{pct}%</span>
        </div>
        <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8 }}
            className={`h-full rounded-full ${color}`}
          />
        </div>
      </div>
    </div>
  )
}
