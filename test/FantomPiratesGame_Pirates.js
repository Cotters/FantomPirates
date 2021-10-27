const Ships = artifacts.require("FantomPiratesShip");
const Game = artifacts.require("FantomPiratesGame");
const truffleAssert = require('truffle-assertions');
const truffleEvent = require('truffle-events');

contract("Game - Pirates", async accounts => {
	const myAccount = accounts[0];
	const otherAccount = accounts[1]
	let gameInstance;

	beforeEach(async () => {
		const shipsInstance = await Ships.new();
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
});