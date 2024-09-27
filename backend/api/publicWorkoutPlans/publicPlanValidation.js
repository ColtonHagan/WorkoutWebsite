const { body, param } = require('express-validator');

// Validation rules for adding a public plan
const addPublicPlanValidation = [
    body('plan_id').isInt().withMessage('Plan ID must be an integer'),
];

// Validation rules for removing a public plan
const removePublicPlanValidation = [
    param('id').isInt().withMessage('ID must be an integer'),
];

// Validation rules for removing a public plan
const copyPublicPlanValidation = [
    param('plan_id').isInt().withMessage('ID must be an integer'),
];

// Validation rules for rating a public plan
const ratePlanValidation = [
    body('public_id').isInt().withMessage('Public ID must be an integer'),
    body('rating').isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5')
];

module.exports = {
    addPublicPlanValidation,
    removePublicPlanValidation,
    copyPublicPlanValidation,
    ratePlanValidation
};
