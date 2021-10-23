const Ships = artifacts.require("FantomPiratesShip");
const Game = artifacts.require("FantomPiratesGame");
const truffleAssert = require('truffle-assertions');
const truffleEvent = require('truffle-events');

contract("Game", async accounts => {
	const myAccount = accounts[0];
	const otherAccount = accounts[1]
	let shipsInstance;
	let gameInstance;

	let transferTx;

	beforeEach(async () => {
		shipsInstance = await Ships.new();
		gameInstance = await Game.new(shipsInstance.address);
	});

	it("should have my account as owner of the contract", async () => {
		const owner = await gameInstance.owner.call();
		assert.equal(owner, myAccount);
	});

	it("should allow any account to mint a pirate", async () => {
		await gameInstance.mintPirate({from: otherAccount});
		const pirateBalance = await gameInstance.balanceOf(otherAccount);
		assert.equal(1, pirateBalance, "Arbitrary account was not allowed to mint a pirate.");
	});

	it("should emit a PirateCreated event when minting a pirate", async () => {
		let result = await gameInstance.mintPirate();
		truffleAssert.eventEmitted(result, 'PirateCreated');
	});

	it('should not allow me to mint a pirate when I own more than 10 pirates', async () => {
		var i = 1;
		while (i < 11) {
			await gameInstance.mintPirate();
			i++
		}
    const pirateBalance = await gameInstance.balanceOf(myAccount);
		assert.equal(10, pirateBalance.toNumber(), "Arbitrary account was not allowed to mint 10 pirates.");
		truffleAssert.reverts(gameInstance.mintPirate(), "You can only own up to 10 pirates!");
	});

	it("should not allow account to mint a ship if account owns no pirates", async () => {
		assert.equal(0, await gameInstance.balanceOf(myAccount))
	 	truffleAssert.reverts(gameInstance.mintShip(0), "You must own a pirate before you can own a ship!");
	 	truffleAssert.reverts(gameInstance.mintShip(1), "You must own a pirate before you can own a ship!");
	});

	it("should not allow level 1 pirate to mint a ship", async () => {
		await gameInstance.mintPirate();
		await truffleAssert.reverts(gameInstance.mintShip(1), "Your pirate must be at least level 2 in order to be a captain!");
	});

	it("should allow level 2 pirate to mint a ship", async () => {
		await gameInstance.mintPirate();
		await gameInstance.doQuest(1);
		await gameInstance.mintShip(1);
		assert.equal(1, await gameInstance.ship.call(1), "Account with level 2 pirate was not allowed to mint a ship.");
	});

	it("should only allow a pirate to captain one ship", async () => {
		await gameInstance.mintPirate();
		await gameInstance.doQuest(1);
		await gameInstance.mintShip(1);
		truffleAssert.reverts(gameInstance.mintShip(1), "Your pirate can only captain one ship!")
	});
});