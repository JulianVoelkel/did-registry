const RegistryContract = artifacts.require("RegistryContract");
const ValidationContract = artifacts.require("ValidationContract");
const EthereumDIDRegistry = artifacts.require("EthereumDIDRegistry");


module.exports = function(deployer) {

  let registryContract, validationContract;

  deployer.deploy(RegistryContract).then(() => {
    return RegistryContract.deployed().then(registry => {
      registryContract = registry;
      return deployer.deploy(ValidationContract).then(() => {
        return ValidationContract.deployed().then(validation => {
          validationContract = validation;
          registryContract.setValidationContractAddress(validationContract.address);
        });
      });
    });
  });
};
