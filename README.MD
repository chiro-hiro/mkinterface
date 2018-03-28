# MkInterface

Make interfaces of smart contracts

## Installation

```
npm install -g mkinsterface
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
    "entries": ["Ownable.json", "Pausable.json", "PausableToken.json", "ERC20.json", "ERC20Basic.json", "StandardToken.json"],
    "contract": "MyTokenInterface",
    "output": "./MyTokenInterface.sol"
}]
```
Build interface with `mkinterface`, result:
```javascript
pragma solidity ^0.4.18;

contract MyTokenInterface {
    //Events
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event Pause();
    event Unpause();
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event Transfer(address indexed from, address indexed to, uint256 value);
    //Public methods
    function owner() public constant returns (address);
    function transferOwnership(address newOwner) public;
    function paused() public constant returns (bool);
    function pause() public;
    function unpause() public;
    function totalSupply() public constant returns (uint256);
    function balanceOf(address _owner) public constant returns (uint256 balance);
    function allowance(address _owner, address _spender) public constant returns (uint256);
    function transfer(address _to, uint256 _value) public returns (bool);
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool);
    function approve(address _spender, uint256 _value) public returns (bool);
    function increaseApproval(address _spender, uint256 _addedValue) public returns (bool success);
    function decreaseApproval(address _spender, uint256 _subtractedValue) public returns (bool success);
}
```