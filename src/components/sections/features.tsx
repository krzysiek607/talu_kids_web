"use client"

import { motion } from "framer-motion"
import {
  GameController,
  PencilLine,
  Heart,
  Palette,
  ShieldCheck,
  BookOpen,
} from "@phosphor-icons/react"
import { FEATURES } from "@/lib/constants"

const iconMap = {
  GameController,
  PencilLine,
  Heart,
  Palette,
  ShieldCheck,
  BookOpen,
} as const

const colorMap = {
  pink: {
    bg: "bg-pink-50",
    icon: "bg-pink-500",
    border: "border-pink-200/60 hover:border-pink-400",
    glow: "group-hover:shadow-pink-500/15",
    iconColor: "text-white",
  },
  teal: {
    bg: "bg-teal-50",
    icon: "bg-teal-500",
    border: "border-teal-200/60 hover:border-teal-400",
    glow: "group-hover:shadow-teal-500/15",
    iconColor: "text-white",
  },
  purple: {
    bg: "bg-purple-50",
    icon: "bg-purple-500",
    border: "border-purple-200/60 hover:border-purple-400",
    glow: "group-hover:shadow-purple-500/15",
    iconColor: "text-white",
  },
  yellow: {
    bg: "bg-yellow-50",
    icon: "bg-yellow-500",
    border: "border-yellow-200/60 hover:border-yellow-400",
    glow: "group-hover:shadow-yellow-500/15",
    iconColor: "text-white",
  },
  green: {
    bg: "bg-green-50",
    icon: "bg-green-500",
    border: "border-green-200/60 hover:border-green-400",
    glow: "group-hover:shadow-green-500/15",
    iconColor: "text-white",
  },
  orange: {
    bg: "bg-orange-50",
    icon: "bg-orange-500",
    border: "border-orange-200/60 hover:border-orange-400",
    glow: "group-hover:shadow-orange-500/15",
    iconColor: "text-white",
  },
} as const

export function Features() {
  return (
    <section id="funkcje" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-50/20 to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="inline-block rounded-full bg-teal-500 px-5 py-2 text-sm font-bold text-white uppercase tracking-wider shadow-lg shadow-teal-500/20 mb-6"
            style={{ fontFamily: "var(--font-baloo)" }}
          >
            Co oferujemy
          </span>
          <h2
            className="text-4xl font-extrabold sm:text-5xl text-teal-600 mb-4"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Świat pełen przygód i nauki
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-text-muted">
            Każdy dzień z TaLu Kids to nowa przygoda. 20+ gier edukacyjnych,
            nauka polskiego alfabetu, 5 zwierzaków do wyklucia i tryb Przygoda z 11 rozdziałami.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => {
            const Icon = iconMap[feature.icon]
            const colors = colorMap[feature.color]

            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`group relative rounded-3xl border ${colors.border} bg-white/70 backdrop-blur-sm p-8 transition-all duration-300 hover:-translate-y-2 hover:bg-white/90 hover:shadow-2xl ${colors.glow} cursor-default`}
              >
                <div
                  className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${colors.icon} shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
                >
                  <Icon size={28} weight="duotone" className={colors.iconColor} />
                </div>

                <h3
                  className="mb-2 text-xl font-bold text-text"
                  style={{ fontFamily: "var(--font-fredoka)" }}
                >
                  {feature.title}
                </h3>
                <p className="text-sm text-text-light leading-relaxed">
                  {feature.description}
                </p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
