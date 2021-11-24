import web3 from './web3';
import Game from './build/FantomPiratesGame.json';

export default new web3.eth.Contract(Game.abi,"0x7650E51DA4ebFFA7B85333C61E6e784Fa89eC366");

