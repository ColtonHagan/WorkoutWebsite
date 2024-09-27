const { validationResult } = require('express-validator');
const { ValidationError } = require('./errorHandler');

// Middleware to handle validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);

  // If there are validation errors, format and pass them to the error handler
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map(err => ({
      field: err.param,
      message: err.msg
    }));
    return next(new ValidationError(formattedErrors));
  }
  next();
};

module.exports = validate;