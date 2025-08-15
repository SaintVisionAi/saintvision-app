'use client'

import { usePathname } from 'next/navigation'

export default function GlobalFooter() {
  const pathname = usePathname()
  
  if (pathname === '/splash' || pathname.includes('/warroom')) return null

  return (
    <footer className="border-t border-gray-900 bg-black">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="mb-4">
              <div className="text-lg font-light tracking-wider text-white">SAINTVISIONAI</div>
              <div className="text-xs text-gray-600 tracking-widest mt-1">RESPONSIBLE INTELLIGENCE</div>
            </div>
            <div className="text-xs text-gray-500 leading-relaxed">
              HACP™ Protocol Protected
              <br />
              Patent Pending #99329797
            </div>
          </div>

          <div>
            <h4 className="text-xs tracking-widest text-gray-400 mb-4">PRODUCT</h4>
            <div className="space-y-2">
              <a href="/warroom" className="block text-sm text-gray-600 hover:text-white transition">Warroom</a>
              <a href="/dashboard" className="block text-sm text-gray-600 hover:text-white transition">Dashboard</a>
              <a href="/pro" className="block text-sm text-gray-600 hover:text-white transition">Enterprise</a>
              <a href="/api" className="block text-sm text-gray-600 hover:text-white transition">API</a>
            </div>
          </div>

          <div>
            <h4 className="text-xs tracking-widest text-gray-400 mb-4">COMPANY</h4>
            <div className="space-y-2">
              <a href="/institute" className="block text-sm text-gray-600 hover:text-white transition">Institute</a>
              <a href="/brokerage" className="block text-sm text-gray-600 hover:text-white transition">Brokerage</a>
              <a href="/why" className="block text-sm text-gray-600 hover:text-white transition">Mission</a>
              <a href="/legal" className="block text-sm text-gray-600 hover:text-white transition">Legal</a>
            </div>
          </div>

          <div>
            <h4 className="text-xs tracking-widest text-gray-400 mb-4">SUPPORT</h4>
            <div className="space-y-2">
              <a href="/help" className="block text-sm text-gray-600 hover:text-white transition">24/7 Help Desk</a>
              <a href="/docs" className="block text-sm text-gray-600 hover:text-white transition">Documentation</a>
              <a href="/status" className="block text-sm text-gray-600 hover:text-white transition">System Status</a>
              <div className="mt-4 pt-4 border-t border-gray-900">
                <div className="text-xs text-green-500">● All Systems Operational</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-900 flex justify-between items-center">
          <div className="text-xs text-gray-600">
            © 2024 Saint Visions I.P. Holdings, LP. All rights reserved.
          </div>
          <div className="flex items-center space-x-4 text-xs text-gray-600">
            <span>Terms</span>
            <span>Privacy</span>
            <span>Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
