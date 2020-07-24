var ValidationContract = artifacts.require("./ValidationContract.sol")

contract('ValidationContract', function (accounts) {
    let validationContract; 
    let exceptions = require("./exceptions.js");


    let INITIAL_HASHED_DID = '0xc73b30b5845be340a22ad0fbf69494f1e43b704c359cb778ffe04d0173a6bac8'
    let INITIAL_PHYSICALID = '88329942'
    let ENABLED_PHYSICALID = '54321'
    let INITIAL_HASHED_AKT_DID = '0x328a660132171d854e58fe57bab22dd9d093691a8e2756588ca06134f288b70f'
    let VALIDATION_CONTRACT_ADDRESS = '0x345cA3e014Aaf5dcA488057592ee47305D9B3e10'

    it("validation contract is deployed", async function () {
        validationContract = await ValidationContract.deployed();
    });

    it("should be able to register PID for registration", async function () {
        await validationContract.setPhysicalID(INITIAL_PHYSICALID).then(function() {
        })
    });
});