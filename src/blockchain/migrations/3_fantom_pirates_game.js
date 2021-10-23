const FantomPiratesShip = artifacts.require("FantomPiratesShip");
const FantomPiratesGame = artifacts.require("FantomPiratesGame");
const FantomPiratesGold = artifacts.require("FantomPiratesGold");

module.exports = async function (deployer) {
  deployer.then(() => {
    return deployer.deploy(FantomPiratesShip);
  }).then(() => {
    return deployer.deploy(FantomPiratesGame, FantomPiratesShip.address);
  }).then(() => {
    return deployer.deploy(FantomPiratesGold);
  })
};
