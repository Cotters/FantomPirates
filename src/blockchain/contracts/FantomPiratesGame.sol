// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "./FantomPiratesShip.sol";
import "./FantomPiratesGold.sol";

contract FantomPiratesGame is ERC721Enumerable {

  address public owner = msg.sender;

  uint public next_pirate_id = 1;
  uint public next_ship_id = 1;
  uint public next_pet_id = 1;

  uint constant DAY = 1 days;

  uint constant xp_per_quest = 250;
  uint constant gold_per_quest = 100;

  uint constant gold_for_ship = 1500;
  uint constant gold_for_pet = 3000;
  
  mapping(uint => uint) public level;
  mapping(uint => uint) public xp;
  mapping(uint => uint) public quests_log;
  mapping(uint => uint) public ship;  // pirate_id => ship_id;
  mapping(uint => uint) public gold;
  mapping(uint => uint) public pet;   // pirate_id => pet_id;

  FantomPiratesShip public _ships_contract;
  ERC20 public _gold_contract;

  event PirateCreated(address indexed owner, uint pirate_id);
  event ShipCreated(address indexed owner, uint ship_id);
  event Leveled(address indexed owner, uint id, uint level);
  
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
    require(gold[_pirate_id] >= gold_for_ship, "Your pirate does not hold enough gold to be buy a ship!");
    _ships_contract.mintShip(msg.sender, _next_ship_id);
    next_ship_id++;
    gold[_pirate_id] -= gold_for_ship;
    ship[_pirate_id] = _next_ship_id;
    emit ShipCreated(msg.sender, _next_ship_id);
  }

  function mintPet(uint256 _pirate_id) public payable {
    uint _next_pet_id = next_pet_id;
    uint256 numberOfPiratesOwned = balanceOf(msg.sender);
    require(_pirate_id != 0 && numberOfPiratesOwned > 0, "You must own a pirate before you can own a pet!");
    require(pet[_pirate_id] == 0, "Your pirate can only own one pet!");
    require(gold[_pirate_id] >= gold_for_pet, "Your pirate does not hold enough gold to be buy a ship!");
    next_pet_id++;
    gold[_pirate_id] -= gold_for_pet;
    ship[_pirate_id] = _next_pet_id;
  }

  function doQuest(uint _pirate_id) public payable {
    require(block.timestamp > quests_log[_pirate_id], "You must wait a day before your next quest!");
    quests_log[_pirate_id] = block.timestamp + DAY;
    xp[_pirate_id] += xp_per_quest;
    gold[_pirate_id] += gold_per_quest;
  }

  function levelUp(uint _pirate_id) public payable {
    require(_isApprovedOrOwner(msg.sender, _pirate_id), "You must own this pirate in order to level it up!");
    uint _pirate_level = level[_pirate_id];
    uint required_xp = requiredXpForLevel(_pirate_level + 1);
    require(xp[_pirate_id] >= required_xp, "You do not have the required XP to level up this pirate.");
    xp[_pirate_id] -= required_xp;
    level[_pirate_id] = _pirate_level + 1;
    emit Leveled(msg.sender, _pirate_id, _pirate_level);
  }

  function requiredXpForLevel(uint _pirate_level) public pure returns (uint required_xp) {
    uint _required_xp = 1000;
    for (uint i = 2; i<=_pirate_level;i++) {
      _required_xp += (i * xp_per_quest);
    }
    return _required_xp;
  }
}
