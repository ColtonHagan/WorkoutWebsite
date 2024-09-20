const express = require('express');
const {
    addPublicPlan,
    removePublicPlan,
    ratePlan,
    getPublicPlans
} = require('./publicPlanController');

const router = express.Router();

// Route to add a public workout plan
router.post('/', addPublicPlan);

// Route to retrieve all public workout plans
router.get('/', getPublicPlans);

// Route to remove a public workout plan by ID
router.delete('/:id', removePublicPlan);

// Route to rate a public workout plan
router.post('/rate', ratePlan);

module.exports = router;