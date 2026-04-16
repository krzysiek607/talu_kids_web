import { Hero } from "@/components/sections/hero"
import { Stats } from "@/components/sections/stats"
import { Reel } from "@/components/sections/reel"
import { Features } from "@/components/sections/features"
import { HowItWorks } from "@/components/sections/how-it-works"
import { Evolution } from "@/components/sections/evolution"
import { Methodology } from "@/components/sections/methodology"
import { Differentiators } from "@/components/sections/differentiators"
import { Guides } from "@/components/sections/guides"
import { Gallery } from "@/components/sections/gallery"
import { Parents } from "@/components/sections/parents"
import { Testimonials } from "@/components/sections/testimonials"
import { Faq } from "@/components/sections/faq"
import { Newsletter } from "@/components/sections/newsletter"

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <Reel />
      <Features />
      <HowItWorks />
      <Evolution />
      <Methodology />
      <Differentiators />
      <Guides />
      <Gallery />
      <Parents />
      <Testimonials />
      <Faq />
      <Newsletter />
    </main>
  )
}
