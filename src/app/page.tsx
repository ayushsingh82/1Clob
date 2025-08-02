'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#C6FC7B' }}>
      {/* Hero Section - Green Background */}
      <div className="flex-grow container mx-auto px-4 pt-16 pb-8" style={{ backgroundColor: '#C6FC7B' }}>
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-6 mt-[60px]" style={{ color: '#0D2818' }}>
            1Clob — The Future of Trading
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed" style={{ color: '#0D2818' }}>
          An AI-powered trading assistant built on 1inch CLOB tech — helping you book more profits and cut your losses with smarter entries and exits.
          </p>
        </div>

        {/* Features Section with Full Width Background */}
        <div className="mt-8 -mx-[100vw] px-[100vw]" style={{ backgroundColor: '#122B1B' }}>
          <div className="container mx-auto py-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Left Box - Smaller */}
              <div className="md:col-span-3 p-6 rounded-2xl shadow-2xl transform hover:scale-105 hover:rotate-1 transition-all duration-500 border-2 bg-gradient-to-br from-purple-600 to-purple-700" style={{ borderColor: '#C6FC7B' }}>
                <div className="p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 shadow-lg transform hover:rotate-12 transition-transform duration-300" style={{ backgroundColor: '#C6FC7B' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#6603BF' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 transform hover:translate-x-2 transition-transform duration-300" style={{ color: '#C6FC7B' }}>
                  AI-Powered Trading
                </h3>
                <p className="text-LG leading-relaxed" style={{ color: '#C6FC7B' }}>
                  Advanced AI algorithms analyze market conditions in real-time, providing intelligent buy/sell signals, support/resistance levels, and risk assessment for optimal trading decisions.
                </p>
              </div>
              
              {/* Middle Box - Larger */}
              <div className="md:col-span-6 p-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500 bg-[#C6FC7B]" style={{ backgroundColor: '#C6FC7B' }}>
                <div className="p-4 rounded-full w-16 h-16 flex items-center justify-center mb-5 shadow-lg transform hover:rotate-12 transition-transform duration-300" style={{ backgroundColor: '#6603BF' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#C6FC7B' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold mb-4 transform hover:translate-x-2 transition-transform duration-300" style={{ color: '#0D2818' }}>
                  CLOB Technology
                </h3>
                <p className="text-base leading-relaxed mb-4" style={{ color: '#0D2818' }}>
                  Central Limit Order Book technology powered by 1inch:<br/>
                  • Real-time order matching with deep liquidity<br/>
                  • MEV protection and fair price discovery<br/>
                  • Cross-chain order routing and settlement<br/>
                  • Advanced limit order execution
                </p>
                <div className="mt-6">
                  <Link href="/launch" className="inline-flex items-center text-base font-bold px-4 py-2 rounded-xl hover:scale-110 transform transition-all duration-300 shadow-lg" style={{ color: '#C6FC7B', backgroundColor: '#6603BF' }}>
                    Start Trading 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
              
              {/* Right Box - Smaller */}
              <div className="md:col-span-3 p-6 rounded-2xl shadow-2xl transform hover:scale-105 hover:rotate-1 transition-all duration-500 border-2 bg-gradient-to-br from-purple-600 to-purple-700" style={{ borderColor: '#C6FC7B' }}>
                <div className="p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 shadow-lg transform hover:rotate-12 transition-transform duration-300" style={{ backgroundColor: '#C6FC7B' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#6603BF' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 transform hover:translate-x-2 transition-transform duration-300" style={{ color: '#C6FC7B' }}>
                  Market Analysis
                </h3>
                <p className="text-md leading-relaxed" style={{ color: '#C6FC7B' }}>
                  Interactive 1inch CLOB API explorer with real-time orderbook data, limit order management, and market depth analysis. Test and integrate with 1inch&apos;s Central Limit Order Book APIs directly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section - Full Width Background */}
        <div className="-mx-[100vw] px-[100vw] py-12" style={{ backgroundColor: '#6603BF' }}>
          <div className="container mx-auto">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-12" style={{ color: '#C6FC7B' }}>Why Choose 1inch?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl shadow-2xl transform hover:scale-110 hover:rotate-2 transition-all duration-500 bg-gradient-to-br from-gray-200 to-gray-300">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg transform hover:rotate-12 transition-transform duration-300" style={{ backgroundColor: '#08130C' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#ECEFEC' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 transform hover:translate-y-1 transition-transform duration-300" style={{ color: '#08130C' }}>Best Trades</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#08130C' }}>Always get the best trades </p>
                </div>
                <div className="p-6 rounded-2xl shadow-2xl transform hover:scale-110 hover:rotate-2 transition-all duration-500 bg-[#C6FC7B]">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg transform hover:rotate-12 transition-transform duration-300" style={{ backgroundColor: '#08130C' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#7CE8A5' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 transform hover:translate-y-1 transition-transform duration-300" style={{ color: '#08130C' }}>AI Trade Analysis</h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#08130C' }}>Helps you to book maximum profit </p>
                  </div>
                <div className="p-6 rounded-2xl shadow-2xl transform hover:scale-110 hover:rotate-2 transition-all duration-500 bg-gradient-to-br from-gray-200 to-gray-300">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg transform hover:rotate-12 transition-transform duration-300" style={{ backgroundColor: '#08130C' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#ECEFEC' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 transform hover:translate-y-1 transition-transform duration-300" style={{ color: '#08130C' }}>CLOB Technology</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#08130C' }}>Powered by 1inch CLOB tech</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section - Full Width Background */}
        <div className="-mx-[100vw] px-[100vw] py-12 " style={{ backgroundColor: '#122B1B' }}>
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12" style={{ color: '#C6FC7B' }}>
              How 1Clob Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 border-l-8 bg-[#C6FC7B]" style={{ borderColor: '#08130C' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4 shadow-lg transform hover:rotate-360 transition-transform duration-700" style={{ backgroundColor: '#08130C', color: '#7CE8A5' }}>1</div>
                <h4 className="text-lg font-bold mb-3 transform hover:translate-x-2 transition-transform duration-300" style={{ color: '#08130C' }}>
                Smart Trade Placement
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: '#08130C' }}>
                When you select a token, our AI instantly scans the chart to highlight key support and resistance zones, giving you clarity before you place a trade.
                </p>
              </div>
              
              <div className="p-6 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 mt-4 md:mt-8 border-l-8 bg-gradient-to-br from-green-300 to-green-400" style={{ borderColor: '#122B1B' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4 shadow-lg transform hover:rotate-360 transition-transform duration-700" style={{ backgroundColor: '#122B1B', color: '#C6FC7B' }}>2</div>
                <h4 className="text-lg font-bold mb-3 transform hover:translate-x-2 transition-transform duration-300" style={{ color: '#122B1B' }}>
                Signal-Backed Execution
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: '#122B1B' }}>
                Based on real-time data and historical trends, the engine suggests entry points, stop-loss, and take-profit levels for optimized trading decisions.
                </p>
              </div>
              
              <div className="p-6 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 mt-4 md:mt-16 border-l-8 bg-gradient-to-br from-gray-200 to-gray-300" style={{ borderColor: '#08130C' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4 shadow-lg transform hover:rotate-360 transition-transform duration-700" style={{ backgroundColor: '#08130C', color: '#ECEFEC' }}>3</div>
                <h4 className="text-lg font-bold mb-3 transform hover:translate-x-2 transition-transform duration-300" style={{ color: '#08130C' }}>
                Live Trade Tracking
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: '#08130C' }}>
                Once your trade is active, the system monitors price movement, updating your dashboard with real-time status and position health.
                </p>
              </div>
              
              <div className="p-6 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 mt-4 md:mt-24 border-l-8 bg-[#C6FC7B]" style={{ borderColor: '#08130C' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4 shadow-lg transform hover:rotate-360 transition-transform duration-700" style={{ backgroundColor: '#08130C', color: '#7CE8A5' }}>4</div>
                <h4 className="text-lg font-bold mb-3 transform hover:translate-x-2 transition-transform duration-300" style={{ color: '#08130C' }}>
                Proactive Alerts & Risk Management
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: '#08130C' }}>
                Get instant alerts when price nears critical levels, with optional automation to adjust stop-loss or close trades based on AI signals.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Getting Started Section - Full Width Background */}
        <div className="py-16 mt-[50px] w-[800px] h-[280px] mx-auto border-2 border-transparent rounded-2xl" style={{ backgroundColor: '#6603BF' }}>
          <div className="container mx-auto px-8">
            <div className="text-center">
              <div className="mb-12 mt-8">
                <h2 className="text-3xl font-bold mb-4" style={{ color: '#C6FC7B' }}>Get Ready to Start with 1Clob</h2>
                <p className="text-sm leading-relaxed mb-6" style={{ color: '#C6FC7B' }}>
                  Get started with 1Clob today and book the maximum profit  .
                </p>
                <div className="flex justify-center gap-4">
                  <button className="bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
                    Try Launcher
                  </button>
                  <button className="bg-[#C6FC7B] text-[#122B1B] px-6 py-3 rounded-md font-semibold hover:bg-[#B5E86A] transition-colors">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Silver Line */}
      <div className="h-px mx-4" style={{ backgroundColor: '#C6FC7B' }}></div>
    </div>
  );
}