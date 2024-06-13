const workoutModel = require('./workoutModel');

const addWorkout = async (req, res) => {
    const { name, reps, sets, date } = req.body;
    const user_id = req.user.userId;

    try {
        const workout = {
            user_id,
            name,
            reps,
            sets,
            date
        };
        await workoutModel.addWorkout(workout);
        res.status(201).json({ message: 'Workout added successfully' });
    } catch (error) {
        console.error("Error during adding workout:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getWorkouts = async (req, res) => {
    const user_id = req.user.userId;

    try {
        const workouts = await workoutModel.getWorkoutsByUserId(user_id);
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
