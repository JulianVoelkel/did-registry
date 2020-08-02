var RegistryContract = artifacts.require("./RegistryContract.sol");
var ValidationContract = artifacts.require("./ValidationContract.sol")


contract('RegistryContract', function (accounts) {

    let validationContract;
    let registryContract;
    let exceptions = require("./exceptions.js");


    let INITIAL_HASHED_DID = '0xc73b30b5845be340a22ad0fbf69494f1e43b704c359cb778ffe04d0173a6bac8'
    let INITIAL_PHYSICALID = '88329942'
    let WRONG_PHYSICALID = '88329943'
    let INITIAL_HASHED_AKT_DID = '0x328a660132171d854e58fe57bab22dd9d093691a8e2756588ca06134f288b70f'

    it("registry is deployed", async function () {
        registryContract = await RegistryContract.deployed();
    });

    it("validation contract is deployed", async function () {
        validationContract = await ValidationContract.deployed();
    });

    it("validation contract address should be set", async function () {
        await registryContract.getValidationContractAddress().then(function (res) {
            assert(res, "no address returned")
        })
    });

    it("Should throw error if PID is not enabled for registering", async function () {
        await exceptions.catchPIDNotEnabled(registryContract.registerDevice(INITIAL_HASHED_DID, WRONG_PHYSICALID, INITIAL_HASHED_AKT_DID))
    });

    it("should be able to create and register Device-DID for enabled PID", async function () {
        await validationContract.setPhysicalID(INITIAL_HASHED_AKT_DID, INITIAL_PHYSICALID).then(function () {
        });
        await registryContract.registerDevice(INITIAL_HASHED_DID, INITIAL_PHYSICALID, INITIAL_HASHED_AKT_DID).then(function () {
        })
    });


    it("should be able to get DID for according PID", async function () {
        await registryContract.getDIDbyPhysicalID(INITIAL_PHYSICALID).then(function (res) {
            assert.equal(res, INITIAL_HASHED_DID, 'wrong did returned')
        })
    });

    it("should throw Error if no DID is registered for a PID", async function () {
        await exceptions.catchNoDIDRegistered(registryContract.getDIDbyPhysicalID(WRONG_PHYSICALID))
    });
});





