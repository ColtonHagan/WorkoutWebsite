const {
    addWorkoutPlan,
    getWorkoutPlansByUserId,
    getWorkoutsByPlanId,
    updateWorkoutPlan,
    removeWorkoutPlan,
} = require('./workoutPlansModel');
const {
    createWorkoutPlanValidation,
    updateWorkoutPlanValidation,
    getWorkoutsByPlanValidation,
    deleteWorkoutPlanValidation
} = require("./workoutPlanValidation");
const {
    getPublicWorkoutPlanByPlanId,
    removePublicWorkoutPlanByPlanId
} = require("../publicWorkoutPlans/publicPlanModel")
const { asyncHandler, createApiError } = require('../../middleware/errorHandler');
const validate = require('../../middleware/validationMiddleware');

// Creates a workout plan
const createWorkoutPlan = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    const user_id = req.user.userId;

    const plan = { user_id, name, description };
    const result = await addWorkoutPlan(plan);
    return res.status(201).json({ message: 'Workout plan created successfully', planId: result.insertId });
});

// Gets all workout plans
const getWorkoutPlans = asyncHandler(async (req, res) => {
    const user_id = req.user.userId;
    const plans = await getWorkoutPlansByUserId(user_id);
    return res.status(200).json(plans);
});

// Gets all workouts from a plan
const getWorkoutsByPlan = asyncHandler(async (req, res) => {
    const { planId } = req.params;
    const workouts = await getWorkoutsByPlanId(planId);
    return res.status(200).json(workouts);
});

// Updates a workout plan
const editWorkoutPlan = asyncHandler(async (req, res) => {
    const { planId } = req.params;
    const { name, description } = req.body;

    const updatedPlan = { name, description };
    const result = await updateWorkoutPlan(planId, updatedPlan);

    if (!result || result.affectedRows === 0) {
        throw createApiError('Workout plan not found', 404);
    }
    return res.status(200).json({ message: 'Workout plan updated successfully', id: Number(planId) });
});

// Deletes a workout plan
const deleteWorkoutPlan = asyncHandler(async (req, res) => {
    const user_id = req.user.userId;
    const { planId } = req.params;

    // Checks if it is public plan database and deletes it if it is
    const public = await getPublicWorkoutPlanByPlanId(user_id, planId);
    if(public) {
        await removePublicWorkoutPlanByPlanId(planId);
    }

    const result = await removeWorkoutPlan(planId);

    if (!result || result.affectedRows === 0) {
        throw createApiError('Workout plan not found', 404);
    }
    return res.status(200).json({ message: 'Workout plan deleted successfully', id: Number(planId) });
});

module.exports = {
    createWorkoutPlan: [createWorkoutPlanValidation, validate, createWorkoutPlan],
    getWorkoutPlans,
    getWorkoutsByPlan: [getWorkoutsByPlanValidation, validate, getWorkoutsByPlan],
    editWorkoutPlan: [updateWorkoutPlanValidation, validate, editWorkoutPlan],
    deleteWorkoutPlan: [deleteWorkoutPlanValidation, validate, deleteWorkoutPlan]
};
