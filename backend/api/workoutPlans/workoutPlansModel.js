const db = require('../../config/dbConfig');


const createWorkoutPlan = async (plan) => {
    const [result] = await db.execute(
        'INSERT INTO workout_plans (user_id, name, description) VALUES (?, ?, ?)',
        [plan.user_id, plan.name, plan.description]
    );
    return result;
};

const getWorkoutPlansByUserId = async (user_id) => {
    const [rows] = await db.execute('SELECT * FROM workout_plans WHERE user_id = ?', [user_id]);
    return rows;
};

const getWorkoutsByPlanId = async (plan_id) => {
    const [rows] = await db.execute('SELECT * FROM workout_plans WHERE id = ?', [plan_id]);
    return rows;
};

module.exports = {
    createWorkoutPlan,
    getWorkoutPlansByUserId,
    getWorkoutsByPlanId,
};
