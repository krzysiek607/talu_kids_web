"use client"

import { motion } from "framer-motion"
import { Lightbulb, GameController, Gift, Heart } from "@phosphor-icons/react"

const steps = [
  {
    icon: Lightbulb,
    title: "Ciekawość",
    subtitle: "Wyzwalacz",
    description:
      "Zwierzak potrzebuje pomocy - jest głodny lub smutny. Dziecko chce pomóc swojemu pupilowi, a nie \"odrabiać lekcje\".",
    color: "text-yellow-500",
    bg: "bg-yellow-50",
    ring: "ring-yellow-200",
    badge: "bg-yellow-500",
  },
  {
    icon: GameController,
    title: "Zabawa",
    subtitle: "Nauka w akcji",
    description:
      "Krótkie, przystępne gry edukacyjne: literki, liczby, szlaczki, sekwencje. Każda trwa kilka minut - bez frustracji, z natychmiastową odpowiedzią.",
    color: "text-teal-500",
    bg: "bg-teal-50",
    ring: "ring-teal-200",
    badge: "bg-teal-500",
  },
  {
    icon: Gift,
    title: "Nagroda",
    subtitle: "Motywacja",
    description:
      "Po ukończeniu gry dziecko zdobywa smakołyki dla zwierzaka. Każda nagroda jest niespodzianką - ciastko, cukierek, lód lub czekolada.",
    color: "text-pink-500",
    bg: "bg-pink-50",
    ring: "ring-pink-200",
    badge: "bg-pink-500",
  },
  {
    icon: Heart,
    title: "Przywiązanie",
    subtitle: "Nawyk",
    description:
      "Zwierzak rośnie i ewoluuje dzięki opiece. Dziecko buduje więź emocjonalną - wraca codziennie, bo zależy mu na swoim pupilu.",
    color: "text-purple-500",
    bg: "bg-purple-50",
    ring: "ring-purple-200",
    badge: "bg-purple-500",
  },
]

export function Methodology() {
  return (
    <section id="jak-uczymy" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-50/20 to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6">
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
            Nasza metoda
          </span>
          <h2
            className="text-4xl font-extrabold sm:text-5xl text-teal-600 mb-4"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Jak uczymy przez zabawę?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-text-muted">
            Zamiast zmuszać do nauki, budujemy motywację wewnętrzną.
            Dziecko uczy się, bo chce pomóc swojemu zwierzakowi - nie dlatego,
            że ktoś mu każe.
          </p>
        </motion.div>

        {/* Cycle visualization */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative text-center"
            >
              {/* Connector arrow (hidden on mobile) */}
              {i < steps.length - 1 && (
                <div className="absolute top-10 -right-4 hidden lg:block text-gray-200 z-10">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M6 2l6 6-6 6V2z" />
                  </svg>
                </div>
              )}

              {/* Step number */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full ${step.bg} ring-4 ${step.ring} shadow-lg`}
              >
                <step.icon size={36} weight="duotone" className={step.color} />
              </motion.div>

              <div
                className={`inline-block rounded-full ${step.badge} px-3 py-1 text-xs font-bold text-white mb-3`}
              >
                {step.subtitle}
              </div>

              <h3
                className="mb-2 text-lg font-bold text-text"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                {step.title}
              </h3>
              <p className="text-sm text-text-light leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="mx-auto max-w-xl rounded-2xl border-2 border-teal-100 bg-teal-50/50 p-6">
            <p className="text-sm text-text-light leading-relaxed">
              <span className="font-bold text-teal-600">Wynik?</span>{" "}
              Dziecko samo prosi o &ldquo;te gry z jajkiem&rdquo; zamiast
              YouTube czy TikToka. Nauka staje się naturalnym wyborem,
              nie obowiązkiem. Rekomendujemy sesje 15-30 minut dziennie.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
