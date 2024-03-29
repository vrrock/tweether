const UserController = artifacts.require("UserController")

const TweetStorage = artifacts.require('TweetStorage')
const TweetController = artifacts.require('TweetController')

const utils = require('../utils');
const { assertVMException } = utils;

contract('tweets', () => {

/*   it("can get tweet", async () => {
    const storage = await TweetStorage.deployed()

    const tweet = await storage.tweets.call(1) 
    const { id, text, userId } = tweet 

    assert.equal(parseInt(id), 1)
    assert.equal(text, "Hello world!")
    assert.equal(parseInt(userId), 1)
  }) */
  before(async () => {
    const userCtrl = await UserController.deployed();
    
    const username = web3.utils.fromAscii("tristan")
    const firstName = web3.utils.fromAscii("Tristan")
    const lastName = web3.utils.fromAscii("Edwards")
    
    await userCtrl.createUser(
      username,
      firstName,
      lastName,
      "I like building stuff",
      "example@example.com"
    );
  });

  it("can create tweet with controller", async () => {
    const controller = await TweetController.deployed()

    const tx = await controller.createTweet("Hello world!")

    assert.isOk(tx)
  })

  it("can get all tweets IDs from user", async () => {
    const storage = await TweetStorage.deployed()

    const userId = 1
    const ids = await storage.getTweetIdsFromUser.call(userId)

    const expectedTweetId = 1

    assert.isOk(Array.isArray(ids))
    assert.equal(ids[0], expectedTweetId)
  })
  
  it("can't create tweet without controller", async () => {
    const storage = await TweetStorage.deployed()

    try {
      const tx = await storage.createTweet(1, "tristan")
      assert.fail();
    } catch (err) {
      assertVMException(err);
    }
  })


})