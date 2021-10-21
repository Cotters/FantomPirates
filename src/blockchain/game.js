import web3 from './web3';
import Game from './build/FantomPiratesGame.json';

export default new web3.eth.Contract(Game.abi,"0xC7D672C2771BeCecad713fFdc0c20a7D49345834");

