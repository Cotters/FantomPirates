// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Pirate is ERC721 {
  address public owner = msg.sender;

  constructor() ERC721("FantomPirate", "PRT") {}


  modifier restricted() {
    require(
      msg.sender == owner,
      "This function is restricted to the contract's owner"
    );
    _;
  }

  function mint() public {

  }
  
}
