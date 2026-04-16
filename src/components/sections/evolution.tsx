"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Heart, Sparkle, Star } from "@phosphor-icons/react"

const creatures = [
  { name: "Kryształek", folder: "krysztalek", color: "#06B6D4" },
  { name: "Gryfonek", folder: "gryfonek", color: "#F59E0B" },
  { name: "Smoczek", folder: "smoczek", color: "#10B981" },
  { name: "Jednorożec", folder: "jednorozec", color: "#EC4899" },
  { name: "Feniksik", folder: "feniksik", color: "#EF4444" },
]

export function Evolution() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-pink-50/30 to-purple-50/20 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="mb-16 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-pink-100 px-5 py-2 text-pink-600">
              <Sparkle size={18} weight="fill" />
              <span
                className="text-sm font-bold uppercase tracking-wider"
                style={{ fontFamily: "var(--font-baloo)" }}
              >
                Pięciu magicznych pupili
              </span>
              <Sparkle size={18} weight="fill" />
            </div>
            <h2
              className="text-4xl font-extrabold sm:text-5xl text-pink-600 mb-4"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Poznaj przyjaciół, którzy czekają w jajku
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-text-muted">
              Każdy ma swoją osobowość, moc i styl. Którego wykluje Twoje dziecko? Najedź kursorem lub kliknij — odkryj ich.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6">
            {creatures.map((creature, i) => (
              <CreatureCard key={creature.name} creature={creature} delay={i * 0.1} />
            ))}
          </div>

          <div className="mt-14 text-center">
            <a
              href="https://play.google.com/store/apps/details?id=pl.talukids.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-purple-500 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-purple-500/30 transition-all hover:shadow-2xl hover:shadow-purple-500/40 hover:-translate-y-1"
              style={{ fontFamily: "var(--font-baloo)" }}
            >
              <Heart size={20} weight="fill" />
              Odkryj swojego pupila
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function CreatureCard({
  creature,
  delay,
}: {
  creature: { name: string; folder: string; color: string }
  delay: number
}) {
  const [stage, setStage] = useState<"closed" | "half" | "open">("closed")

  const nextStage = () => {
    setStage((s) => (s === "closed" ? "half" : s === "half" ? "open" : "closed"))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      onHoverStart={() => setStage("half")}
      onHoverEnd={() => setStage("closed")}
      onClick={nextStage}
      className="group relative cursor-pointer rounded-3xl bg-white/80 backdrop-blur-sm p-4 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border-2"
      style={{ borderColor: `${creature.color}33` }}
    >
      {/* Glow */}
      <div
        className="pointer-events-none absolute inset-4 top-4 h-28 rounded-full blur-3xl opacity-20 transition-opacity duration-300 group-hover:opacity-50"
        style={{ background: creature.color }}
      />

      <motion.img
        src={`/images/creatures/${creature.folder}/${creature.folder}_${stage}.webp`}
        alt={creature.name}
        className="relative mx-auto mb-3 h-28 w-28 object-contain drop-shadow-lg md:h-32 md:w-32"
        key={stage}
        initial={{ scale: 0.9, opacity: 0.6 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      <h4
        className="mb-1 text-base font-extrabold md:text-lg"
        style={{ fontFamily: "var(--font-fredoka)", color: creature.color }}
      >
        {creature.name}
      </h4>
      <div className="flex items-center justify-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={11}
            weight="fill"
            style={{ color: creature.color, opacity: 0.7 }}
          />
        ))}
      </div>
    </motion.div>
  )
}
