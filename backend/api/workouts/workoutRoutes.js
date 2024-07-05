const express = require('express');
const { addWorkout, getWorkouts } = require('./workoutController');

const router = express.Router();

router.post("/", addWorkout);
router.get("/:planId/workout", getWorkouts);

module.exports = router;