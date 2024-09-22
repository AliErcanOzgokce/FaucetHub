import React from "react";
import Image from "next/image";
import logo from "@/assets/black_logo (1).png";
function Footer() {
  const footerNavs = [
    { name: "Home", href: "javascript:void(0)" },
    { name: "Features", href: "javascript:void(0)" },
    { name: "Pricing", href: "javascript:void(0)" },
    { name: "Contact", href: "javascript:void(0 )" },
  ];

  return (
    <footer className="pt-10">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="space-y-6 sm:max-w-md sm:mx-auto sm:text-center">
          <Image
            src={logo}
            width={200}
            height={60}
            alt="logo"
            className=" sm:mx-auto"
          />
          <p>All Crypto Faucets For All Chains</p>
          <div className="items-center gap-x-3 space-y-3 sm:flex sm:justify-center sm:space-y-0">
          </div>
        </div>
        <div className="mt-10 py-10 border-t items-center justify-between sm:flex">
          <p>Made by Ali Ercan Özgökçe</p>
          <ul className="flex flex-wrap items-center gap-4 mt-6 sm:text-sm sm:mt-0">
            {footerNavs.map((item, idx) => (
              <li className="text-gray-800 hover:text-gray-500 duration-150">
                <a key={idx} href={item.href}>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
