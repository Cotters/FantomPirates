import web3 from './web3';
import Kings from './build/FantomPirateKings.json';

export default new web3.eth.Contract(Kings.abi, "0x2f36Ce56EAc27A7895fcbcf8c7EE26E5275f9A4e");

