import { ethers } from "hardhat";

async function main() {
  console.log("Deploying ShonaliChain contract...");

  const ShonaliChain = await ethers.getContractFactory("ShonaliChain");
  const shonaliChain = await ShonaliChain.deploy();

  await shonaliChain.waitForDeployment();

  const address = await shonaliChain.getAddress();

  console.log(`✅ ShonaliChain deployed to: ${address}`);
  console.log("\nSave this address for your frontend!");
  console.log(`Contract Address: ${address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
