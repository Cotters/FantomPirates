import Web3 from 'web3';
// const ganache = require("ganache-cli");
// const provider = new ethers.providers.Web3Provider(ganache.provider());

let web3Provider
let web3

if (typeof window !== 'undefined' && window.ethereum) {
  console.log("`window.ethereum` found!");
  try {
    window.ethereum.request({method:"eth_requestAccounts"});
    web3Provider = window.ethereum;
  } catch (error) {
    console.error("User denied account access.");
  }
} else {
  web3Provider = new Web3.providers.HttpProvider("https://localhost:7545");
}
web3 = new Web3(web3Provider);

export default web3;
