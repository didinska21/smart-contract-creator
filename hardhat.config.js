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
      arbitrumOne: process.env.ARBISCAN_API_KEY,
      optimisticEthereum: process.env.OPTIMISM_API_KEY,
      base: process.env.BASESCAN_API_KEY,
      linea: process.env.LINEASCAN_API_KEY,
      polygon: process.env.POLYGONSCAN_API_KEY,
      avalanche: process.env.SNOWTRACE_API_KEY
    }
  }
};
