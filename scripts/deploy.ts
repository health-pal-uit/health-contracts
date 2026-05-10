import { network } from "hardhat";                                                                

const { ethers } = await network.connect("sepolia");                                              
            
async function main() {
const [deployer] = await ethers.getSigners();
console.log("Deploying with wallet:", deployer.address);

const HealthToken = await ethers.getContractFactory("HealthToken");
const token = await HealthToken.deploy();
await token.waitForDeployment();

const address = await token.getAddress();
console.log("HealthToken deployed to:", address);
console.log("Save this address — you'll need it in NestJS!");
}

main().catch(console.error);