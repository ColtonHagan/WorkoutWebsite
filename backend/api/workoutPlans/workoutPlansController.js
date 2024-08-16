const workoutPlanModel = require('./workoutPlansModel');

const createWorkoutPlan = async (req, res) => {
    const { name, description } = req.body;
    const user_id = req.user.userId;
    console.log("Creating plan: ", {name, description, user_id})

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

const editWorkoutPlan = async (req, res) => {
    const { planId } = req.params;
    const { name, description } = req.body;

    try {
        const updatedPlan = { name, description };
        const result = await workoutPlanModel.updateWorkoutPlan(planId, updatedPlan);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Workout plan updated successfully', id: planId});
        } else {
            res.status(404).json({ message: 'Workout plan not found' });
        }
    } catch (error) {
        console.error("Error during editing workoutPlan:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteWorkoutPlan = async (req, res) => {
    const { planId } = req.params;

    try {
        const result = await workoutPlanModel.deleteWorkoutPlan(planId);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Workout plan deleted successfully', id: planId});
        } else {
            res.status(404).json({ message: 'Workout plan not found' });
        }
    } catch (error) {
        console.error("Error during deleting workoutPlan:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createWorkoutPlan,
    getWorkoutPlans,
    getWorkoutsByPlan,
    editWorkoutPlan,
    deleteWorkoutPlan
};
