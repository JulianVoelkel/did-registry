const winston = require('winston');

const loggerFormat = winston.format.printf(info => {
  if (info instanceof Error) {
    return `${info.timestamp} [${info.level}] ${info.stack}`;
  }
  return `${info.timestamp} [${info.level}] ${info.message}`;
});
const loggerOptions = {
  transports: new winston.transports.Console({ level: process.env.LOG_LEVEL || 'info' }),
  format: winston.format.combine(winston.format.timestamp(), winston.format.colorize(), loggerFormat),
};
const logger = winston.createLogger(loggerOptions);

module.exports = logger;
