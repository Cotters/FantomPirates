import web3 from './web3';
import Game from './build/FantomPiratesGame.json';

export default new web3.eth.Contract(Game.abi,"0x19b34323e56420fC1c6eC3B1A0a1EBAF1263974a");

