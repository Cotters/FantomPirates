import web3 from './web3';
import Game from './build/FantomPiratesGame.json';

const game = new web3.eth.Contract(
    Game.abi,
    "0xb18D1D909b1F93484AA65E5e9645f546BA4a8e24"
);

export default game;