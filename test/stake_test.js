const{ ethers, network } =require("hardhat");
const { expect } =require("chai");

const SECONDS_IN_A_DAY = 86400;

async function moveBlocks(amount) {
  console.log("Moving blocks...");
  for (let index = 0; index < amount; index++) {
    await network.provider.send("evm_mine", []);
  }
  console.log(`Moved ${amount} blocks.`);
}

async function moveTime(amount) {
  console.log("Moving time...");
  await network.provider.send("evm_increaseTime", [amount]);
  console.log(`Moved forward in time ${amount} seconds.`);
}

describe("Staking Tests", async function () {
  let staking ;
  let RewardToken;
  let deployer;
  let stakeAmount;

  beforeEach(async function () {
    const accounts = await ethers.getSigners();
    deployer = accounts[0];

    const _rewardToken = await ethers.getContractFactory("RewardToken");
    RewardToken = await _rewardToken.deploy();

    const _staking = await ethers.getContractFactory("staking");
    staking = await _staking.deploy(RewardToken.address, RewardToken.address);
    stakeAmount = ethers.utils.parseEther("100000");
  });

  it("should be able to stake tokens", async function () {
    await RewardToken.approve(staking.address, stakeAmount);
    await staking.stake(stakeAmount);

    const deployerAddress = deployer.getAddress();
    const startingEarned = await staking.earned(deployerAddress);

    console.log(`Starting Earned: ${startingEarned}`);

    await moveTime(SECONDS_IN_A_DAY);
    await moveBlocks(1);

    const endingEarned = await staking.earned(deployerAddress);
    console.log(`Ending Earned: ${endingEarned}`);

    expect(startingEarned).to.be.equal(0);
    expect(endingEarned).to.be.equal(8600000);
  });
});