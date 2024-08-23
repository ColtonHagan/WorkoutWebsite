const { createWorkout, addWorkoutDates, getWorkoutsById, deleteWorkoutById, deleteWorkoutDatesByWorkoutId, getWorkoutById } = require('./workoutModel');
const { encodeDays } = require('./util/dayEncoder');

const addWorkout = async (req, res) => {
    const { name, nickname, reps, sets, dates, plan_id, external_workout_id, weight, days, body_part, target } = req.body;
    const user_id = req.user.userId;

    try {
        const workout = {
            user_id,
            plan_id,
            external_workout_id,
            name,
            nickname,
            reps,
            sets,
            weight,
            days: days ? encodeDays(days) : 0,
            body_part,
            target
        };
        
        const workoutId = await createWorkout(workout);

        if (dates && dates.length > 0) {
            await addWorkoutDates(workoutId, dates);
        }

        console.log("Workout add:", workout);
        res.status(201).json({ message: 'Workout added successfully', id: workoutId });
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
        console.error("Error during fetching workouts:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteWorkout = async (req, res) => {
    const workoutId = req.params.id;
    const userId = req.user.userId;

    console.log("user_id " + userId);

    try {
        // Ensure the workout belongs to the user
        const workout = await getWorkoutById(userId, workoutId);
        if (!workout) {
            console.log("No workout in db: ", workoutId);
            return res.status(404).json({ error: 'Workout not found' });
        }

        await deleteWorkoutDatesByWorkoutId(workoutId); // delete dates 
        await deleteWorkoutById(workoutId);

        res.status(200).json({ message: 'Workout deleted successfully' });
    } catch (error) {
        console.error("Error during deleting workout:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    addWorkout,
    getWorkouts,
    deleteWorkout
};
