"use client"

import { motion } from "framer-motion"
import { ArrowRight, Star, Sparkle } from "@phosphor-icons/react"

const floatingShapes = [
  { color: "bg-yellow-400", size: "w-16 h-16", position: "top-[15%] left-[8%]", delay: 0, duration: 20 },
  { color: "bg-pink-400", size: "w-12 h-12", position: "top-[25%] right-[12%]", delay: 2, duration: 25 },
  { color: "bg-teal-400", size: "w-20 h-20", position: "bottom-[20%] left-[12%]", delay: 4, duration: 22 },
  { color: "bg-purple-400", size: "w-14 h-14", position: "bottom-[30%] right-[8%]", delay: 6, duration: 28 },
  { color: "bg-green-400", size: "w-10 h-10", position: "top-[50%] left-[3%]", delay: 3, duration: 18 },
]

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated background shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingShapes.map((shape, i) => (
          <motion.div
            key={i}
            className={`absolute ${shape.position} ${shape.size} rounded-2xl ${shape.color} opacity-10 blur-sm`}
            animate={{
              y: [0, -30, 10, -20, 0],
              x: [0, 15, -10, 20, 0],
              rotate: [0, 90, 180, 270, 360],
              scale: [1, 1.1, 0.95, 1.05, 1],
            }}
            transition={{
              duration: shape.duration,
              delay: shape.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50/40 via-transparent to-purple-50/30 pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-6 py-20 text-center">
        {/* Badge - glassmorphism */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-md border border-pink-200/50 px-5 py-2.5 text-pink-600 shadow-lg shadow-pink-500/10"
        >
          <Star size={16} weight="fill" />
          <span className="text-sm font-bold" style={{ fontFamily: "var(--font-baloo)" }}>
            Dla dzieci 4-8 lat
          </span>
          <Sparkle size={16} weight="fill" />
        </motion.div>

        {/* Title - flat colors */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          <span className="inline-block text-[#6C63FF]">
            Partner Twojego
          </span>
          <br />
          <span className="inline-block text-[#6C63FF]">
            Dziecka
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mb-4 text-xl font-semibold text-text-light sm:text-2xl"
          style={{ fontFamily: "var(--font-baloo)" }}
        >
          Rozwijamy wyobraźnię, kreatywność i wiedzę poprzez zabawę
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mx-auto mb-10 max-w-2xl text-lg text-text-muted leading-relaxed"
        >
          Odkryj magiczne jajko, które rośnie razem z wiedzą Twojego malucha.
          Gry edukacyjne, nauka pisania liter i wirtualny zwierzak - wszystko w
          bezpiecznej przestrzeni bez reklam.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="https://play.google.com/store/apps/details?id=pl.talukids.app"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full bg-pink-500 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-pink-500/30 transition-all hover:shadow-2xl hover:shadow-pink-500/40 hover:-translate-y-1 active:translate-y-0 active:scale-[0.97]"
            style={{ fontFamily: "var(--font-baloo)" }}
          >
            Pobierz aplikację
            <ArrowRight size={20} weight="bold" className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#funkcje"
            className="inline-flex items-center gap-2 rounded-full border-2 border-pink-200 bg-white px-8 py-4 text-lg font-bold text-pink-500 shadow-lg shadow-pink-500/10 transition-all hover:bg-pink-500 hover:text-white hover:shadow-xl hover:-translate-y-1 active:translate-y-0 active:scale-[0.97]"
            style={{ fontFamily: "var(--font-baloo)" }}
          >
            Zobacz możliwości
          </a>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="mt-16 flex flex-col items-center gap-3"
        >
          <div className="flex -space-x-2">
            {["AK", "TW", "MD", "JB", "KL"].map((initials, i) => (
              <div
                key={i}
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-pink-500 text-xs font-bold text-white shadow-md hover:scale-110 hover:-translate-y-1 transition-transform"
              >
                {initials}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} weight="fill" className="text-yellow-400" />
            ))}
          </div>
          <p className="text-sm text-text-muted">
            <span className="font-bold text-text">500+</span> szczęśliwych rodzin
            korzysta z aplikacji
          </p>
        </motion.div>
      </div>
    </section>
  )
}
