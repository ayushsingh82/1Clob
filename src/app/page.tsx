'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Hero Section */}
      <div className="flex-grow container mx-auto px-4 pt-16 pb-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-6 mt-[60px]">
            1inch — The Future of DEX Trading
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            1inch brings the power of decentralized exchanges to the next level — no intermediaries, no hidden fees, just pure DeFi trading with CLOB technology.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button className="px-6 py-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 shadow-lg transition transform hover:scale-105">
              Connect Wallet
            </button>
          </div>
        </div>

        {/* Features Section with Unequal Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-16">
          {/* Left Box - Smaller */}
          <div className="md:col-span-3 bg-gray-900 p-6 rounded-xl shadow-md transform hover:translate-y-1 transition-all duration-300 border border-gray-800">
            <div className="bg-blue-400 text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">
              DEX Aggregation
            </h3>
            <p className="text-gray-400">
              Access liquidity from hundreds of DEXes across multiple chains. Our aggregation algorithm finds the best routes and lowest fees for your trades.
            </p>
          </div>
          
          {/* Middle Box - Larger */}
          <div className="md:col-span-6 bg-blue-400 p-8 rounded-xl shadow-lg text-white transform hover:translate-y-1 transition-all duration-300">
            <div className="bg-white text-blue-400 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold mb-4">
              CLOB Technology
            </h3>
            <p className="text-lg text-white">
              Advanced Central Limit Order Book technology:
              • Real-time order matching and execution
              • Deep liquidity pools across all major DEXes
              • MEV protection and fair price discovery
              • Cross-chain order routing and settlement
            </p>
            <div className="mt-6">
              <Link href="/learn-more" className="inline-flex items-center text-sm font-medium text-white hover:text-gray-100">
                Learn more 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Right Box - Smaller */}
          <div className="md:col-span-3 bg-gray-900 p-6 rounded-xl shadow-md transform hover:translate-y-1 transition-all duration-300 border border-gray-800">
            <div className="bg-blue-400 text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">
              Smart Routing
            </h3>
            <p className="text-gray-400">
              Intelligent order routing that splits trades across multiple DEXes for optimal execution. Get the best prices while minimizing slippage and gas costs.
            </p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-white text-center mb-10">
            How 1inch Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gray-900 p-6 rounded-xl border-l-4 border-blue-400 shadow-md hover:shadow-lg transition-all">
              <div className="bg-blue-400/20 text-blue-400 w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
              <h4 className="text-lg font-semibold text-white mb-2">
                Order Discovery
              </h4>
              <p className="text-gray-400">
                Scan hundreds of DEXes to find the best prices and liquidity for your trades.
              </p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-xl border-l-4 border-blue-400 shadow-md hover:shadow-lg transition-all mt-4 md:mt-0">
              <div className="bg-blue-400/20 text-blue-400 w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
              <h4 className="text-lg font-semibold text-white mb-2">
                Route Optimization
              </h4>
              <p className="text-gray-400">
                Our algorithm calculates the optimal route across multiple DEXes to minimize fees and maximize execution efficiency.
              </p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-xl border-l-4 border-blue-400 shadow-md hover:shadow-lg transition-all mt-4 md:mt-8">
              <div className="bg-blue-400/20 text-blue-400 w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
              <h4 className="text-lg font-semibold text-white mb-2">
                CLOB Execution
              </h4>
              <p className="text-gray-400">
                Execute trades using advanced Central Limit Order Book technology for professional-grade trading experience.
              </p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-xl border-l-4 border-blue-400 shadow-md hover:shadow-lg transition-all mt-4 md:mt-16">
              <div className="bg-blue-400/20 text-blue-400 w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold mb-4">4</div>
              <h4 className="text-lg font-semibold text-white mb-2">
                Settlement
              </h4>
              <p className="text-gray-400">
                Instant settlement across multiple DEXes with atomic transactions and comprehensive transaction protection.
              </p>
            </div>
          </div>
        </div>
        
        {/* Benefits Section */}
        <div className="mt-24 bg-gradient-to-r from-blue-400 to-blue-500 p-10 rounded-2xl shadow-xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-10">Why Choose 1inch?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-xl font-semibold text-blue-400 mb-3">Best Prices</h3>
                <p className="text-gray-600">Always get the best prices across hundreds of DEXes</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-xl font-semibold text-blue-400 mb-3">Low Fees</h3>
                <p className="text-gray-600">Minimize gas costs and trading fees with smart routing</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-xl font-semibold text-blue-400 mb-3">CLOB Technology</h3>
                <p className="text-gray-600">Professional-grade trading with Central Limit Order Book</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Silver Line */}
      <div className="h-px bg-gray-400 mx-4"></div>
    </div>
  );
}
