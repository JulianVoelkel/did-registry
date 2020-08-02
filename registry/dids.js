
const Resolver = require('did-resolver')
const ehtrdid = require('ethr-did-resolver')
const Web3 = require('web3');
const fs = require('fs');


const contract = JSON.parse(fs.readFileSync('./build/contracts/ValidationContract.json', 'utf8'));
const defaultAccount = '0x627306090abaB3A6e1400e9345bC60c78a8BEf57';
const didRegistryAddress = '0x57db4883e7967a14a1cabb628e140ced3ca315a6';


const provider = new Web3.providers.WebsocketProvider(
    'ws://127.0.0.1:7545',
    { clientConfig: { keepalive: true, keepaliveInterval: 5000 } });
web3 = new Web3(provider, null, { transactionConfirmationBlocks: 1 });


const didRegistry = new web3.eth.Contract(
    contract.abi, didRegistryAddress);


const transactionObject = {
    from: defaultAccount,
    to: didRegistry,
    gasPrice: 0,
    gas: 800000
}


// You can set a rpc endpoint to be used by the web3 provider
// You can also set an address for your own ethr-did-registry contract
const providerConfig = { rpcUrl: 'http://127.0.0.1:7545', registry: '0x57db4883e7967a14a1cabb628e140ced3ca315a6' }

 
// getResolver will return an object with a key/value pair of { "ethr": resolver } where resolver is a function used by the generic did resolver. 
const ethrDidResolver = ehtrdid.getResolver(providerConfig)
const didResolver = new Resolver.Resolver(ethrDidResolver)

module.exports = {

    async getDIDDocument(did){
        const doc = await didResolver.resolve(did)
        return doc
    },
    // async setAttribute(identity, actor, name, value, validity){

    //     const att = await didRegistry.methods.setAttribute(identity, actor, name, value, validity).send(transactionObject)

    // }



}

 