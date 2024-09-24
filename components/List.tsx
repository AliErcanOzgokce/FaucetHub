"use client"
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import arrow from "@/assets/arrow-right.png";
import networks from "@/data/networks"; // Adjust the path as necessary

function List() {
  const router = useRouter();

  const handleRowClick = (chainId: number) => {
    router.push(`/network/${chainId}`);
  };

  return (
    <div className="w-full p-10 rounded-2xl">
      <div className="overflow-x-auto">
        <table className="table table-lg" style={{ width: "100%" }}>
          {/* head */}
          <thead className="text-black">
            <tr className="border-0">
              <th>Name</th>
              <th>Number of Faucets</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="w-full">
            {networks.map((network, index) => (
              <tr key={index} onClick={() => handleRowClick(Number(network.chainId))}>
                <td>{network.name}</td>
                <td>{network.faucets.length}</td>
                <td>
                  <Image src={arrow} alt="arrow" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default List;