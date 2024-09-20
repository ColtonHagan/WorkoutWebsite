const db = require('../../config/dbConfig');

// Add/update public workout plan
const addPublicWorkoutPlan = async (publicPlan) => {
    const [result] = await db.execute(
        `INSERT INTO public_workout_plans (plan_id, user_id) 
         VALUES (?, ?)
         ON DUPLICATE KEY UPDATE date = CURRENT_TIMESTAMP()`,
        [publicPlan.plan_id, publicPlan.user_id]
    );
    return result;
};

// Remove a public workout plan by ID
const removePublicWorkoutPlan = async (id) => {
    const [result] = await db.execute('DELETE FROM public_workout_plans WHERE id = ?', [id]);
    return result;
};

// Rate a public workout plan
const rateWorkoutPlan = async (userRating) => {
    const [result] = await db.execute(
        `INSERT INTO user_ratings (public_id, user_id, rating)
         VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE rating = VALUES(rating)`,
        [userRating.public_id, userRating.user_id, userRating.rating]
    );
    return result;
};

// Get a public workout plan by ID, including ratings
const getPublicWorkoutPlansById = async (user_id, id) => {
    const query = `
        SELECT 
            pwp.id,
            pwp.plan_id,
            wp.name, 
            wp.description, 
            COALESCE(ROUND(AVG(ur.rating), 1), 0.0) AS average_rating,
            (
                SELECT ur2.rating 
                FROM user_ratings ur2 
                WHERE ur2.public_id = pwp.id AND ur2.user_id = ?
            ) AS user_rating,
            pwp.date 
        FROM public_workout_plans pwp
        JOIN workout_plans wp ON pwp.plan_id = wp.id
        LEFT JOIN user_ratings ur ON pwp.id = ur.public_id
        WHERE pwp.id = ?
        GROUP BY pwp.id, wp.name, wp.description, pwp.date
    `;

    const [rows] = await db.execute(query, [user_id, id]);
    return rows;
};

// Get all public workout plans, including ratings
const getPublicWorkoutPlans = async (user_id) => {
    const query = `
        SELECT 
            pwp.id,
            pwp.plan_id,
            wp.name, 
            wp.description, 
            COALESCE(ROUND(AVG(ur.rating), 1), 0.0) AS average_rating,
            (
                SELECT ur2.rating 
                FROM user_ratings ur2 
                WHERE ur2.public_id = pwp.id AND ur2.user_id = ?
            ) AS user_rating,
            pwp.date 
        FROM public_workout_plans pwp
        JOIN workout_plans wp ON pwp.plan_id = wp.id
        LEFT JOIN user_ratings ur ON pwp.id = ur.public_id
        GROUP BY pwp.id, wp.name, wp.description, pwp.date
    `;

    const [rows] = await db.execute(query, [user_id]);
    return rows;
};

module.exports = {
    addPublicWorkoutPlan,
    removePublicWorkoutPlan,
    rateWorkoutPlan,
    getPublicWorkoutPlans,
    getPublicWorkoutPlansById
};
