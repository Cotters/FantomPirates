import web3 from './web3';
import Kings from './build/FantomPirateKings.json';

export default new web3.eth.Contract(Kings.abi, "0xF4B627FA8f04F4Ec8B77BBaA5D36fF59dB4E9e0c");

