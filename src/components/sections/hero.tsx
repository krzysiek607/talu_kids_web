"use client"

import { motion } from "framer-motion"
import { ArrowRight, Star, Sparkle, ShieldCheck, Heart } from "@phosphor-icons/react"
import { AnimatedBackground } from "@/components/ui/animated-background"

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Magical animated background */}
      <AnimatedBackground />

      {/* Side characters - Taro and Lumi (desktop only) */}
      <motion.img
        src="/images/characters/taro/taro_waving.webp"
        alt="Taro"
        initial={{ opacity: 0, x: -40 }}
        animate={{
          opacity: 1,
          x: 0,
          y: [0, -15, 0],
        }}
        transition={{
          opacity: { duration: 0.8, delay: 0.5 },
          x: { duration: 0.8, delay: 0.5 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
        className="pointer-events-none absolute bottom-10 left-4 z-[1] hidden h-48 w-48 object-contain drop-shadow-2xl lg:block xl:h-64 xl:w-64"
      />
      <motion.img
        src="/images/characters/lumi/lumi_waving.webp"
        alt="Lumi"
        initial={{ opacity: 0, x: 40 }}
        animate={{
          opacity: 1,
          x: 0,
          y: [0, -15, 0],
        }}
        transition={{
          opacity: { duration: 0.8, delay: 0.7 },
          x: { duration: 0.8, delay: 0.7 },
          y: { duration: 4, delay: 1, repeat: Infinity, ease: "easeInOut" },
        }}
        className="pointer-events-none absolute bottom-10 right-4 z-[1] hidden h-48 w-48 object-contain drop-shadow-2xl lg:block xl:h-64 xl:w-64"
      />

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
          20+ gier edukacyjnych, nauka pisania liter, 5 magicznych zwierzaków
          i tryb Przygoda — wszystko w bezpiecznej przestrzeni bez reklam.
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

        {/* Trust badges - honest version */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="mt-12 flex flex-col items-center gap-4"
        >
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-text-muted">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck size={18} weight="fill" className="text-green-500" />
              Zgodna z RODO i COPPA
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Heart size={18} weight="fill" className="text-pink-500" />
              Zero reklam
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Sparkle size={18} weight="fill" className="text-purple-500" />
              Tworzona w Polsce
            </span>
          </div>
          <p className="text-xs text-text-muted/70 italic max-w-md text-center">
            Startujemy — dołącz do pierwszych rodziców odkrywających TaLu Kids
          </p>
        </motion.div>
      </div>
    </section>
  )
}
