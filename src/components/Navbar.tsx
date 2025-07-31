'use client';

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="shadow-sm border-b" style={{ backgroundColor: '#171717', borderColor: '#C6FC7B' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold" style={{ color: '#C6FC7B' }}>1inch</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
          
          
            <Link href="/features" className="transition-colors hover:opacity-80" style={{ color: '#C6FC7B' }}>
              Features
            </Link>
            <Link href="/docs" className="transition-colors hover:opacity-80" style={{ color: '#C6FC7B' }}>
              Docs
            </Link>
          </div>

          {/* Launch App Button */}
          <div className="flex items-center">
            <Link href="/launch">
              <button className="font-medium py-2 px-6 rounded-lg transition-colors duration-200 shadow-sm hover:opacity-80" style={{ backgroundColor: '#C6FC7B', color: '#171717' }}>
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