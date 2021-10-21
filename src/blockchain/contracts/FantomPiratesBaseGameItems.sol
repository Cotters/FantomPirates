// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract FantomPiratesBaseGameItems is ERC1155 {

  address public owner = msg.sender;

  uint256 public constant PIRATE = 0;
  uint256 public constant GOLD = 1;
  uint256 public constant SHIP = 2;
  uint256 public constant SWORD = 3;
  uint256 public constant SHIELD = 4;
  uint256 public constant PET = 5;
  uint256 public constant SHIP_PART = 6;

  // struct GameItem {
  //   uint256 uid;
  //   string name;
  // }

  // GameItem[] public gameItems;// 0 => GameItem(0, "Pirate") -- Then we can add new GameItems!!
  // mapping(address => GameItem[][]) balances;
  // balances[address][0]) => [GameItem(0, "Cpt. Jack Sparrow"), GameItem(0, "Barbossa")] // Pirates as GameItems.
  // balances[address][1]) => [GameItem(1, ...), GameItem(1, ...)] -- Index will match the uid of the GameItem as that's how they're stored.

  // Old Way?:
  // FrostySails(0x456) - get the Contract using address stored in the game contract:
  // users[0x456].gameItems() =? [...things] ??

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