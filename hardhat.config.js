require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  etherscan: {
    apiKey: {
      ethereum: process.env.ETHERSCAN_API_KEY,
      bnb: process.env.BSCSCAN_API_KEY,
      arbitrumOne: process.env.ARBISCAN_API_KEY,
      optimisticEthereum: process.env.OPTIMISM_API_KEY,
      base: process.env.BASESCAN_API_KEY,
      linea: process.env.LINEASCAN_API_KEY,
      polygon: process.env.POLYGONSCAN_API_KEY,
      avalanche: process.env.SNOWTRACE_API_KEY,
      fantom: process.env.FTMSCAN_API_KEY,
      celo: process.env.CELOSCAN_API_KEY
    }
  }
};
