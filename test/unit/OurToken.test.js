const { assert, expect } = require("chai");
const { getNamedAccounts, deployments } = require("hardhat");

describe("OurToken Unit Tests", () => {
  let ourToken, deployer;
  beforeEach(async () => {
    deployer = (await getNamedAccounts()).deployer;
    await deployments.fixture(["all"]);
    ourToken = await ethers.getContract("OurToken", deployer);
  });

  it("returns 18 for decimals", async () => {
    let decimals = await ourToken.decimals();
    assert.equal(decimals.toString(), "18");
  });

  it("has totalSupply of 500000000000000000000", async () => {
    let totalSupply = await ourToken.totalSupply();
    assert.equal(totalSupply.toString(), "500000000000000000000");
  });

  it("transfers 100 tokens to second user", async () => {
    const accounts = await ethers.getSigners();
    const txResp = await ourToken.transfer(
      accounts[1].address,
      "100000000000000000"
    );
    const txReceipt = await txResp.wait(1);

    console.log(deployer);
    assert.equal(txReceipt.events[0].args.from, deployer);
    assert.equal(txReceipt.events[0].args.to, accounts[1].address);
    assert.equal(
      txReceipt.events[0].args.value.toString(),
      "100000000000000000"
    );

    const senderBalance = await ourToken.balanceOf(deployer);
    const recieverBalance = await ourToken.balanceOf(accounts[1].address);

    assert(senderBalance.toString(), "400000000000000000");
    assert(recieverBalance.toString(), "100000000000000000");
  });
});
