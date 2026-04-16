"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const SESSION_KEY = "talukids_intro_seen"

export function IntroAnimation() {
  const [show, setShow] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const seen = sessionStorage.getItem(SESSION_KEY)
    if (!seen) {
      setShow(true)
      document.body.style.overflow = "hidden"
      const timer = setTimeout(() => {
        finish()
      }, 3300)
      return () => clearTimeout(timer)
    }
  }, [])

  const finish = () => {
    sessionStorage.setItem(SESSION_KEY, "1")
    setShow(false)
    document.body.style.overflow = ""
  }

  if (!mounted) return null

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at 50% 40%, #FFE4EC 0%, #E9D5FF 40%, #FED7AA 100%)",
          }}
        >
          {/* Radial sparkles spreading out */}
          {[...Array(24)].map((_, i) => {
            const angle = (i / 24) * Math.PI * 2
            const distance = 350 + (i % 5) * 30
            return (
              <motion.div
                key={`spark-${i}`}
                className="absolute h-2 w-2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]"
                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                animate={{
                  x: Math.cos(angle) * distance,
                  y: Math.sin(angle) * distance,
                  opacity: [0, 1, 0],
                  scale: [0, 1.2, 0],
                }}
                transition={{
                  duration: 1.6,
                  delay: 1.1,
                  ease: "easeOut",
                }}
              />
            )
          })}

          {/* Small egg in the center (background element) */}
          <motion.img
            src="/images/eggs/egg.webp"
            alt=""
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.1, 1],
              opacity: [0, 0.85, 0.85],
              rotate: [0, -5, 5, 0],
            }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: "easeOut",
            }}
            className="absolute h-56 w-56 object-contain drop-shadow-xl sm:h-64 sm:w-64 md:h-72 md:w-72"
            style={{ top: "28%" }}
          />

          {/* Taro sliding in from left, waving */}
          <motion.img
            src="/images/characters/taro/taro_waving.webp"
            alt="Taro"
            initial={{ x: "-60vw", opacity: 0, rotate: -8 }}
            animate={{
              x: 0,
              opacity: 1,
              rotate: [0, -6, 0],
              y: [0, -15, 0],
            }}
            transition={{
              x: { duration: 0.9, delay: 0.6, ease: [0.34, 1.56, 0.64, 1] },
              opacity: { duration: 0.5, delay: 0.6 },
              rotate: { duration: 2, delay: 1.5, repeat: 1, ease: "easeInOut" },
              y: { duration: 1.2, delay: 1.5, repeat: 1, ease: "easeInOut" },
            }}
            className="absolute h-64 w-64 object-contain drop-shadow-2xl sm:h-80 sm:w-80 md:h-[22rem] md:w-[22rem]"
            style={{ top: "32%", left: "8%" }}
          />

          {/* Lumi sliding in from right, waving */}
          <motion.img
            src="/images/characters/lumi/lumi_waving.webp"
            alt="Lumi"
            initial={{ x: "60vw", opacity: 0, rotate: 8 }}
            animate={{
              x: 0,
              opacity: 1,
              rotate: [0, 6, 0],
              y: [0, -15, 0],
            }}
            transition={{
              x: { duration: 0.9, delay: 0.8, ease: [0.34, 1.56, 0.64, 1] },
              opacity: { duration: 0.5, delay: 0.8 },
              rotate: { duration: 2, delay: 1.7, repeat: 1, ease: "easeInOut" },
              y: { duration: 1.2, delay: 1.7, repeat: 1, ease: "easeInOut" },
            }}
            className="absolute h-64 w-64 object-contain drop-shadow-2xl sm:h-80 sm:w-80 md:h-[22rem] md:w-[22rem]"
            style={{ top: "32%", right: "8%" }}
          />

          {/* Logo text - bottom */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.8, ease: "easeOut" }}
            className="absolute bottom-[18%] flex flex-col items-center"
          >
            <h1
              className="bg-gradient-to-r from-pink-500 via-purple-500 to-teal-500 bg-clip-text text-6xl font-extrabold text-transparent sm:text-7xl md:text-8xl"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              TaLu Kids
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2.3 }}
              className="mt-3 text-base font-semibold text-purple-500 sm:text-lg"
              style={{ fontFamily: "var(--font-baloo)" }}
            >
              Magiczna przygoda czeka...
            </motion.p>
          </motion.div>

          {/* Skip button */}
          <button
            onClick={finish}
            className="absolute bottom-6 right-6 rounded-full bg-white/60 px-4 py-2 text-xs font-semibold text-purple-500 shadow-md backdrop-blur transition hover:bg-white/90"
            style={{ fontFamily: "var(--font-baloo)" }}
          >
            Pomiń →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
