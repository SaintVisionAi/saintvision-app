'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-yellow-500 rounded flex items-center justify-center text-black font-bold">
                SV
              </div>
              <div>
                <div className="font-bold">SaintVisionAI™</div>
                <div className="text-xs text-gray-500">Cookin' Knowledge</div>
              </div>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              HACP™ Protected Intelligence Platform. Patented dual neuro-symbolic architecture 
              powering the future of human-AI collaboration.
            </p>
            <div className="text-sm text-gray-500">
              <p>Patent #10,290,222 | Saint Visions I.P. Holdings, LP</p>
              <p>Enterprise AI • Cookin' Knowledge Since 2023</p>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Platform</h4>
            <div className="space-y-2 text-sm">
              <Link href="/warroom" className="block text-gray-400 hover:text-white transition">
                WarRoom
              </Link>
              <Link href="/agents" className="block text-gray-400 hover:text-white transition">
                AI Agents
              </Link>
              <Link href="/workstation" className="block text-gray-400 hover:text-white transition">
                Workstation
              </Link>
              <Link href="/crm" className="block text-gray-400 hover:text-white transition">
                GHL Integration
              </Link>
              <Link href="/connectivity" className="block text-gray-400 hover:text-white transition">
                Connectivity
              </Link>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <div className="space-y-2 text-sm">
              <Link href="/why" className="block text-gray-400 hover:text-white transition">
                Why SaintVision
              </Link>
              <Link href="/institute" className="block text-gray-400 hover:text-white transition">
                AI Institute
              </Link>
              <Link href="/enterprise" className="block text-gray-400 hover:text-white transition">
                Enterprise
              </Link>
              <Link href="/svg" className="block text-gray-400 hover:text-white transition">
                SVG Brokerage
              </Link>
              <Link href="/legal" className="block text-gray-400 hover:text-white transition">
                Legal & Compliance
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-500 mb-4 md:mb-0">
            © 2024 SaintVisionAI™. All rights reserved. HACP™ technology protected by U.S. Patent #10,290,222.
          </div>
          
          <div className="flex items-center space-x-6">
            <Link href="/help" className="text-gray-400 hover:text-white text-sm transition">
              24/7 Support
            </Link>
            <Link href="/legal" className="text-gray-400 hover:text-white text-sm transition">
              Privacy Policy
            </Link>
            <Link href="/legal" className="text-gray-400 hover:text-white text-sm transition">
              Terms of Service
            </Link>
          </div>
        </div>

        {/* Enterprise Badge */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
            <span className="text-xs text-yellow-500 font-medium">ENTERPRISE READY • HACP™ ACTIVE</span>
          </div>
        </div>
      </div>
    </footer>
  )
}