"use client"

import { motion } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { DeviceMobile, CaretLeft, CaretRight } from "@phosphor-icons/react"

const screens = [
  {
    title: "Ekran główny",
    description: "4 magiczne światy do odkrycia",
    image: "/images/screenshots/Screenshot_main.jpg",
  },
  {
    title: "Nauka liter",
    description: "Polski alfabet A-Ż z waypoints",
    image: "/images/screenshots/Screenshot_literki.jpg",
  },
  {
    title: "Zwierzak",
    description: "Opiekuj się magicznym jajkiem",
    image: "/images/screenshots/Screenshot_zwierzak.jpg",
  },
  {
    title: "Szlaczki",
    description: "8 wzorów do śledzenia",
    image: "/images/screenshots/Screenshot_szlaczki.jpg",
  },
  {
    title: "Gry i zabawa",
    description: "Labirynty, puzzle i więcej",
    image: "/images/screenshots/Screenshot_zabawa.jpg",
  },
]

export function Gallery() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    checkScroll()
    el.addEventListener("scroll", checkScroll, { passive: true })
    window.addEventListener("resize", checkScroll)
    return () => {
      el.removeEventListener("scroll", checkScroll)
      window.removeEventListener("resize", checkScroll)
    }
  }, [])

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current
    if (!el) return
    const amount = direction === "left" ? -300 : 300
    el.scrollBy({ left: amount, behavior: "smooth" })
  }

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-purple-50/20 to-white pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
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
            Podgląd aplikacji
          </span>
          <h2
            className="text-4xl font-extrabold sm:text-5xl text-pink-600 mb-4"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Zobacz TaLu Kids w akcji
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-text-muted">
            Pięknie zaprojektowane ekrany, które dzieci uwielbiają
          </p>
        </motion.div>
      </div>

      {/* Scrollable carousel */}
      <div className="relative">
        {/* Arrow buttons - desktop only */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg border border-pink-100 text-pink-500 backdrop-blur-sm transition-all hover:bg-pink-500 hover:text-white hover:shadow-xl hover:scale-110"
            aria-label="Przewiń w lewo"
          >
            <CaretLeft size={24} weight="bold" />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg border border-pink-100 text-pink-500 backdrop-blur-sm transition-all hover:bg-pink-500 hover:text-white hover:shadow-xl hover:scale-110"
            aria-label="Przewiń w prawo"
          >
            <CaretRight size={24} weight="bold" />
          </button>
        )}

        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-[5] w-8 bg-gradient-to-r from-background to-transparent sm:w-16" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-[5] w-8 bg-gradient-to-l from-background to-transparent sm:w-16" />

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto px-8 pb-4 sm:gap-6 sm:px-16 snap-x snap-mandatory scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {screens.map((screen, i) => (
            <motion.div
              key={screen.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="shrink-0 snap-center"
            >
              <div className="relative w-56 sm:w-64 md:w-72">
                <div className="rounded-[2.5rem] border-4 border-gray-800 bg-gray-900 p-2 shadow-2xl">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 z-10 h-6 w-28 -translate-x-1/2 rounded-b-2xl bg-gray-800" />

                  {/* Screen */}
                  <div className="relative aspect-[9/19] overflow-hidden rounded-[2rem] bg-gray-100">
                    <img
                      src={screen.image}
                      alt={`TaLu Kids - ${screen.title}`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-10">
                      <h3
                        className="mb-1 text-base font-bold text-white sm:text-lg"
                        style={{ fontFamily: "var(--font-fredoka)" }}
                      >
                        {screen.title}
                      </h3>
                      <p className="text-xs text-white/80 sm:text-sm">{screen.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-text-muted">
          <DeviceMobile size={16} weight="bold" />
          <span>Przesuń aby zobaczyć więcej</span>
        </div>
      </div>

      {/* Hide scrollbar via CSS */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
