'use client'

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Legal & Compliance</h1>
          <p className="text-gray-400">HACP™ Protected Intelligence Platform</p>
        </div>

        <div className="space-y-12">
          {/* Patent Information */}
          <section className="bg-gray-900 rounded-lg p-8 border border-yellow-500/30">
            <h2 className="text-2xl font-bold mb-4 text-yellow-500">🏆 Patent Protection</h2>
            <div className="space-y-4">
              <p><strong>Patent Number:</strong> #10,290,222</p>
              <p><strong>Filing Date:</strong> Original Patent Filed</p>
              <p><strong>Protection:</strong> Human-AI Connection Protocol (HACP™)</p>
              <p><strong>Jurisdiction:</strong> United States Patent and Trademark Office</p>
              <p className="text-sm text-gray-400">
                HACP™ technology is protected by U.S. Patent #10,290,222. 
                Any unauthorized use, reproduction, or distribution is strictly prohibited.
              </p>
            </div>
          </section>

          {/* Terms of Service */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Terms of Service</h2>
            <div className="bg-gray-900 rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold">1. Acceptance of Terms</h3>
              <p className="text-gray-300">
                By accessing and using SaintVisionAI services, you agree to be bound by these Terms of Service 
                and all applicable laws and regulations.
              </p>

              <h3 className="text-lg font-semibold">2. HACP™ Technology License</h3>
              <p className="text-gray-300">
                Use of HACP™ protected technology is licensed, not sold. You receive a limited, 
                non-exclusive, non-transferable license to use our AI platform.
              </p>

              <h3 className="text-lg font-semibold">3. Data Protection</h3>
              <p className="text-gray-300">
                Your data is protected by enterprise-grade security measures. We implement SOC2 Type II 
                compliance standards and maintain strict data privacy protocols.
              </p>

              <h3 className="text-lg font-semibold">4. Intellectual Property</h3>
              <p className="text-gray-300">
                All AI models, algorithms, and HACP™ technology remain the exclusive property of 
                Saint Visions I.P. Holdings, LP.
              </p>
            </div>
          </section>

          {/* Privacy Policy */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Privacy Policy</h2>
            <div className="bg-gray-900 rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold">Data Collection</h3>
              <p className="text-gray-300">
                We collect only the data necessary to provide AI services: conversation history, 
                usage analytics, and account information.
              </p>

              <h3 className="text-lg font-semibold">Data Use</h3>
              <p className="text-gray-300">
                Your data is used exclusively to improve AI responses, maintain conversation context, 
                and provide personalized experiences.
              </p>

              <h3 className="text-lg font-semibold">Data Security</h3>
              <p className="text-gray-300">
                All data is encrypted at rest and in transit. We maintain enterprise-grade security 
                with regular audits and compliance monitoring.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Legal Contact</h2>
            <div className="bg-gray-900 rounded-lg p-6">
              <p className="text-gray-300 mb-4">
                For legal inquiries, patent licensing, or compliance questions:
              </p>
              <div className="space-y-2">
                <p><strong>Entity:</strong> Saint Visions I.P. Holdings, LP</p>
                <p><strong>Email:</strong> legal@saintvisionai.com</p>
                <p><strong>Patent:</strong> #10,290,222</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}