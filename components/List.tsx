import React from "react";
import Image from "next/image";
import Link from "next/link";
import arrow from "@/assets/arrow-right.png";
import {networks} from "@/data/networks" // Adjust the path as necessary

function List() { // Add more networks as needed

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
              <tr key={index}>
                <td>{network.name}</td>
                <td>{network.faucets.length}</td>
                <td>
                  <Link href={`/network/${network.chainId}`}>
                    
                      <Image src={arrow} alt="arrow" />
                    
                  </Link>
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