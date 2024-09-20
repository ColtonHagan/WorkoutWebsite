const db = require('../../config/dbConfig');

// Adds a new workout plan
const addWorkoutPlan = async (plan) => {
    const [result] = await db.execute(
        'INSERT INTO workout_plans (user_id, name, description) VALUES (?, ?, ?)',
        [plan.user_id, plan.name, plan.description]
    );
    return result;
};

// Gets all workout plans by user id
const getWorkoutPlansByUserId = async (user_id) => {
    const [result] = await db.execute('SELECT * FROM workout_plans WHERE user_id = ?', [user_id]);
    return result;
};

// Gets a specific workout plan by ID
const getWorkoutsByPlanId = async (plan_id) => {
    const [result] = await db.execute('SELECT * FROM workout_plans WHERE id = ?', [plan_id]);
    return result;
};

// Updates an existing workout plan
const updateWorkoutPlan = async (planId, updatedPlan) => {
    const [result] = await db.execute(
        'UPDATE workout_plans SET name = ?, description = ? WHERE id = ?',
        [updatedPlan.name, updatedPlan.description, planId]
    );
    return result;
};

// Removes a workout plan from the database
const removeWorkoutPlan = async (planId) => {
    const [result] = await db.execute('DELETE FROM workout_plans WHERE id = ?', [planId]);
    return result;
};

module.exports = {
    addWorkoutPlan,
    getWorkoutPlansByUserId,
    getWorkoutsByPlanId,
    updateWorkoutPlan,
    removeWorkoutPlan,
};
