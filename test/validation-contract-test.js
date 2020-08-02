var ValidationContract = artifacts.require("./ValidationContract.sol")

contract('ValidationContract', function (accounts) {
    let validationContract;
    let exceptions = require("./exceptions.js");


    let INITIAL_PHYSICALID = '88329942'
    let INITIAL_HASHED_AKT_DID = '0x328a660132171d854e58fe57bab22dd9d093691a8e2756588ca06134f288b70f'
    let SECONDARY_HASHED_AKT_DID = '0x338a660132171d854e58fe57bab22dd9d093691a8e2756588ca06134f288b70f'


    it("validation contract is deployed", async function () {
        validationContract = await ValidationContract.deployed();
    });

    it("should be able to register PID", async function () {
        await validationContract.setPhysicalID(INITIAL_HASHED_AKT_DID, INITIAL_PHYSICALID).then(function () {
        });
    });

    it("should throw error if AktDID / PID combination is already registered", async function () {
        await exceptions.catchPIDregistered(validationContract.setPhysicalID(INITIAL_HASHED_AKT_DID, INITIAL_PHYSICALID))
    });

    it("should throw error if PID already exists", async function () {
        await exceptions.catchPIDexists(validationContract.setPhysicalID(SECONDARY_HASHED_AKT_DID, INITIAL_PHYSICALID))
    });
});