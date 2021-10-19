const GameItems = artifacts.require("FantomPiratesGameItems");
const Game = artifacts.require("FantomPiratesGame");

contract("PirateGameItems", async accounts => {
	const myAccount = accounts[0];

	xit("should allow the game to transfer tokens to other accounts", async () => {
		const gameItemsInstance = await GameItems.deployed();
		const gameInstance = await Game.deployed();
		const gameAddress = await gameInstance.address;
		
		// await gameItemsInstance.setApprovalForAll(gameAddress, true);
		// assert(await gameItemsInstance.isApprovedForAll.call(myAccount, gameAddress), "Game should have approval to spend my tokens.");
		
		// Only Externally Owned Accounts (EOAs) can initiate a transaction: 
		// https://forum.openzeppelin.com/t/erc20-transferfrom-returned-error-sender-account-not-recognized/5057/2
		
		// console.log(gameAddress);
		// await gameItemsInstance.safeTransferFrom(myAccount, otherAccountAddress, 0, 1, [], { from: gameAddress });
		// const otherAccountPirateBalance = await gameItemsInstance.balanceOf(otherAccountAddress, 0);
		// assert.equal(otherAccountPirateBalance, 1);
	});
});