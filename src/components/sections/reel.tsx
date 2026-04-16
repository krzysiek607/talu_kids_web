"use client"

import { motion } from "framer-motion"
import { Play, Smiley, Brain, Clock } from "@phosphor-icons/react"

export function Reel() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/30 to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left: video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto w-full max-w-sm lg:mx-0"
          >
            {/* Decorative glow */}
            <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-pink-300/40 via-purple-300/40 to-teal-300/40 blur-3xl" />

            {/* Phone frame */}
            <div className="relative rounded-[2.5rem] border-[10px] border-gray-900 bg-gray-900 shadow-2xl shadow-purple-500/20">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 z-20 h-6 w-28 -translate-x-1/2 rounded-b-2xl bg-gray-900" />

              <div className="relative overflow-hidden rounded-[1.75rem] aspect-[9/16] bg-black">
                <video
                  src="/videos/taluKids-reel.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />

                {/* "Live preview" label */}
                <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-purple-600 shadow backdrop-blur-md">
                  <Play size={12} weight="fill" className="text-pink-500" />
                  <span style={{ fontFamily: "var(--font-baloo)" }}>Z naszej apki</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: copy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span
              className="inline-block rounded-full bg-purple-500 px-5 py-2 text-sm font-bold text-white uppercase tracking-wider shadow-lg shadow-purple-500/20 mb-5"
              style={{ fontFamily: "var(--font-baloo)" }}
            >
              Z życia TaLu Kids
            </span>
            <h2
              className="text-4xl font-extrabold sm:text-5xl text-purple-600 mb-5 leading-tight"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Dwa tablety. Dwóch testerów. Zero nudy.
            </h2>
            <p className="text-lg text-text-muted leading-relaxed mb-8">
              To nie jest montaż reklamowy. To nasi prawdziwi testerzy — 4 i 6 lat —
              bawią się TaLu Kids równolegle. Literki, szlaczki, mapa przygody,
              wirtualny pupil — wszystko działa, wszystko po polsku, wszystko
              bezpieczne.
            </p>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-purple-100 bg-white/70 backdrop-blur-sm p-4">
                <Smiley size={28} weight="duotone" className="mb-2 text-pink-500" />
                <div className="text-xs font-bold text-text-muted uppercase tracking-wider">Dla wieku</div>
                <div className="text-xl font-extrabold text-text" style={{ fontFamily: "var(--font-fredoka)" }}>4-8 lat</div>
              </div>
              <div className="rounded-2xl border border-purple-100 bg-white/70 backdrop-blur-sm p-4">
                <Brain size={28} weight="duotone" className="mb-2 text-teal-500" />
                <div className="text-xs font-bold text-text-muted uppercase tracking-wider">Ćwiczeń</div>
                <div className="text-xl font-extrabold text-text" style={{ fontFamily: "var(--font-fredoka)" }}>20+</div>
              </div>
              <div className="rounded-2xl border border-purple-100 bg-white/70 backdrop-blur-sm p-4">
                <Clock size={28} weight="duotone" className="mb-2 text-orange-500" />
                <div className="text-xs font-bold text-text-muted uppercase tracking-wider">Sesja</div>
                <div className="text-xl font-extrabold text-text" style={{ fontFamily: "var(--font-fredoka)" }}>5-10 min</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
