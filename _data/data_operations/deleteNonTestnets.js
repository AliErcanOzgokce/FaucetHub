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

function deleteNonTestnets(directoryPath) {
  let testnetFiles = [];
  let nonTestnetFiles = [];

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return console.error(`Error reading directory: ${err}`);
    }

    files.forEach((file) => {
      if (file.endsWith('.json')) {
        const filePath = path.join(directoryPath, file);
        if (isTestnet(filePath)) {
          testnetFiles.push(filePath);
        } else {
          nonTestnetFiles.push(filePath);
        }
      }
    });

    // Sort the non-testnet file paths naturally by their numeric part
    nonTestnetFiles.sort((a, b) => {
      const numA = parseInt(a.match(/eip155-(\d+)\.json/)[1]);
      const numB = parseInt(b.match(/eip155-(\d+)\.json/)[1]);
      return numA - numB;
    });

    console.log('Non-testnet files to be deleted:');
    nonTestnetFiles.forEach((filePath, index) => {
      console.log(`${index + 1}. ${filePath}`);
    });

    console.log(`\nTotal number of non-testnet files: ${nonTestnetFiles.length}`);

    // Delete the non-testnet files
    nonTestnetFiles.forEach((filePath) => {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting file ${filePath}: ${err}`);
        } else {
          console.log(`Deleted: ${filePath}`);
        }
      });
    });
  });
}

// Specify the directory path
const directoryPath = '/Users/aliercanozgokce/Desktop/FaucetHub/_data/chains';

// Delete the non-testnet chains
deleteNonTestnets(directoryPath);
