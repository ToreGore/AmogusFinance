const YieldFarm = artifacts.require('YieldFarm')

module.exports = async function(callback) {
  let yieldFarm = await YieldFarm.deployed()
  await yieldFarm.issueToken()
  // Code goes here...
  console.log("Tokens issued!")
  callback()
}
