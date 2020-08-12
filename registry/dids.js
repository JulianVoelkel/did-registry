
const Resolver = require('did-resolver').Resolver
const ethrdid = require('ethr-did-resolver')
const Web3 = require('web3');
const fs = require('fs');
const config = require('../server/config/config');
const web3utils = require('web3-utils')
const HttpProvider = require('ethjs-provider-http')
const EthrDID = require('ethr-did');

const httpProvider = new HttpProvider(config.app.rpcprovider)
const contract = JSON.parse(fs.readFileSync('./build/contracts/EthereumDIDRegistry.json', 'utf8'));

const ethereumDIDRegistryAddress = '0x345ca3e014aaf5dca488057592ee47305d9b3e10';

const provider = new Web3.providers.WebsocketProvider(
    config.app.provider,
    { clientConfig: { keepalive: true, keepaliveInterval: 5000 } });
web3 = new Web3(provider, null, { transactionConfirmationBlocks: 1 });

// const providerConfig = {
//     networks: [
//         { name: "development", rpcUrl: config.app.rpcprovider, registry: ethereumDIDRegistryAddress }
//     ]
// }

const providerConfig = { rpcUrl: config.app.rpcprovider, registry: ethereumDIDRegistryAddress }

const ethereumDIDRegistry = new web3.eth.Contract(
    contract.abi, ethereumDIDRegistryAddress);

const ethrDidResolver = ethrdid.getResolver(providerConfig)
const didResolver = new Resolver(ethrDidResolver)

module.exports = {

    async getDIDDocument(did) {

        const doc = await didResolver.resolve(did)
        return doc

    },
    async setAttribute(did) {

        const identity = did.slice(9);
        const name = web3utils.keccak256('did/svc/drone');
        const value = web3utils.keccak256("https://hubs.uport.me");
        const validity = '81000';

        // const pkey = web3utils.keccak256('c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3');

        // console.log("address: " + identity)

        // const deviceDID = new EthrDID({ provider: httpProvider, address: identity, privateKey: pkey, registry: ethereumDIDRegistryAddress })

        // await deviceDID.setAttribute('did/service/HubService', 'https://hubs.uport.me', 10)

        const transactionObject = {
            from: identity,
            to: ethereumDIDRegistryAddress,
            gasPrice: 0,
            gas: 800000
        }

        await ethereumDIDRegistry.methods.setAttribute(identity, name, value, validity).send(transactionObject)
        .on('receipt', function (receipt) {
            console.log(receipt)
        })
        .on('error', function (error, receipt) {
            console.log(error);
        });

        // await didRegistry.getPastEvents('DIDAttributeChanged', {fromBlock: 0, toBlock: 'latest'}, function(error, events){ console.log(events); })
        // .then(function(events){
        //     console.log(events) // same results as the optional callback above
        // });
    }



}

