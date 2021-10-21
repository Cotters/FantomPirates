import web3 from './web3';
import GameItems from './build/FantomPiratesGameItems.json';

const gameItems = new web3.eth.Contract(
    GameItems.abi,
    "0x2B438c8cD3013B6eC1767C50Ed2cD3d5dFd250e0"
);

export default gameItems;