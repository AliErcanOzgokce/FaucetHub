import React from "react";
import Image from "next/image";
import btc from "@/assets/btc-testnet.png"
import ethereum from "@/assets/ethereum.png"
import arrow from "@/assets/arrow-right.png"

function List() {
  return (
    <div className="w-full p-10  rounded-2xl">
      <div className="overflow-x-auto">
        <table className="table table-lg ">
          {/* head */}
          <thead className="text-black">
            <tr className="border-0">
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className="w-full">
            {/* row 1 */}
            <tr className="border-0">
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <Image src={btc} width={30} height={30} alt="btc-testnet" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Bitcoin Testnet3</div>
                  </div>
                </div>
              </td>
              <td className="text-center">12 Faucets</td>
              <th>
                <button className="btn btn-secondary text-white">
                  Go to Faucets
                </button>
              </th>
            </tr>
            {/* row 2 */}
            <tr className="border-0">
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                    <Image src={ethereum} width={30} height={30} alt="ethereum-sepolia" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Ethereum Sepolia</div>
                  </div>
                </div>
              </td>
              <td className="text-center">4</td>
              <th>
                <button className="btn btn-secondary text-white">Go to Faucets</button>
              </th>
            </tr>
            
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default List;
