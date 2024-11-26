const express = require('express');
const { addWorkout, getWorkouts, deleteWorkout, updateWorkout } = require('./workoutController');

const router = express.Router();

// Route to add a new workout
router.post("/", addWorkout);

// Route to get workouts for a specific plan
router.get("/:planId/workout", getWorkouts);

// Route to delete a workout by ID
router.delete("/:id", deleteWorkout);

// Route to update a workout by ID
router.put('/:id', updateWorkout);

module.exports = router;