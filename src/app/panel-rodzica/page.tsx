import type { Metadata } from "next"
import { ParentPanel } from "@/components/parent-panel/parent-panel"

export const metadata: Metadata = {
  title: "Panel Rodzica",
  description:
    "Zaloguj się i śledź postępy edukacyjne swojego dziecka w aplikacji TaLu Kids.",
}

export default function PanelRodzicaPage() {
  return <ParentPanel />
}
