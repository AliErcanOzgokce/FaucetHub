import React from "react";
import Image from "next/image";
import arrow from "@/assets/arrow-right.png";
import mantleTestnet from "@/data/Updated/eip155-5001.json"; // Adjust the path as necessary

function List() {
  const networks = [mantleTestnet]; // Add more networks as needed

  return (
    <div className="w-full p-10 rounded-2xl">
      <div className="overflow-x-auto">
        <table className="table table-lg" style={{ width: "100%" }}>
          {/* head */}
          <thead className="text-black">
            <tr className="border-0">
              <th>Name</th>
              <th>Available Faucet</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="w-full">
            {networks.map((network, index) => (
              <React.Fragment key={index}>
                {network.faucets.map((faucet, faucetIndex) => (
                  <tr key={faucetIndex}>
                    <td>{network.name}</td>
                    <td>
                      <a href={faucet.url} target="_blank" rel="noopener noreferrer">
                        {faucet.name}
                      </a>
                    </td>
                    <td>
                      <Image src={arrow} alt="arrow" />
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default List;