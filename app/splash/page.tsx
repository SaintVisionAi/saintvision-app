import Link from 'next/link'

export const metadata = {
  title: 'Saint Vision — Splash',
  description: 'Faith-led, AI-powered systems: Dual-AI Search, Workspace, CRM.'
}

export default function Splash() {
  return (
    <div className="min-h-[100dvh] bg-[#0a0a0a] text-[#f5f5f5]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              {/* RESPONSIBLE INTELLIGENCE — gold without custom font for now */}
              <h2 className="gold-text text-sm tracking-[0.25em]">
                RESPONSIBLE INTELLIGENCE
              </h2>

              <h1 className="mt-3 text-4xl md:text-6xl font-extrabold leading-tight">
                Build with calm authority.<br />
                <span className="text-white/80">Dual-AI. One search. Real impact.</span>
              </h1>

              <p className="mt-5 text-white/80 max-w-xl">
                Start in the Workspace—search, orchestrate agents, and ship outcomes.
                Unlimited mode for exploration; Pro for client-ready execution. No red tape.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href="/workspace"
                  className="rounded-2xl px-5 py-3 text-sm font-semibold border border-white/10 bg-white/90 text-black hover:bg-white"
                >
                  Start Cookin’
                </Link>
                <Link
                  href="/why"
                  className="rounded-2xl px-5 py-3 text-sm font-semibold border border-white/20 hover:bg-white/10"
                >
                  Why Us
                </Link>
                <Link
                  href="/pricing"
                  className="rounded-2xl px-5 py-3 text-sm font-semibold border border-white/20 hover:bg-white/10"
                >
                  Plans
                </Link>
              </div>

              <p className="mt-5 text-xs text-white/60">
                “Lord, order our steps. We build with clarity, excellence, and purpose.”
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 -z-10 blur-3xl bg-gradient-to-tr from-white/10 via-white/5 to-transparent rounded-3xl" />
              <div className="rounded-3xl border border-white/10 bg-black/30 p-4">
                <div className="w-full aspect-video rounded-2xl border border-white/10 flex items-center justify-center text-white/60">
                  (Promo video or image)
                </div>
                <div className="mt-3 text-xs text-white/60">
                  Dual-AI playground • Workspace • Live CRM • API endpoints ready
                </div>
              </div>
            </div>
          </div>

          {/* Plan teaser */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-3">
            <PlanCard
              title="Unlimited"
              subtitle="Explore without friction"
              bullets={[
                "Dual-AI search & workspace",
                "No red tape — instant access",
                "Great for prototyping & learning"
              ]}
              cta={{ href: "/workspace", label: "Open Workspace" }}
            />
            <PlanCard
              title="Pro"
              subtitle="Client-ready execution"
              bullets={[
                "GHL CRM integration (iframe)",
                "API-first automations & dashboards",
                "White-label ready + support"
              ]}
              cta={{ href: "/signup", label: "Go Pro" }}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-white/70">
          © {new Date().getFullYear()} Saint Vision Group LLC — Purpose over popularity.
        </div>
      </footer>
    </div>
  )
}

function PlanCard({
  title, subtitle, bullets, cta
}: {
  title: string; subtitle: string; bullets: string[]; cta: { href: string; label: string }
}) {
  return (
    <div className="rounded-2xl border border-white/10 p-4 bg-black/30">
      <div className="text-xl font-bold">{title}</div>
      <div className="text-white/70 mb-3">{subtitle}</div>
      <ul className="list-disc list-inside text-sm text-white/80 space-y-1">
        {bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
      <a href={cta.href} className="mt-4 inline-flex rounded-xl border border-white/20 px-3 py-1.5 text-sm hover:bg-white/10">
        {cta.label}
      </a>
    </div>
  )
}
