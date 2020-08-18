const EthrDID = require('ethr-did');
const Web3 = require('web3');
const fs = require('fs');
const config = require('../server/config/config');

const contract = JSON.parse(fs.readFileSync('./build/contracts/RegistryContract.json', 'utf8'));

const registryContractAddress = '0x24ff895a4b554e5673ff5bf050d0597397b29fa5';

const provider = new Web3.providers.WebsocketProvider(
    config.app.provider,
    { clientConfig: { keepalive: true, keepaliveInterval: 5000 } });
web3 = new Web3(provider, null, { transactionConfirmationBlocks: 1 });

const registryContract = new web3.eth.Contract(
    contract.abi, registryContractAddress);

module.exports = {
    async registerDID(physicalId, aktDID) {

        const keyPair = new EthrDID.createKeyPair();
        const deviceDID = new EthrDID({ address: keyPair.address, privateKey: keyPair.privateKey, provider })

        const activationDeviceAddress = aktDID.slice(9);

        const hashedAktDID = web3.utils.keccak256(aktDID);
        const hahsedDeviceDID = web3.utils.keccak256(deviceDID.did);
        const hahsedPID = web3.utils.keccak256(physicalId);
        
        const did = deviceDID.did;

        const res = await registryContract.methods.registerDevice(hahsedDeviceDID, hahsedPID, hashedAktDID, activationDeviceAddress)
        .send({from: activationDeviceAddress, to: registryContractAddress, gasPrice: 0, gas: 800000})
        .on('receipt', function (receipt) {
            console.log("Device DID: " + deviceDID.did + " sucessfully set.")

        })
        .on('error', function(error, receipt){
            console.log(error);
        });

        return res, did
    },


}




