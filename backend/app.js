require("dotenv").config();
const express = require('express');
const cors = require('cors');
const logger = require("./config/logger")
const userRoutes = require("./api/users/userRoutes")
const workoutRoutes = require('./api/workouts/workoutRoutes');
const workoutPlanRoutes = require('./api/workoutPlans/workoutPlanRoutes')
const tokenValidation = require('./middleware/auth/tokenValidation')
const cookieParser = require('cookie-parser');

const app = express();

const corsOptions = { //This should be in a seperate file log term
  origin: 'http://localhost:3000',
  credentials: true, 
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoutes);

app.use(tokenValidation);

app.use('/api/workouts', workoutRoutes);
app.use('/api/workouts', workoutPlanRoutes);

const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
