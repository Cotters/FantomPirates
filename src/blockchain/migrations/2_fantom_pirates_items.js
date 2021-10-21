const FantomPiratesBaseGameItems = artifacts.require("FantomPiratesBaseGameItems");
const FantomPiratesGame = artifacts.require("FantomPiratesGame");

module.exports = async function (deployer) {
  await deployer.deploy(FantomPiratesBaseGameItems);
  const gameItemsInstance = await FantomPiratesBaseGameItems.deployed();
  await deployer.deploy(FantomPiratesGame, gameItemsInstance.address);
};
