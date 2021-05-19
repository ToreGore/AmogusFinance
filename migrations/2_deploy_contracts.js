const AmogusToken = artifacts.require('AmogusToken')
const StableToken = artifacts.require('StableToken')
const YieldFarm = artifacts.require('YieldFarm')

module.exports = async function(deployer, network, accounts) {
  // Deploy Stable Token
  await deployer.deploy(StableToken)
  const stableToken = await StableToken.deployed()

  // Deploy Amogus Token
  await deployer.deploy(AmogusToken)
  const amogusToken = await AmogusToken.deployed()

  // Deploy YieldFarm
  await deployer.deploy(YieldFarm, amogusToken.address, stableToken.address)
  const yieldFarm = await YieldFarm.deployed()

  // Transfer all tokens to YieldFarm (1 million)
  await amogusToken.transfer(yieldFarm.address, '1000000000000000000000000')

  // Transfer 100 Stable Tokens to investor
  await stableToken.transfer(accounts[1], '100000000000000000000')
}
