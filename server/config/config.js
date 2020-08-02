// config.js
require('dotenv').config(); // this is important!
const logger = require('./logger');

const env = process.env.NODE_ENV || 'local';
const configLocal = require('./configLocal');

const local = configLocal;

const config = {
  local,
};

logger.info('Environment: ' + env);

module.exports = config[env];
