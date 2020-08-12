// config for local
const configDev = {
  app: {
    port: 4400,
    provider: 'ws://did-registry_ganachecli_1:8545', //'ws://127.0.0.1:7545'
    rpcprovider: 'http://did-registry_ganachecli_1:8545', // 'http://127.0.0.1:7545'
    }, 
};

module.exports = configDev;
