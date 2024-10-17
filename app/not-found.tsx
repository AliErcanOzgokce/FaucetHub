import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      {/* Text Section */}
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Oops! Page Not Found</h2>
      <p className="text-lg text-center px-4 text-gray-400 mb-8">
        The page you are looking for doesn't exist or an error occurred.
      </p>

      {/* Return Home Button */}
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-500 transition duration-300"
      >
        Return Home
      </Link>
    </div>
  );
}
