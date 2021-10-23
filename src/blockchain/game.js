import web3 from './web3';
import Game from './build/FantomPiratesGame.json';

export default new web3.eth.Contract(Game.abi,"0xF2a5EB44a6BE3217C5Cc7Ec8e1708BEEf75433f2");

