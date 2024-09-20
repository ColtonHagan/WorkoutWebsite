const { body, param } = require('express-validator');

// Validation to check if the input is an array of strings
const isArrayOfStrings = (value) => {
  if (!Array.isArray(value)) {
    throw new Error('Must be an array');
  }
  if (!value.every(item => typeof item === 'string')) {
    throw new Error('Each item in the array must be a string');
  }
  return true;
};

// Validation rules for adding a workout
const addWorkoutValidation = [
  body('name').isString().notEmpty().withMessage('Name must be a string'),
  body('nickname').isString().notEmpty().withMessage('Nickname must be a string'),
  body('reps').isInt({ min: 0 }).withMessage('Reps must be a positive integer'),
  body('sets').isInt({ min: 0 }).withMessage('Sets must be a positive integer'),
  body('weight').isFloat({ min: 0 }).withMessage('Weight must be a non-negative number'),
  body('body_part').isString().withMessage('Body part must be a string'),
  body('target').isString().withMessage('Target must be a string'),
  body('gif').isURL().withMessage('GIF must be a valid URL'),
  body('instructions').custom(isArrayOfStrings).withMessage('Instructions must be an array of strings'),
  body('days').optional().custom(isArrayOfStrings).withMessage('Days must be an array of strings'),
  body('dates').optional().custom(isArrayOfStrings).withMessage('Dates must be an array of strings'),
];

// Validation rules for updating a workout
const updateWorkoutValidation = [
  param('id').isInt().withMessage('Workout ID must be a positive integer'),
  body('reps').optional().isInt({ min: 0 }).withMessage('Reps must be a positive integer'),
  body('sets').optional().isInt({ min: 0 }).withMessage('Sets must be a positive integer'),
  body('weight').optional().isFloat({ min: 0 }).withMessage('Weight must be a positive number'),
  body('days').optional().custom(isArrayOfStrings).withMessage('Days must be an array of strings'),
  body('dates').optional().custom(isArrayOfStrings).withMessage('Dates must be an array of strings'),
];

// Validation rules for deleting a workout
const deleteWorkoutValidation = [
  param('id').isInt().withMessage('Workout ID must be an integer'),
];

// Validation rules for getting workouts
const getWorkoutsValidation = [
  param('planId').isInt().withMessage('Plan ID must be an integer'),
];

module.exports = {
  addWorkoutValidation,
  updateWorkoutValidation,
  getWorkoutsValidation,
  deleteWorkoutValidation
};
