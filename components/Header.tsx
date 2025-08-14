import Link from "next/link"
import Image from "next/image"

export default function Header() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-black/40 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center gap-4">
        {/* Brand cluster */}
        <div className="flex items-center gap-4">
          <Link href="/home" className="flex items-center gap-2">
            <Image src="/assets/logos/saintvision-mark.svg" alt="SaintVisionAI" width={24} height={24} />
            <span className="font-extrabold tracking-wide">SAINTVISIONAI</span>
          </Link>
          <span className="opacity-30">•</span>
          <Link href="/home" className="flex items-center gap-2">
            <Image src="/assets/logos/cookingknowledge-mark.svg" alt="CookingKnowledge" width={24} height={24} />
            <span className="font-extrabold tracking-wide">COOKINGKNOWLEDGE</span>
          </Link>
        </div>

        {/* Right-side nav */}
        <nav className="ml-auto hidden md:flex items-center gap-6 text-sm">
          <Link href="/agents" className="opacity-80 hover:opacity-100">Agents</Link>
          <Link href="/connectivity" className="opacity-80 hover:opacity-100">Connectivity</Link>
          <Link href="/crm" className="opacity-80 hover:opacity-100">CRM</Link>
          <Link href="/why" className="opacity-80 hover:opacity-100">Why Us</Link>
          <Link href="/pricing" className="opacity-80 hover:opacity-100">Plans</Link>
        </nav>
        <Link
          href="/workspace"
          className="ml-3 inline-flex items-center rounded-xl border border-white/20 px-3 py-1.5 text-sm hover:bg-white/10"
        >
          Start Cookin’
        </Link>
      </div>
    </header>
  )
}
