import web3 from './web3';
import Game from './build/FantomPiratesGame.json';

export default new web3.eth.Contract(Game.abi,"0xFAe3350a4b44a123f4834B1ffB19f9D3c45655D4");

