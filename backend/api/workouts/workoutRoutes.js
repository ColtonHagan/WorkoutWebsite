const express = require('express');
const { addWorkout, getWorkouts, deleteWorkout, updateWorkout } = require('./workoutController');

const router = express.Router();

// Create a new workout
router.post("/", addWorkout);

// Get workouts for a specific plan
router.get("/:planId/workout", getWorkouts);

// Delete a workout by ID
router.delete("/:id", deleteWorkout);

// Update a workout by ID
router.put('/:id', updateWorkout);

module.exports = router;