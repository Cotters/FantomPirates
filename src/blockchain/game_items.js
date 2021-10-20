import web3 from './web3';
import GameItems from './build/FantomPiratesGameItems.json';

const gameItems = new web3.eth.Contract(
    GameItems.abi,
    "0x0c81B1a6609F611D02882A4e162455b1C9F67A08"
);

export default gameItems;