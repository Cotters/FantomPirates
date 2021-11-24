import web3 from './web3';
import Game from './build/FantomPiratesGame.json';

export default new web3.eth.Contract(Game.abi,"0x7650e51da4ebffa7b85333c61e6e784fa89ec366");

