const express = require('express');
const { addWorkout, getWorkouts } = require('./workoutController');
const authenticateToken = require('../../middleware/auth/token_validation');

const router = express.Router();
router.use(authenticateToken);

router.post("/", addWorkout);
router.get("/:planId/workout", getWorkouts);

module.exports = router;