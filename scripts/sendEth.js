const Web3 = require('web3');
const fs = require('fs');
const ls = require('ls')

const web3utils = require('web3-utils')
const Transaction = require('ethereumjs-tx')

const contract = JSON.parse(fs.readFileSync('./build/contracts/EthereumDIDRegistry.json', 'utf8'));

const defaultAccount = '0x627306090abaB3A6e1400e9345bC60c78a8BEf57';
const ethereumDIDRegistryAdress = '0x57db4883e7967a14a1cabb628e140ced3ca315a6';

const senderAddress = '0x228fbdce9c499047375ae2e3a1c24905651f3a91';

const provider = new Web3.providers.WebsocketProvider(
    'ws://127.0.0.1:7545',
    { clientConfig: { keepalive: true, keepaliveInterval: 5000 } });
web3 = new Web3(provider, null, { transactionConfirmationBlocks: 1 });


const ethereumDIDRegistry = new web3.eth.Contract(
    contract.abi, ethereumDIDRegistryAdress);

const transactionObject = {
    from: defaultAccount,
    to: senderAddress,
    gasPrice: 0,
    gas: 800000,
    value: '0028111440000000000',
}

function sendValue() {
    web3.eth.sendTransaction(transactionObject, function (error, result) {
        console.log(result, error);
    });
}

sendValue();

