'use client';

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="p-4" style={{ backgroundColor: '#C6FC7B' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border p-3" style={{ backgroundColor: '#171717', borderColor: '#C6FC7B' }}>
          <div className="flex justify-between items-center h-12">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <span className="text-xl font-bold" style={{ color: '#C6FC7B' }}>1inch</span>
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
          
          
              <Link href="/features" className="transition-colors hover:opacity-80" style={{ color: '#C6FC7B' }}>
                Features
              </Link>
              <Link href="/try" className="transition-colors hover:opacity-80" style={{ color: '#C6FC7B' }}>
                try
              </Link>
            </div>

            {/* Launch App Button */}
            <div className="flex items-center">
              <Link href="/launch">
                <button className="font-medium py-1.5 px-4 rounded-lg transition-colors duration-200 shadow-sm hover:opacity-80 text-sm" style={{ backgroundColor: '#C6FC7B', color: '#171717' }}>
                  Launch App
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 