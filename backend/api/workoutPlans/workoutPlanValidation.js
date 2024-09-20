const { body, param } = require('express-validator');

// Validation for creating a workout plan
const createWorkoutPlanValidation = [
  body('name')
    .isString().withMessage('Name must be a string')
    .notEmpty().withMessage('Name is required'),
  body('description')
    .isString().withMessage('Description must be a string')
    .notEmpty().withMessage('Description is required'),
];

// Validation for updating a workout plan
const updateWorkoutPlanValidation = [
  param('planId')
    .isInt().withMessage('Plan ID must be an integer'),
  body('name')
    .isString().withMessage('Name must be a string')
    .notEmpty().withMessage('Name is required'),
  body('description')
    .isString().withMessage('Description must be a string')
    .notEmpty().withMessage('Description is required'),
];

// Validation for getting workouts by plan ID
const getWorkoutsByPlanValidation = [
  param('planId')
    .isInt().withMessage('Plan ID must be an integer')
];

// Validation for deleting a workout plan
const deleteWorkoutPlanValidation = [
  param('planId')
    .isInt().withMessage('Plan ID must be an integer')
];

module.exports = {
  createWorkoutPlanValidation,
  updateWorkoutPlanValidation,
  getWorkoutsByPlanValidation,
  deleteWorkoutPlanValidation
};
