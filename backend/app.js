require("dotenv").config();
const express = require('express');
const logger = require("./config/logger")
const userRoutes = require("./api/users/userRoutes")
const workoutRoutes = require('./api/workouts/workoutRoutes');

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/workouts', workoutRoutes);

const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
