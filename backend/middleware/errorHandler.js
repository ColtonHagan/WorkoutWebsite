const logger = require('../config/logger');

// Custom API Error Class
class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
  }
}

// Custom Validation Error Class
class ValidationError extends ApiError {
  constructor(errors) {
    super('Validation Error', 400);
    this.errors = errors;
  }
}

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Format validation errors for better readability
  if (err instanceof ValidationError) {
    message = err.errors.length === 1
      ? 'Validation Error: '
      : 'Validation Errors: ';
    message += `${err.errors.map(e => e.message).join(', ')}`;
  }

  logger.error(`[${req.method}] ${req.originalUrl} - ${statusCode} - ${message} - ${err.stack}`);

  res.status(statusCode).json({
    status: err.status || 'error',
    message,
  });
};

// Utility to handle async route handlers and catch errors
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Helper function to create an API error
const createApiError = (message, statusCode) => {
  return new ApiError(message, statusCode);
};

module.exports = { ValidationError, errorHandler, createApiError, asyncHandler };
