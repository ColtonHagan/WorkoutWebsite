const express = require('express');
const { addWorkout, getWorkouts} = require('./workoutController');
const authenticateToken = require('../../middleware/auth/token_validation');

const router = express.Router();

router.post("/", authenticateToken, addWorkout);
router.get("/", authenticateToken, getWorkouts);

module.exports = router;