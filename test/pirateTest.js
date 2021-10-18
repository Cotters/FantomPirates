const assert = require('assert');
const ganache = require('ganache-cli');
const provider = ganache.provider();
const Web3 = require('web3');
const web3 = new Web3(provider);

// const compiledPirate = require('../blockchain/build/Pirate.json');
const Pirate = artifacts.require('Pirate');

let accounts;
let pirate;
let pirateAddress;

beforeEach(async () => {
	accounts = await web3.eth.getAccounts();
})

contract('Pirate', accounts => {

	it('should create a level 1 Pirate with an ID when minting a new pirate', () => {
		Pirate.deployed().then(instance => {
			instance.mint({from: accounts[0]})
		});
	});

});