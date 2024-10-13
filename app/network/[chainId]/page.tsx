"use client";
import { useParams } from "next/navigation";
import networks from "@/data/networks"; // Adjust the path as necessary
import Image from "next/image";

function NetworkDetail() {
  const params = useParams();
  const { chainId } = params;
  const network = networks.evmBasedNetworks.find((net) => net.chainId === parseInt(chainId as string));

  if (!network) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="bg-black p-8 rounded-md shadow-md">
          <h1 className="text-2xl font-bold text-red-500">Network not found</h1>
          <p className="text-gray-400">Please check the chainId and try again.</p>
        </div>
      </div>
    );
  }

  const getDomain = (url: string | URL) => {
    const { hostname } = new URL(url);
    return hostname.replace('www.', '');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 bg-black">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white">{network.name} Faucets</h1>
        <p className="mt-2 text-lg text-gray-400">
          Find all faucets for <span className="font-semibold">{network.name}</span> on FaucetHub.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {network.faucets.map((faucet, index) => (
          <div
            key={index}
            className="relative p-6 bg-black border border-[#171717] drop-shadow-[0_35px_35px_#1e40af] rounded-xl shadow-lg transition-transform transform hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="absolute top-4 right-4 flex space-x-2">
              {faucet.isOfficial && (
                <span className="bg-green-800 text-green-200 px-2 py-1 rounded-full text-xs">Official</span>
              )}
              {faucet.isPOW && (
                <span className="bg-yellow-800 text-yellow-200 px-2 py-1 rounded-full text-xs">POW</span>
              )}
            </div>
            <div className="flex flex-col items-center text-center mb-4">
              <h2 className="text-2xl font-semibold text-white">{faucet.name}</h2>
              <a
                href={faucet.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 text-blue-500 underline text-sm"
              >
                {getDomain(faucet.url)}
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-400 mt-4">
              <div>
                <strong>Amount:</strong> {faucet.amount}
              </div>
              <div>
                <strong>Limit:</strong> {faucet.limit}
              </div>
              <div>
                <strong>Social Login:</strong>{" "}
                <span className={faucet.socialLogin ? "text-green-500" : "text-red-500"}>
                  {faucet.socialLogin ? "Yes" : "No"}
                </span>
              </div>
              <div>
                <strong>Captcha:</strong>{" "}
                <span className={faucet.captcha ? "text-green-500" : "text-red-500"}>
                  {faucet.captcha ? "Yes" : "No"}
                </span>
              </div>
              <div>
                <strong>Mainnet Token Required:</strong>{" "}
                <span className={faucet.mainnetTokenBalanceRequired ? "text-green-500" : "text-red-500"}>
                  {faucet.mainnetTokenBalanceRequired ? "Yes" : "No"}
                </span>
              </div>
              <div>
                <strong>POW:</strong>{" "}
                <span className={faucet.isPOW ? "text-green-500" : "text-red-500"}>
                  {faucet.isPOW ? "Yes" : "No"}
                </span>
              </div>
            </div>
            <div className="absolute bottom-4 right-4 text-gray-500 text-xs">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NetworkDetail;
