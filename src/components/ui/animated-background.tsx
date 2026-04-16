"use client"

import { motion } from "framer-motion"
import { useMemo } from "react"

// Deterministic pseudo-random based on seed (so SSR matches CSR)
function seeded(seed: number, n: number): number[] {
  const out: number[] = []
  let s = seed
  for (let i = 0; i < n; i++) {
    s = (s * 9301 + 49297) % 233280
    out.push(s / 233280)
  }
  return out
}

export function AnimatedBackground() {
  // Clouds: 3 layers of drifting pastel clouds
  const clouds = useMemo(() => {
    const seeds = seeded(42, 24)
    return [
      { layer: 1, count: 3, speed: 60, opacity: 0.35, y: 10, color: "#FFD1E8" },
      { layer: 2, count: 4, speed: 90, opacity: 0.25, y: 25, color: "#E9D5FF" },
      { layer: 3, count: 3, speed: 120, opacity: 0.18, y: 45, color: "#FED7AA" },
    ].flatMap((l, li) =>
      Array.from({ length: l.count }).map((_, i) => {
        const idx = li * 10 + i
        return {
          id: `cloud-${li}-${i}`,
          speed: l.speed,
          opacity: l.opacity,
          y: l.y + seeds[idx * 2] * 30,
          size: 80 + seeds[idx * 2 + 1] * 120,
          startX: seeds[idx] * 100 - 20,
          color: l.color,
          reverse: li % 2 === 1,
        }
      })
    )
  }, [])

  // Twinkling stars
  const stars = useMemo(() => {
    const seeds = seeded(7, 60)
    return Array.from({ length: 20 }).map((_, i) => ({
      id: `star-${i}`,
      x: seeds[i * 3] * 100,
      y: seeds[i * 3 + 1] * 80,
      size: 2 + seeds[i * 3 + 2] * 4,
      delay: seeds[i] * 4,
    }))
  }, [])

  // Floating elements: eggs, sparkles, letters
  const floatingItems = useMemo(() => {
    const seeds = seeded(99, 40)
    const emojis = ["⭐", "✨", "🥚", "A", "B", "1"]
    return Array.from({ length: 8 }).map((_, i) => ({
      id: `float-${i}`,
      content: emojis[i % emojis.length],
      x: 5 + seeds[i * 4] * 90,
      y: 10 + seeds[i * 4 + 1] * 80,
      duration: 15 + seeds[i * 4 + 2] * 10,
      delay: seeds[i * 4 + 3] * 8,
      size: 18 + seeds[i] * 14,
    }))
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient mesh */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, #FFE4EC 0%, transparent 50%), radial-gradient(circle at 80% 60%, #E9D5FF 0%, transparent 50%), radial-gradient(circle at 50% 80%, #FED7AA 0%, transparent 50%)",
            "radial-gradient(circle at 80% 30%, #FFE4EC 0%, transparent 50%), radial-gradient(circle at 20% 60%, #E9D5FF 0%, transparent 50%), radial-gradient(circle at 50% 20%, #FED7AA 0%, transparent 50%)",
            "radial-gradient(circle at 20% 30%, #FFE4EC 0%, transparent 50%), radial-gradient(circle at 80% 60%, #E9D5FF 0%, transparent 50%), radial-gradient(circle at 50% 80%, #FED7AA 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Twinkling stars */}
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            boxShadow: `0 0 ${s.size * 2}px rgba(255,255,255,0.9)`,
          }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{
            duration: 3 + (s.delay % 2),
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Drifting clouds */}
      {clouds.map((c) => (
        <motion.div
          key={c.id}
          className="absolute rounded-full blur-2xl"
          style={{
            top: `${c.y}%`,
            width: c.size,
            height: c.size * 0.6,
            backgroundColor: c.color,
            opacity: c.opacity,
            left: `${c.startX}%`,
          }}
          animate={{
            x: c.reverse ? ["0%", "-120vw"] : ["0%", "120vw"],
          }}
          transition={{
            duration: c.speed,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Floating pastel items */}
      {floatingItems.map((f) => (
        <motion.span
          key={f.id}
          className="absolute select-none opacity-30"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            fontSize: f.size,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, 20, -10, 0],
            rotate: [0, 15, -10, 0],
          }}
          transition={{
            duration: f.duration,
            delay: f.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {f.content}
        </motion.span>
      ))}
    </div>
  )
}
