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
        <button
          data-theme="myTheme"
          className="px-6 py-2 bg-gray-800 text-white font-semibold rounded-full hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-50 transition duration-300"
        >
          Support Us!
        </button>
      </div>
    </header>
  );
}

export default Navbar;
