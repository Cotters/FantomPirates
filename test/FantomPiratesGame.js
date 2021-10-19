const GameItems = artifacts.require("FantomPiratesGameItems");
const Game = artifacts.require("FantomPiratesGame");
const truffleAssert = require('truffle-assertions');

contract("Game", async accounts => {
	const myAccount = accounts[0];
	let gameItemsInstance;
	let gameInstance;

	beforeEach(async () => {
		gameItemsInstance = await GameItems.deployed();
		gameInstance = await Game.deployed();
		const gameAddress = gameInstance.address;
		
		await allowGameItemTransfersFrom(gameAddress);
	})

	it("should have an owner equal to Contract creator", async () => {
		const owner = await gameInstance.owner.call();
		assert.equal(owner, myAccount);
	});

	it("should have the GameItems approval to spend tokens", async () => {
		assert(await gameItemsInstance.isApprovedForAll.call(myAccount, gameInstance.address), "Game should have approval to spend my tokens.");
	});

	it('should not allow me to mint a pirate when I have more than 10 pirates', async () => {
		await truffleAssert.reverts(gameInstance.mintPirate(), "You can only have up to 10 pirates!");
	});

	it("should allow any account to mint a pirate", async () => {
		const otherAccount = accounts[1]
		await gameInstance.mintPirate({ from: otherAccount });
		const pirateBalance = await gameItemsInstance.balanceOf.call(otherAccount, 0);
		assert.equal(1, pirateBalance, "Arbitrary account was not allowed to mint a pirate.");
	});

	

	// Game setup functions:

	async function allowGameItemTransfersFrom(address) {
		await gameItemsInstance.setApprovalForAll(address, true);
	};
});