const Ships = artifacts.require("FantomPiratesShip");
const Game = artifacts.require("FantomPiratesGame");
const truffleAssert = require('truffle-assertions');

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

	it("should reward gold to a pirate when questing", async () => {
		await gameInstance.mintPirate();
		await gameInstance.doQuest(1);
		assert.equal(100, await gameInstance.gold.call(1), "Pirate was not rewarded 100 gold for doing a quest.");
	});
});