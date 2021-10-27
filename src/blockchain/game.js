import web3 from './web3';
import Game from './build/FantomPiratesGame.json';

export default new web3.eth.Contract(Game.abi,"0x4D8Ff62C991ADF612c9252dB80b2A52400Ccc4EF");

