# MkInterface

A tool for lazy guys to update all interfaces of smart contracts at once.

## Installation

```
npm install -g mkinterface
```

This tool required `truffle`, make sure you've already got it.

```
npm install -g truffle
```

## Configuration

This version had supported `solidity compiler 0.5.0` and `truffle 5.0.0`. To esablishing new feature, we need you to create `mkinterface.json` in the root of your project.

**E.g**

```json
{
  "minVersion": "0.4.11",
  "maxVersion": "0.6.0",
  "supportSolc5": true
}
```

### Version configuration


`mkinterface` will find all `.sol` files, then update old style of `pragma` to the new one.

**E.g.**

|Configuration|Before|After|
|---|---|---|
|`{"minVersion": "0.4.11","maxVersion": "0.6.0"}`|`pragma solidity ^0.4.3;`|`pragma solidity >= 0.4.11 <= 0.6.0;`|
|`{"minVersion": "0.4.11", "supportSolc5": true}`|`pragma solidity ^0.4.3;`|`pragma solidity >= 0.4.11;`|
|`{"minVersion": "0.4.11", "supportSolc5": false}`|`pragma solidity ^0.4.3;`|`pragma solidity ^0.4.11;`|
|`{}`|`pragma solidity ^0.4.3;`|`pragma solidity ^0.4.3;`|

### Solc compatible

New version of `solc` have some changes, old version of contract's interface won't work properly.

**E.g.**

```js
function readProposal(uint256 _id) public view returns (bytes);
```

Result of `truffle compile all`

```
MyContractInterface.sol:13:65: TypeError: Data location must be "memory" for return parameter in function, but none was given.
    function readProposal(uint256 _id) public view returns (bytes);
                                                            ^---^
```

`supportSolc5: true` will change interface into:

```js
function readProposal(uint256 _id) public view returns (bytes memory);
```

Expected result:
```js
pragma solidity >= 0.4.24 <= 0.6.0;


contract MigrationsInterface {
  //Events
  
  //Public methods
  function last_completed_migration() public view returns (uint256);
  function owner() public view returns (address);
  function setCompleted(uint256  completed) public;
  function upgrade(address  new_address) public;
  function test(bytes memory  data, uint256[] memory  dis) public returns (string memory);
}
```

# License

This sofware distributed under [MIT License](https://github.com/chiro-hiro/mkinterface/blob/master/LICENSE)