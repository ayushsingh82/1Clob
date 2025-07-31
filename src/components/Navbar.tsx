'use client';

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-black shadow-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-400">1inch</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
          
          
            <Link href="/features" className="text-gray-300 hover:text-blue-400 transition-colors">
              Features
            </Link>
            <Link href="/docs" className="text-gray-300 hover:text-blue-400 transition-colors">
              Docs
            </Link>
          </div>

          {/* Launch App Button */}
          <div className="flex items-center">
            <Link href="/launch">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 shadow-sm">
                Launch App
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 