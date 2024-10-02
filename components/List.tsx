"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import networks from "@/data/networks"; // Adjust the path as necessary

function List() {
  const router = useRouter();
  const [filteredNetworks, setFilteredNetworks] = useState(networks.evmBasedNetworks);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNetworkType, setSelectedNetworkType] = useState("All Networks");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [icons, setIcons] = useState({}); // This will store icon data

  const uniqueNetworkTypes = [
    "All Networks",
    "EVM Based",
    "BTC Based",
    "SOL Based",
    "Other Networks",
  ];

  useEffect(() => {
    let updatedNetworks = [
      ...networks.evmBasedNetworks,
      ...networks.btcBasedNetworks,
      ...networks.solBasedNetworks,
      ...networks.otherNetworks,
    ];

    if (searchQuery) {
      updatedNetworks = updatedNetworks.filter((network) =>
        network.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedNetworkType !== "All Networks") {
      updatedNetworks = networks[`${selectedNetworkType.toLowerCase().replace(" ", "")}`];
    }

    setFilteredNetworks(updatedNetworks);
  }, [searchQuery, selectedNetworkType]);

  // Function to dynamically load icon data from "@/data/EVM Based/icons"
  const fetchIconData = async (iconName) => {
    try {
      const iconData = await import(`@/data/EVM Based/icons/${iconName}.json`);
      return iconData[0].url; // Get the IPFS URL from the JSON file
    } catch (error) {
      console.error(`Error loading icon for ${iconName}:`, error);
      return null;
    }
  };

  // Load the icons for the networks
  useEffect(() => {
    const loadIcons = async () => {
      const iconPromises = filteredNetworks.map(async (network) => {
        if (network.icon) {
          const iconUrl = await fetchIconData(network.icon);
          return { [network.icon]: iconUrl };
        }
        return null;
      });

      const iconResults = await Promise.all(iconPromises);
      const iconMap = iconResults.reduce((acc, icon) => ({ ...acc, ...icon }), {});
      setIcons(iconMap);
    };

    loadIcons();
  }, [filteredNetworks]);

  const handleCardClick = (networkName: string) => {
    router.push(`/network/${networkName.toLowerCase().replace(/\s/g, "-")}`);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNetworkSelect = (networkType) => {
    setSelectedNetworkType(networkType);
    setIsDropdownOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 bg-white">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Explore Networks</h1>
        <p className="text-lg text-gray-600">
          Discover and find faucets for various blockchain networks.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between mb-8 space-y-4 md:space-y-0">
        <div className="relative w-full md:w-2/3 lg:w-3/4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search for networks..."
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition"
          />
        </div>
        <div className="relative w-full md:w-1/3 lg:w-1/4">
          <button
            onClick={toggleDropdown}
            className="flex items-center justify-between w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none transition"
          >
            {selectedNetworkType}
            <svg
              className={`w-5 h-5 ml-2 transition-transform duration-200 transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M19 9l-7 7-7-7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </button>
          {isDropdownOpen && (
            <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10">
              {uniqueNetworkTypes.map((networkType, index) => (
                <button
                  key={index}
                  onClick={() => handleNetworkSelect(networkType)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                >
                  {networkType}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredNetworks.map((network, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(network.name)}
            className="cursor-pointer bg-gray-50 border border-gray-200 rounded-xl shadow-sm p-6 transition-transform transform hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4 shadow-sm">
                {icons[network.icon] ? (
                  <Image
                    src={`https://ipfs.io/ipfs/${icons[network.icon].split("ipfs://")[1]}`}
                    alt={`${network.name} Icon`}
                    width={32}
                    height={32}
                  />
                ) : (
                  <span className="text-gray-500">No Icon</span>
                )}
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">{network.name}</h2>
            </div>
            <p className="text-gray-600 mb-4">Faucets available: {network.faucets.length}</p>
            <div className="mt-auto">
              <button className="text-blue-600 hover:text-blue-800 flex items-center font-medium">
                View Details
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9 5l7 7-7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
        {filteredNetworks.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            No networks found.
          </div>
        )}
      </div>
    </div>
  );
}

export default List;


// "use client";
// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import networks from "@/data/networks"; // Adjust the path as necessary

// function List() {
//   const router = useRouter();
//   const [filteredNetworks, setFilteredNetworks] = useState(networks);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedNetworkType, setSelectedNetworkType] = useState("All Networks");
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [icons, setIcons] = useState({}); // This will store icon data

//   const uniqueNetworkTypes = ["All Networks", ...new Set(networks.map((net) => net.type))];

//   useEffect(() => {
//     let updatedNetworks = networks;

//     if (searchQuery) {
//       updatedNetworks = updatedNetworks.filter((network) =>
//         network.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     if (selectedNetworkType !== "All Networks") {
//       updatedNetworks = updatedNetworks.filter(
//         (network) => network.type === selectedNetworkType
//       );
//     }

//     setFilteredNetworks(updatedNetworks);
//   }, [searchQuery, selectedNetworkType]);

//   // Function to dynamically load icon data from "@/data/EVM Based/icons"
//   const fetchIconData = async (iconName) => {
//     try {
//       const iconData = await import(`@/data/EVM Based/icons/${iconName}.json`);
//       return iconData[0].url; // Get the IPFS URL from the JSON file
//     } catch (error) {
//       console.error(`Error loading icon for ${iconName}:`, error);
//       return null;
//     }
//   };

//   // Load the icons for the networks
//   useEffect(() => {
//     const loadIcons = async () => {
//       const iconPromises = filteredNetworks.map(async (network) => {
//         if (network.icon) {
//           const iconUrl = await fetchIconData(network.icon);
//           return { [network.icon]: iconUrl };
//         }
//         return null;
//       });

//       const iconResults = await Promise.all(iconPromises);
//       const iconMap = iconResults.reduce((acc, icon) => ({ ...acc, ...icon }), {});
//       setIcons(iconMap);
//     };

//     loadIcons();
//   }, [filteredNetworks]);

//   const handleCardClick = (chainId: number) => {
//     router.push(`/network/${chainId}`);
//   };

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const handleNetworkSelect = (networkType) => {
//     setSelectedNetworkType(networkType);
//     setIsDropdownOpen(false);
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 bg-white">
//       {/* Başlık Bölümü */}
//       <div className="text-center mb-12">
//         <h1 className="text-5xl font-bold text-gray-800 mb-4">Explore Networks</h1>
//         <p className="text-lg text-gray-600">
//           Discover and find faucets for various blockchain networks.
//         </p>
//       </div>

//       {/* Arama ve Network Seçimi */}
//       <div className="flex flex-col md:flex-row items-center justify-between mb-8 space-y-4 md:space-y-0">
//         {/* Arama Çubuğu */}
//         <div className="relative w-full md:w-2/3 lg:w-3/4">
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={handleSearch}
//             placeholder="Search for networks..."
//             className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition"
//           />
//         </div>
//         {/* Network Seçimi Dropdown */}
//         <div className="relative w-full md:w-1/3 lg:w-1/4">
//           <button
//             onClick={toggleDropdown}
//             className="flex items-center justify-between w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none transition"
//           >
//             {selectedNetworkType}
//             <svg
//               className={`w-5 h-5 ml-2 transition-transform duration-200 transform ${
//                 isDropdownOpen ? "rotate-180" : ""
//               }`}
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 d="M19 9l-7 7-7-7"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//               />
//             </svg>
//           </button>
//           {isDropdownOpen && (
//             <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10">
//               {uniqueNetworkTypes.map((networkType, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleNetworkSelect(networkType)}
//                   className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
//                 >
//                   {networkType}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Network Kartları */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {filteredNetworks.map((network, index) => (
//           <div
//             key={index}
//             onClick={() => handleCardClick(Number(network.chainId))}
//             className="cursor-pointer bg-gray-50 border border-gray-200 rounded-xl shadow-sm p-6 transition-transform transform hover:-translate-y-1 hover:shadow-md"
//           >
//             <div className="flex items-center mb-4">
//               <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4 shadow-sm">
//                 {icons[network.icon] ? (
//                   <Image
//                     src={`https://ipfs.io/ipfs/${icons[network.icon].split("ipfs://")[1]}`}
//                     alt={`${network.name} Icon`}
//                     width={32}
//                     height={32}
//                   />
//                 ) : (
//                   <span className="text-gray-500">No Icon</span> // Fallback if no icon is provided
//                 )}
//               </div>
//               <h2 className="text-2xl font-semibold text-gray-800">{network.name}</h2>
//             </div>
//             <p className="text-gray-600 mb-4">Faucets available: {network.faucets.length}</p>
//             <div className="mt-auto">
//               <button className="text-blue-600 hover:text-blue-800 flex items-center font-medium">
//                 View Details
//                 <svg
//                   className="w-4 h-4 ml-1"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     d="M9 5l7 7-7 7"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                   />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         ))}
//         {filteredNetworks.length === 0 && (
//           <div className="col-span-full text-center text-gray-500">
//             No networks found.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default List;

