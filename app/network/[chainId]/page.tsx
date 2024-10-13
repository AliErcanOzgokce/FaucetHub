"use client";
import { useParams } from "next/navigation";
import networks from "@/data/networks"; // Adjust the path as necessary
import Image from "next/image";
import arrow from "@/assets/arrow-up-right.svg"; // Ensure the correct path

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

  // Helper function to format URLs to include 'www.'
  const formatUrl = (url: string | URL): string => {
    try {
      const { hostname } = new URL(url.toString());
      return hostname.startsWith('www.') ? hostname : `www.${hostname}`; // Ensure 'www.' is present
    } catch (error) {
      return url.toString(); // Return the original URL as a string if there's an error parsing
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 bg-black">
      <header className="text-left mb-10">
        <h1 className="text-4xl font-bold text-white">{network.name} Faucets</h1>
        <p className="mt-2 text-lg text-gray-400">
          Find all faucets for <span className="font-semibold">{network.name}</span> on FaucetHub.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {network.faucets.map((faucet, index) => (
          <a
            key={index}
            href={faucet.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block p-4 bg-black border border-[#171717] drop-shadow-[0_35px_35px_#1e40af] rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <div className="flex justify-between">
              <div className="w-2/3">
                <h2 className="text-xl font-semibold text-white truncate">{faucet.name}</h2>
                <p className="mt-1 text-blue-500 underline text-xs">{formatUrl(faucet.url)}</p>
                {/* Badges displayed here */}
                <div className="flex flex-wrap w-full gap-2 mt-5">
                  {faucet.socialLogin && (
                    <div className="bg-blue-600 text-white px-1.5 py-0.5 rounded-full text-xs">Social Login</div>
                  )}
                  {faucet.captcha && (
                    <div className="bg-purple-600 text-white px-1.5 py-0.5 rounded-full text-xs">Captcha</div>
                  )}
                  {faucet.mainnetTokenBalanceRequired && (
                    <div className="bg-red-600 text-white px-1.5 py-0.5 rounded-full text-xs">Mainnet Token</div>
                  )}
                  {faucet.isOfficial && (
                    <div className="bg-green-800 text-green-200 px-1.5 py-0.5 rounded-full text-xs">Official</div>
                  )}
                  {faucet.isPOW && (
                    <div className="bg-yellow-800 text-yellow-200 px-1.5 py-0.5 rounded-full text-xs">POW</div>
                  )}
                </div>
              </div>

              {/* Amount Section */}
              <div className="flex flex-col items-end">
                <Image src={arrow} width={34} height={34} alt="arrow" />
                <p className="text-gray-400 text-xs mt-1">Limit: {faucet.limit}</p>
                <div className="text-3xl font-bold text-yellow-500">
                  {faucet.amount} {network.nativeCurrency.symbol} {/* Displaying the amount with the native currency symbol */}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default NetworkDetail;
