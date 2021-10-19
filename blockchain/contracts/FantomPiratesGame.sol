// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "./FantomPiratesGameItems.sol";

contract FantomPiratesGame is ERC1155Holder {

  address public owner = msg.sender;
  FantomPiratesGameItems public gameItems;

  constructor(address _gameItemsAddress) {
    gameItems = FantomPiratesGameItems(_gameItemsAddress);
  }

  function mintPirate() public payable {
    uint256 _pirateId = gameItems.PIRATE();
    require(gameItems.balanceOf(msg.sender, _pirateId) <= 10, "You can only have up to 10 pirates!");
    gameItems.safeTransferFrom(
        owner,
        msg.sender,
        _pirateId,
        1,
        ""
    );
  }

  function mintShip() internal payable {
    
  }
}
