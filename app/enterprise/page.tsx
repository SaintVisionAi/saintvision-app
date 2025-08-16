'use client'

export default function EnterprisePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-1 mb-6">
            <span className="text-yellow-500 text-sm font-semibold">🏢 ENTERPRISE GRADE</span>
          </div>
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Enterprise AI Platform
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Built for Scale
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            HACP™ Protected Intelligence Platform designed for Fortune 500 companies. 
            Enterprise-grade security, unlimited scalability, and AI that drives real business results.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="px-8 py-4 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400">
              Schedule Enterprise Demo
            </button>
            <button className="px-8 py-4 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700">
              Download White Paper
            </button>
          </div>
        </div>

        {/* Enterprise Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">🚀 Enterprise Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-yellow-500/50 transition">
              <div className="text-yellow-500 text-3xl mb-4">🔐</div>
              <h3 className="text-xl font-bold mb-3">Enterprise Security</h3>
              <ul className="text-gray-400 space-y-2">
                <li>• SOC2 Type II Compliance</li>
                <li>• End-to-end encryption</li>
                <li>• Single Sign-On (SSO)</li>
                <li>• Role-based access control</li>
                <li>• HIPAA compliance ready</li>
              </ul>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-yellow-500/50 transition">
              <div className="text-yellow-500 text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-3">Unlimited Scale</h3>
              <ul className="text-gray-400 space-y-2">
                <li>• Multi-tenant architecture</li>
                <li>• Auto-scaling infrastructure</li>
                <li>• 99.9% uptime SLA</li>
                <li>• Global CDN deployment</li>
                <li>• Load balancing</li>
              </ul>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-yellow-500/50 transition">
              <div className="text-yellow-500 text-3xl mb-4">🔗</div>
              <h3 className="text-xl font-bold mb-3">Deep Integrations</h3>
              <ul className="text-gray-400 space-y-2">
                <li>• Salesforce CRM sync</li>
                <li>• Microsoft Teams/Slack</li>
                <li>• Custom API endpoints</li>
                <li>• Webhook automation</li>
                <li>• Third-party connectors</li>
              </ul>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-yellow-500/50 transition">
              <div className="text-yellow-500 text-3xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-3">Advanced Analytics</h3>
              <ul className="text-gray-400 space-y-2">
                <li>• Real-time dashboards</li>
                <li>• Custom reporting</li>
                <li>• AI performance metrics</li>
                <li>• Usage analytics</li>
                <li>• ROI tracking</li>
              </ul>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-yellow-500/50 transition">
              <div className="text-yellow-500 text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-3">Custom AI Models</h3>
              <ul className="text-gray-400 space-y-2">
                <li>• Industry-specific training</li>
                <li>• Custom knowledge bases</li>
                <li>• Brand voice adaptation</li>
                <li>• Workflow automation</li>
                <li>• Domain expertise</li>
              </ul>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-yellow-500/50 transition">
              <div className="text-yellow-500 text-3xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-3">White Label Ready</h3>
              <ul className="text-gray-400 space-y-2">
                <li>• Custom branding</li>
                <li>• Subdomain hosting</li>
                <li>• API white-labeling</li>
                <li>• Partner program</li>
                <li>• Revenue sharing</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">💼 Enterprise Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
              <h3 className="text-2xl font-bold mb-4">Professional</h3>
              <div className="text-3xl font-bold mb-4">$299<span className="text-lg text-gray-400">/mo</span></div>
              <ul className="space-y-3 mb-6">
                <li>• Up to 50 users</li>
                <li>• 100,000 AI requests/month</li>
                <li>• Standard integrations</li>
                <li>• Email support</li>
                <li>• Basic analytics</li>
              </ul>
              <button className="w-full px-6 py-3 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700">
                Start Trial
              </button>
            </div>

            <div className="bg-gray-900 rounded-lg p-8 border-2 border-yellow-500 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
              <div className="text-3xl font-bold mb-4">$999<span className="text-lg text-gray-400">/mo</span></div>
              <ul className="space-y-3 mb-6">
                <li>• Unlimited users</li>
                <li>• 1M AI requests/month</li>
                <li>• All integrations</li>
                <li>• 24/7 priority support</li>
                <li>• Advanced analytics</li>
                <li>• Custom AI models</li>
              </ul>
              <button className="w-full px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400">
                Contact Sales
              </button>
            </div>

            <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
              <h3 className="text-2xl font-bold mb-4">White Label</h3>
              <div className="text-3xl font-bold mb-4">Custom</div>
              <ul className="space-y-3 mb-6">
                <li>• Full platform licensing</li>
                <li>• Custom branding</li>
                <li>• Revenue sharing</li>
                <li>• Dedicated infrastructure</li>
                <li>• Custom development</li>
                <li>• Partner support</li>
              </ul>
              <button className="w-full px-6 py-3 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700">
                Partner Program
              </button>
            </div>
          </div>
        </section>

        {/* Customer Success */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">🏢 Trusted by Industry Leaders</h2>
          <div className="bg-gray-900 rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border-l-4 border-yellow-500 pl-6">
                <h4 className="text-lg font-semibold mb-2">Fortune 500 Financial Services</h4>
                <p className="text-gray-400 mb-3">
                  "HACP™ technology increased our customer service efficiency by 340% while 
                  maintaining the highest security standards required for financial data."
                </p>
                <p className="text-sm text-yellow-500">— Chief Technology Officer</p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-6">
                <h4 className="text-lg font-semibold mb-2">Global Healthcare Provider</h4>
                <p className="text-gray-400 mb-3">
                  "The enterprise AI platform transformed our patient care workflow. 
                  HIPAA compliance and 99.9% uptime gave us confidence to scale globally."
                </p>
                <p className="text-sm text-blue-500">— Director of Digital Innovation</p>
              </div>
            </div>
          </div>
        </section>

        {/* Implementation */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">🚀 Implementation Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-yellow-500">1</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">Discovery Call</h4>
              <p className="text-gray-400 text-sm">
                Understand your requirements, current tech stack, and business objectives.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-yellow-500">2</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">Pilot Program</h4>
              <p className="text-gray-400 text-sm">
                30-day pilot with your team to validate AI capabilities and integration.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-yellow-500">3</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">Custom Setup</h4>
              <p className="text-gray-400 text-sm">
                Tailored AI models, integrations, and security configurations for your organization.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-yellow-500">4</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">Scale & Optimize</h4>
              <p className="text-gray-400 text-sm">
                Full deployment with ongoing optimization and dedicated enterprise support.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="text-center bg-gradient-to-r from-yellow-900/20 to-gray-900/20 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Enterprise?</h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Join industry leaders using HACP™ protected AI to drive unprecedented business results. 
            Schedule your enterprise demo today and see the future of AI in action.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="px-8 py-4 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400">
              Schedule Enterprise Demo
            </button>
            <button className="px-8 py-4 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700">
              Request Pricing
            </button>
          </div>
          
          <div className="mt-8 text-sm text-gray-500">
            <p>📧 enterprise@saintvisionai.com | 📞 1-800-SAINT-AI</p>
            <p>🔐 Patent #10,290,222 Protected | 🏢 Enterprise Ready Since Day One</p>
          </div>
        </section>
      </div>
    </div>
  )
}