const { network } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  const args = ["500000000000000000000"]; // there will be 500 of this tokens
  const token = await deploy("OurToken", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  console.log(`Deployment address: ${token.address}`);
};

module.exports.tags = ["all", "ourToken"];
