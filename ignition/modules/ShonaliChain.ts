import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ShonaliChainModule = buildModule("ShonaliChainModule", (m) => {
  const shonaliChain = m.contract("ShonaliChain");

  return { shonaliChain };
});

export default ShonaliChainModule;
