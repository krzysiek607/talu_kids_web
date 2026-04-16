"use client"

import { motion } from "framer-motion"
import { EVOLUTION_STEPS } from "@/lib/constants"
import { ArrowRight } from "@phosphor-icons/react"

const colorMap = {
  yellow: {
    bg: "bg-yellow-50",
    border: "border-yellow-300",
    text: "text-yellow-600",
    shadow: "shadow-yellow-500/10",
    badge: "bg-yellow-500",
  },
  teal: {
    bg: "bg-teal-50",
    border: "border-teal-300",
    text: "text-teal-600",
    shadow: "shadow-teal-500/10",
    badge: "bg-teal-500",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-300",
    text: "text-purple-600",
    shadow: "shadow-purple-500/10",
    badge: "bg-purple-500",
  },
  pink: {
    bg: "bg-pink-50",
    border: "border-pink-300",
    text: "text-pink-600",
    shadow: "shadow-pink-500/10",
    badge: "bg-pink-500",
  },
} as const

export function HowItWorks() {
  return (
    <section
      id="jak-to-dziala"
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-50/30 to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="inline-block rounded-full bg-pink-500 px-5 py-2 text-sm font-bold text-white uppercase tracking-wider shadow-lg shadow-pink-500/20 mb-6"
            style={{ fontFamily: "var(--font-baloo)" }}
          >
            Mechanika gry
          </span>
          <h2
            className="text-4xl font-extrabold sm:text-5xl text-pink-600 mb-4"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Od Jajka do Przyjaciela
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-text-muted">
            Każda literka i każdy szlaczek przybliża jajko do wyklucia. Zobacz,
            jak nauka staje się magiczną przygodą!
          </p>
        </motion.div>

        <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-center lg:gap-6">
          {EVOLUTION_STEPS.map((step, i) => {
            const colors = colorMap[step.color]
            return (
              <div key={step.title} className="flex items-center gap-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className={`relative w-full max-w-xs rounded-3xl border-2 ${colors.border} bg-white p-8 text-center shadow-xl ${colors.shadow} transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}
                >
                  {/* Step number */}
                  <div
                    className={`absolute -top-4 -right-4 flex h-8 w-8 items-center justify-center rounded-full ${colors.badge} text-sm font-bold text-white shadow-lg`}
                  >
                    {i + 1}
                  </div>

                  {/* Egg phase image */}
                  <motion.div
                    className={`mx-auto mb-5 flex h-28 w-28 items-center justify-center rounded-full ${colors.bg}`}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img
                      src={step.image}
                      alt={step.title}
                      className="h-24 w-24 object-contain drop-shadow-md"
                      loading="lazy"
                    />
                  </motion.div>

                  <h3
                    className={`mb-2 text-xl font-bold ${colors.text}`}
                    style={{ fontFamily: "var(--font-baloo)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-light leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>

                {/* Arrow between steps */}
                {i < EVOLUTION_STEPS.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.15 }}
                    className="hidden lg:block text-pink-300"
                  >
                    <ArrowRight size={32} weight="bold" />
                  </motion.div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
