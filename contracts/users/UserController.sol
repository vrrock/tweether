pragma solidity ^0.8.10;

import '../helpers/BaseController.sol';
import '../ContractManager.sol';
import './UserStorage.sol';

contract UserController is BaseController {
  function createUser(
    string memory _username, 
    string memory _firstName, 
    string memory _lastName,
    string memory _bio,
    string memory _gravatarEmail
  ) public returns(uint) {
    ContractManager _manager = ContractManager(managerAddr);

    address _userStorageAddr = _manager.getAddress("UserStorage");
    UserStorage _storage = UserStorage(_userStorageAddr); 

    require(_storage.addresses(msg.sender) == 0);
    require(_storage.usernames(_username) == 0);

    return _storage.createUser(
      msg.sender,
      _username, 
      _firstName, 
      _lastName, 
      _bio,
      _gravatarEmail
    );
  }
}































