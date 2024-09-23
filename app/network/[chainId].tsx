// pages/network/[chainId].tsx
import { useRouter } from "next/router";
import {networks} from "@/data/networks"; // Adjust the path as necessary

function NetworkDetail() {
  const router = useRouter();
  const { chainId } = router.query;
  const network = networks.find((net) => net.chainId === parseInt(chainId as string));

  if (!network) {
    return <div>Network not found</div>;
  }

  return (
    <div className="w-full p-10 rounded-2xl">
      <h1>{network.name}</h1>
      <p>Chain ID: {network.chainId}</p>
      <p>RPC: {network.rpc.join(", ")}</p>
      <p>Native Currency: {network.nativeCurrency.name} ({network.nativeCurrency.symbol})</p>
      <h2>Faucets</h2>
      <ul>
        {network.faucets.map((faucet, index) => (
          <li key={index}>
            <a href={faucet.url} target="_blank" rel="noopener noreferrer">
              {faucet.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NetworkDetail;