import { useState, useEffect } from 'react';
import useWorkoutPlanService from '../services/useWorkoutPlanServices';

/**
 * Custom hook to fetch workout plans from the workout plan service.
 *
 * @returns {UseState} An object containing the workout plans and a function to update them.
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