// config.js
require('dotenv').config(); // this is important!
const logger = require('./logger');

const env = process.env.NODE_ENV || 'local';
const configLocal = require('./configLocal');
const configDev = require('./configDev');

const local = configLocal;
const dev = configDev;

const config = {
  local,
  dev
};

logger.info('Environment: ' + env);

module.exports = config[env];
