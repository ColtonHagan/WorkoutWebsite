import { useState, useEffect } from 'react';
import useWorkoutPlanService from '../services/useWorkoutPlanServices';

/**
 * Custom hook to fetch workout plans and create useState for them.
 *
 * @returns {UseState} An useState workout plans.
 */
const useFetchWorkoutPlans = () => {
    const [workoutPlans, setWorkoutPlans] = useState([]);
    const { fetchPlans } =  useWorkoutPlanService();

    useEffect(() => {
        const fetchWorkoutPlans = async () => {
            try {
                const response = await fetchPlans();
                setWorkoutPlans(response);
            } catch (err) {
                console.error("Error fetching workouts", err);
            }
        };

        fetchWorkoutPlans();
    }, []);

    return { workoutPlans, setWorkoutPlans };
};

export default useFetchWorkoutPlans;