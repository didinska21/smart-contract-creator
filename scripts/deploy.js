const hre = require("hardhat");

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

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const network = hre.network.name;
  console.log(`🚀 Deploying on ${network}`);

  const factory = await hre.ethers.getContractFactory("AutoForwardPlus");
  const contract = await factory.deploy(process.env.OWNER_ADDRESS);
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log(`✅ Deployed at: ${address}`);

  if (verifyWhitelist.includes(network)) {
    console.log("⏳ Waiting before verify...");
    await sleep(15000);

    try {
      await hre.run("verify:verify", {
        address,
        constructorArguments: [process.env.OWNER_ADDRESS]
      });
      console.log("✅ Verified!");
    } catch (err) {
      console.log("Verify failed:", err.message);
    }
  } else {
    console.log("⏭ Deploy only (verify skipped)");
  }
}

main().catch(console.error);
