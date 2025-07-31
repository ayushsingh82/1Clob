'use client';

import Link from 'next/link';

export default function Lending() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Hero Section */}
      <div className="flex-grow container mx-auto px-4 pt-16 pb-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-6 mt-[60px]">
            1inch Lending — DeFi Lending Revolution
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Borrow against your crypto assets or lend to earn yield. Access liquidity across multiple DEXes with 1inch's advanced lending protocols.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button className="px-6 py-3 bg-green-400 text-white rounded-lg hover:bg-green-500 shadow-lg transition transform hover:scale-105">
              Start Lending
            </button>
            <button className="px-6 py-3 border border-green-400 text-green-400 rounded-lg hover:bg-green-400 hover:text-black shadow-lg transition transform hover:scale-105">
              Borrow Assets
            </button>
          </div>
        </div>

        {/* Features Section with Unequal Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-16">
          {/* Left Box - Smaller */}
          <div className="md:col-span-3 bg-gray-900 p-6 rounded-xl shadow-md transform hover:translate-y-1 transition-all duration-300 border border-gray-800">
            <div className="bg-green-400 text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">
              Earn Yield
            </h3>
            <p className="text-gray-400">
              Deposit your crypto assets and earn competitive APY rates. Your funds remain liquid and you can withdraw anytime with no penalties.
            </p>
          </div>
          
          {/* Middle Box - Larger */}
          <div className="md:col-span-6 bg-green-400 p-8 rounded-xl shadow-lg text-white transform hover:translate-y-1 transition-all duration-300">
            <div className="bg-white text-green-400 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold mb-4">
              Cross-DEX Lending
            </h3>
            <p className="text-lg text-white">
              Access lending pools across multiple DEXes:
              • Borrow against any supported crypto asset
              • Real-time liquidation protection with price feeds
              • Dynamic interest rates based on market conditions
              • Cross-chain lending capabilities
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
            <div className="bg-green-400 text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">
              Flash Loans
            </h3>
            <p className="text-gray-400">
              Execute complex DeFi strategies with instant, uncollateralized loans. Perfect for arbitrage, debt refinancing, and yield farming.
            </p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-white text-center mb-10">
            How 1inch Lending Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gray-900 p-6 rounded-xl border-l-4 border-green-400 shadow-md hover:shadow-lg transition-all">
              <div className="bg-green-400/20 text-green-400 w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
              <h4 className="text-lg font-semibold text-white mb-2">
                Deposit Assets
              </h4>
              <p className="text-gray-400">
                Deposit your crypto assets into 1inch lending pools across multiple DEXes to start earning yield.
              </p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-xl border-l-4 border-green-400 shadow-md hover:shadow-lg transition-all mt-4 md:mt-0">
              <div className="bg-green-400/20 text-green-400 w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
              <h4 className="text-lg font-semibold text-white mb-2">
                Borrow Against
              </h4>
              <p className="text-gray-400">
                Use your deposited assets as collateral to borrow other tokens with competitive interest rates.
              </p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-xl border-l-4 border-green-400 shadow-md hover:shadow-lg transition-all mt-4 md:mt-8">
              <div className="bg-green-400/20 text-green-400 w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
              <h4 className="text-lg font-semibold text-white mb-2">
                Smart Monitoring
              </h4>
              <p className="text-gray-400">
                Monitor your loan-to-value ratio with real-time price feeds and automated risk management.
              </p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-xl border-l-4 border-green-400 shadow-md hover:shadow-lg transition-all mt-4 md:mt-16">
              <div className="bg-green-400/20 text-green-400 w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold mb-4">4</div>
              <h4 className="text-lg font-semibold text-white mb-2">
                Earn & Repay
              </h4>
              <p className="text-gray-400">
                Earn yield on deposits and repay loans to unlock your collateral when ready.
              </p>
            </div>
          </div>
        </div>
        
        {/* Benefits Section */}
        <div className="mt-24 bg-gradient-to-r from-green-400 to-green-500 p-10 rounded-2xl shadow-xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-10">Why Choose 1inch Lending?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-xl font-semibold text-green-400 mb-3">High APY</h3>
                <p className="text-gray-600">Earn up to 15% APY on your deposited assets with compound interest</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-xl font-semibold text-green-400 mb-3">Cross-DEX</h3>
                <p className="text-gray-600">Access lending pools across hundreds of DEXes in one interface</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-xl font-semibold text-green-400 mb-3">CLOB Integration</h3>
                <p className="text-gray-600">Professional-grade lending with Central Limit Order Book technology</p>
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