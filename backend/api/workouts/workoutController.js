const { 
    createWorkout, 
    addWorkoutDates, 
    getWorkoutsById, 
    deleteWorkoutById, 
    getWorkoutById, 
    deleteWorkoutDatesByWorkoutId, 
    deleteWorkoutInstructionsByWorkoutId, 
    updateWorkouts, 
    addWorkoutInstructions 
} = require('./workoutModel');
const { 
    addWorkoutValidation, 
    updateWorkoutValidation, 
    getWorkoutsValidation, 
    deleteWorkoutValidation 
} = require('./workoutValidation');
const { encodeDays } = require('./util/dayEncoder');
const { createApiError, asyncHandler } = require('../../middleware/errorHandler');
const validate = require('../../middleware/validationMiddleware');

// Add a new workout
const addWorkout = asyncHandler(async (req, res) => {
    const { name, nickname, reps, sets, dates, plan_id, weight, days, body_part, target, gif, instructions } = req.body;
    const user_id = req.user.userId;

    const workout = {
        user_id,
        plan_id,
        name,
        nickname,
        reps,
        sets,
        weight,
        days: days ? encodeDays(days) : 0,
        body_part,
        target,
        gif
    };

    const workoutId = await createWorkout(workout);

    if (!workoutId) {
        throw createApiError('Could not add workout', 404);
    }

    // Adds dates assocated with workout
    if (dates && dates.length > 0) {
        await addWorkoutDates(workoutId, dates);
    }

    // Adds instructions assocated with workout
    if (instructions && instructions.length > 0) {
        await addWorkoutInstructions(workoutId, instructions);
    }

    res.status(201).json({ message: 'Workout added successfully', id: Number(workoutId) });
});

// Get workouts by plan ID
const getWorkouts = asyncHandler(async (req, res) => {
    const userId = req.user.userId;
    const { planId } = req.params;

    const result = await getWorkoutsById(userId, planId);
    res.status(200).json(result);
});

// Updates an existing workout
const updateWorkout = asyncHandler(async (req, res) => {
    const workoutId = req.params.id;
    const { reps, sets, weight, days, dates } = req.body;
    const user_id = req.user.userId;

    const existingWorkout = await getWorkoutById(user_id, workoutId);
    if (!existingWorkout) {
        throw createApiError('Workout plan not found', 404);
    }

    const updates = {
        reps,
        sets,
        weight,
        days: days ? encodeDays(days) : encodeDays(existingWorkout.days) // Keep existing days if not provided
    };

    const result = await updateWorkouts(workoutId, updates);
    if (!result || result.affectedRows === 0) {
        throw createApiError('Workout plan not found', 404);
    }


    if (dates && dates.length > 0) {
        await deleteWorkoutDatesByWorkoutId(workoutId);
        await addWorkoutDates(workoutId, dates);
    }
    res.status(200).json({ message: 'Workout updated successfully', id: Number(workoutId) });
});

// Deletes a workout
const deleteWorkout = asyncHandler(async (req, res) => {
    const workoutId = req.params.id;
    const userId = req.user.userId;

    const result = await deleteWorkoutById(workoutId, userId);
    if (!result || result.affectedRows === 0) {
        throw createApiError('Workout plan not found', 404);
    }
    await deleteWorkoutDatesByWorkoutId(workoutId); // Deletes dates
    await deleteWorkoutInstructionsByWorkoutId(workoutId); // Deletes instructions

    res.status(200).json({ message: 'Workout deleted successfully' });
});

module.exports = {
    addWorkout: [addWorkoutValidation, validate, addWorkout],
    getWorkouts: [getWorkoutsValidation, validate, getWorkouts],
    deleteWorkout: [deleteWorkoutValidation, validate, deleteWorkout],
    updateWorkout: [updateWorkoutValidation, validate, updateWorkout]
};