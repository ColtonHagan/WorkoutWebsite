require("dotenv").config();
const express = require('express');
const cors = require('cors');
const logger = require("./config/logger")
const userRoutes = require("./api/users/userRoutes")
const workoutRoutes = require('./api/workouts/workoutRoutes');
const workoutPlanRoutes = require('./api/workoutPlans/workoutPlanRoutes')

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/workouts', workoutPlanRoutes);


const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
