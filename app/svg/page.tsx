'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function SVGBrokeragePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('trading')

  const tradingMetrics = [
    { label: 'Portfolio Value', value: '$2.4M', change: '+12.3%', positive: true },
    { label: 'Daily P&L', value: '+$47,250', change: '+5.8%', positive: true },
    { label: 'Win Rate', value: '78.4%', change: '+2.1%', positive: true },
    { label: 'Alpha Generated', value: '15.2%', change: '+3.4%', positive: true }
  ]

  const positions = [
    { symbol: 'NVDA', shares: 1200, price: 445.67, pl: '+$12,450', positive: true },
    { symbol: 'MSFT', shares: 800, price: 378.12, pl: '+$8,920', positive: true },
    { symbol: 'TSLA', shares: 500, price: 234.56, pl: '-$2,340', positive: false },
    { symbol: 'AAPL', shares: 1500, price: 189.43, pl: '+$15,670', positive: true }
  ]

  return (
    <>
      <Header />
      <div className="min-h-screen bg-black text-white pt-20">
      {/* Header */}
      <div className="bg-gray-950 border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={() => router.push('/')} className="text-gray-400 hover:text-white">
              ← Home
            </button>
            <h1 className="text-2xl font-bold">📈 SVG Brokerage</h1>
            <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-green-400">MARKETS OPEN</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">Powered by HACP™ AI Trading</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 px-6 border-b border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              AI-Powered Trading Platform
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            HACP™ intelligence meets Wall Street precision. Advanced algorithmic trading, 
            real-time market analysis, and AI-driven investment strategies.
          </p>
          
          {/* Market Overview */}
          <div className="grid grid-cols-4 gap-6 mt-8">
            {tradingMetrics.map((metric, index) => (
              <div key={index} className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                <div className="text-sm text-gray-400 mb-1">{metric.label}</div>
                <div className="text-2xl font-bold mb-1">{metric.value}</div>
                <div className={`text-sm ${metric.positive ? 'text-green-400' : 'text-red-400'}`}>
                  {metric.change}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trading Dashboard */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-8 bg-gray-900 p-1 rounded-lg">
            {[
              { id: 'trading', label: '📊 Trading Dashboard', icon: '📊' },
              { id: 'ai-signals', label: '🤖 AI Signals', icon: '🤖' },
              { id: 'portfolio', label: '💼 Portfolio', icon: '💼' },
              { id: 'research', label: '🔬 Research', icon: '🔬' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 px-4 rounded-lg transition ${
                  activeTab === tab.id
                    ? 'bg-yellow-500 text-black font-bold'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Trading Dashboard Content */}
          {activeTab === 'trading' && (
            <div className="grid grid-cols-12 gap-6">
              {/* Chart Area */}
              <div className="col-span-8 bg-gray-900 rounded-lg p-6 border border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Market Analysis</h3>
                  <div className="flex space-x-2">
                    <select className="bg-gray-800 border border-gray-700 rounded px-3 py-1 text-sm">
                      <option>SPY</option>
                      <option>QQQ</option>
                      <option>IWM</option>
                    </select>
                    <select className="bg-gray-800 border border-gray-700 rounded px-3 py-1 text-sm">
                      <option>1D</option>
                      <option>1W</option>
                      <option>1M</option>
                    </select>
                  </div>
                </div>
                
                {/* Chart Placeholder */}
                <div className="h-80 bg-gray-800 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📈</div>
                    <h4 className="text-xl font-semibold mb-2">Live Market Chart</h4>
                    <p className="text-gray-400">HACP™ AI Technical Analysis</p>
                  </div>
                </div>
              </div>

              {/* Trading Panel */}
              <div className="col-span-4 space-y-6">
                {/* Quick Trade */}
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h3 className="text-lg font-semibold mb-4">⚡ Quick Trade</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Symbol</label>
                      <input 
                        type="text" 
                        placeholder="AAPL" 
                        className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Quantity</label>
                        <input 
                          type="number" 
                          placeholder="100" 
                          className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Order Type</label>
                        <select className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2">
                          <option>Market</option>
                          <option>Limit</option>
                          <option>Stop</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button className="py-2 bg-green-600 rounded hover:bg-green-700 transition">
                        BUY
                      </button>
                      <button className="py-2 bg-red-600 rounded hover:bg-red-700 transition">
                        SELL
                      </button>
                    </div>
                  </div>
                </div>

                {/* AI Recommendation */}
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-6 border border-blue-500/30">
                  <h3 className="text-lg font-semibold mb-3">🤖 AI Recommendation</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-300">Signal:</span>
                      <span className="text-green-400 font-bold">STRONG BUY</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-300">Confidence:</span>
                      <span className="text-yellow-400 font-bold">94.7%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-300">Target:</span>
                      <span className="text-blue-400 font-bold">$195.50</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-3">
                      HACP™ analysis indicates strong bullish momentum with high probability breakout pattern.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI Signals Content */}
          {activeTab === 'ai-signals' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <h3 className="text-lg font-semibold mb-4">🚨 Active Signals</h3>
                <div className="space-y-3">
                  {[
                    { symbol: 'NVDA', signal: 'STRONG BUY', confidence: '96.2%', target: '$465', color: 'green' },
                    { symbol: 'MSFT', signal: 'BUY', confidence: '87.4%', target: '$385', color: 'green' },
                    { symbol: 'TSLA', signal: 'HOLD', confidence: '72.1%', target: '$240', color: 'yellow' },
                    { symbol: 'META', signal: 'SELL', confidence: '89.3%', target: '$290', color: 'red' }
                  ].map((signal, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded">
                      <div className="flex items-center space-x-3">
                        <span className="font-bold">{signal.symbol}</span>
                        <span className={`text-sm px-2 py-1 rounded ${
                          signal.color === 'green' ? 'bg-green-500/20 text-green-400' :
                          signal.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {signal.signal}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-400">{signal.confidence}</div>
                        <div className="text-sm text-blue-400">{signal.target}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <h3 className="text-lg font-semibold mb-4">🧠 AI Insights</h3>
                <div className="space-y-4">
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded p-4">
                    <h4 className="font-semibold text-blue-400 mb-2">Market Sentiment</h4>
                    <p className="text-sm text-gray-300">
                      HACP™ analysis shows 73% bullish sentiment across tech sector with strong momentum indicators.
                    </p>
                  </div>
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-4">
                    <h4 className="font-semibold text-yellow-400 mb-2">Risk Alert</h4>
                    <p className="text-sm text-gray-300">
                      Elevated volatility expected around FOMC announcement. Consider position sizing adjustments.
                    </p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 rounded p-4">
                    <h4 className="font-semibold text-green-400 mb-2">Opportunity</h4>
                    <p className="text-sm text-gray-300">
                      AI detected unusual options activity in semiconductor names suggesting institutional accumulation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Portfolio Content */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6">
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <h3 className="text-lg font-semibold mb-4">💼 Current Positions</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-gray-400 border-b border-gray-800">
                        <th className="pb-3">Symbol</th>
                        <th className="pb-3">Shares</th>
                        <th className="pb-3">Current Price</th>
                        <th className="pb-3">Market Value</th>
                        <th className="pb-3">P&L</th>
                        <th className="pb-3">Action</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {positions.map((position, index) => (
                        <tr key={index} className="border-b border-gray-800">
                          <td className="py-3 font-bold">{position.symbol}</td>
                          <td className="py-3">{position.shares.toLocaleString()}</td>
                          <td className="py-3">${position.price}</td>
                          <td className="py-3">${(position.shares * position.price).toLocaleString()}</td>
                          <td className={`py-3 font-bold ${position.positive ? 'text-green-400' : 'text-red-400'}`}>
                            {position.pl}
                          </td>
                          <td className="py-3">
                            <button className="px-3 py-1 bg-gray-700 rounded text-xs hover:bg-gray-600">
                              Trade
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Research Content */}
          {activeTab === 'research' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-gray-900 rounded-lg p-6 border border-gray-800">
                <h3 className="text-lg font-semibold mb-4">📊 Market Research</h3>
                <div className="space-y-4">
                  {[
                    { title: 'Tech Sector Outlook Q4 2024', author: 'SVG Research', rating: 'BUY', date: '2 hours ago' },
                    { title: 'Federal Reserve Policy Impact Analysis', author: 'AI Economics Team', rating: 'NEUTRAL', date: '4 hours ago' },
                    { title: 'Semiconductor Industry Deep Dive', author: 'SVG Research', rating: 'STRONG BUY', date: '1 day ago' }
                  ].map((report, index) => (
                    <div key={index} className="p-4 bg-gray-800 rounded border-l-4 border-yellow-500">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{report.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded ${
                          report.rating === 'STRONG BUY' ? 'bg-green-500/20 text-green-400' :
                          report.rating === 'BUY' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {report.rating}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>{report.author}</span>
                        <span>{report.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h3 className="text-lg font-semibold mb-4">📈 Top Performers</h3>
                  <div className="space-y-3">
                    {[
                      { symbol: 'NVDA', change: '+8.7%' },
                      { symbol: 'AMD', change: '+6.2%' },
                      { symbol: 'MSFT', change: '+4.1%' },
                      { symbol: 'GOOGL', change: '+3.8%' }
                    ].map((stock, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="font-bold">{stock.symbol}</span>
                        <span className="text-green-400 font-bold">{stock.change}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h3 className="text-lg font-semibold mb-4">📉 Top Decliners</h3>
                  <div className="space-y-3">
                    {[
                      { symbol: 'TSLA', change: '-4.3%' },
                      { symbol: 'META', change: '-2.1%' },
                      { symbol: 'NFLX', change: '-1.8%' },
                      { symbol: 'UBER', change: '-1.5%' }
                    ].map((stock, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="font-bold">{stock.symbol}</span>
                        <span className="text-red-400 font-bold">{stock.change}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-6 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Trade with AI?</h2>
          <p className="text-gray-400 mb-8">
            Join thousands of traders using HACP™ AI to make smarter investment decisions. 
            Get started with our premium trading platform today.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="px-8 py-4 bg-green-600 rounded-lg hover:bg-green-700 transition font-bold">
              🚀 Start Trading
            </button>
            <button className="px-8 py-4 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition">
              📊 View Demo
            </button>
          </div>
          
          <div className="mt-8 text-sm text-gray-500">
            <p>📧 trading@svgbrokerage.com | 📞 1-800-SVG-TRADE</p>
            <p>🔐 HACP™ Protected Trading | 💼 FINRA Member SIPC</p>
          </div>
        </div>
      </section>
      </div>
      <Footer />
    </>
  )
}