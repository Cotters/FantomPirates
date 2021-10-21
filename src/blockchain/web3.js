import Web3 from 'web3';

let web3Provider
let web3

if (typeof window !== 'undefined' && window.ethereum) {
  try {
    window.ethereum.request({method:"eth_requestAccounts"});
    web3Provider = window.ethereum;
  } catch (error) {
    console.error("User denied account access.");
    exit();
  }
} else {
  web3Provider = new Web3.providers.HttpProvider("https://localhost:7545");
}

export default new Web3(web3Provider);
