import web3 from './web3';
import Game from './build/FantomPiratesGame.json';

export default new web3.eth.Contract(Game.abi,"0xba103B9135631943a7cc9523D1877Cb5dEaD76fb");

