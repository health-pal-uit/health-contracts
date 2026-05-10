import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.create();

describe("HealthToken", function () {
  async function deploy() {
    const [owner, user, expert] = await ethers.getSigners();

    const HealthToken = await ethers.getContractFactory("HealthToken");
    const token = await HealthToken.deploy();

    return { token, owner, user, expert };
  }

  it("owner can reward user", async function () {
    const { token, user } = await deploy();

    await token.rewardUser(user.address, ethers.parseUnits("100", 18));

    const balance = await token.balanceOf(user.address);
    expect(balance).to.equal(ethers.parseUnits("100", 18));
  });

  it("non-owner cannot reward user", async function () {
    const { token, user } = await deploy();

    await expect(
      token.connect(user).rewardUser(user.address, ethers.parseUnits("100", 18))
    ).to.be.revert(ethers);
  });

  it("owner can deduct from user", async function () {
    const { token, user } = await deploy();

    await token.rewardUser(user.address, ethers.parseUnits("100", 18));
    await token.deductFromUser(user.address, ethers.parseUnits("30", 18));

    const balance = await token.balanceOf(user.address);
    expect(balance).to.equal(ethers.parseUnits("70", 18));
  });

  it("owner can reward expert after deducting from user (pay-per-minute)", async function () {
    const { token, user, expert } = await deploy();

    await token.rewardUser(user.address, ethers.parseUnits("100", 18));
    await token.deductFromUser(user.address, ethers.parseUnits("30", 18));
    await token.rewardUser(expert.address, ethers.parseUnits("30", 18));

    expect(await token.balanceOf(user.address)).to.equal(ethers.parseUnits("70", 18));
    expect(await token.balanceOf(expert.address)).to.equal(ethers.parseUnits("30", 18));
  });
});
