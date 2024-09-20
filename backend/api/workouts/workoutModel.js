const db = require('../../config/dbConfig');
const { decodeDays } = require('./util/dayEncoder');

// Adds a new workout
const createWorkout = async (workout) => {
    const [result] = await db.execute(
        'INSERT INTO workouts (user_id, plan_id, name, nickname, reps, sets, weight, days, body_part, target, gif) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [workout.user_id, workout.plan_id, workout.name, workout.nickname, workout.reps, workout.sets, workout.weight, workout.days, workout.body_part, workout.target, workout.gif]
    );
    return result.insertId;
};

// Updates a new workout
const updateWorkouts = async (workoutId, updates) => {
    const fieldsToUpdate = [];
    const values = [];

    if (updates.reps !== undefined) {
        fieldsToUpdate.push('reps = ?');
        values.push(updates.reps);
    }
    if (updates.sets !== undefined) {
        fieldsToUpdate.push('sets = ?');
        values.push(updates.sets);
    }
    if (updates.weight !== undefined) {
        fieldsToUpdate.push('weight = ?');
        values.push(updates.weight);
    }
    if (updates.days !== undefined) {
        fieldsToUpdate.push('days = ?');
        values.push(updates.days);
    }

    if (fieldsToUpdate.length === 0) {
        return null;
    }

    values.push(workoutId);
    const query = `UPDATE workouts SET ${fieldsToUpdate.join(', ')} WHERE id = ?`;

    console.log("Query:", query);
    console.log("Values:", values);

    const results = await db.execute(query, values);
    console.log("results", results);
    return results;
};

// Adds dates for a workout
const addWorkoutDates = async (workoutId, dates) => {
    const values = dates.map(date => [workoutId, date]);
    const placeholders = dates.map(() => '(?, ?)').join(',');
    const query = `INSERT INTO workout_dates (workout_id, date) VALUES ${placeholders}`;
    await db.execute(query, values.flat());
};

// Deletes a workout
const deleteWorkoutById = async (workoutId, userId) => {
    const [result] = await db.execute(
        'DELETE FROM workouts WHERE id = ? AND user_id = ?',
        [workoutId, userId]
    );
    return result;
};

// Deletes workout dates assocated with a workout id 
const deleteWorkoutDatesByWorkoutId = async (workoutId) => {
    await db.execute('DELETE FROM workout_dates WHERE workout_id = ?', [workoutId]);
};

// Deletes workout instructions assocated with a workout id 
const deleteWorkoutInstructionsByWorkoutId = async (workoutId) => {
    await db.execute('DELETE FROM workout_instructions WHERE workout_id = ?', [workoutId]);
};

// Adds instructions for a workout
const addWorkoutInstructions = async (workoutId, instructions) => {
    const values = instructions.map((instruction, index) => [workoutId, index, instruction]);
    const placeholders = values.map(() => '(?, ?, ?)').join(',');
    const query = `INSERT INTO workout_instructions (workout_id, step_number, instruction) VALUES ${placeholders}`;
    await db.execute(query, values.flat());
};

// Gets a workout by its its
const getWorkoutById = async (user_id, workoutId) => {
    const [result] = await db.execute(
        `SELECT 
            w.id, w.gif, w.name, w.nickname, w.reps, w.sets, w.weight, w.days, w.body_part, w.target,
            dates.dates,
            instructions.instructions
        FROM workouts w
        LEFT JOIN (
            SELECT workout_id, GROUP_CONCAT(date ORDER BY date ASC SEPARATOR ',') AS dates
            FROM workout_dates
            GROUP BY workout_id
        ) AS dates ON w.id = dates.workout_id
        LEFT JOIN (
            SELECT workout_id, GROUP_CONCAT(instruction ORDER BY step_number ASC SEPARATOR ';') AS instructions
            FROM workout_instructions
            GROUP BY workout_id
        ) AS instructions ON w.id = instructions.workout_id
        WHERE w.user_id = ? AND w.id = ?`,
        [user_id, workoutId]
    );

    //Grabs the first (and only workout)
    const row = result[0];
    if (row == null) return null;

    return {
        id: row.id,
        name: row.name,
        nickname: row.nickname,
        reps: row.reps,
        sets: row.sets,
        weight: parseFloat(row.weight),
        dates: row.dates ? row.dates.split(',') : [],
        days: decodeDays(row.days),
        gif: row.gif,
        body_part: row.body_part,
        target: row.target,
        instructions: row.instructions ? row.instructions.split(';') : []
    };
};

// Gets a workout from a workout plan
const getWorkoutsById = async (user_id, plan_id) => {
    const [result] = await db.execute(
        `SELECT 
            w.id, w.gif, w.name, w.nickname, w.reps, w.sets, w.weight, w.days, w.body_part, w.target,
            dates.dates,
            instructions.instructions
        FROM workouts w
        LEFT JOIN (
            SELECT workout_id, GROUP_CONCAT(date ORDER BY date ASC SEPARATOR ',') AS dates
            FROM workout_dates
            GROUP BY workout_id
        ) AS dates ON w.id = dates.workout_id
        LEFT JOIN (
            SELECT workout_id, GROUP_CONCAT(instruction ORDER BY step_number ASC SEPARATOR ';') AS instructions
            FROM workout_instructions
            GROUP BY workout_id
        ) AS instructions ON w.id = instructions.workout_id
        WHERE w.user_id = ? AND w.plan_id = ?`,
        [user_id, plan_id]
    );

    return result.map(row => ({
        id: row.id,
        name: row.name,
        nickname: row.nickname,
        reps: row.reps,
        sets: row.sets,
        weight: parseFloat(row.weight),
        dates: row.dates ? row.dates.split(',') : [],
        days: decodeDays(row.days),
        gif: row.gif,
        body_part: row.body_part,
        target: row.target,
        instructions: row.instructions ? row.instructions.split(';') : []
    }));
};

module.exports = {
    createWorkout,
    updateWorkouts,
    addWorkoutDates,
    addWorkoutInstructions,
    getWorkoutsById,
    deleteWorkoutById,
    deleteWorkoutDatesByWorkoutId,
    deleteWorkoutInstructionsByWorkoutId,
    getWorkoutById
};
