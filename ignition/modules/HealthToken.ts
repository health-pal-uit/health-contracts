import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("HealthTokenModule", (m) => {
  const healthToken = m.contract("HealthToken");

  return { healthToken };
});
