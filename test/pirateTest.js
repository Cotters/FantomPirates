const assert = require('assert');
const ganache = require('ganache-cli'); // ** creates 10 accounts
const provider = ganache.provider();
const Web3 = require('web3'); // Web3 constructor
const web3 = new Web3(provider); // web3 instance

const compiledPirate = require('../ethereum/build/Pirate.json');

let accounts;
let pirate;
let pirateAddress;