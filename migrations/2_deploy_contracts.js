const RegistryContract = artifacts.require("RegistryContract");
const ValidationContract = artifacts.require("ValidationContract");


module.exports = function(deployer) {
  deployer.deploy(ValidationContract);
  deployer.deploy(RegistryContract, '0x345cA3e014Aaf5dcA488057592ee47305D9B3e10');
};
