import Header from "@/components/Header"
import TranslationPanel from "@/components/TranslationPanel"
import Footer from "@/components/Footer"
import BackgroundScene from "@/components/BackgroundScene"
import Portraits from "@/components/Portraits"

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Layer 0: Nidhogg gothic background */}
      <BackgroundScene />

      {/* Layer 1: Character portraits - Lu Mingfei & Chen Motong */}
      <Portraits />

      {/* Layer 2: Floating dust particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[2]">
        <div className="dust-particle" style={{ left: "10%", animationDuration: "12s", animationDelay: "0s" }} />
        <div className="dust-particle" style={{ left: "25%", animationDuration: "15s", animationDelay: "2s" }} />
        <div className="dust-particle" style={{ left: "50%", animationDuration: "10s", animationDelay: "5s" }} />
        <div className="dust-particle" style={{ left: "70%", animationDuration: "14s", animationDelay: "1s" }} />
        <div className="dust-particle" style={{ left: "85%", animationDuration: "11s", animationDelay: "4s" }} />
        <div className="dust-particle" style={{ left: "40%", animationDuration: "13s", animationDelay: "7s" }} />
      </div>

      {/* Layer 10: Main content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 flex items-start justify-center pt-8 sm:pt-12 pb-4">
          <TranslationPanel />
        </main>

        <Footer />
      </div>
    </div>
  )
}
