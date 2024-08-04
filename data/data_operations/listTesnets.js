const fs = require('fs');
const path = require('path');

function isTestnet(filePath) {
  // Check if the file contains 'testnet' in various fields
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(data);

    // Check if the content contains 'Testnet' or 'testnet'
    if (data.includes('Testnet') || data.includes('testnet')) {
      return true;
    }

    // Check if any of the RPC URLs contain 'testnet'
    if (jsonData.rpc && Array.isArray(jsonData.rpc)) {
      return jsonData.rpc.some((url) => url.includes('testnet'));
    }

    // Check if 'testnet' appears in 'name' or 'url'
    if (jsonData.name && jsonData.name.toLowerCase().includes('testnet')) {
      return true;
    }

    if (jsonData.url && jsonData.url.toLowerCase().includes('testnet')) {
      return true;
    }

    return false;
  } catch (error) {
    console.error(`Error: Unable to read or parse JSON from ${filePath}.`);
    return false;
  }
}

function listTestnets(directoryPath) {
  let testnetFiles = [];

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return console.error(`Error reading directory: ${err}`);
    }

    files.forEach((file) => {
      if (file.endsWith('.json')) {
        const filePath = path.join(directoryPath, file);
        if (isTestnet(filePath)) {
          testnetFiles.push(filePath);
        }
      }
    });

    // Sort the file paths naturally by their numeric part
    testnetFiles.sort((a, b) => {
      const numA = parseInt(a.match(/eip155-(\d+)\.json/)[1]);
      const numB = parseInt(b.match(/eip155-(\d+)\.json/)[1]);
      return numA - numB;
    });

    console.log('List of testnet files:');
    testnetFiles.forEach((filePath, index) => {
      console.log(`${index + 1}. ${filePath}`);
    });

    console.log(`\nTotal number of testnet files: ${testnetFiles.length}`);
  });
}

// Specify the directory path
const directoryPath = '/Users/aliercanozgokce/Desktop/FaucetHub/_data/chains';

// List the testnets
listTestnets(directoryPath);

// const fs = require('fs');
// const path = require('path');

// function isTestnet(filePath) {
//   // Check if the file contains the word 'Testnet' or has 'testnet' in any rpc URL
//   try {
//     const data = fs.readFileSync(filePath, 'utf8');
//     const jsonData = JSON.parse(data);

//     // Check if the content contains 'Testnet'
//     if (data.includes('Testnet' || 'testnet')) {
//       return true;
//     }

//     // Check if any of the RPC URLs contain 'testnet'
//     if (jsonData.rpc && Array.isArray(jsonData.rpc)) {
//       return jsonData.rpc.some((url) => url.includes('testnet'));
//     }

//     return false;
//   } catch (error) {
//     console.error(`Error: Unable to read or parse JSON from ${filePath}.`);
//     return false;
//   }
// }

// function listTestnets(directoryPath) {
//   let testnetFiles = [];

//   fs.readdir(directoryPath, (err, files) => {
//     if (err) {
//       return console.error(`Error reading directory: ${err}`);
//     }

//     files.forEach((file) => {
//       if (file.endsWith('.json')) {
//         const filePath = path.join(directoryPath, file);
//         if (isTestnet(filePath)) {
//           testnetFiles.push(filePath);
//         }
//       }
//     });

//     // Sort the file paths naturally by their numeric part
//     testnetFiles.sort((a, b) => {
//       const numA = parseInt(a.match(/eip155-(\d+)\.json/)[1]);
//       const numB = parseInt(b.match(/eip155-(\d+)\.json/)[1]);
//       return numA - numB;
//     });

//     console.log('List of testnet files:');
//     testnetFiles.forEach((filePath, index) => {
//       console.log(`${index + 1}. ${filePath}`);
//     });

//     console.log(`\nTotal number of testnet files: ${testnetFiles.length}`);
//   });
// }

// // Specify the directory path
// const directoryPath = '/Users/aliercanozgokce/Desktop/FaucetHub/_data/chains';

// // List the testnets
// listTestnets(directoryPath);
