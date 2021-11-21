import web3 from './web3';
import Kings from './build/FantomPirateKings.json';

export default new web3.eth.Contract(Kings.abi, "0x3CbeAdb48e0486396c3b3803FcEE2b6108f17C45");

