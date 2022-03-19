const receiver = "0x48Fd41520710d57EC66d6dD2F70A27ED92F9F999";
const amount = web3.utils.toWei("100", 'ether');

module.exports = async function(callback) {
  const addresses = await web3.eth.getAccounts()

  web3.eth.sendTransaction({
    from: addresses[1],
    to: receiver, 
    value: amount
  }, callback)
}
