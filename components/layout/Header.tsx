'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Header() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full bg-black/95 backdrop-blur-sm border-b border-gray-800 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center text-black font-bold text-sm">
              SV
            </div>
            <div>
              <div className="font-bold text-white">SaintVisionAI™</div>
              <div className="text-xs text-gray-500">Cookin' Knowledge</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition">
              Home
            </Link>
            <Link href="/why" className="text-gray-300 hover:text-white transition">
              Why
            </Link>
            <Link href="/warroom" className="text-gray-300 hover:text-white transition">
              WarRoom
            </Link>
            <Link href="/agents" className="text-gray-300 hover:text-white transition">
              Agents
            </Link>
            <Link href="/crm" className="text-gray-300 hover:text-white transition">
              CRM
            </Link>
            <Link href="/pricing" className="text-gray-300 hover:text-white transition">
              Pricing
            </Link>
            <Link href="/help" className="text-gray-300 hover:text-white transition">
              Help
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/signin" 
              className="text-gray-300 hover:text-white transition"
            >
              Sign In
            </Link>
            <Link 
              href="/signup" 
              className="px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-300 hover:text-white transition">
                Home
              </Link>
              <Link href="/why" className="text-gray-300 hover:text-white transition">
                Why
              </Link>
              <Link href="/warroom" className="text-gray-300 hover:text-white transition">
                WarRoom
              </Link>
              <Link href="/agents" className="text-gray-300 hover:text-white transition">
                Agents
              </Link>
              <Link href="/crm" className="text-gray-300 hover:text-white transition">
                CRM
              </Link>
              <Link href="/pricing" className="text-gray-300 hover:text-white transition">
                Pricing
              </Link>
              <Link href="/help" className="text-gray-300 hover:text-white transition">
                Help
              </Link>
              <hr className="border-gray-800" />
              <Link href="/signin" className="text-gray-300 hover:text-white transition">
                Sign In
              </Link>
              <Link 
                href="/signup" 
                className="px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition w-fit"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}