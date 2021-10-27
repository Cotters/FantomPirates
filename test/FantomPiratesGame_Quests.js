const Ships = artifacts.require("FantomPiratesShip");
const Game = artifacts.require("FantomPiratesGame");
const truffleAssert = require('truffle-assertions');
const timeMachine = require('ganache-time-traveler');

contract("Game - Quests", async accounts => {
	let gameInstance;
	let snapshotId;

	beforeEach(async () => {
		const shipsInstance = await Ships.new();
		gameInstance = await Game.new(shipsInstance.address);
	});

	it("should increase pirate XP when completing a quest", async () => {
		await gameInstance.mintPirate();
		await gameInstance.doQuest(1);
		assert.equal(250, await gameInstance.xp.call(1));
	});

	it("should not allow pirate to quest twice in one day", async () => {
		await gameInstance.mintPirate();
		await gameInstance.doQuest(1);
		truffleAssert.reverts(gameInstance.doQuest(1), "You must wait a day before your next quest!")
	});

	it("should allow a pirate to level up when required XP is attained", async () => {
		await gameInstance.mintPirate();
		const oneDay = 60*60*25;
		// Lvl 2 requires 1500 XP
		const questsRequired = 1500/250;
		for (i = 0;i<questsRequired;i++) {
			await gameInstance.doQuest(1);
			await timeMachine.advanceTimeAndBlock(oneDay);
		}
		await gameInstance.levelUp(1);
	});
});