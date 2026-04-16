"use client"

import { motion } from "framer-motion"
import {
  Egg,
  Translate,
  ShieldCheck,
  Brain,
  WifiSlash,
  UsersThree,
} from "@phosphor-icons/react"

const items = [
  {
    icon: Egg,
    title: "Nauka napędza zwierzaka",
    description:
      "Jedyna aplikacja, w której edukacja jest bezpośrednio połączona z opieką nad wirtualnym pupilem. Wykluł się? Wybierz jednego z 5 zwierzaków! Dziecko uczy się, bo chce — nie dlatego, że musi.",
    color: "text-pink-500",
    bg: "bg-pink-50",
    border: "border-pink-200/50",
    hoverBorder: "hover:border-pink-400",
    glow: "hover:shadow-pink-500/15",
  },
  {
    icon: Translate,
    title: "Polski alfabet A-Ż",
    description:
      "Pełne wsparcie polskich znaków diakrytycznych: Ą, Ć, Ę, Ł, Ń, Ó, Ś, Ź, Ż. 32 pary liter z ponad 450 punktami kontrolnymi do odrysowania.",
    color: "text-teal-500",
    bg: "bg-teal-50",
    border: "border-teal-200/50",
    hoverBorder: "hover:border-teal-400",
    glow: "hover:shadow-teal-500/15",
  },
  {
    icon: ShieldCheck,
    title: "Bezpieczeństwo na pierwszym miejscu",
    description:
      "Zero reklam, zero śledzenia, zero ukrytych płatności. Pełna zgodność z RODO i COPPA. Anonimowa autentykacja bez danych osobowych dzieci.",
    color: "text-green-500",
    bg: "bg-green-50",
    border: "border-green-200/50",
    hoverBorder: "hover:border-green-400",
    glow: "hover:shadow-green-500/15",
  },
  {
    icon: Brain,
    title: "Interpretacja edukacyjna",
    description:
      "Panel rodzica nie pokazuje suchych liczb. Tłumaczymy aktywność dziecka na kompetencje: motoryka, język, logika i kreatywność.",
    color: "text-purple-500",
    bg: "bg-purple-50",
    border: "border-purple-200/50",
    hoverBorder: "hover:border-purple-400",
    glow: "hover:shadow-purple-500/15",
  },
  {
    icon: WifiSlash,
    title: "Działa bez internetu",
    description:
      "Wszystkie gry, nauka liter i opieka nad zwierzakiem dostępne offline. Idealne na podróże samochodem, lotem czy wakacje bez Wi-Fi.",
    color: "text-orange-500",
    bg: "bg-orange-50",
    border: "border-orange-200/50",
    hoverBorder: "hover:border-orange-400",
    glow: "hover:shadow-orange-500/15",
  },
  {
    icon: UsersThree,
    title: "Stworzone przez rodziców",
    description:
      "Każda funkcja przechodzi test: \"Czy 4-latek sam to ogarnie?\" i \"Czy rodzic czuje się bezpiecznie?\". Projektujemy z perspektywy rodziny.",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    border: "border-yellow-200/50",
    hoverBorder: "hover:border-yellow-400",
    glow: "hover:shadow-yellow-500/15",
  },
]

export function Differentiators() {
  return (
    <section id="co-nas-wyroz" className="relative py-24 sm:py-32 bg-white">
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="inline-block rounded-full bg-yellow-500 px-5 py-2 text-sm font-bold text-white uppercase tracking-wider shadow-lg shadow-yellow-500/20 mb-6"
            style={{ fontFamily: "var(--font-baloo)" }}
          >
            Dlaczego my
          </span>
          <h2
            className="text-4xl font-extrabold sm:text-5xl text-pink-600 mb-4"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Co nas wyróżnia?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-text-muted">
            TaLu Kids to nie kolejna aplikacja edukacyjna. To cyfrowe
            sanktuarium, gdzie nauka staje się przygodą.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group relative rounded-3xl border ${item.border} ${item.hoverBorder} bg-white/70 backdrop-blur-sm p-8 transition-all duration-300 hover:-translate-y-2 hover:bg-white/90 hover:shadow-xl ${item.glow}`}
            >
              <div
                className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${item.bg} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
              >
                <item.icon size={28} weight="duotone" className={item.color} />
              </div>

              <h3
                className="mb-2 text-xl font-bold text-text"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                {item.title}
              </h3>
              <p className="text-sm text-text-light leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
