'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#C6FC7B' }}>
      {/* Hero Section - Green Background */}
      <div className="flex-grow container mx-auto px-4 pt-16 pb-16" style={{ backgroundColor: '#C6FC7B' }}>
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6 mt-[60px]" style={{ color: '#0D2818' }}>
            1inch — The Future of DEX Trading
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto" style={{ color: '#0D2818' }}>
            1inch brings the power of decentralized exchanges to the next level — no intermediaries, no hidden fees, just pure DeFi trading with CLOB technology.
          </p>
        </div>

        {/* Features Section with Unequal Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-16 border-2 rounded-lg rounded-xl border-transparent bg-[#171717] p-10">
          {/* Left Box - Smaller */}
          <div className="md:col-span-3 p-6 rounded-xl shadow-md transform hover:translate-y-1 transition-all duration-300 border" style={{ backgroundColor: '#6603BF', borderColor: '#C6FC7B' }}>
            <div className="p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4" style={{ backgroundColor: '#C6FC7B' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#6603BF' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-3" style={{ color: '#C6FC7B' }}>
              DEX Aggregation
            </h3>
            <p style={{ color: '#C6FC7B' }}>
              Access liquidity from hundreds of DEXes across multiple chains. Our aggregation algorithm finds the best routes and lowest fees for your trades.
            </p>
          </div>
          
          {/* Middle Box - Larger */}
          <div className="md:col-span-6 p-8 rounded-xl shadow-lg transform hover:translate-y-1 transition-all duration-300" style={{ backgroundColor: '#C6FC7B' }}>
            <div className="p-3 rounded-full w-16 h-16 flex items-center justify-center mb-5" style={{ backgroundColor: '#6603BF' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#C6FC7B' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold mb-4" style={{ color: '#0D2818' }}>
              CLOB Technology
            </h3>
            <p className="text-lg" style={{ color: '#0D2818' }}>
              Advanced Central Limit Order Book technology:
              • Real-time order matching and execution
              • Deep liquidity pools across all major DEXes
              • MEV protection and fair price discovery
              • Cross-chain order routing and settlement
            </p>
            <div className="mt-6">
              <Link href="/learn-more" className="inline-flex items-center text-sm font-medium hover:opacity-80" style={{ color: '#6603BF' }}>
                Learn more 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Right Box - Smaller */}
          <div className="md:col-span-3 p-6 rounded-xl shadow-md transform hover:translate-y-1 transition-all duration-300 border" style={{ backgroundColor: '#6603BF', borderColor: '#C6FC7B' }}>
            <div className="p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4" style={{ backgroundColor: '#C6FC7B' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#6603BF' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-3" style={{ color: '#C6FC7B' }}>
              Smart Routing
            </h3>
            <p style={{ color: '#C6FC7B' }}>
              Intelligent order routing that splits trades across multiple DEXes for optimal execution. Get the best prices while minimizing slippage and gas costs.
            </p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-24 p-8 rounded-xl" style={{ backgroundColor: '#122B1B', marginLeft: '-1rem', marginRight: '-1rem' }}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10" style={{ color: '#C6FC7B' }}>
              How 1inch Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="p-6 rounded-xl shadow-md hover:shadow-lg transition-all border-l-4" style={{ backgroundColor: '#7CE8A5', borderColor: '#08130C' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold mb-4" style={{ backgroundColor: '#08130C', color: '#7CE8A5' }}>1</div>
                <h4 className="text-lg font-semibold mb-2" style={{ color: '#08130C' }}>
                  Order Discovery
                </h4>
                <p style={{ color: '#08130C' }}>
                  Scan hundreds of DEXes to find the best prices and liquidity for your trades.
                </p>
              </div>
              
              <div className="p-6 rounded-xl shadow-md hover:shadow-lg transition-all mt-4 md:mt-0 border-l-4" style={{ backgroundColor: '#C6FC7B', borderColor: '#122B1B' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold mb-4" style={{ backgroundColor: '#122B1B', color: '#C6FC7B' }}>2</div>
                <h4 className="text-lg font-semibold mb-2" style={{ color: '#122B1B' }}>
                  Route Optimization
                </h4>
                <p style={{ color: '#122B1B' }}>
                  Our algorithm calculates the optimal route across multiple DEXes to minimize fees and maximize execution efficiency.
                </p>
              </div>
              
              <div className="p-6 rounded-xl shadow-md hover:shadow-lg transition-all mt-4 md:mt-8 border-l-4" style={{ backgroundColor: '#ECEFEC', borderColor: '#08130C' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold mb-4" style={{ backgroundColor: '#08130C', color: '#ECEFEC' }}>3</div>
                <h4 className="text-lg font-semibold mb-2" style={{ color: '#08130C' }}>
                  CLOB Execution
                </h4>
                <p style={{ color: '#08130C' }}>
                  Execute trades using advanced Central Limit Order Book technology for professional-grade trading experience.
                </p>
              </div>
              
              <div className="p-6 rounded-xl shadow-md hover:shadow-lg transition-all mt-4 md:mt-16 border-l-4" style={{ backgroundColor: '#7CE8A5', borderColor: '#08130C' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold mb-4" style={{ backgroundColor: '#08130C', color: '#7CE8A5' }}>4</div>
                <h4 className="text-lg font-semibold mb-2" style={{ color: '#08130C' }}>
                  Settlement
                </h4>
                <p style={{ color: '#08130C' }}>
                  Instant settlement across multiple DEXes with atomic transactions and comprehensive transaction protection.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Benefits Section */}
        <div className="mt-24 p-10 shadow-xl rounded-xl" style={{ backgroundColor: '#6603BF', marginLeft: '-1rem', marginRight: '-1rem' }}>
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-10" style={{ color: '#C6FC7B' }}>Why Choose 1inch?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-xl shadow" style={{ backgroundColor: '#7CE8A5' }}>
                  <h3 className="text-xl font-semibold mb-3" style={{ color: '#08130C' }}>Best Prices</h3>
                  <p style={{ color: '#08130C' }}>Always get the best prices across hundreds of DEXes</p>
                </div>
                <div className="p-6 rounded-xl shadow" style={{ backgroundColor: '#C6FC7B' }}>
                  <h3 className="text-xl font-semibold mb-3" style={{ color: '#122B1B' }}>Low Fees</h3>
                  <p style={{ color: '#122B1B' }}>Minimize gas costs and trading fees with smart routing</p>
                </div>
                <div className="p-6 rounded-xl shadow" style={{ backgroundColor: '#ECEFEC' }}>
                  <h3 className="text-xl font-semibold mb-3" style={{ color: '#08130C' }}>CLOB Technology</h3>
                  <p style={{ color: '#08130C' }}>Professional-grade trading with Central Limit Order Book</p>
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
