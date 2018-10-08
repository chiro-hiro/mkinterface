# MkInterface

A lazy tool for laziers to update all smart contracts's interfaces

## Installation

```
npm install -g mkinterface
```

## Install truffle

```
npm install -g truffle
```

## Usage

The first, you need compile all smart contracts by execute `truffle compile`, then
execute `mkinterface` at the root of project's directory then you will get result:

`./contracts/interfaces/PausableInterface.sol`
```javascript
pragma solidity ^0.4.24;

contract PausableInterface {
    //Events
    event Pause();
    event Unpause();
    event OwnershipRenounced(address indexed previousOwner);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    //Public methods
    function paused() public view returns (bool);
    function renounceOwnership() public;
    function owner() public view returns (address);
    function transferOwnership(address _newOwner) public;
    function pause() public;
    function unpause() public;
}
```

`mkinterface` will detect all smart contracts then create interface for complied contracts.

This is result with `Openzeppline-Solidity`:
```
[chiro@Luna interfaces]$ ls /home/chiro/Projects/openzeppelin-solidity/contracts/interfaces/ -l
total 460
-rw-r--r-- 1 chiro chiro  167 Oct  8 17:08 AddressImplInterface.sol
-rw-r--r-- 1 chiro chiro   99 Oct  8 17:08 AddressInterface.sol
-rw-r--r-- 1 chiro chiro  610 Oct  8 17:08 AllowanceCrowdsaleImplInterface.sol
-rw-r--r-- 1 chiro chiro  606 Oct  8 17:08 AllowanceCrowdsaleInterface.sol
-rw-r--r-- 1 chiro chiro  801 Oct  8 17:08 BreakInvariantBountyInterface.sol
-rw-r--r-- 1 chiro chiro  591 Oct  8 17:08 CappedCrowdsaleImplInterface.sol
-rw-r--r-- 1 chiro chiro  587 Oct  8 17:08 CappedCrowdsaleInterface.sol
-rw-r--r-- 1 chiro chiro  343 Oct  8 17:08 CapperRoleInterface.sol
-rw-r--r-- 1 chiro chiro  441 Oct  8 17:08 CapperRoleMockInterface.sol
-rw-r--r-- 1 chiro chiro  576 Oct  8 17:08 ConditionalEscrowInterface.sol
-rw-r--r-- 1 chiro chiro  641 Oct  8 17:08 ConditionalEscrowMockInterface.sol
-rw-r--r-- 1 chiro chiro  209 Oct  8 17:08 CounterImplInterface.sol
-rw-r--r-- 1 chiro chiro   99 Oct  8 17:08 CounterInterface.sol
-rw-r--r-- 1 chiro chiro  477 Oct  8 17:08 CrowdsaleInterface.sol
-rw-r--r-- 1 chiro chiro   97 Oct  8 17:08 ECDSAInterface.sol
-rw-r--r-- 1 chiro chiro  260 Oct  8 17:08 ECDSAMockInterface.sol
-rw-r--r-- 1 chiro chiro  105 Oct  8 17:08 ERC165CheckerInterface.sol
-rw-r--r-- 1 chiro chiro  373 Oct  8 17:08 ERC165CheckerMockInterface.sol
-rw-r--r-- 1 chiro chiro  172 Oct  8 17:08 ERC165Interface.sol
-rw-r--r-- 1 chiro chiro  235 Oct  8 17:08 ERC165MockInterface.sol
-rw-r--r-- 1 chiro chiro  110 Oct  8 17:08 ERC165NotSupportedInterface.sol
-rw-r--r-- 1 chiro chiro  993 Oct  8 17:08 ERC20BurnableInterface.sol
-rw-r--r-- 1 chiro chiro  997 Oct  8 17:08 ERC20BurnableMockInterface.sol
-rw-r--r-- 1 chiro chiro 1401 Oct  8 17:08 ERC20CappedInterface.sol
-rw-r--r-- 1 chiro chiro  859 Oct  8 17:08 ERC20DetailedInterface.sol
-rw-r--r-- 1 chiro chiro 1052 Oct  8 17:08 ERC20DetailedMockInterface.sol
-rw-r--r-- 1 chiro chiro  662 Oct  8 17:08 ERC20FailingMockInterface.sol
-rw-r--r-- 1 chiro chiro  885 Oct  8 17:08 ERC20Interface.sol
-rw-r--r-- 1 chiro chiro  378 Oct  8 17:08 ERC20MigratorInterface.sol
-rw-r--r-- 1 chiro chiro 1353 Oct  8 17:08 ERC20MintableInterface.sol
-rw-r--r-- 1 chiro chiro 1451 Oct  8 17:08 ERC20MintableMockInterface.sol
-rw-r--r-- 1 chiro chiro 1070 Oct  8 17:08 ERC20MockInterface.sol
-rw-r--r-- 1 chiro chiro 1312 Oct  8 17:08 ERC20PausableInterface.sol
-rw-r--r-- 1 chiro chiro 1410 Oct  8 17:08 ERC20PausableMockInterface.sol
-rw-r--r-- 1 chiro chiro  665 Oct  8 17:08 ERC20SucceedingMockInterface.sol
-rw-r--r-- 1 chiro chiro  763 Oct  8 17:08 ERC20TokenMetadataInterface.sol
-rw-r--r-- 1 chiro chiro  762 Oct  8 17:08 ERC20WithMetadataInterface.sol
-rw-r--r-- 1 chiro chiro  955 Oct  8 17:08 ERC20WithMetadataMockInterface.sol
-rw-r--r-- 1 chiro chiro 1073 Oct  8 17:08 ERC721BurnableInterface.sol
-rw-r--r-- 1 chiro chiro 1256 Oct  8 17:08 ERC721EnumerableInterface.sol
-rw-r--r-- 1 chiro chiro 1421 Oct  8 17:08 ERC721FullInterface.sol
-rw-r--r-- 1 chiro chiro 2223 Oct  8 17:08 ERC721FullMockInterface.sol
-rw-r--r-- 1 chiro chiro  192 Oct  8 17:08 ERC721HolderInterface.sol
-rw-r--r-- 1 chiro chiro 1022 Oct  8 17:08 ERC721Interface.sol
-rw-r--r-- 1 chiro chiro 1201 Oct  8 17:08 ERC721MetadataInterface.sol
-rw-r--r-- 1 chiro chiro 2040 Oct  8 17:08 ERC721MintableBurnableImplInterface.sol
-rw-r--r-- 1 chiro chiro 1985 Oct  8 17:08 ERC721MintableInterface.sol
-rw-r--r-- 1 chiro chiro 1124 Oct  8 17:08 ERC721MockInterface.sol
-rw-r--r-- 1 chiro chiro 1433 Oct  8 17:08 ERC721PausableInterface.sol
-rw-r--r-- 1 chiro chiro 1694 Oct  8 17:08 ERC721PausableMockInterface.sol
-rw-r--r-- 1 chiro chiro  310 Oct  8 17:08 ERC721ReceiverMockInterface.sol
-rw-r--r-- 1 chiro chiro  491 Oct  8 17:08 EscrowInterface.sol
-rw-r--r-- 1 chiro chiro  828 Oct  8 17:08 FinalizableCrowdsaleImplInterface.sol
-rw-r--r-- 1 chiro chiro  824 Oct  8 17:08 FinalizableCrowdsaleInterface.sol
-rw-r--r-- 1 chiro chiro  152 Oct  8 17:08 ForceEtherInterface.sol
-rw-r--r-- 1 chiro chiro  173 Oct  8 17:08 IERC165Interface.sol
-rw-r--r-- 1 chiro chiro  697 Oct  8 17:08 IERC20Interface.sol
-rw-r--r-- 1 chiro chiro 1295 Oct  8 17:08 IERC721EnumerableInterface.sol
-rw-r--r-- 1 chiro chiro 1460 Oct  8 17:08 IERC721FullInterface.sol
-rw-r--r-- 1 chiro chiro 1053 Oct  8 17:08 IERC721Interface.sol
-rw-r--r-- 1 chiro chiro 1232 Oct  8 17:08 IERC721MetadataInterface.sol
-rw-r--r-- 1 chiro chiro  218 Oct  8 17:08 IERC721ReceiverInterface.sol
-rw-r--r-- 1 chiro chiro  890 Oct  8 17:08 IncreasingPriceCrowdsaleImplInterface.sol
-rw-r--r-- 1 chiro chiro  886 Oct  8 17:08 IncreasingPriceCrowdsaleInterface.sol
-rw-r--r-- 1 chiro chiro 1059 Oct  8 17:08 IndividuallyCappedCrowdsaleImplInterface.sol
-rw-r--r-- 1 chiro chiro  961 Oct  8 17:08 IndividuallyCappedCrowdsaleInterface.sol
-rw-r--r-- 1 chiro chiro  810 Oct  8 17:08 InsecureInvariantTargetBountyInterface.sol
-rw-r--r-- 1 chiro chiro  167 Oct  8 17:08 InsecureInvariantTargetMockInterface.sol
-rw-r--r-- 1 chiro chiro   96 Oct  8 17:08 MathInterface.sol
-rw-r--r-- 1 chiro chiro  309 Oct  8 17:08 MathMockInterface.sol
-rw-r--r-- 1 chiro chiro  103 Oct  8 17:08 MerkleProofInterface.sol
-rw-r--r-- 1 chiro chiro  198 Oct  8 17:08 MerkleProofWrapperInterface.sol
-rw-r--r-- 1 chiro chiro  521 Oct  8 17:08 MessageHelperInterface.sol
-rw-r--r-- 1 chiro chiro  487 Oct  8 17:08 MintedCrowdsaleImplInterface.sol
-rw-r--r-- 1 chiro chiro  483 Oct  8 17:08 MintedCrowdsaleInterface.sol
-rw-r--r-- 1 chiro chiro  343 Oct  8 17:08 MinterRoleInterface.sol
-rw-r--r-- 1 chiro chiro  441 Oct  8 17:08 MinterRoleMockInterface.sol
-rw-r--r-- 1 chiro chiro  440 Oct  8 17:08 OwnableInterface.sol
-rw-r--r-- 1 chiro chiro  493 Oct  8 17:08 PausableInterface.sol
-rw-r--r-- 1 chiro chiro  781 Oct  8 17:08 PausableMockInterface.sol
-rw-r--r-- 1 chiro chiro  343 Oct  8 17:08 PauserRoleInterface.sol
-rw-r--r-- 1 chiro chiro  441 Oct  8 17:08 PauserRoleMockInterface.sol
-rw-r--r-- 1 chiro chiro  840 Oct  8 17:08 PostDeliveryCrowdsaleImplInterface.sol
-rw-r--r-- 1 chiro chiro  836 Oct  8 17:08 PostDeliveryCrowdsaleInterface.sol
-rw-r--r-- 1 chiro chiro  218 Oct  8 17:08 PullPaymentInterface.sol
-rw-r--r-- 1 chiro chiro  286 Oct  8 17:08 PullPaymentMockInterface.sol
-rw-r--r-- 1 chiro chiro  148 Oct  8 17:08 ReentrancyAttackInterface.sol
-rw-r--r-- 1 chiro chiro  107 Oct  8 17:08 ReentrancyGuardInterface.sol
-rw-r--r-- 1 chiro chiro  342 Oct  8 17:08 ReentrancyMockInterface.sol
-rw-r--r-- 1 chiro chiro  987 Oct  8 17:08 RefundableCrowdsaleImplInterface.sol
-rw-r--r-- 1 chiro chiro  983 Oct  8 17:08 RefundableCrowdsaleInterface.sol
-rw-r--r-- 1 chiro chiro  839 Oct  8 17:08 RefundEscrowInterface.sol
-rw-r--r-- 1 chiro chiro   97 Oct  8 17:08 RolesInterface.sol
-rw-r--r-- 1 chiro chiro  245 Oct  8 17:08 RolesMockInterface.sol
-rw-r--r-- 1 chiro chiro  363 Oct  8 17:08 SafeERC20HelperInterface.sol
-rw-r--r-- 1 chiro chiro  101 Oct  8 17:08 SafeERC20Interface.sol
-rw-r--r-- 1 chiro chiro  100 Oct  8 17:08 SafeMathInterface.sol
-rw-r--r-- 1 chiro chiro  449 Oct  8 17:08 SafeMathMockInterface.sol
-rw-r--r-- 1 chiro chiro 1083 Oct  8 17:08 SampleCrowdsaleInterface.sol
-rw-r--r-- 1 chiro chiro 1515 Oct  8 17:08 SampleCrowdsaleTokenInterface.sol
-rw-r--r-- 1 chiro chiro  206 Oct  8 17:08 SecondaryInterface.sol
-rw-r--r-- 1 chiro chiro  254 Oct  8 17:08 SecondaryMockInterface.sol
-rw-r--r-- 1 chiro chiro  808 Oct  8 17:08 SecureInvariantTargetBountyInterface.sol
-rw-r--r-- 1 chiro chiro  165 Oct  8 17:08 SecureInvariantTargetMockInterface.sol
-rw-r--r-- 1 chiro chiro  349 Oct  8 17:08 SignatureBouncerInterface.sol
-rw-r--r-- 1 chiro chiro 1039 Oct  8 17:08 SignatureBouncerMockInterface.sol
-rw-r--r-- 1 chiro chiro  343 Oct  8 17:08 SignerRoleInterface.sol
-rw-r--r-- 1 chiro chiro  441 Oct  8 17:08 SignerRoleMockInterface.sol
-rw-r--r-- 1 chiro chiro 1107 Oct  8 17:08 SimpleTokenInterface.sol
-rw-r--r-- 1 chiro chiro  466 Oct  8 17:08 SplitPaymentInterface.sol
-rw-r--r-- 1 chiro chiro  146 Oct  8 17:08 TargetInterface.sol
-rw-r--r-- 1 chiro chiro  705 Oct  8 17:08 TimedCrowdsaleImplInterface.sol
-rw-r--r-- 1 chiro chiro  701 Oct  8 17:08 TimedCrowdsaleInterface.sol
-rw-r--r-- 1 chiro chiro  299 Oct  8 17:08 TokenTimelockInterface.sol
-rw-r--r-- 1 chiro chiro 1139 Oct  8 17:08 TokenVestingInterface.sol
[chiro@Luna interfaces]$ 

```



# License

This sofware distributed under [MIT License](https://github.com/chiro-hiro/mkinterface/blob/master/LICENSE)