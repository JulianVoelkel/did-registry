const EthrDID = require('ethr-did');
const Web3 = require('web3');
const fs = require('fs');

const contract = JSON.parse(fs.readFileSync('./build/contracts/RegistryContract.json', 'utf8'));

const defaultAccount = '0x627306090abaB3A6e1400e9345bC60c78a8BEf57';
const registryContractAddress = '0x345cA3e014Aaf5dcA488057592ee47305D9B3e10';


const provider = new Web3.providers.WebsocketProvider(
    'ws://127.0.0.1:7545',
    { clientConfig: { keepalive: true, keepaliveInterval: 5000 } });
web3 = new Web3(provider, null, { transactionConfirmationBlocks: 1 });


const registryContract = new web3.eth.Contract(
    contract.abi, registryContractAddress);

const transactionObject = {
    from: defaultAccount,
    to: registryContractAddress,
    gasPrice: 0,
    gas: 800000
}

module.exports = {
    async registerDID(physicalId, aktDID) {

        const keyPair = new EthrDID.createKeyPair();
        const deviceDID = new EthrDID({ address: keyPair.address, privateKey: keyPair.privateKey, provider })
        const hashedAktDID = web3.utils.keccak256(aktDID);
        const hahsedDeviceDID = web3.utils.keccak256(deviceDID.did);
        const did = deviceDID.did;
    
        const res = await registryContract.methods.registerDevice(hahsedDeviceDID, physicalId, hashedAktDID).send(transactionObject)
        .on('receipt', function (receipt) {
            console.log("Device DID: " + deviceDID.did + " sucessfully set.")

        })
        .on('error', function(error, receipt){
            console.log(error);
        });

        return res, did
    },


}




