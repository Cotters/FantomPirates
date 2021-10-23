// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract FantomPiratesShip is ERC721Enumerable {

  uint public next_ship_id;

  mapping(uint => uint) public quests_log;

  constructor() ERC721("Fantom Pirates Ship", "ship") { }
  
  function mintShip(address to, uint tokenId) external {
    _safeMint(to, tokenId);
  }
}
