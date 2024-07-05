const express = require('express');
const {createWorkoutPlan, getWorkoutPlans, getWorkoutsByPlan} = require('./workoutPlansController');

const router = express.Router();

router.post('/workoutPlans', createWorkoutPlan);
router.get('/workoutPlans', getWorkoutPlans);
router.get('/workoutPlans/:planId/workout', getWorkoutsByPlan);

module.exports = router;