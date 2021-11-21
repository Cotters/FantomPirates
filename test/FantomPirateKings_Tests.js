const Kings = artifacts.require("FantomPirateKings");

const truffleAssert = require('truffle-assertions');
const truffleEvent = require('truffle-events');
const timeMachine = require('ganache-time-traveler');

contract("Hall of Pirate Kings", async accounts => {
	const myAccount = accounts[0];
	const otherAccount = accounts[1]
	let kingsInstance;

	beforeEach(async () => {
		kingsInstance = await Kings.new();
	});

	it("should have my account as owner of the contract", async () => {
		const owner = await kingsInstance.owner.call();
		assert.equal(owner, myAccount);
	});

	it("should start with new king with 0x0 wallet and no info", async () => {
		let kingsTx = await kingsInstance.kings.call(0);
		assert.equal(kingsTx.wallet, '0x0000000000000000000000000000000000000000');
		assert.equal(kingsTx.name, "");
		assert.equal(kingsTx.coronationTimestamp, 0);
		assert.equal(kingsTx.pricePaidInWei, 0);
	});

	it("should allow me to become king", async () => {
		let startPrice = await kingsInstance.startPriceToBeKing.call();
		let name = "Cotters";
		let kingsTx = await kingsInstance.becomeKing(name, { value: startPrice });
		truffleAssert.eventEmitted(kingsTx, 'NewKing');
		let kings = await kingsInstance.kings.call(1);
		assert.equal(kings.wallet, myAccount);
		assert.equal(kings.name, name);
	});

	it("should not allow current king to become king", async () => {
		let startPrice = await kingsInstance.startPriceToBeKing.call();
		let kingsTx = await kingsInstance.becomeKing("name", { value: startPrice });
		truffleAssert.reverts(kingsInstance.becomeKing("name", { value: startPrice }), "The current King cannot become the King again!");
	});

	it("should allow someone else to usurp current king", async () => {
		let startPrice = await kingsInstance.startPriceToBeKing.call();
		let kingsTx = await kingsInstance.becomeKing("Cotters", { value: startPrice });
		truffleAssert.eventEmitted(kingsTx, 'NewKing');
		let currentPrice = await kingsInstance.currentPriceToBeKing.call();
		let otherKingsTx = await kingsInstance.becomeKing("DPR", { value: currentPrice, from: otherAccount });
		truffleAssert.eventEmitted(otherKingsTx, 'NewKing');
	});

	it("should allow anyone to get the correct current kings name", async () => {
		let startPrice = await kingsInstance.startPriceToBeKing.call();
		let kingsTx = await kingsInstance.becomeKing("DPR", { value: startPrice, from: otherAccount });
		let currentPrice = await kingsInstance.currentPriceToBeKing.call();
		let otherKingsTx = await kingsInstance.becomeKing("Cotters", { value: currentPrice });
		assert.equal(await kingsInstance.getCurrentKingName.call(), "Cotters");
	});

	it("should allow sender to retrieve their name (based on sender address)", async () => {
		let startPrice = await kingsInstance.startPriceToBeKing.call();
		let kingsTx = await kingsInstance.becomeKing("Cotters", { value: startPrice });
		let currentPrice = await kingsInstance.currentPriceToBeKing.call();
		let otherKingsTx = await kingsInstance.becomeKing("DPR", { value: currentPrice, from: otherAccount });
		assert.equal(await kingsInstance.getNameForAddress.call(), "Cotters");
	});

	it("should not allow duplicate king names", async () => {
		let startPrice = await kingsInstance.startPriceToBeKing.call();
		let kingsTx = await kingsInstance.becomeKing("DPR", { value: startPrice });
		truffleAssert.reverts(kingsInstance.becomeKing("DPR", { value: startPrice, from: otherAccount }), "Name for King is already taken!");
	});

	it("should return the correct number of kings", async () => {
		let startPrice = await kingsInstance.startPriceToBeKing.call();
		let kingsTx = await kingsInstance.becomeKing("Cotters", { value: startPrice });
		let currentPrice = await kingsInstance.currentPriceToBeKing.call();
		let otherKingsTx = await kingsInstance.becomeKing("DPR", { value: currentPrice, from: otherAccount });
		assert.equal(await kingsInstance.getNumberOfKings.call(), 3);
	});

	it("should allow (only) owner to change start price", async () => {
		truffleAssert.reverts(kingsInstance.changeStartPrice(1, { from: otherAccount }), "This is restricted to the contract's owner!");
		let price = await kingsInstance.startPriceToBeKing.call();
		let newPriceHex = '0x470DE4DF820000';
		await kingsInstance.changeStartPrice(web3.utils.toBN(newPriceHex));
		let changedPrice = await kingsInstance.startPriceToBeKing.call();
		assert.equal(web3.utils.hexToNumberString(web3.utils.toHex(changedPrice)), web3.utils.hexToNumberString(newPriceHex));
	});

	it("should allow (only) owner to change curse period", async () => {
		truffleAssert.reverts(kingsInstance.changeCursePeriod(1, { from: otherAccount }), "This is restricted to the contract's owner!");
		let cursePeriodInDays = await kingsInstance.cursePeriodInDays.call();
		let newPeriodHex = '0xf';
		await kingsInstance.changeCursePeriod(web3.utils.toBN(newPeriodHex));
		let changedPeriod = await kingsInstance.cursePeriodInDays.call();
		assert.equal(web3.utils.hexToNumberString(web3.utils.toHex(changedPeriod)), web3.utils.hexToNumberString(newPeriodHex));
	});

	it("should allow (only) owner to change owner", async () => {
		truffleAssert.reverts(kingsInstance.changeOwner(otherAccount, { from: otherAccount }), "This is restricted to the contract's owner!");
		await kingsInstance.changeOwner(otherAccount)
		const owner = await kingsInstance.owner.call();
		assert.equal(owner, otherAccount);
	});

	it("should know when the sender is the owner of the contract", async () => {
		var isOwner = await kingsInstance.isSenderOwner.call({from: otherAccount});
		assert.equal(false, isOwner);
		isOwner = await kingsInstance.isSenderOwner.call({from: myAccount});
		assert.equal(true, isOwner);
	});
});

