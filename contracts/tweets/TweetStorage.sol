pragma solidity ^0.8.10;

import '../helpers/BaseStorage.sol';

contract TweetStorage is BaseStorage{
  mapping(uint => Tweet) public tweets;
  mapping (uint => uint[]) public userTweetIds;
  
  struct Tweet {
    uint id;
    string text;
    uint userId;
    uint postedAt;
  }

  uint latestTweetId = 0;

  function createTweet(uint _userId, string memory _text) public onlyController returns(uint) {
    latestTweetId++;

    tweets[latestTweetId] = Tweet(latestTweetId, _text, _userId, block.timestamp);
    userTweetIds[_userId].push(latestTweetId);

    return latestTweetId;
  }

  function getTweetIdsFromUser(uint _userId) view public returns(uint[] memory) {
    return userTweetIds[_userId];
  }

}