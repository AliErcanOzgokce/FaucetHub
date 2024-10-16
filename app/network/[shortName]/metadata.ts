import networks from "@/data/networks"; // Adjust the path as necessary
import { Metadata } from "next";

export async function generateMetadata({ params }): Promise<Metadata> {
  const { chainId } = params;
  const network = networks.find((net) => net.chainId === parseInt(chainId as string));

  if (!network) {
    return {
      title: "Network Not Found - FaucetHub",
      description: "The requested network could not be found on FaucetHub.",
    };
  }

  return {
    title: `${network.name} Faucets - FaucetHub`,
    description: `Find all faucets for ${network.name} on FaucetHub.`,
  };
}