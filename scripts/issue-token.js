const YieldFarming = artifacts.require("YieldFarming");

module.exports =  async function(callback) {
    let yieldfarming = await YieldFarming.deployed()
    await yieldfarming.issueTokens()

    console.log("Tokens issued!")

    callback()
}
