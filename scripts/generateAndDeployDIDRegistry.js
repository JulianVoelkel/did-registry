#!/bin/env node

const Web3 = require('web3');
const fs = require('fs');
const web3utils = require('web3-utils')

const Transaction = require('ethereumjs-tx')
const EthUtils = require('ethereumjs-util')
const ls = require('ls')


const defaultAccount = '0x627306090abaB3A6e1400e9345bC60c78a8BEf57';
const ethereumDIDRegistryAdress = '0x2d417e9134fe6633b6603bbb6f40b73605c0d946';

const rawValue = '0.02811144';
const senderAddress = '0x228fbdce9c499047375ae2e3a1c24905651f3a91';

// const privateKey = Buffer.from('08d5366123cb560bb606379f90a0bfd4769eecc0557f1b362dcae9012b548b1', 'hex')
// const signerAddress = '0x5AEDA56215b167893e80B4fE645BA6d5Bab767DE'


                            
const privateKey = Buffer.from('a285ab66393c5fdda46d6fbad9e27fafd438254ab72ad5acb681a0e9f20f5d7b', 'hex')
const signerAddress = '0x2036c6cd85692f0fb2c26e6c6b2eced9e4478dfd'

const provider = new Web3.providers.WebsocketProvider(
  'ws://127.0.0.1:7545',
  { clientConfig: { keepalive: true, keepaliveInterval: 5000 } });
web3 = new Web3(provider, null, { transactionConfirmationBlocks: 1 });


const gasLimits = {
  EthereumDIDRegistry: 2811144, // If this value needs to be recalculated, it can be done by deploying the rawTx once and looking at gasUsed in the receipt
}

generateDeployTx = (code, name) => {
  const rawTx = {
    nonce: 0,
    gasPrice: 10000000000, // 10 Gwei
    gasLimit: gasLimits[name] || 2000000,
    value: 0,
    data: code,
    v: 27,
    r: '0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798',
    s: '0x0aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
  }
  const tx = new Transaction(rawTx)

  console.log(privateKey);

  const res = {
    senderAddress: '0x' + tx.getSenderAddress().toString('hex'),
    rawTx: '0x' + tx.serialize().toString('hex'),
    costInEther: (parseInt(rawTx.gasPrice) * parseInt(rawTx.gasLimit)) / 1000000000000000000,
    contractAddress: '0x' + EthUtils.generateAddress('0x' + tx.getSenderAddress().toString('hex'), 0).toString('hex'),



  }

  web3.eth.getBalance('0x228fbdce9c499047375ae2e3a1c24905651f3a91', function(error, result) {
    console.log(error, result)
  });

  console.log('****' + res.senderAddress);

  console.log("deploying contract: " + res.contractAddress)

  web3.eth.sendSignedTransaction(res.rawTx, function (error, result) {

    console.log(result, error)

  });



  return res
}

generateAll = () => { 
  let deployData = {}
  for (const file of ls('./build/contracts/EthereumDIDRegistry.json')) {
    if (file.name === 'Migrations') continue
    const artifact = require(process.cwd() + file.full.slice(1))
    deployData[file.name] = generateDeployTx(artifact.bytecode, file.name)

  }


  return deployData
}

module.exports = generateAll





if (require.main === module) {
  const deployData = generateAll()
  for (const name in deployData) {
    console.log('\n\x1b[31m ======= Contract:', name, '=======\x1b[0m')
    console.log('\x1b[34mrawTx:\x1b[0m', deployData[name].rawTx)
    console.log('\x1b[34msenderAddress:\x1b[0m', deployData[name].senderAddress)
    console.log('\x1b[34mcost (ether):\x1b[0m', deployData[name].costInEther)
    console.log('\x1b[34mcontractAddress:\x1b[0m', deployData[name].contractAddress)
  }
}
