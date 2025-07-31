'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#C6FC7B' }}>
      {/* Hero Section - Green Background */}
      <div className="flex-grow container mx-auto px-4 pt-16 pb-8" style={{ backgroundColor: '#C6FC7B' }}>
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-6 mt-[60px]" style={{ color: '#0D2818' }}>
            1inch — The Future of DEX Trading
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed" style={{ color: '#0D2818' }}>
            1inch brings the power of decentralized exchanges to the next level — no intermediaries, no hidden fees, just pure DeFi trading with CLOB technology.
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
                  DEX Aggregation
                </h3>
                <p className="text-LG leading-relaxed" style={{ color: '#C6FC7B' }}>
                  Access liquidity from hundreds of DEXes across multiple chains. Our aggregation algorithm finds the best routes and lowest fees for your trades.
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
                  Advanced Central Limit Order Book technology:<br/>
                  • Real-time order matching and execution<br/>
                  • Deep liquidity pools across all major DEXes<br/>
                  • MEV protection and fair price discovery<br/>
                  • Cross-chain order routing and settlement
                </p>
                <div className="mt-6">
                  <Link href="/learn-more" className="inline-flex items-center text-base font-bold px-4 py-2 rounded-xl hover:scale-110 transform transition-all duration-300 shadow-lg" style={{ color: '#C6FC7B', backgroundColor: '#6603BF' }}>
                    Learn more 
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
                  Smart Routing
                </h3>
                <p className="text-lg leading-relaxed" style={{ color: '#C6FC7B' }}>
                  Intelligent order routing that splits trades across multiple DEXes for optimal execution. Get the best prices while minimizing slippage and gas costs.
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
                  <h3 className="text-xl font-bold mb-3 transform hover:translate-y-1 transition-transform duration-300" style={{ color: '#08130C' }}>Best Prices</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#08130C' }}>Always get the best prices across hundreds of DEXes</p>
                </div>
                <div className="p-6 rounded-2xl shadow-2xl transform hover:scale-110 hover:rotate-2 transition-all duration-500 bg-[#C6FC7B]">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg transform hover:rotate-12 transition-transform duration-300" style={{ backgroundColor: '#08130C' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#7CE8A5' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 transform hover:translate-y-1 transition-transform duration-300" style={{ color: '#08130C' }}>Low Fees</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#08130C' }}>Minimize gas costs and trading fees with smart routing</p>
                </div>
                <div className="p-6 rounded-2xl shadow-2xl transform hover:scale-110 hover:rotate-2 transition-all duration-500 bg-gradient-to-br from-gray-200 to-gray-300">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg transform hover:rotate-12 transition-transform duration-300" style={{ backgroundColor: '#08130C' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#ECEFEC' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 transform hover:translate-y-1 transition-transform duration-300" style={{ color: '#08130C' }}>CLOB Technology</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#08130C' }}>Professional-grade trading with Central Limit Order Book</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section - Full Width Background */}
        <div className="-mx-[100vw] px-[100vw] py-12 mb-0" style={{ backgroundColor: '#122B1B' }}>
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12" style={{ color: '#C6FC7B' }}>
              How 1inch Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 border-l-8 bg-[#C6FC7B]" style={{ borderColor: '#08130C' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4 shadow-lg transform hover:rotate-360 transition-transform duration-700" style={{ backgroundColor: '#08130C', color: '#7CE8A5' }}>1</div>
                <h4 className="text-lg font-bold mb-3 transform hover:translate-x-2 transition-transform duration-300" style={{ color: '#08130C' }}>
                  Order Discovery
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: '#08130C' }}>
                  Scan hundreds of DEXes to find the best prices and liquidity for your trades.
                </p>
              </div>
              
              <div className="p-6 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 mt-4 md:mt-8 border-l-8 bg-gradient-to-br from-green-300 to-green-400" style={{ borderColor: '#122B1B' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4 shadow-lg transform hover:rotate-360 transition-transform duration-700" style={{ backgroundColor: '#122B1B', color: '#C6FC7B' }}>2</div>
                <h4 className="text-lg font-bold mb-3 transform hover:translate-x-2 transition-transform duration-300" style={{ color: '#122B1B' }}>
                  Route Optimization
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: '#122B1B' }}>
                  Our algorithm calculates the optimal route across multiple DEXes to minimize fees and maximize execution efficiency.
                </p>
              </div>
              
              <div className="p-6 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 mt-4 md:mt-16 border-l-8 bg-gradient-to-br from-gray-200 to-gray-300" style={{ borderColor: '#08130C' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4 shadow-lg transform hover:rotate-360 transition-transform duration-700" style={{ backgroundColor: '#08130C', color: '#ECEFEC' }}>3</div>
                <h4 className="text-lg font-bold mb-3 transform hover:translate-x-2 transition-transform duration-300" style={{ color: '#08130C' }}>
                  CLOB Execution
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: '#08130C' }}>
                  Execute trades using advanced Central Limit Order Book technology for professional-grade trading experience.
                </p>
              </div>
              
              <div className="p-6 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 mt-4 md:mt-24 border-l-8 bg-[#C6FC7B]" style={{ borderColor: '#08130C' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4 shadow-lg transform hover:rotate-360 transition-transform duration-700" style={{ backgroundColor: '#08130C', color: '#7CE8A5' }}>4</div>
                <h4 className="text-lg font-bold mb-3 transform hover:translate-x-2 transition-transform duration-300" style={{ color: '#08130C' }}>
                  Settlement
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: '#08130C' }}>
                  Instant settlement across multiple DEXes with atomic transactions and comprehensive transaction protection.
                </p>
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