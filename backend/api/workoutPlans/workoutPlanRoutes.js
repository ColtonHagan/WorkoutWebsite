const express = require('express');
const {createWorkoutPlan, getWorkoutPlans, getWorkoutsByPlan, editWorkoutPlan, deleteWorkoutPlan} = require('./workoutPlansController');

const router = express.Router();

router.post('/workoutPlans', createWorkoutPlan);
router.get('/workoutPlans', getWorkoutPlans);
router.get('/workoutPlans/:planId/workout', getWorkoutsByPlan);
router.put('/workoutPlans/:planId', editWorkoutPlan);
router.delete('/workoutPlans/:planId', deleteWorkoutPlan);

module.exports = router;