const FantomPiratesGameItems = artifacts.require("FantomPiratesGameItems");
const FantomPiratesGame = artifacts.require("FantomPiratesGame");

module.exports = async function (deployer) {
  await deployer.deploy(FantomPiratesGameItems);
  const gameItemsInstance = await FantomPiratesGameItems.deployed();
  await deployer.deploy(FantomPiratesGame, gameItemsInstance.address);
};
