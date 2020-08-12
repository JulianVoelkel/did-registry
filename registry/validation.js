const EthrDID = require('ethr-did');
const Web3 = require('web3');
const web3utils = require('web3-utils')
const fs = require('fs');
const contract = JSON.parse(fs.readFileSync('./build/contracts/ValidationContract.json', 'utf8'));
const config = require('../server/config/config');

const issuingAuthorityAddress = '0x5AEDA56215b167893e80B4fE645BA6d5Bab767DE';
const validationContractAddress = '0xf7e3e47e06f1bddecb1b2f3a7f60b6b25fd2e233';

const provider = new Web3.providers.WebsocketProvider(
    config.app.provider,
    { clientConfig: { keepalive: true, keepaliveInterval: 5000 } });
web3 = new Web3(provider, null, { transactionConfirmationBlocks: 1 });


const validationContract = new web3.eth.Contract(
    contract.abi, validationContractAddress);


const transactionObject = {
    from: issuingAuthorityAddress,
    to: validationContractAddress,
    gasPrice: 0,
    gas: 800000
}


module.exports = {
    async setPID(aktDID, physicalId) {

        const txObj = await validationContract.methods.setPhysicalID(web3utils.keccak256(aktDID),web3utils.keccak256(physicalId)).send(transactionObject)
            .on('receipt', function (receipt) {
                console.log("AktDID" + aktDID + " sucessfully set.")
                console.log("Physical ID: " + physicalId + " sucessfully set.")
            })
            .on('error', function (error, receipt) {
                console.log(error);
            });

        return txObj
    },
    createAktDID() {

        const keyPair = new EthrDID.createKeyPair();
        const aktDID = new EthrDID({ address: keyPair.address, privateKey: keyPair.privateKey, provider })

        return aktDID

    }

}
