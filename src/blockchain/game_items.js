import web3 from './web3';
import GameItems from './build/FantomPiratesGameItems.json';

export default new web3.eth.Contract(GameItems.abi, "0x55f650d295fB26f29e1991161Ea0CB3361D95029");