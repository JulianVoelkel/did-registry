const EthrDID = require('ethr-did');
const Web3 = require('web3');
const fs = require('fs');

const contract = JSON.parse(fs.readFileSync('../build/contracts/RegistryContract.json', 'utf8'));

const defaultAccount = '0x627306090abaB3A6e1400e9345bC60c78a8BEf57';
const registryContractAddress = '0xf25186B5081Ff5cE73482AD761DB0eB0d25abfBF';


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

const physicalId = 54324;
const aktDID = 'did:ethr:0xe0e440c1e92c5b73c9be409c50d9fd060f92c04c';



function createDeviceDID(){

    const keyPair = new EthrDID.createKeyPair();
    const deviceDID = new EthrDID({ address: keyPair.address, privateKey: keyPair.privateKey, provider })

    registerDID(deviceDID, physicalId, aktDID);

}


function registerDID(deviceDID, physicalId, aktDID){

    const hashedAktDID = web3.eth.accounts.hashMessage(aktDID);
    const hahsedDeviceDID = web3.eth.accounts.hashMessage(deviceDID.did);

    console.log(hahsedDeviceDID, physicalId, hashedAktDID)

    registryContract.methods.registerDevice('0xe7293dd4c7febdc344c2a4e385c89b0e3c6d829d028cd171ce4028e4395ba564', physicalId, hashedAktDID).send(transactionObject)
    .on('receipt', function (receipt) {
        console.log("Device DID: " + deviceDID.did + " sucessfully set.")
    })
    .on('error', function(error, receipt){
        console.log(error);
    });

}



createDeviceDID();

