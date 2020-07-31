
const Resolver = require('did-resolver')
const ehtrdid = require('ethr-did-resolver')

// You can set a rpc endpoint to be used by the web3 provider
// You can also set an address for your own ethr-did-registry contract
const providerConfig = { rpcUrl: 'http://127.0.0.1:7545', registry: '0x57db4883e7967a14a1cabb628e140ced3ca315a6' }

 
// getResolver will return an object with a key/value pair of { "ethr": resolver } where resolver is a function used by the generic did resolver. 
const ethrDidResolver = ehtrdid.getResolver(providerConfig)
const didResolver = new Resolver.Resolver(ethrDidResolver)
 
async function getDIDDcoument() {

    const doc = await didResolver.resolve('did:ethr:0x627306090abaB3A6e1400e9345bC60c78a8BEf57')
    console.log(doc)

} 

getDIDDcoument();
 