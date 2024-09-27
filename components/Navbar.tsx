// components/Navbar.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/black_logo (1).png';

function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white bg-opacity-90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between h-16">
        <Link href="/">
          <Image src={logo} alt="logo" width={150} height={50} className="cursor-pointer" />
        </Link>
        <nav className="hidden md:flex space-x-8">
          <Link href="/home" className="relative text-gray-700 hover:text-gray-900 transition duration-300">
            <span>Home</span>
            <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300"></span>
          </Link>
          <Link href="/features" className="relative text-gray-700 hover:text-gray-900 transition duration-300">
            <span>Features</span>
            <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300"></span>
          </Link>
          <Link href="/pricing" className="relative text-gray-700 hover:text-gray-900 transition duration-300">
            <span>Pricing</span>
            <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300"></span>
          </Link>
          <Link href="/contact" className="relative text-gray-700 hover:text-gray-900 transition duration-300">
            <span>Contact</span>
            <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300"></span>
          </Link>
        </nav>
        <button
          data-theme="myTheme"
          className="hidden md:inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
        >
          Support Us!
        </button>
      </div>
    </header>
  );
}

export default Navbar;
