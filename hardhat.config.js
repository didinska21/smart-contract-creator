require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();
const fs = require("fs");

const chains = JSON.parse(fs.readFileSync("./chains.json"));

const networks = {};

for (const [name, config] of Object.entries(chains)) {
  networks[name] = {
    url: config.rpc,
    chainId: config.chainId,
    accounts: [process.env.PRIVATE_KEY]
  };
}

module.exports = {
  solidity: "0.8.20",
  networks,

  etherscan: {
    apiKey: {
      ethereum: process.env.ETHERSCAN_API_KEY,
      bnb: process.env.BSCSCAN_API_KEY,
      polygon: process.env.POLYGONSCAN_API_KEY,
      avalanche: process.env.SNOWTRACE_API_KEY,
      linea: process.env.LINEASCAN_API_KEY,
      base: process.env.BASESCAN_API_KEY,
      optimisticEthereum: process.env.OPTIMISM_API_KEY,
      arbitrumOne: process.env.ARBISCAN_API_KEY
    },

    customChains: [
      {
        network: "linea",
        chainId: 59144,
        urls: {
          apiURL: "https://api.lineascan.build/api/v2",
          browserURL: "https://lineascan.build"
        }
      },
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api/v2",
          browserURL: "https://basescan.org"
        }
      },
      {
        network: "optimism",
        chainId: 10,
        urls: {
          apiURL: "https://api-optimistic.etherscan.io/api/v2",
          browserURL: "https://optimistic.etherscan.io"
        }
      },
      {
        network: "arbitrum",
        chainId: 42161,
        urls: {
          apiURL: "https://api.arbiscan.io/api/v2",
          browserURL: "https://arbiscan.io"
        }
      },
      {
        network: "polygon",
        chainId: 137,
        urls: {
          apiURL: "https://api.polygonscan.com/api/v2",
          browserURL: "https://polygonscan.com"
        }
      },
      {
        network: "bnb",
        chainId: 56,
        urls: {
          apiURL: "https://api.bscscan.com/api/v2",
          browserURL: "https://bscscan.com"
        }
      },
      {
        network: "avalanche",
        chainId: 43114,
        urls: {
          apiURL: "https://api.snowtrace.io/api/v2",
          browserURL: "https://snowtrace.io"
        }
      }
    ]
  }
};
