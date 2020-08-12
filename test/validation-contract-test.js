var ValidationContract = artifacts.require("./ValidationContract.sol")

contract('ValidationContract', function (accounts) {
    let validationContract;
    let exceptions = require("./exceptions.js");

    let INITIAL_PHYSICALID = '0x3c7009f248fd54397b7e6ba7be11110ebeaf8af718f7692af4822112e0b212be'
    let INITIAL_HASHED_AKT_DID = '0x328a660132171d854e58fe57bab22dd9d093691a8e2756588ca06134f288b70f'
    let SECONDARY_HASHED_AKT_DID = '0x338a660132171d854e58fe57bab22dd9d093691a8e2756588ca06134f288b70f'

    it("validation contract is deployed", async function () {
        validationContract = await ValidationContract.deployed();
    });

    it("should be able to register PID", async function () {
        await validationContract.setPhysicalID(INITIAL_HASHED_AKT_DID, INITIAL_PHYSICALID, {from: accounts[9]}).then(function () {
        });
    });

    it("should throw error if AktDID / PID combination is already registered", async function () {
        await exceptions.catchPIDregistered(validationContract.setPhysicalID(INITIAL_HASHED_AKT_DID, INITIAL_PHYSICALID, {from: accounts[9]}))
    });

    it("should throw error if PID already exists", async function () {
        await exceptions.catchPIDexists(validationContract.setPhysicalID(SECONDARY_HASHED_AKT_DID, INITIAL_PHYSICALID, {from: accounts[9]}))
    });
});