"use client"

import { motion } from "framer-motion"
import { ShieldCheck, ChartBar, Clock, Lock, Eye, Bell } from "@phosphor-icons/react"

const parentFeatures = [
  {
    icon: ShieldCheck,
    title: "Pełna zgodność z RODO i COPPA",
    description: "Dane dziecka są szyfrowane i bezpieczne. Minimalizujemy zbieranie danych.",
  },
  {
    icon: ChartBar,
    title: "Panel Rodzica online",
    description: "Połącz konto w aplikacji i śledź postępy dziecka z przeglądarki na talukids.pl.",
  },
  {
    icon: Clock,
    title: "Kontrola czasu",
    description: "Ustaw limity czasu korzystania z aplikacji. Sesje dzieci z krótszym timeout.",
  },
  {
    icon: Lock,
    title: "Bramka rodzicielska",
    description: "4-sekundowe przytrzymanie chroni ustawienia przed przypadkowym dostępem dziecka.",
  },
  {
    icon: Eye,
    title: "Zero reklam",
    description: "Żadnych reklam, targetowania ani linków zewnętrznych. Czysty, bezpieczny interfejs.",
  },
  {
    icon: Bell,
    title: "Powiadomienia o postępach",
    description: "Otrzymuj informacje gdy dziecko osiągnie kamień milowy w nauce.",
  },
]

export function Parents() {
  return (
    <section id="dla-rodzicow" className="relative py-24 sm:py-32 bg-white">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="inline-block rounded-full bg-purple-500 px-5 py-2 text-sm font-bold text-white uppercase tracking-wider shadow-lg shadow-purple-500/20 mb-6"
              style={{ fontFamily: "var(--font-baloo)" }}
            >
              Dla rodziców
            </span>
            <h2
              className="text-4xl font-extrabold sm:text-5xl text-purple-600 mb-4"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Pełna kontrola, zero stresu
            </h2>
            <p className="text-lg text-text-muted mb-8 leading-relaxed">
              Wiemy, jak ważne jest bezpieczeństwo Twojego dziecka w sieci.
              Dlatego TaLu Kids zostało zaprojektowane z myślą o spokoju
              rodziców. Żadnych niespodzianek.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {parentFeatures.slice(0, 4).map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex gap-3"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50">
                    <feature.icon size={20} weight="duotone" className="text-purple-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text">{feature.title}</h4>
                    <p className="text-xs text-text-muted leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Dashboard preview card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-3xl border-2 border-purple-200 bg-purple-50 p-8 shadow-xl">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500 text-2xl shadow-lg">
                  👨‍👩‍👧‍👦
                </div>
                <div>
                  <h3
                    className="text-xl font-bold text-text"
                    style={{ fontFamily: "var(--font-fredoka)" }}
                  >
                    Panel Rodzica
                  </h3>
                  <p className="text-xs text-text-muted">Śledź postępy i zarządzaj ustawieniami</p>
                </div>
              </div>

              {/* Progress bars mock */}
              <div className="space-y-4 mb-6">
                <div>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="font-semibold text-text-light">Alfabet</span>
                    <span className="font-bold text-teal-500">78%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "78%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full rounded-full bg-teal-500"
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="font-semibold text-text-light">Szlaczki</span>
                    <span className="font-bold text-pink-500">54%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "54%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.7 }}
                      className="h-full rounded-full bg-pink-500"
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="font-semibold text-text-light">Liczenie</span>
                    <span className="font-bold text-purple-500">91%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "91%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.9 }}
                      className="h-full rounded-full bg-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Dni aktywności", value: "23", color: "text-teal-500" },
                  { label: "Nagrody", value: "47", color: "text-yellow-500" },
                  { label: "Ewolucja", value: "Faza 3", color: "text-purple-500" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl bg-white p-3 text-center shadow-sm"
                  >
                    <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                    <p className="text-[10px] text-text-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 h-16 w-16 rounded-2xl bg-yellow-400 opacity-20 blur-xl" />
            <div className="absolute -bottom-4 -left-4 h-20 w-20 rounded-2xl bg-teal-400 opacity-20 blur-xl" />
          </motion.div>
        </div>

        {/* How to connect section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mt-20 rounded-3xl border-2 border-purple-100 bg-purple-50/50 p-8 sm:p-12"
        >
          <h3
            className="text-2xl font-extrabold text-center text-purple-600 mb-3 sm:text-3xl"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Jak włączyć Panel Rodzica online?
          </h3>
          <p className="text-center text-text-muted mb-10 max-w-xl mx-auto">
            Trzy proste kroki, żeby śledzić postępy dziecka z dowolnego urządzenia.
          </p>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "Otwórz ustawienia",
                description: "W aplikacji przytrzymaj 4 sekundy, żeby odblokować sekcję rodzica. Wybierz \"Konto rodzica\".",
              },
              {
                step: "2",
                title: "Podaj email i hasło",
                description: "Wpisz swój adres email i utwórz hasło. To połączy konto dziecka z Twoim emailem.",
              },
              {
                step: "3",
                title: "Zaloguj się na stronie",
                description: "Wejdź na talukids.pl/panel-rodzica i zaloguj się. Gotowe — widzisz postępy na żywo!",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                className="relative rounded-2xl bg-white p-6 shadow-sm text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-500 text-white text-xl font-bold shadow-lg shadow-purple-500/20">
                  {item.step}
                </div>
                <h4
                  className="text-lg font-bold text-text mb-2"
                  style={{ fontFamily: "var(--font-fredoka)" }}
                >
                  {item.title}
                </h4>
                <p className="text-sm text-text-muted leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
