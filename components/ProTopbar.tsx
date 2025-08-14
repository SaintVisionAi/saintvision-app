import Link from "next/link"

export default function ProTopbar(){
  return (
    <div className="h-14 border-b border-white/10 flex items-center px-4 gap-3 bg-black/30 backdrop-blur">
      <div className="font-semibold">Enterprise Command Center</div>
      <span className="text-[10px] rounded-md border border-yellow-300/30 bg-yellow-300/10 px-2 py-0.5 text-yellow-200/90">PRO TIER</span>
      <div className="ml-auto flex items-center gap-3 text-sm">
        <Link href="/home" className="opacity-80 hover:opacity-100">Home</Link>
        <Link href="/pricing" className="opacity-80 hover:opacity-100">Pricing</Link>
        <Link href="/help" className="opacity-80 hover:opacity-100">Support</Link>
        <Link href="/crm" className="opacity-80 hover:opacity-100">GoHighLevel</Link>
        <Link href="/workspace" className="opacity-80 hover:opacity-100">PartnerTech.ai</Link>
        <Link href="/account" className="opacity-80 hover:opacity-100">Account</Link>
      </div>
    </div>
  )
}
