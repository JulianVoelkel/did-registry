const RegistryContract = artifacts.require("RegistryContract");
const ValidationContract = artifacts.require("ValidationContract");
const EthereumDIDRegistry = artifacts.require("EthereumDIDRegistry");



module.exports = function (deployer, network, accounts) {

  let registryContract, validationContract, ethereumDIDRegistry;

  deployer.deploy(RegistryContract, {from: accounts[8]}).then(() => {
    return RegistryContract.deployed().then(registry => {
      registryContract = registry;
      return deployer.deploy(EthereumDIDRegistry).then(didregistry => {
        ethereumDIDRegistry = didregistry
        return deployer.deploy(ValidationContract, {from: accounts[9]}).then(() => {
          return ValidationContract.deployed().then(validation => {
            validationContract = validation;
            registryContract.setValidationContractAddress(validationContract.address, {from: accounts[8]});
          });
        });
      });
    });
  });
};
