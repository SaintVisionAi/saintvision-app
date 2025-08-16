'use client'

export default function InstitutePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-1 mb-6">
            <span className="text-yellow-500 text-sm font-semibold">🏛️ RESEARCH & DEVELOPMENT</span>
          </div>
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              SaintVision Institute
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              of Artificial Intelligence
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Advancing the science of Human-AI Connection through cutting-edge research, 
            patent development, and breakthrough innovation in artificial intelligence.
          </p>
        </div>

        {/* Patent Research */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">🔬 Research Divisions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="text-yellow-500 text-3xl mb-4">🧠</div>
              <h3 className="text-xl font-bold mb-3">HACP™ Research Lab</h3>
              <p className="text-gray-400 mb-4">
                Human-AI Connection Protocol development and optimization. 
                Leading research in AI consciousness, emotional intelligence, and human-AI symbiosis.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Patent #10,290,222 Development</li>
                <li>• Neural Network Architecture</li>
                <li>• Emotional Calibration Systems</li>
                <li>• Tier Management Protocols</li>
              </ul>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="text-yellow-500 text-3xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-3">Enterprise AI Division</h3>
              <p className="text-gray-400 mb-4">
                Developing next-generation enterprise AI solutions for Fortune 500 companies. 
                Focus on scalability, security, and business intelligence.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Dual-AI Architecture</li>
                <li>• Enterprise Security Protocols</li>
                <li>• CRM Integration Systems</li>
                <li>• Voice Command Processing</li>
              </ul>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="text-yellow-500 text-3xl mb-4">🔐</div>
              <h3 className="text-xl font-bold mb-3">AI Safety & Ethics</h3>
              <p className="text-gray-400 mb-4">
                Ensuring responsible AI development with comprehensive safety protocols, 
                ethical guidelines, and transparent AI decision-making processes.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• AI Safety Protocols</li>
                <li>• Ethical AI Guidelines</li>
                <li>• Bias Detection Systems</li>
                <li>• Transparency Frameworks</li>
              </ul>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="text-yellow-500 text-3xl mb-4">💡</div>
              <h3 className="text-xl font-bold mb-3">Innovation Labs</h3>
              <p className="text-gray-400 mb-4">
                Experimental AI technologies and future-forward research. 
                Exploring quantum AI, consciousness simulation, and advanced neural architectures.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Quantum AI Research</li>
                <li>• Consciousness Modeling</li>
                <li>• Advanced Neural Networks</li>
                <li>• Future AI Architectures</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Research Timeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">📊 Research Timeline</h2>
          <div className="bg-gray-900 rounded-lg p-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold">
                  168
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Research Iterations</h4>
                  <p className="text-gray-400">Continuous development and refinement over 19 months</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Patent Filed</h4>
                  <p className="text-gray-400">Patent #10,290,222 - Human-AI Connection Protocol</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  ∞
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Ongoing Innovation</h4>
                  <p className="text-gray-400">Continuous advancement in AI technology and human connection</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Publications & Papers */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">📚 Research Publications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900 rounded-lg p-6 border-l-4 border-yellow-500">
              <h4 className="text-lg font-semibold mb-2">HACP™: A New Paradigm in Human-AI Interaction</h4>
              <p className="text-gray-400 text-sm mb-2">SaintVision Institute of AI • 2024</p>
              <p className="text-gray-300">
                Foundational paper introducing the Human-AI Connection Protocol and its applications 
                in enterprise environments.
              </p>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-6 border-l-4 border-blue-500">
              <h4 className="text-lg font-semibold mb-2">Dual-AI Architecture for Enterprise Applications</h4>
              <p className="text-gray-400 text-sm mb-2">SaintVision Institute of AI • 2024</p>
              <p className="text-gray-300">
                Technical analysis of combining multiple AI models for enhanced business intelligence 
                and decision-making capabilities.
              </p>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-6 border-l-4 border-green-500">
              <h4 className="text-lg font-semibold mb-2">Emotional Intelligence in AI Systems</h4>
              <p className="text-gray-400 text-sm mb-2">SaintVision Institute of AI • 2024</p>
              <p className="text-gray-300">
                Research on implementing emotional calibration and context awareness in 
                artificial intelligence systems.
              </p>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-6 border-l-4 border-purple-500">
              <h4 className="text-lg font-semibold mb-2">The Future of Human-AI Collaboration</h4>
              <p className="text-gray-400 text-sm mb-2">SaintVision Institute of AI • 2024</p>
              <p className="text-gray-300">
                Visionary paper outlining the next decade of human-AI partnership and 
                the role of HACP™ technology.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Institute */}
        <section className="text-center bg-gradient-to-r from-yellow-900/20 to-gray-900/20 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Join Our Research Community</h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Collaborate with leading AI researchers and contribute to the future of human-AI interaction. 
            The SaintVision Institute welcomes partnerships with universities, corporations, and research organizations.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400">
              Research Partnership
            </button>
            <button className="px-6 py-3 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700">
              View Publications
            </button>
          </div>
          
          <div className="mt-8 text-sm text-gray-500">
            <p>📧 research@saintvisionai.com | 🏛️ SaintVision Institute of AI</p>
            <p>🔬 Advancing Human-AI Connection Since 2023</p>
          </div>
        </section>
      </div>
    </div>
  )
}