const logger = require('../config/logger');

// Logger middleware for incoming requests
const requestLogger = (req, res, next) => {
  const { method, url } = req;
  const start = new Date();

  // Logs and formates response details after request is completed
  const originalSend = res.send;
  res.send = function (body) {
    const duration = new Date() - start;
    logger.info(`[${method}] ${url} - ${res.statusCode} - ${duration}ms`);
    return originalSend.call(this, body);
  };

  next();
};

module.exports = requestLogger;
