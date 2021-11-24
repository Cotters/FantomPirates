import web3 from './web3';
import Kings from './build/FantomPirateKings.json';

export default new web3.eth.Contract(Kings.abi, "0xf4b627fa8f04f4ec8b77bbaa5d36ff59db4e9e0c");

