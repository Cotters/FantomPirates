const Ships = artifacts.require("FantomPiratesShip");
const Game = artifacts.require("FantomPiratesGame");
const truffleAssert = require('truffle-assertions');
const timeMachine = require('ganache-time-traveler');

contract("Game - Ships", async accounts => {
	let gameInstance;

	beforeEach(async () => {
		const shipsInstance = await Ships.new();
		gameInstance = await Game.new(shipsInstance.address);
	});

	it("should not allow level 1 pirate to mint a ship", async () => {
		await gameInstance.mintPirate();
		truffleAssert.reverts(gameInstance.mintShip(1), "Your pirate must be at least level 2 in order to be a captain!");
	});

	it("should allow level 2 pirate to mint a ship", async () => {
		const oneDay = 60*60*25
		await gameInstance.mintPirate();
		// Lvl 2 requires 1500 XP
		const questsRequired = 1500/250
		for (i = 0;i<questsRequired;i++) {
			await gameInstance.doQuest(1);
			await timeMachine.advanceTimeAndBlock(oneDay);
		}
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