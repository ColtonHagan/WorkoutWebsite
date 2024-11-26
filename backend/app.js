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
app.use('/users', userRoutes);
app.use('/keys', keysRoutes);

// Authenticated routes - protected by token validation middleware
app.use(tokenValidation);
app.use('/workouts', workoutRoutes);
app.use('/plans', workoutPlanRoutes);
app.use('/public', publicPlansRoutes);

// Global error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});