const { createLogger, transports, format } = require('winston');
const path = require('path');
const logDir = process.env.LOG_DIR || path.join(__dirname, '../logs');;

// Logger configuration using Winston
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.printf(({ timestamp, level, message, stack }) => {
      return `${timestamp} ${level}: ${message} ${stack ? `\n${stack}` : ''}`;
    })
  ),
  // Prints to console and logs to related log files
  transports: [
    new transports.Console(),
    new transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }),
    new transports.File({ filename: path.join(logDir, 'combined.log') })
  ],
});

module.exports = logger;