// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FantomPiratesGold is ERC20 {

  constructor() ERC20("Fantom Pirates Gold", "gold") { }
  // constructor() {
  //   name = "Fantom Pirates Gold";
  //   symbol = "gold";
  // }
  
}
