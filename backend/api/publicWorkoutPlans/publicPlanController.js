const { addPublicWorkoutPlan, removePublicWorkoutPlan, rateWorkoutPlan, getPublicWorkoutPlans } = require("./publicPlanModel");

const addPublicPlan = async (req, res) => {
    const { plan_id } = req.body;
    const user_id = req.user.userId;

    console.log({plan_id, user_id})

    try {
        const publicPlan = {
            plan_id,
            user_id
        };
        await addPublicWorkoutPlan(publicPlan);
        res.status(201).json({ message: 'Workout plan added to public successfully' });
    } catch (error) {
        console.error("Error adding public workout plan:", error);
        res.status(500).json({ error: 'Adding workout plans' });
    }
};

const removePublicPlan = async (req, res) => {
    const { id } = req.params;

    try {
        await removePublicWorkoutPlan(id);
        res.status(200).json({ message: 'Workout plan removed from public successfully' });
    } catch (error) {
        console.error("Error removing public workout plan:", error);
        res.status(500).json({ error: 'Removing workout plans' });
    }
};

const ratePlan = async (req, res) => {
    const { public_id, rating } = req.body;
    const user_id = req.user.userId;

    try {
        const userRating = {
            public_id,
            user_id,
            rating
        };
        await rateWorkoutPlan(userRating);
        res.status(201).json({ message: 'Workout plan rated successfully' });
    } catch (error) {
        console.error("Error rating workout plan:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const getPublicPlans = async (req, res) => {
    try {
        const plans = await getPublicWorkoutPlans();
        res.status(200).json(plans);
    } catch (error) {
        console.error("Error getting public workout plans:", error);
        res.status(500).json({ error: 'Getting public workout plans' });
    }
};

module.exports = {
    addPublicPlan,
    removePublicPlan,
    ratePlan,
    getPublicPlans
};
