import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import GlobalNav from '@/components/GlobalNav'
import GlobalFooter from '@/components/GlobalFooter'
import { Providers } from '@/components/Providers'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'SAINTVISIONAI - Human-AI Connection Protocol',
  description: 'HACP™ Protected Intelligence Platform',
  keywords: 'AI, HACP, SaintVisionAI, SAL, Enterprise AI, Human Connection',
  authors: [{ name: 'Saint Visions I.P. Holdings, LP' }],
  openGraph: {
    title: 'SAINTVISIONAI',
    description: 'The Future of Human-AI Collaboration',
    images: ['/og-image.png'],
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-black text-white antialiased">
        <Providers>
          <GlobalNav />
          <main className="min-h-screen">
            {children}
          </main>
          <GlobalFooter />
        </Providers>
      </body>
    </html>
  )
}
