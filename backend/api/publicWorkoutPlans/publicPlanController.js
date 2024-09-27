const { 
    addPublicWorkoutPlan, 
    removePublicWorkoutPlan, 
    rateWorkoutPlan, 
    getPublicWorkoutPlans, 
    getPublicWorkoutPlansById
} = require("./publicPlanModel");
const { getWorkoutsByPlanId, addWorkoutPlan } = require("../workoutPlans/workoutPlansModel");
const { getWorkoutsById, createWorkout, addWorkoutDates, addWorkoutInstructions } = require("../workouts/workoutModel");
const { 
    addPublicPlanValidation, 
    removePublicPlanValidation,
    copyPublicPlanValidation,
    ratePlanValidation
} = require('./publicPlanValidation');
const { encodeDays } = require('../workouts/util/dayEncoder');
const { asyncHandler, createApiError } = require('../../middleware/errorHandler');
const validate = require('../../middleware/validationMiddleware');

// Add a public plan
const addPublicPlan = asyncHandler(async (req, res) => {
    const { plan_id } = req.body;
    const user_id = req.user.userId;

    const result = await getWorkoutsByPlanId(plan_id, user_id);
    if (!result || result.length === 0) {
        throw createApiError('Workout plan not found', 404);
    }

    const publicPlan = { plan_id, user_id };
    await addPublicWorkoutPlan(publicPlan);
    res.status(201).json({ message: 'Workout plan added to public database successfully', id: plan_id });
});

// Remove a public plan
const removePublicPlan = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const result = await removePublicWorkoutPlan(id);
    if (result.affectedRows === 0) {
        throw createApiError('Workout plan not found', 404);
    }

    return res.status(200).json({ message: 'Workout plan removed successfully', id: id });
});

// Rate a public plan
const ratePlan = asyncHandler(async (req, res) => {
    const { public_id, rating } = req.body;
    const user_id = req.user.userId;

    const result = await getPublicWorkoutPlansById(user_id, public_id);
    if (!result || result.length === 0) {
        throw createApiError('Workout plan not found', 404);
    }

    const userRating = { public_id, user_id, rating };
    await rateWorkoutPlan(userRating);

    return res.status(201).json({ message: 'Workout plan rated successfully', id: public_id });
});

// Copy public plan to new user
const copyPublicPlan = asyncHandler(async (req, res) => {
    const user_id = req.user.userId;
    const { plan_id } = req.params;

    // Get the public workout plan details
    const publicPlan = await getPublicWorkoutPlansById(user_id, plan_id);
    if (!publicPlan || publicPlan.length === 0) {
        throw createApiError('Public workout plan not found', 404);
    }

    // Create a new workout plan for the user
    const newPlan = {
        user_id,
        name: publicPlan[0].name,
        description: publicPlan[0].description
    };
    const newPlanResult = await addWorkoutPlan(newPlan);
    const newPlanId = newPlanResult.insertId;

    // Copy workouts associated with the public plan
    const publicWorkouts = await getWorkoutsById(0, publicPlan[0].plan_id);
    for (const workout of publicWorkouts) {
        const newWorkout = {
            user_id,
            plan_id: newPlanId,
            name: workout.name,
            nickname: workout.nickname,
            reps: workout.reps,
            sets: workout.sets,
            weight: workout.weight,
            days: encodeDays(workout.days),
            body_part: workout.body_part,
            target: workout.target,
            gif: workout.gif
        };

        const newWorkoutId = await createWorkout(newWorkout);

        // Copy workout dates
        if (workout.dates && workout.dates.length > 0) {
            await addWorkoutDates(newWorkoutId, workout.dates);
        }

        // Copy workout instructions
        if (workout.instructions && workout.instructions.length > 0) {
            await addWorkoutInstructions(newWorkoutId, workout.instructions);
        }
    }

    res.status(201).json({ message: 'Public workout plan copied successfully', id: Number(newPlanId) });
});

// Gets all public plans
const getPublicPlans = asyncHandler(async (req, res) => {
    const user_id = req.user.userId;
    const plans = await getPublicWorkoutPlans(user_id);
    return res.status(200).json(plans);
});

module.exports = {
    addPublicPlan: [addPublicPlanValidation, validate, addPublicPlan],
    removePublicPlan: [removePublicPlanValidation, validate, removePublicPlan],
    ratePlan: [ratePlanValidation, validate, ratePlan],
    getPublicPlans,
    copyPublicPlan: [copyPublicPlanValidation, validate, copyPublicPlan]
};