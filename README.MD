# MkInterface

Make smart contract interfaces

## Installation

```
npm install -g mkinterface
```

## Require truffle

```
npm install -g truffle
```

## Usage

Write your own configuration (`mkiconf.json`), at root of truffle project:
```javascript
[{
    "solv": "^0.4.18",
    "path": "./build/contracts",
    "entry": "PausableToken.json",
    "contract": "PausableTokenInterface",
    "output": "./PausableTokenInterface.sol"
},{
    "solv": "^0.4.18",
    "path": "./build/contracts",
    "entry": "Crowdsale.json",
    "contract": "CrowdsaleInterface",
    "output": "./CrowdsaleInterface.sol"
}]
```
The first, you need compile smart contracts by execute `truffle compile`, then
execute `mkinterface` at the root directory then you will get result:

`MyTokenInterface.sol`
```javascript
pragma solidity ^0.4.18;

contract PausableTokenInterface {
    //Events
    event Pause();
    event Unpause();
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event Transfer(address indexed from, address indexed to, uint256 value);
    //Public methods
    function totalSupply() public constant returns (uint256);
    function unpause() public;
    function paused() public constant returns (bool);
    function balanceOf(address _owner) public constant returns (uint256 balance);
    function pause() public;
    function owner() public constant returns (address);
    function allowance(address _owner, address _spender) public constant returns (uint256);
    function transferOwnership(address newOwner) public;
    function transfer(address _to, uint256 _value) public returns (bool);
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool);
    function approve(address _spender, uint256 _value) public returns (bool);
    function increaseApproval(address _spender, uint256 _addedValue) public returns (bool success);
    function decreaseApproval(address _spender, uint256 _subtractedValue) public returns (bool success);
}
```

`CrowdsaleInterface.sol`
```javascript
pragma solidity ^0.4.18;

contract CrowdsaleInterface {
    //Events
    event TokenPurchase(address indexed purchaser, address indexed beneficiary, uint256 value, uint256 amount);
    //Public methods
    function rate() public constant returns (uint256);
    function weiRaised() public constant returns (uint256);
    function wallet() public constant returns (address);
    function token() public constant returns (address);
    function buyTokens(address _beneficiary) public payable;
}
```
# License

This sofware distributed under [MIT License](https://github.com/chiro-hiro/mkinterface/blob/master/LICENSE)