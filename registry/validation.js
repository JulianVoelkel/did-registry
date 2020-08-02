const EthrDID = require('ethr-did');
const Web3 = require('web3');
const web3utils = require('web3-utils')
const fs = require('fs');
const contract = JSON.parse(fs.readFileSync('./build/contracts/ValidationContract.json', 'utf8'));

const defaultAccount = '0x627306090abaB3A6e1400e9345bC60c78a8BEf57';
const validationContractAddress = '0xf25186B5081Ff5cE73482AD761DB0eB0d25abfBF';

const provider = new Web3.providers.WebsocketProvider(
    'ws://127.0.0.1:7545',
    { clientConfig: { keepalive: true, keepaliveInterval: 5000 } });
web3 = new Web3(provider, null, { transactionConfirmationBlocks: 1 });


const validationContract = new web3.eth.Contract(
    contract.abi, validationContractAddress);


const transactionObject = {
    from: defaultAccount,
    to: validationContractAddress,
    gasPrice: 0,
    gas: 800000
}


module.exports = {
    async setPID(aktDID, physicalId) {

        const pid = await validationContract.methods.setPhysicalID(web3utils.keccak256(aktDID), physicalId).send(transactionObject)
            .on('receipt', function (receipt) {
                console.log("AktDID" + aktDID + " sucessfully set.")
                console.log("Physical ID: " + physicalId + " sucessfully set.")
            })
            .on('error', function (error, receipt) {
                console.log(error);
            });

        return pid
    },
    createAktDID() {

        const keyPair = new EthrDID.createKeyPair();
        const aktDID = new EthrDID({ address: keyPair.address, privateKey: keyPair.privateKey, provider })

        return aktDID

    }

}
