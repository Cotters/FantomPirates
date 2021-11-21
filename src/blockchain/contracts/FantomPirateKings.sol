// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FantomPirateKings {

  event NewKing(King _king, uint256 _newPrice);

  address payable public owner = payable(msg.sender);

  string public kingdomName = "Fantom Pirate Kings";

  uint256 public startPriceToBeKing = 0.01 ether; // 0.01 Fantom
  uint256 public currentPriceToBeKing = startPriceToBeKing;
  uint256 public cursePeriodInDays = 14;

  struct King {
    address payable wallet;
    string name;
    uint coronationTimestamp;
    uint pricePaidInWei;
  }

  King[] public kings;

  modifier onlyOwner() {
    require(isSenderOwner(), "This is restricted to the contract's owner!");
    _;
  }

  modifier onlyKing() {
    require(msg.sender == getCurrentKing().wallet, "This is restricted to the current king!");
    _;
  }

  modifier notKing() {
    require(msg.sender != getCurrentKing().wallet, "The current King cannot become the King again!");
    _; 
  }

  modifier validName(string calldata _name) {
    require(bytes(_name).length > 0, "Invalid name for King!");
    require(!isNameTaken(_name), "Name for King is already taken!");
    _; 
  }

  constructor() {
    kings.push(King(payable(0x0), "", 0, 0));
  }

  function becomeKing(string calldata _name) public payable notKing validName(_name) {
    checkOnCurrentKingCurse();
    require(msg.value >= currentPriceToBeKing, "You need to pay at least the current price to become King!");
    King memory prevKing = getCurrentKing();
    kings.push(King(payable(msg.sender), _name, block.timestamp, msg.value));
    increasePrice(msg.value);
    
    uint contractCommission = msg.value / 20; // 5% commission
    uint prevKingCompensation = msg.value - contractCommission;
    compensatePreviousKing(prevKing, prevKingCompensation);

    emit NewKing(getCurrentKing(), currentPriceToBeKing);
  }

  function checkOnCurrentKingCurse() private {
    if (hasKingSuccumbToCurse(getCurrentKing()))
      currentPriceToBeKing = startPriceToBeKing;
  }

  function compensatePreviousKing(King memory prevKing, uint256 amount) private {
    if (prevKing.wallet != address(0x0) && !hasKingSuccumbToCurse(prevKing))
      prevKing.wallet.transfer(amount);
  }

  function increasePrice(uint256 _msgValue) private {
    uint256 priceIncrease = _msgValue / 3;
    currentPriceToBeKing = _msgValue + priceIncrease;
  }

  function isSenderOwner() public view returns (bool) {
    return msg.sender == owner;
  }

  function getAllKings() public view returns (King[] memory _kings) {
    return kings;
  }

  function getCurrentKing() private view returns (King memory _king) {
    return kings[kings.length-1];
  }

  function getCurrentKingName() public view returns (string memory) {
    return getCurrentKing().name;
  }

  function getNameForAddress() public view returns (string memory) {
    for (uint i = 0;i<kings.length;i++) {
      if (kings[i].wallet == msg.sender) {
        return kings[i].name;
      }
    }
    return "";
  }

  function isNameTaken(string memory _name) private view returns (bool) {
    for (uint i = 0;i<kings.length;i++) {
      if (doStringsMatch(kings[i].name, _name)) {
        return msg.sender != kings[i].wallet;
      }
    }
    return false;
  }

  function doStringsMatch(string memory a, string memory b) public pure returns (bool) {
    return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
  }

  function getNumberOfKings() public view returns (uint) {
    return kings.length;
  }

  function hasKingSuccumbToCurse(King memory _king) private view returns (bool) {
    return _king.coronationTimestamp <= (block.timestamp - 14 days);
  }

  function changeStartPrice(uint256 _newPrice) public onlyOwner {
    if (_newPrice >= 0.01 ether) {
      startPriceToBeKing = _newPrice;
    }
  }

  function changeCursePeriod(uint256 _newPeriod) public onlyOwner {
    cursePeriodInDays = _newPeriod;
  }
  
  function changeOwner(address payable _newOwner) public onlyOwner {
    owner = _newOwner;
  }

  function withdraw() public onlyOwner {
    owner.transfer(address(this).balance);
  }

  fallback() external payable {}

  receive() external payable {}

}
