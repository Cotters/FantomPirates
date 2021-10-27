const Ships = artifacts.require("FantomPiratesShip");
const Game = artifacts.require("FantomPiratesGame");
const truffleAssert = require('truffle-assertions');
const timeMachine = require('ganache-time-traveler');

contract("Game - Pets", async accounts => {
	let gameInstance;

	beforeEach(async () => {
		const shipsInstance = await Ships.new();
		gameInstance = await Game.new(shipsInstance.address);
	});

	it("should not allow pirate with less than 3000 gold to mint a ship", async () => {
		await gameInstance.mintPirate();
		truffleAssert.reverts(gameInstance.mintPet(1), "Your pirate does not hold enough gold to be buy a pet!");
	});

	// ERC1155 for this???
	// it("should allow pirate to mint a pet when holding at least 1500 gold", async () => {
	// 	await gameInstance.mintPirate();
	// 	const oneDay = 60*60*25
	// 	// Lvl 3 requires a total of 1500 + 2250 XP
	// 	const questsRequired = (1500+2250)/250;
	// 	for (i = 0;i<questsRequired;i++) {
	// 		await gameInstance.doQuest(1);
	// 		await timeMachine.advanceTimeAndBlock(oneDay);
	// 	}
	// 	await gameInstance.mintShip(1);
	// 	assert.equal(1, await gameInstance.ship.call(1), "Pirate with 1500 gold was not allowed to mint a ship.");
	// 	truffleAssert.reverts(gameInstance.mintShip(1), "Your pirate can only captain one ship!");
	// });
});