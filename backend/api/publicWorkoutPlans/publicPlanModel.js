const db = require('../../config/dbConfig');

const addPublicWorkoutPlan = async (publicPlan) => {
    const [result] = await db.execute(
        'INSERT INTO public_workout_plans (plan_id, user_id) VALUES (?, ?)',
        [publicPlan.plan_id, publicPlan.user_id]
    );
    return result;
};

const removePublicWorkoutPlan = async (id) => {
    const [result] = await db.execute('DELETE FROM public_workout_plans WHERE id = ?', [id]);
    return result;
};

const rateWorkoutPlan = async (userRating) => {
    const [result] = await db.execute(
        'INSERT INTO user_ratings (public_id, user_id, rating) VALUES (?, ?, ?)',
        [userRating.public_id, userRating.user_id, userRating.rating]
    );
    return result;
};

const getPublicWorkoutPlans = async () => {
    const [rows] = await db.execute(
        `SELECT 
            pwp.id,
            pwp.plan_id,
            wp.name, 
            wp.description, 
            COALESCE(ROUND(AVG(ur.rating), 1), 0.0) AS average_rating, 
            pwp.date 
         FROM public_workout_plans pwp
         JOIN workout_plans wp ON pwp.plan_id = wp.id
         LEFT JOIN user_ratings ur ON pwp.id = ur.public_id
         GROUP BY pwp.id, wp.name, wp.description, pwp.date`
    );
    /*return rows.map(row => ({
        ...row,
        average_rating: parseFloat(row.average_rating).toFixed(1)
    }));*/
    return rows;
};

module.exports = {
    addPublicWorkoutPlan,
    removePublicWorkoutPlan,
    rateWorkoutPlan,
    getPublicWorkoutPlans
};
