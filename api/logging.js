const winston = require('winston');

let logger = null;

function initLogger() {
  return winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'logs/error.log', level: 'error' })
    ]
  });
}

function getLogger() {
  if (!logger) {
    logger = initLogger();
  }

  return logger;
}

module.exports = { getLogger }
