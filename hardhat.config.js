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
  apiKey: process.env.ETHERSCAN_API_KEY,

  customChains: [
    {
      network: "ethereum",
      chainId: 1,
      urls: {
        apiURL: "https://api.etherscan.io/v2/api",
        browserURL: "https://etherscan.io"
      }
    },
    {
      network: "bnb",
      chainId: 56,
      urls: {
        apiURL: "https://api.etherscan.io/v2/api",
        browserURL: "https://bscscan.com"
      }
    },
    {
      network: "arbitrum",
      chainId: 42161,
      urls: {
        apiURL: "https://api.etherscan.io/v2/api",
        browserURL: "https://arbiscan.io"
      }
    },
    {
      network: "optimism",
      chainId: 10,
      urls: {
        apiURL: "https://api.etherscan.io/v2/api",
        browserURL: "https://optimistic.etherscan.io"
      }
    },
    {
      network: "base",
      chainId: 8453,
      urls: {
        apiURL: "https://api.etherscan.io/v2/api",
        browserURL: "https://basescan.org"
      }
    },
    {
      network: "linea",
      chainId: 59144,
      urls: {
        apiURL: "https://api.etherscan.io/v2/api",
        browserURL: "https://lineascan.build"
      }
    },
    {
      network: "polygon",
      chainId: 137,
      urls: {
        apiURL: "https://api.etherscan.io/v2/api",
        browserURL: "https://polygonscan.com"
      }
    },
    {
      network: "avalanche",
      chainId: 43114,
      urls: {
        apiURL: "https://api.etherscan.io/v2/api",
        browserURL: "https://snowtrace.io"
      }
    }
  ]
  }
};
