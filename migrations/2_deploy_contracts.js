const FarmToken = artifacts.require("FarmToken");

module.exports = function(deployer) {
  deployer.deploy(FarmToken);
};
