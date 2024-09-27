import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { handleRequest } from './util/handleRequest';

/**
 * Service to interact with my Workout Plans API.
 */
const useWorkoutPlanService = () => {
    const axiosPrivate = useAxiosPrivate();
    const endpointUrl = 'workouts/workoutPlans/';

    /**
     * Fetch all workout plans.
     *
     * @returns {Promise<Object>} A promise that resolves to an array of workout plans.
     */
    const fetchPlans = async () => {
        return handleRequest(() => axiosPrivate.get(endpointUrl));
    };

    /**
     * Add a new workout plan.
     *
     * @param {Object} plan - The workout plan to add.
     * @returns {Promise<Object>} A promise that resolves to the added workout plan.
     */
    const addPlan = async (plan) => {
        return handleRequest(() => axiosPrivate.post(endpointUrl, plan));
    };

    /**
     * Delete a workout plan by ID.
     *
     * @param {number} id - The ID of the workout plan to delete.
     * @returns {Promise<Object>} A promise that resolves when the plan is deleted.
     */
    const deletePlan = async (id) => {
        const url = `${endpointUrl}${id}`;
        return handleRequest(() => axiosPrivate.delete(url));
    };

    /**
     * Edit a workout plan by ID.
     *
     * @param {number} id - The ID of the workout plan to edit.
     * @param {Object} plan - The updated workout plan data.
     * @returns {Promise<Object>} A promise that resolves to the updated workout plan.
     */
    const editPlan = async (id, plan) => {
        const url = `${endpointUrl}${id}`;
        return handleRequest(() => axiosPrivate.put(url, plan));
    };

    return {
        fetchPlans,
        addPlan,
        deletePlan,
        editPlan,
    };
};

export default useWorkoutPlanService;