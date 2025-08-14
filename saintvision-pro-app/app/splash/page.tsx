import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Saint Vision Pro — Splash',
  description: 'Faith-led, AI-powered systems. Agent Playground, Dual-AI Search, and CRM flows—ready to demo.',
}

export default function Splash() {
  return (
    <div className="min-h-[100dvh] bg-[#0a0a0a] text-[#f5f5f5]">
      <header className="sticky top-0 z-20 backdrop-blur bg-black/40 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 h-16 flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/assets/logos/saintvision-mark.svg"
              alt="Saint Vision"
              width={28}
              height={28}
              priority
            />
            <span className="font-extrabold tracking-wide">SAINT VISION</span>
          </Link>
          <nav className="ml-auto hidden md:flex items-center gap-6 text-sm">
            <Link href="/agents" className="opacity-80 hover:opacity-100">Agents</Link>
            <Link href="/connectivity" className="opacity-80 hover:opacity-100">Connectivity</Link>
            <Link href="/crm" className="opacity-80 hover:opacity-100">CRM</Link>
          </nav>
          <Link
            href="/agents"
            className="ml-3 inline-flex items-center rounded-xl border border-white/20 px-3 py-1.5 text-sm hover:bg-white/10"
          >
            Launch Console
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs tracking-widest text-white/60">FAITH • FOCUS • EXECUTION</p>
              <h1 className="mt-3 text-4xl md:text-6xl font-extrabold leading-tight">
                Build with calm authority.<br />
                <span className="text-white/80">Dual-AI. One search. Real impact.</span>
              </h1>
              <p className="mt-5 text-white/80 max-w-xl">
                SaintSal runs your ops—API-first, CRM-ready, Foundry-style playground,
                and a live GHL CRM view. We ship demos that close clients.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href="/agents"
                  className="rounded-2xl px-5 py-3 text-sm font-semibold border border-white/20 hover:bg-white/10"
                >
                  Open Agent Playground
                </Link>
                <Link
                  href="/crm"
                  className="rounded-2xl px-5 py-3 text-sm font-semibold border border-white/10 bg-white/90 text-black hover:bg-white"
                >
                  View CRM (GHL)
                </Link>
                <Link
                  href="/connectivity"
                  className="rounded-2xl px-5 py-3 text-sm font-semibold border border-white/20 hover:bg-white/10"
                >
                  Check Connectivity
                </Link>
              </div>

              <p className="mt-5 text-xs text-white/60">
                “Lord, order our steps. We build with clarity, excellence, and purpose.”
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 -z-10 blur-3xl bg-gradient-to-tr from-white/10 via-white/5 to-transparent rounded-3xl" />
              <div className="rounded-3xl border border-white/10 bg-black/30 p-4">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full rounded-2xl border border-white/10"
                  poster="/assets/logos/preview-poster.png"
                >
                  {/* Optional: drop a short silent loop here */}
                </video>
                <div className="mt-3 text-xs text-white/60">
                  Dual-AI playground • Live CRM • API endpoints ready
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
            <KPI label="Dual-AI" value="Azure + OpenAI" />
            <KPI label="CRM" value="GoHighLevel" />
            <KPI label="Billing" value="Stripe" />
            <KPI label="Auth/Data" value="Supabase" />
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-white/70">
          © {new Date().getFullYear()} Saint Vision Group LLC — Purpose over popularity.
        </div>
      </footer>
    </div>
  )
}

function KPI({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 p-4 bg-black/30">
      <div className="text-xs uppercase tracking-widest text-white/60">{label}</div>
      <div className="mt-1 text-lg font-semibold">{value}</div>
    </div>
  )
}
