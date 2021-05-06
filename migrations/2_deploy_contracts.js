const YieldFarming = artifacts.require("YieldFarming");
const StableToken = artifacts.require("StableToken"); 
const AmongusToken = artifacts.require("AmongusToken"); 

module.exports =  async function(deployer, network, accounts) {
  // Deploy Stable Token 
  await deployer.deploy(StableToken)
  const stableToken = await StableToken.deployed()

  // Deploy Amongus Token 
  await deployer.deploy(AmongusToken)
  const amongusToken = await AmongusToken.deployed()

  // Deploy YieldFarming contract
  await deployer.deploy(YieldFarming, amongusToken.address, stableToken.address)
  const yieldFarming  = await YieldFarming.deployed()

  // Transform all tokens to Yieldfarming contranct (1Million)
  await amongusToken.transfer(yieldFarming.address, '1000000000000000000000000')

  // Trnfer 100 stable Tokens to investor account 
  await stableToken.transfer(accounts[1], '100000000000000000000')

};
