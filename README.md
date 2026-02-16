# Smart Contract Creator

Production-ready multichain EVM smart contract deployment tool.

Repository: https://github.com/didinska21/smart-contract-creator

------------------------------------------------------------------------

## 🚀 Features

-   Deploy smart contracts to multiple EVM chains
-   Auto verify on stable chains
-   Deploy-only mode for non-supported verify chains
-   Retry verification (3x) with delay
-   RPC managed via `chains.json`
-   Clean structure for GitHub
-   Deployment log saved automatically

------------------------------------------------------------------------

## ✅ Auto-Verify Supported Chains

-   Ethereum
-   BNB Smart Chain
-   Arbitrum
-   Optimism
-   Base
-   Linea
-   Polygon
-   Avalanche
-   Fantom
-   Celo

Other EVM chains are deploy-only by default.

------------------------------------------------------------------------

## 📁 Project Structure

smart-contract-creator/ 
│ ├── contracts/ 
│ └── AutoForwardPlus.sol 
│ ├──
scripts/ 
│ └── deploy.js 
│ ├── chains.json 
├── hardhat.config.js 
├──
deploy-log.json 
├── .env.example 
├── .gitignore 
├── package.json 
└──
README.md

------------------------------------------------------------------------

## ⚙️ Installation

1.  Clone repository

git clone https://github.com/didinska21/smart-contract-creator.git cd
smart-contract-creator

2.  Install dependencies

npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
@nomicfoundation/hardhat-verify dotenv

3.  Copy environment file

cp .env.example .env

Fill your PRIVATE_KEY, OWNER_ADDRESS, and API keys.

------------------------------------------------------------------------

## 🛠 Compile

npx hardhat compile

------------------------------------------------------------------------

## 🚀 Deploy

node scripts/deploy.js

Then choose chain number (single or multiple comma separated).

Example:

1 or 1,3,6

------------------------------------------------------------------------

## 🧾 Deployment Log

All deployments are saved to:

deploy-log.json

Example log:

{ "chain": "bnb", "address": "0x...", "verified": true, "timestamp":
"2026-02-16T00:00:00.000Z" }

------------------------------------------------------------------------

## 🔐 Security Notes

-   Never commit your .env file
-   Use dedicated deploy wallet
-   Ensure wallet has native gas token on target chain
-   Verification may take \~15 seconds before execution

------------------------------------------------------------------------

## 📌 Add New Chain

Edit chains.json and add:

{ "name": "newchain", "rpc": "https://rpc-url", "chainId": 12345 }

If chain is stable Etherscan-type, add it to verify whitelist in
deploy.js.

------------------------------------------------------------------------

## 📄 License

MIT
