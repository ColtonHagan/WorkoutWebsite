const express = require('express');
const {
    addPublicPlan,
    removePublicPlan,
    ratePlan,
    getPublicPlans
} = require('./publicPlanController');

const router = express.Router();

router.post('/', addPublicPlan);
router.get('/', getPublicPlans);
router.delete('/:id', removePublicPlan);
router.post('/rate', ratePlan);

module.exports = router;
