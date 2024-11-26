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
router.post('/', createWorkoutPlan);

// Route to get all workout plans for user
router.get('/', getWorkoutPlans);

// Route to get all workouts for specific workout plan
router.get('/:planId/workout', getWorkoutsByPlan);

// Route to update an existing workout plan
router.put('/:planId', editWorkoutPlan);

// Route to delete a workout plan
router.delete('/:planId', deleteWorkoutPlan);

module.exports = router;