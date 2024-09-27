"use client";
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
    <div className="w-full p-10 bg-white rounded-3xl shadow-md border border-gray-200">
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">Available Networks</h1>
      <div className="overflow-x-auto rounded-lg">
        <table className="table-auto w-full border-collapse">
          {/* head */}
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-5 text-left">Name</th>
              <th className="py-3 px-5 text-left">Number of Faucets</th>
              <th className="py-3 px-5 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {networks.map((network, index) => (
              <tr 
                key={index} 
                onClick={() => handleRowClick(Number(network.chainId))}
                className="hover:bg-blue-100 cursor-pointer transition-all duration-200"
              >
                <td className="py-4 px-5 border-b border-gray-200">{network.name}</td>
                <td className="py-4 px-5 border-b border-gray-200">{network.faucets.length}</td>
                <td className="py-4 px-5 border-b border-gray-200 text-center">
                  <Image src={arrow} alt="arrow" className="inline-block w-4 h-4" />
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
