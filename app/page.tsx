import List from "@/components/List";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FaucetHub",
  description: "All Crypto Faucets For All Chains",
};

export default function Home() {
  return (
    <main className="flex flex-col items-center bg-black min-h-screen w-full">
      <List />
    </main>
  );
}
