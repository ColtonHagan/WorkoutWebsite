const db = require('../../config/dbConfig');


const createWorkoutPlan = async (plan) => {
    const [result] = await db.execute(
        'INSERT INTO workout_plans (user_id, name, description) VALUES (?, ?, ?)',
        [plan.user_id, plan.name, plan.description]
    );
    return result;
};

const getWorkoutPlansByUserId = async (user_id) => {
    const [result] = await db.execute('SELECT * FROM workout_plans WHERE user_id = ?', [user_id]);
    return result;
};

const getWorkoutsByPlanId = async (plan_id) => {
    const [result] = await db.execute('SELECT * FROM workout_plans WHERE id = ?', [plan_id]);
    return result;
};

const updateWorkoutPlan = async (planId, updatedPlan) => {
    const [result] = await db.execute(
        'UPDATE workout_plans SET name = ?, description = ? WHERE id = ?',
        [updatedPlan.name, updatedPlan.description, planId]
    );
    return result;
};

const deleteWorkoutPlan = async (planId) => {
    const [result] = await db.execute('DELETE FROM workout_plans WHERE id = ?', [planId]);
    return result;
};

module.exports = {
    createWorkoutPlan,
    getWorkoutPlansByUserId,
    getWorkoutsByPlanId,
    updateWorkoutPlan,
    deleteWorkoutPlan,
};
