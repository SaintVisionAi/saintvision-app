import Link from "next/link"
import Image from "next/image"

const items = [
  { label: "My Companion", emoji: "🤖" },
  { label: "My Business", emoji: "🏢" },
  { label: "Sticky Notes", emoji: "📝" },
  { label: "AI Tools", emoji: "🧰" },
  { label: "Image Generator", emoji: "🎨" },
  { label: "SVG Launchpad", emoji: "🚀" },
  { label: "Feedback & Help", emoji: "💬" },
  { label: "PartnerTech.ai CRM", emoji: "🧩", href: "/crm" },
  { label: "Client Portal", emoji: "👥" },
  { label: "Upgrade Tier", emoji: "⬆️", href: "/pricing" },
  { label: "SV Institute of AI (R+D)", emoji: "🧪" },
  { label: "My Account", emoji: "⚙️" }
]

export default function ProSidebar(){
  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 shrink-0 border-r border-white/10 bg-black/40">
      <div className="h-16 px-4 flex items-center gap-3 border-b border-white/10">
        <Image src="/assets/brand/saintsal-mark.svg" alt="SaintSal" width={28} height={28} />
        <div className="leading-tight">
          <div className="font-bold">SaintVisionAI™</div>
          <div className="text-xs text-white/60">Cookin’ Knowledge</div>
        </div>
      </div>
      <nav className="p-3 space-y-1 overflow-y-auto">
        {items.map((it) => (
          <Link
            key={it.label}
            href={it.href || "#"}
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-white/10 border border-transparent hover:border-white/10"
          >
            <span className="text-base">{it.emoji}</span>
            <span>{it.label}</span>
          </Link>
        ))}
      </nav>
      <div className="mt-auto p-3">
        <Link href="#" className="w-full inline-flex items-center justify-between rounded-xl border border-white/20 px-3 py-2 text-xs hover:bg-white/10">
          <span>Enterprise Ready</span>
          <span className="text-[#e3c15d]">★</span>
        </Link>
      </div>
    </aside>
  )
}
