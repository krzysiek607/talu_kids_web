import type { Metadata } from "next"
import { Nunito, Baloo_2 } from "next/font/google"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { CookieConsent } from "@/components/ui/cookie-consent"
import { AnalyticsProvider } from "@/components/analytics/analytics-provider"
import { IntroAnimation } from "@/components/ui/intro-animation"
import "./globals.css"

const nunito = Nunito({
  subsets: ["latin", "latin-ext"],
  variable: "--font-nunito",
  display: "swap",
})

const baloo = Baloo_2({
  subsets: ["latin", "latin-ext"],
  variable: "--font-baloo",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.talukids.pl"),
  title: {
    default: "TaLu Kids - Partner Twojego Dziecka | Edukacja przez zabawę",
    template: "%s | TaLu Kids",
  },
  description:
    "Aplikacja edukacyjna dla dzieci 4-8 lat. Gry, nauka pisania, wirtualny zwierzak i bezpieczna przestrzeń do rozwoju. Bez reklam, zgodna z RODO.",
  keywords: [
    "edukacja dzieci",
    "gry edukacyjne",
    "nauka pisania",
    "aplikacja dla dzieci",
    "nauka liter",
    "gry dla przedszkolaków",
    "bezpieczna aplikacja",
    "talu kids",
    "wirtualny zwierzak",
    "nauka przez zabawę",
  ],
  authors: [{ name: "TaLu Kids" }],
  creator: "TaLu Kids",
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://www.talukids.pl",
    siteName: "TaLu Kids",
    title: "TaLu Kids - Partner Twojego Dziecka",
    description:
      "Aplikacja edukacyjna dla dzieci 4-8 lat. Gry, nauka pisania, wirtualny zwierzak i bezpieczna przestrzeń do rozwoju.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TaLu Kids - Edukacja przez zabawę",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TaLu Kids - Partner Twojego Dziecka",
    description:
      "Aplikacja edukacyjna dla dzieci 4-8 lat. Gry, nauka pisania i wirtualny zwierzak.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon-192.png",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pl" className={`${nunito.variable} ${baloo.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MobileApplication",
              name: "TaLu Kids",
              operatingSystem: "Android, iOS",
              applicationCategory: "EducationalApplication",
              audience: {
                "@type": "PeopleAudience",
                suggestedMinAge: 4,
                suggestedMaxAge: 8,
              },
              description:
                "Aplikacja edukacyjna dla dzieci 4-8 lat z grami, nauką pisania i wirtualnym zwierzakiem.",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "PLN",
              },
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <IntroAnimation />
        <Navbar />
        {children}
        <Footer />
        <CookieConsent />
        <AnalyticsProvider />
      </body>
    </html>
  )
}
