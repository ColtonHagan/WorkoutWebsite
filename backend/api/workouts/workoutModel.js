const db = require('../../config/dbConfig');

const addWorkout = async (workout) => {
    const [result] = await db.execute(
        'INSERT INTO workouts (user_id, name, reps, sets, date) VALUES (?, ?, ?, ?, ?)',
        [workout.user_id, workout.name, workout.reps, workout.sets, workout.date]
    );
    return result;
};

const getWorkoutsByUserId = async (user_id) => {
    const [rows] = await db.execute('SELECT * FROM workouts WHERE user_id = ?', [user_id]);
    return rows;
};

module.exports = {
    addWorkout,
    getWorkoutsByUserId,
};
