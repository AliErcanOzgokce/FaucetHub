import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " min-h-screen bg-black"}>
        <main className="container mx-auto my-5 bg-black px-5 xl:px-6">
          <Navbar />
          {children}
          <Footer />
          <Analytics />
        </main>
      </body>
    </html>
  );
}
