const { 
    addPublicWorkoutPlan, 
    removePublicWorkoutPlan, 
    rateWorkoutPlan, 
    getPublicWorkoutPlans, 
    getPublicWorkoutPlansById 
} = require("./publicPlanModel");
const { getWorkoutsByPlanId } = require("../workoutPlans/workoutPlansModel");
const { 
    addPublicPlanValidation, 
    removePublicPlanValidation, 
    ratePlanValidation 
} = require('./publicPlanValidation');
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
    getPublicPlans
};