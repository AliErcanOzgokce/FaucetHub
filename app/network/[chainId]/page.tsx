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
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-md shadow-md">
          <h1 className="text-2xl font-bold text-red-500">Network not found</h1>
          <p className="text-gray-600">Please check the chainId and try again.</p>
        </div>
      </div>
    );
  }

  const getDomain = (url: string | URL) => {
    const { hostname } = new URL(url);
    return hostname.replace('www.', '');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">{network.name} Faucets</h1>
        <p className="mt-2 text-lg text-gray-600">
          Find all faucets for <span className="font-semibold">{network.name}</span> on FaucetHub.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {network.faucets.map((faucet, index) => (
          <div
            key={index}
            className="relative p-6 border border-gray-200 rounded-lg shadow-sm transition-transform transform hover:scale-105 hover:shadow-md"
          >
            <div className="absolute top-4 right-4 flex space-x-2">
              {faucet.isOfficial && (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Official</span>
              )}
              {faucet.isPOW && (
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">POW</span>
              )}
            </div>
            <div className="flex flex-col items-center text-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">{faucet.name}</h2>
              <a
                href={faucet.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 text-blue-600 underline text-sm"
              >
                {getDomain(faucet.url)}
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 mt-4">
              <div>
                <strong>Amount:</strong> {faucet.amount}
              </div>
              <div>
                <strong>Limit:</strong> {faucet.limit}
              </div>
              <div>
                <strong>Social Login:</strong>{" "}
                <span className={faucet.socialLogin ? "text-green-600" : "text-red-600"}>
                  {faucet.socialLogin ? "Yes" : "No"}
                </span>
              </div>
              <div>
                <strong>Captcha:</strong>{" "}
                <span className={faucet.captcha ? "text-green-600" : "text-red-600"}>
                  {faucet.captcha ? "Yes" : "No"}
                </span>
              </div>
              <div>
                <strong>Mainnet Token Required:</strong>{" "}
                <span className={faucet.mainnetTokenBalanceRequired ? "text-green-600" : "text-red-600"}>
                  {faucet.mainnetTokenBalanceRequired ? "Yes" : "No"}
                </span>
              </div>
              <div>
                <strong>POW:</strong>{" "}
                <span className={faucet.isPOW ? "text-green-600" : "text-red-600"}>
                  {faucet.isPOW ? "Yes" : "No"}
                </span>
              </div>
            </div>
            <div className="absolute bottom-4 right-4 text-gray-400 text-xs">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NetworkDetail;

