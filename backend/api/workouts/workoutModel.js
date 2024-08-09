const db = require('../../config/dbConfig');
const { decodeDays } = require('./util/dayEncoder');

const createWorkout = async (workout) => {
    const [result] = await db.execute(
        'INSERT INTO workouts (user_id, plan_id, external_workout_id, name, reps, sets, weight, days, body_part, target_muscle) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [workout.user_id, workout.plan_id, workout.external_workout_id, workout.name, workout.reps, workout.sets, workout.weight, workout.days, workout.body_part, workout.target_muscle]
    );
    return result.insertId;
};

const addWorkoutDates = async (workoutId, dates) => {
    const values = dates.map(date => [workoutId, date]);
    const placeholders = dates.map(() => '(?, ?)').join(',');
    const query = `INSERT INTO workout_dates (workout_id, date) VALUES ${placeholders}`;
    await db.execute(query, values.flat());
};

const deleteWorkoutById = async (workoutId) => {
    await db.execute('DELETE FROM workouts WHERE id = ?', [workoutId]);
};

const deleteWorkoutDatesByWorkoutId = async (workoutId) => {
    await db.execute('DELETE FROM workout_dates WHERE workout_id = ?', [workoutId]);
};

const getWorkoutById = async (userId, workoutId) => {
    const [result] = await db.execute(
        'SELECT w.id, external_workout_id, w.name, w.reps, w.sets, w.weight, w.days, w.body_part, w.target_muscle, GROUP_CONCAT(wd.date) AS dates FROM workouts w LEFT JOIN workout_dates wd ON w.id = wd.workout_id WHERE w.user_id = ? AND w.id = ? GROUP BY w.id',
        [userId, workoutId]
    );

    if (result.length === 0) {
        return null;
    }

    const row = result[0];

    return {
        id: row.id,
        external_workout_id: row.external_workout_id.toString().padStart(4, '0'),
        name: row.name,
        reps: row.reps,
        sets: row.sets,
        weight: parseFloat(row.weight),
        dates: row.dates ? row.dates.split(',') : [],
        days: decodeDays(row.days),
        body_part: row.body_part,
        target_muscle: row.target_muscle
    };
};

const getWorkoutsById = async (user_id, plan_id) => {
    const [result] = await db.execute(
        'SELECT w.id, external_workout_id, w.name, w.reps, w.sets, w.weight, w.days, w.body_part, w.target_muscle, GROUP_CONCAT(wd.date) AS dates FROM workouts w LEFT JOIN workout_dates wd ON w.id = wd.workout_id WHERE w.user_id = ? AND w.plan_id = ? GROUP BY w.id',
        [user_id, plan_id]
    );

    return result.map(row => ({
        id: row.id,
        external_workout_id: row.external_workout_id.toString().padStart(4, '0'),
        name: row.name,
        reps: row.reps,
        sets: row.sets,
        weight: parseFloat(row.weight),
        dates: row.dates ? row.dates.split(',') : [],
        days: decodeDays(row.days),
        body_part: row.body_part,
        target_muscle: row.target_muscle
    }));
};

module.exports = {
    createWorkout,
    addWorkoutDates,
    getWorkoutsById,
    getWorkoutById,
    deleteWorkoutById,
    deleteWorkoutDatesByWorkoutId
};
