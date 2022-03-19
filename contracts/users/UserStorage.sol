pragma solidity ^0.8.10;

import '../helpers/BaseStorage.sol';

contract UserStorage is BaseStorage{
    uint latestUserId = 0;

    mapping(uint => Profile) public profiles;
    mapping(address => uint) public addresses;
    mapping(string => uint) public usernames;

    struct Profile {
        uint id;
        string username; 
        string firstName;
        string lastName;
        string bio;
        string gravatarEmail;
    }


  function createUser(
    address _address,
    string memory _username,
    string memory _firstName,
    string memory _lastName,
    string memory _bio,
    string memory _gravatarEmail
  ) public onlyController returns(uint) {
    latestUserId++;  

    profiles[latestUserId] = Profile(
      latestUserId, 
      _username,
      _firstName,
      _lastName,
      _bio,
      _gravatarEmail
    );

    addresses[_address] = latestUserId;
    usernames[_username] = latestUserId;

    return latestUserId;
  }
}