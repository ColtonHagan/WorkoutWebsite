const workoutPlanModel = require('./workoutPlansModel');

const createWorkoutPlan = async (req, res) => {
    const { name, description } = req.body;
    const user_id = req.user.userId;

    try {
        const plan = {
            user_id,
            name,
            description,
        };
        const result = await workoutPlanModel.createWorkoutPlan(plan);
        res.status(201).json({ message: 'Workout plan created successfully', planId: result.insertId });
    } catch (error) {
        console.error("Error during adding workoutPlan:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getWorkoutPlans = async (req, res) => {
    const user_id = req.user.userId;

    try {
        const plans = await workoutPlanModel.getWorkoutPlansByUserId(user_id);
        res.status(200).json(plans);
    } catch (error) {
        console.error("Error during getting workoutPlan:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getWorkoutsByPlan = async (req, res) => {
    const { planId } = req.params;

    try {
        const workouts = await workoutPlanModel.getWorkoutsByPlanId(planId);
        res.status(200).json(workouts);
    } catch (error) {
        console.error("Error during getting workouts by plan:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createWorkoutPlan,
    getWorkoutPlans,
    getWorkoutsByPlan,
};
