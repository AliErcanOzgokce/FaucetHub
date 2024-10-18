import { Metadata, ResolvingMetadata } from "next";
import { useParams } from "next/navigation";
import networks from "@/data/networks"; // Adjust the path as necessary
import Image from "next/image";
import arrow from "@/assets/arrow-up-right.svg"; // Ensure the correct path
import { rankFaucets } from "@/helpers/rankFaucets";
import Link from "next/link";

type Props = {
  params: { shortName: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Function to generate dynamic metadata based on the `shortName` param
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { shortName } = params;

  // Find the corresponding network using the shortName
  const network = [
    ...networks.evmBasedNetworks,
    ...networks.btcBasedNetworks,
    ...networks.solBasedNetworks,
    ...networks.otherNetworks,
  ].find((net) => net.shortName === shortName);

  // Handle case where the network is not found
  if (!network) {
    return {
      title: "Network Not Found - FaucetHub",
      description: "The requested network could not be found on FaucetHub.",
    };
  }

  // Optionally extend parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${network.name} Faucets - FaucetHub`,
    description: `Find all ${network.name} Faucets on FaucetHub.`,
    openGraph: {
      images: [`/images/networks/${network.icon}.png`, ...previousImages],
    },
  };
}

// Main page component for rendering network details
export default function NetworkDetail({ params }: Props) {
  const { shortName } = params;

  // Find the network data by shortName
  const network = [
    ...networks.evmBasedNetworks,
    ...networks.btcBasedNetworks,
    ...networks.solBasedNetworks,
    ...networks.otherNetworks,
  ].find((net) => net.shortName === shortName);

  // If network is not found, show error message
  if (!network) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="bg-black p-8 rounded-md shadow-md">
          <h1 className="text-2xl font-bold text-red-500">Network not found</h1>
          <p className="text-gray-400">
            Please check the network shortName and try again.
          </p>
        </div>
      </div>
    );
  }

  // Sort faucets based on user-friendly ranking
  const sortedFaucets = rankFaucets(network.faucets);

  // Helper function to format URLs
  const formatUrl = (url: string | URL): string => {
    try {
      const { hostname } = new URL(url.toString());
      return hostname.startsWith("www.") ? hostname : `www.${hostname}`;
    } catch (error) {
      return url.toString();
    }
  };

  return (
    <div className="max-w-7xl min-h-[80vh] mx-auto px-3 sm:px-8 py-12 bg-black">
      <header className="text-left mb-10 px-4 ">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
          {network.name} Faucets
        </h1>
        <p className="mt-2 text-base md:text-lg lg:text-xl text-gray-400">
          Find all <span className="font-semibold">{network.name}</span> faucets
          on FaucetHub.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedFaucets.map((faucet, index) => (
          <a
            key={index}
            href={faucet.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block p-4 bg-black border border-[#171717] drop-shadow-[0_35px_35px_#1e40af] rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <div className="flex justify-between">
              <div className="w-2/3">
                <h2 className="text-xl font-semibold text-white truncate">
                  {faucet.name}
                </h2>
                <p className="mt-1 text-blue-500 underline text-xs">
                  {formatUrl(faucet.url)}
                </p>
                {/* Display badges for the faucet */}
                <div className="flex flex-wrap w-full gap-2 mt-5">
                  {faucet.socialLogin && (
                    <div className="bg-blue-600 text-white px-1.5 py-0.5 rounded-full text-xs">
                      Social Login
                    </div>
                  )}
                  {faucet.captcha && (
                    <div className="bg-purple-600 text-white px-1.5 py-0.5 rounded-full text-xs">
                      Captcha
                    </div>
                  )}
                  {faucet.mainnetTokenBalanceRequired && (
                    <div className="bg-red-600 text-white px-1.5 py-0.5 rounded-full text-xs">
                      Mainnet Token
                    </div>
                  )}
                  {faucet.isOfficial && (
                    <div className="bg-green-800 text-green-200 px-1.5 py-0.5 rounded-full text-xs">
                      Official
                    </div>
                  )}
                  {faucet.isPOW && (
                    <div className="bg-yellow-800 text-yellow-200 px-1.5 py-0.5 rounded-full text-xs">
                      POW
                    </div>
                  )}
                </div>
              </div>

              {/* Amount Section */}
              <div className="flex flex-col items-end">
                <Image src={arrow} width={34} height={34} alt="arrow" />
                <p className="text-gray-400 text-xs mt-1">
                  Limit: {faucet.limit}
                </p>
                <div className="text-2xl font-bold text-yellow-500">
                  {faucet.amount} {network.nativeCurrency.symbol}
                </div>
              </div>
            </div>
          </a>
        ))}

      </div>
    </div>
  );
}
