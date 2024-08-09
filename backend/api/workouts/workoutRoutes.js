const express = require('express');
const { addWorkout, getWorkouts, deleteWorkout } = require('./workoutController');

const router = express.Router();

router.post("/", addWorkout);
router.get("/:planId/workout", getWorkouts);
router.delete("/:id", deleteWorkout);

module.exports = router;