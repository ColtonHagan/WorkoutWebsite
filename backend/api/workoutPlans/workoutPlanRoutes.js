const express = require('express');
const {
    createWorkoutPlan,
    getWorkoutPlans,
    getWorkoutsByPlan,
    editWorkoutPlan,
    deleteWorkoutPlan
} = require('./workoutPlansController');
const router = express.Router();

// Route to create a new workout plan
router.post('/workoutPlans', createWorkoutPlan);

// Route to get all workout plans for the authenticated user
router.get('/workoutPlans', getWorkoutPlans);

// Route to get all workouts associated with a specific workout plan
router.get('/workoutPlans/:planId/workout', getWorkoutsByPlan);

// Route to update an existing workout plan
router.put('/workoutPlans/:planId', editWorkoutPlan);

// Route to delete a workout plan
router.delete('/workoutPlans/:planId', deleteWorkoutPlan);

module.exports = router;