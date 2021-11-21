const FantomPirateKings = artifacts.require("FantomPirateKings");

module.exports = async function (deployer) {
  await deployer.deploy(FantomPirateKings);
};
