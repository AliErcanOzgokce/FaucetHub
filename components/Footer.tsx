// components/Footer.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/black_logo (1).png';

function Footer() {
  const footerNavs = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <Image src={logo} width={150} height={50} alt="logo" className="mx-auto md:mx-0" />
            <p className="mt-4 text-gray-600">All Crypto Faucets For All Chains</p>
          </div>
          <ul className="flex space-x-6">
            {footerNavs.map((item, idx) => (
              <li key={idx}>
                <Link href={item.href} className="text-gray-700 hover:text-gray-900 transition duration-300">
                    {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 text-center text-gray-500">
          Made by <span className="font-semibold">Ali Ercan Özgökçe</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
