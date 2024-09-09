import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FaucetHub",
  description: "All Crypto Faucets For All Chains",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " min-h-screen bg-white"}>
        <main className="container mx-auto my-5 bg-white px-5 xl:px-6">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
