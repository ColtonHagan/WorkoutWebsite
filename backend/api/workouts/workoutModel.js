const db = require('../../config/dbConfig');


const createWorkout = async (workout) => {
    const [result] = await db.execute(
        'INSERT INTO workouts (user_id, plan_id, name, reps, sets, weight) VALUES (?, ?, ?, ?, ?, ?)',
        [workout.user_id, workout.plan_id, workout.name, workout.reps, workout.sets, workout.weight]
    );
    return result.insertId;
};

const addWorkoutDates = async (workoutId, dates) => {
    const values = dates.map(date => [workoutId, date]);
    const placeholders = dates.map(() => '(?, ?)').join(',');
    const query = `INSERT INTO workout_dates (workout_id, date) VALUES ${placeholders}`;
    await db.execute(query, values.flat());
};

const getWorkoutsById = async (user_id, plan_id) => {
    const [result] = await db.execute(
        'SELECT w.name, w.reps, w.sets, GROUP_CONCAT(wd.date) AS dates FROM workouts w LEFT JOIN workout_dates wd ON w.id = wd.workout_id WHERE w.user_id = ? AND w.plan_id = ? GROUP BY w.id',
        [user_id, plan_id]
    );

    return result.map(row => ({
        name: row.name,
        reps: row.reps,
        sets: row.sets,
        dates: row.dates ? row.dates.split(',') : []
    }));
};
module.exports = {
    createWorkout,
    addWorkoutDates,
    getWorkoutsById,
};
