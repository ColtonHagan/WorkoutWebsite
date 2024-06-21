const { createWorkout, addWorkoutDates, getWorkoutsById } = require('./workoutModel');
const { encodeDays } = require('./util/dayEncoder');

const addWorkout = async (req, res) => {
    const { name, reps, sets, dates, plan_id, weight, days } = req.body;
    const user_id = req.user.userId;

    try {
        const workout = {
            user_id,
            plan_id,
            name,
            reps,
            sets,
            weight,
            days: days ? encodeDays(days) : 0
        };
        const workoutId = await createWorkout(workout);

        if (dates && dates.length > 0) {
            await addWorkoutDates(workoutId, dates);
        }

        res.status(201).json({ message: 'Workout added successfully' });
    } catch (error) {
        console.error("Error during creating workout:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getWorkouts = async (req, res) => {
    const userId = req.user.userId;
    const { planId } = req.params;

    try {
        const workouts = await getWorkoutsById(userId, planId);
        res.status(200).json(workouts);
    } catch (error) {
        console.error("Error during fetching workout:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    addWorkout,
    getWorkouts,
};
