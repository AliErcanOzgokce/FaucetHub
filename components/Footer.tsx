// components/Footer.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/white_logo (1).png";
import x from "@/assets/x.png";
import github from "@/assets/github.png";

function Footer() {
  return (
    <footer className="bg-black border-t border-gray-700 py-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Tagline */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <Image
              src={logo}
              width={150}
              height={50}
              alt="logo"
              className="mx-auto md:mx-0"
            />
            <p className="mt-4 text-gray-400">
              All Crypto Faucets For All Chains
            </p>
          </div>

          {/* Credit and Social Links */}
          <div className="text-center md:text-right mt-6 md:mt-0">
            {/* Social Links */}
            <div className="flex justify-center md:justify-end space-x-6 mb-4">
              <Link href="https://x.com/aeoWeb3" target="_blank" passHref>
                <Image src={x} width={30} height={30} alt="X" />
              </Link>
              <Link
                href="https://github.com/aliercanozgokce"
                target="_blank"
                passHref
              >
                <Image src={github} width={30} height={30} alt="Website" />
              </Link>
            </div>

            {/* Made By */}
            <p className="text-gray-500">
              Made by{" "}
              <span className="font-semibold text-white">
                Ali Ercan Özgökçe
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
