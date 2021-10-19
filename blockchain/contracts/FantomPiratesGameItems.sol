// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract FantomPiratesGameItems is ERC1155 {

  address public owner = msg.sender;

  uint256 public constant PIRATE = 0;
  uint256 public constant GOLD = 1;
  uint256 public constant SHIP = 2;
  uint256 public constant SWORD = 3;
  uint256 public constant SHIELD = 4;
  uint256 public constant PET = 5;
  uint256 public constant SHIP_PART = 6;

  constructor() ERC1155("") {
		_mint(msg.sender, PIRATE, 10**12, "");
		_mint(msg.sender, GOLD, 10**24, "");
    _mint(msg.sender, SHIP, 10**18, "");
    _mint(msg.sender, SWORD, 10**18, "");
    _mint(msg.sender, SHIELD, 10**18, "");
    _mint(msg.sender, PET, 10**18, "");
    _mint(msg.sender, SHIP_PART, 10**27, "");
  }
}
