const hre = require("hardhat");
const fs = require("fs");
const readline = require("readline");

const chains = JSON.parse(fs.readFileSync("./chains.json"));
const OWNER = process.env.OWNER_ADDRESS;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const verifyWhitelist = [
  "ethereum",
  "bnb",
  "arbitrum",
  "optimism",
  "base",
  "linea",
  "polygon",
  "avalanche"
];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function ask(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise(resolve => rl.question(query, ans => {
    rl.close();
    resolve(ans);
  }));
}

async function deployTo(chainKey) {
  const selected = chains[chainKey];
  if (!selected) return;

  console.log(`\n🚀 Deploying to ${selected.name}`);

  const provider = new hre.ethers.JsonRpcProvider(selected.rpc);
  const wallet = new hre.ethers.Wallet(PRIVATE_KEY, provider);

  const factory = await hre.ethers.getContractFactory(
    "AutoForwardPlus",
    wallet
  );

  const contract = await factory.deploy(OWNER);
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log(`✅ Deployed at: ${address}`);

  let verified = false;

  if (verifyWhitelist.includes(selected.name)) {
    console.log("⏳ Waiting before verify...");
    await sleep(15000);

    for (let i = 1; i <= 3; i++) {
      try {
        console.log(`Attempt verify ${i}...`);
        await hre.run("verify:verify", {
          address: address,
          constructorArguments: [OWNER]
        });
        console.log("✅ Verified successfully!");
        verified = true;
        break;
      } catch (err) {
        console.log("Verify failed:", err.message);
        await sleep(5000);
      }
    }
  } else {
    console.log("⏭ Deploy only (verify skipped)");
  }

  const log = {
    chain: selected.name,
    address,
    verified,
    timestamp: new Date().toISOString()
  };

  fs.appendFileSync("deploy-log.json", JSON.stringify(log) + "\n");
}

async function main() {
  console.log("\nSelect chain(s) to deploy:\n");

  Object.keys(chains).forEach(key => {
    console.log(`${key}. ${chains[key].name}`);
  });

  const input = await ask("\nEnter number (comma separated for multi): ");
  const selectedChains = input.split(",");

  for (let chain of selectedChains) {
    await deployTo(chain.trim());
  }

  console.log("\n🎉 Finished.");
}

main().catch(console.error);
