"use client";
// app/network/[chainId]/page.tsx
import { useParams } from "next/navigation";
import networks from "@/data/networks"; // Adjust the path as necessary

function NetworkDetail() {
  const params = useParams();
  const { chainId } = params;
  const network = networks.find((net) => net.chainId === parseInt(chainId as string));

  if (!network) {
    return <div>Network not found</div>;
  }

  return (
    <div className="w-full p-10 rounded-2xl">
      <h1>{network.name} Faucets</h1>
      <div className="overflow-x-auto">
        <table className="table table-lg" style={{ width: "100%" }}>
          {/* head */}
          <thead className="text-black">
            <tr className="border-0">
              <th>Name</th>
              <th>URL</th>
              <th>Amount</th>
              <th>Limit</th>
              <th>Social Login</th>
              <th>Captcha</th>
              <th>Mainnet Token Balance Required</th>
              <th>Official</th>
              <th>POW</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {network.faucets.map((faucet, index) => (
              <tr key={index}>
                <td>{faucet.name}</td>
                <td>
                  <a href={faucet.url} target="_blank" rel="noopener noreferrer">
                    {faucet.url}
                  </a>
                </td>
                <td>{faucet.amount}</td>
                <td>{faucet.limit}</td>
                <td>{faucet.socialLogin ? "Yes" : "No"}</td>
                <td>{faucet.captcha ? "Yes" : "No"}</td>
                <td>{faucet.mainnetTokenBalanceRequired ? "Yes" : "No"}</td>
                <td>{faucet.isOfficial ? "Yes" : "No"}</td>
                <td>{faucet.isPOW ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NetworkDetail;