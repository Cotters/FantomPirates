// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "./FantomPiratesShip.sol";
import "./FantomPiratesGold.sol";

// interface PiratesShip is IERC721Enumerable {
//   function _safeMint(address to, uint256 tokenId) external;  
// }

contract FantomPiratesGame is ERC721Enumerable {

  address public owner = msg.sender;

  uint public next_pirate_id = 1;
  uint public next_ship_id = 1;
  uint constant DAY = 1 days;
  
  mapping(uint => uint) public level;
  mapping(uint => uint) public xp;
  mapping(uint => uint) public quests_log; // To ensure questing once per day: quests_log[pirate_id] = block.timestamp + DAY
  mapping(uint => uint) public ship; // pirate_id => ship_id;

  FantomPiratesShip public _ships_contract;
  ERC20 public _gold_contract;

  event PirateCreated(address indexed owner, uint pirate_id);
  event ShipCreated(address indexed owner, uint ship_id);
  event Leveled(address indexed owner, uint level, uint id);
  
  constructor(address _ship_contract_address) ERC721("Fantom Pirates", "FP") {
    _ships_contract = FantomPiratesShip(_ship_contract_address);
  }

  function mintPirate() public payable {
    uint _pirate_id = next_pirate_id;
    require(balanceOf(msg.sender) < 10, "You can only own up to 10 pirates!");
    level[_pirate_id] = 1;
    ship[_pirate_id] = 0;
    _safeMint(msg.sender, _pirate_id);
    emit PirateCreated(msg.sender, _pirate_id);
    next_pirate_id++;
  }

  function mintShip(uint256 _pirate_id) public payable {
    uint _next_ship_id = next_ship_id;
    uint256 numberOfPiratesOwned = balanceOf(msg.sender);
    require(_pirate_id != 0 && numberOfPiratesOwned > 0, "You must own a pirate before you can own a ship!");
    require(ship[_pirate_id] == 0, "Your pirate can only captain one ship!");
    require(level[_pirate_id] > 1, "Your pirate must be at least level 2 in order to be a captain!");
    ship[_pirate_id] = _next_ship_id; // assign pirate a ship
    _ships_contract.mintShip(msg.sender, _next_ship_id);
    emit ShipCreated(msg.sender, _next_ship_id);
    next_ship_id++;
  }

  function doQuest(uint _pirate_id) public payable {
    level[_pirate_id] = 2;
    // quests_log[_pirate_id] = block.timestamp + DAY; // next available quest;
  }

  // function calculateQuestsCooldown(uint _pirate_id) public 
}
