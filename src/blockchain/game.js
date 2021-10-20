import web3 from './web3';
import Game from './build/FantomPiratesGame.json';

const game = new web3.eth.Contract(
    Game.abi,
    "0xED2703bdF6f601473215ba8ebbeB797acb72dD5C"
);

export default game;