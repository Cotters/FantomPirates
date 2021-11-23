const Ships = artifacts.require("FantomPiratesShip");
const Game = artifacts.require("FantomPiratesGame");
const truffleAssert = require('truffle-assertions');

contract("Game - Misc", async accounts => {
	const myAccount = accounts[0];
	const otherAccount = accounts[1]
	let gameInstance;

	beforeEach(async () => {
		const shipsInstance = await Ships.new();
		gameInstance = await Game.new(shipsInstance.address);
	});

	it("should allow for donations", async () => {
		let donationAmount = 10**18;
		await gameInstance.donate(1, {value: donationAmount});
		assert.equal(await gameInstance.donations.call(), 1);
		let contractBalance = await web3.eth.getBalance(gameInstance.address);
		assert.equal(contractBalance, donationAmount);
	});

	it("should allow (only) owner to withdraw donations", async () => {
		let donationAmount = 10**18;
		await gameInstance.donate(1, {value: donationAmount});
		truffleAssert.reverts(gameInstance.withdrawAll({from: otherAccount}), "");
		
		await gameInstance.withdrawAll({from: myAccount});
		let contractBalance = await web3.eth.getBalance(gameInstance.address);
		assert.equal(contractBalance, 0);
	});	
});