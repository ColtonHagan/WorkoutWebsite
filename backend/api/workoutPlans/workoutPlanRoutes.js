const express = require('express');
const {createWorkoutPlan, getWorkoutPlans, getWorkoutsByPlan} = require('./workoutPlansController');
const authenticateToken = require('../../middleware/auth/token_validation');

const router = express.Router();
router.use(authenticateToken);

router.post('/workoutPlans', createWorkoutPlan);
router.get('/workoutPlans', getWorkoutPlans);
router.get('/workoutPlans/:planId/workout', getWorkoutsByPlan);

module.exports = router;
