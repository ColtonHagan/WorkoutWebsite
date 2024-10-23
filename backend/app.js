require("dotenv").config();
const express = require('express');
const cors = require('cors');
const tokenValidation = require('./middleware/tokenValidation');
const cookieParser = require('cookie-parser');
const { errorHandler } = require('./middleware/errorHandler');
const corsOptions = require('./config/corsConfig');
const logger = require('./config/logger');
const requestLogger = require('./middleware/loggerMiddleware');

const userRoutes = require("./api/users/userRoutes");
const keysRoutes = require("./api/apiKeys/apiKeysRoutes");
const workoutRoutes = require('./api/workouts/workoutRoutes');
const workoutPlanRoutes = require('./api/workoutPlans/workoutPlanRoutes');
const publicPlansRoutes = require('./api/publicWorkoutPlans/publicPlanRoutes');


const app = express();

// Middleware
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(requestLogger);

// Public routes
app.use('/api/users', userRoutes);
app.use('/api/keys', keysRoutes);

// Authenticated routes - protected by token validation middleware
app.use(tokenValidation);
app.use('/api/workouts', workoutRoutes);
app.use('/api/workouts', workoutPlanRoutes); //temp console.log tmp this should be renamed plans and reworked
app.use('/api/publicPlans', publicPlansRoutes);

// Global error handling middleware
app.use(errorHandler);

// Start server and listen on specified port
const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});