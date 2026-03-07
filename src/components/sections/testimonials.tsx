"use client"

import { motion } from "framer-motion"
import { Star, Quotes } from "@phosphor-icons/react"
import { TESTIMONIALS } from "@/lib/constants"

export function Testimonials() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-yellow-50/20 to-white pointer-events-none" />

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
            Opinie
          </span>
          <h2
            className="text-4xl font-bold sm:text-5xl text-yellow-600 mb-4"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Rodzice polecają
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-text-muted">
            Zobacz, co mówią rodzice, którzy już wybrali TaLu Kids dla swoich
            dzieci
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group relative rounded-3xl border border-yellow-200/50 bg-white/70 backdrop-blur-sm p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:bg-white/90 hover:shadow-xl hover:shadow-yellow-500/10 hover:border-yellow-300"
            >
              <Quotes size={32} weight="fill" className="absolute top-6 right-6 text-yellow-200 transition-colors group-hover:text-yellow-300" />

              <div className="mb-4 flex items-center gap-1">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star
                    key={j}
                    size={16}
                    weight="fill"
                    className="text-yellow-400"
                  />
                ))}
              </div>

              <p className="mb-6 text-sm text-text-light leading-relaxed italic">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-500 text-sm font-bold text-white shadow-md">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold text-text">{testimonial.name}</p>
                  <p className="text-xs text-text-muted">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
