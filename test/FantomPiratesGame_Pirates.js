const Ships = artifacts.require("FantomPiratesShip");
const Game = artifacts.require("FantomPiratesGame");
const truffleAssert = require('truffle-assertions');
const truffleEvent = require('truffle-events');
const timeMachine = require('ganache-time-traveler');

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
		assert.equal(1, pirateBalance, "Arbitrary account was not allowed to mint a pirate");
		assert.equal(1, await gameInstance.level.call(1), "Pirate did not start at level 1");
		assert.equal(0, await gameInstance.xp.call(1), "Pirate did not start with 0 XP");
	});

	it("should emit a PirateCreated event when minting a pirate", async () => {
		let result = await gameInstance.mintPirate();
		truffleAssert.eventEmitted(result, 'PirateCreated');
	});

	it('should not allow anyone to own more than 10 pirates', async () => {
		var i = 1;
		while (i < 11) {
			await gameInstance.mintPirate();
			i++
		}
    const pirateBalance = await gameInstance.balanceOf(myAccount);
		assert.equal(10, pirateBalance.toNumber(), "Arbitrary account was not allowed to mint 10 pirates");
		truffleAssert.reverts(gameInstance.mintPirate(), "You can only own up to 10 pirates!");
	});

	it("should not allow pirate to level up when pirate is not owned", async () => {
		truffleAssert.reverts(gameInstance.levelUp(0));
		await gameInstance.mintPirate();
		truffleAssert.reverts(gameInstance.levelUp(1, { from: otherAccount }), "You must own this pirate in order to level it up!");
	});

	it("should allow pirate to level up when required XP attained", async () => {
		await gameInstance.mintPirate();
		assert.equal(1, await gameInstance.level.call(1), "Pirate did not start at level 1");
		const oneDay = 60*60*25;
		// Lvl 2 requires 1500 XP
		const questsRequired = 1500/250;
		for (i = 0;i<questsRequired;i++) {
			await gameInstance.doQuest(1);
			await timeMachine.advanceTimeAndBlock(oneDay);
		}
		assert.equal(1500, await gameInstance.xp.call(1), "Pirate did not loose XP when leveling up");
		let result = await gameInstance.levelUp(1);
		assert.equal(2, await gameInstance.level.call(1), "Pirate was not allowed to level up or leveled too high");
		truffleAssert.eventEmitted(result, 'Leveled');
		assert.equal(0, await gameInstance.xp.call(1), "Pirate did not loose XP when leveling up");
	});

	it("should not allow pirate to level up when required XP not attained", async () => {
		await gameInstance.mintPirate();
		assert.equal(1, await gameInstance.level.call(1), "Pirate did not start at level 1");
		truffleAssert.reverts(gameInstance.levelUp(1), "You do not have the required XP to level up this pirate.");
		assert.equal(1, await gameInstance.level.call(1), "Pirate was wrongly allowed to level up.");
	});
});