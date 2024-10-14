"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/white_logo (1).png';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll position and update state
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-5 z-50 transition-all duration-300 rounded-3xl ${
        isScrolled
          ? 'bg-black/50 opacity-75 hover:opacity-100 backdrop-blur-md'
          : 'bg-black/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between h-16">
        <Link href="/">
          <Image src={logo} alt="logo" width={200} height={75} className="cursor-pointer" />
        </Link>
        <button
          data-theme="myTheme"
          className="px-6 py-2 bg-gray-700 text-white font-semibold rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-50 transition duration-300"
        >
          Support Us!
        </button>
      </div>
    </header>
  );
}

export default Navbar;
