import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { handleRequest } from './util/handleRequest';

/**
 * Service to interact with my Workouts API.
 */
const useWorkoutService = () => {
    const axiosPrivate = useAxiosPrivate();
    const endpointUrl = 'workouts/'

    /**
     * Fetch workouts by plan ID.
     *
     * @param {number} planId - The ID of the workout plan.
     * @returns {Promise<Object>} A promise that resolves to an array of workouts.
     */
    const fetchWorkouts = async (planId) => {
        const url = `${endpointUrl}${planId}/workout`;
        return handleRequest(() => axiosPrivate.get(url));
    };

    /**
     * Add a new workout.
     *
     * @param {Object} workoutData - The workout data to add.
     * @param {number} selectedPlan - The ID of the plan to associate the workout with.
     * @returns {Promise<Object>} A promise that resolves to the added workout data.
     */
    const addWorkout = async (workoutData, selectedPlan) => {
        const workout = { ...workoutData, plan_id: selectedPlan };
        return handleRequest(() => axiosPrivate.post(endpointUrl, workout));
    };

    /**
     * Delete a workout by ID.
     *
     * @param {number} id - The ID of the workout to delete.
     * @returns {Promise<Object>} A promise that resolves when the workout is deleted.
     */
    const deleteWorkout = async (id) => {
        const url = `${endpointUrl}${id}`;
        return handleRequest(() => axiosPrivate.delete(url));
    };

    /**
     * Edit a workout by ID.
     *
     * @param {number} id - The ID of the workout to edit.
     * @param {Object} workout - The updated workout data.
     * @returns {Promise<Object>} A promise that resolves to the updated workout data.
     */
    const editWorkout = async (id, workout) => {
        const url = `${endpointUrl}${id}`;
        return handleRequest(() => axiosPrivate.put(url, workout));
    };

    return {
        fetchWorkouts,
        addWorkout,
        deleteWorkout,
        editWorkout
    };
};

export default useWorkoutService;
