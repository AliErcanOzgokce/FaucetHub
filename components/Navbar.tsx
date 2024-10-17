"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/white_logo (1).png';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

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

  // Toggle mobile menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`sticky top-5 z-50 transition-all duration-300 rounded-3xl ${
        isScrolled
          ? 'bg-black/50 opacity-75 hover:opacity-100 backdrop-blur-md'
          : 'bg-black/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/">
          <Image src={logo} alt="logo" width={200} height={100} className="cursor-pointer" />
        </Link>

        {/* Desktop Button */}
        <div className="hidden md:flex">
          <button
            data-theme="myTheme"
            className="px-6 py-2 bg-gray-700 text-white font-semibold rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-50 transition duration-300"
          >
            Support Us!
          </button>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-50 transition duration-300"
          >
            {isMenuOpen ? (
              // SVG for Close Icon (X)
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // SVG for Hamburger Icon
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/80 px-6 py-4 rounded-b-3xl ">
          <button
            data-theme="myTheme"
            className="w-full px-6 py-2 bg-gray-700 text-white font-semibold rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-50 transition duration-300 mt-4"
          >
            Support Us!
          </button>
        </div>
      )}
    </header>
  );
}

export default Navbar;

