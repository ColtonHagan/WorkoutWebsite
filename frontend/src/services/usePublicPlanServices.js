import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { handleRequest } from './util/handleRequest';

/**
 * Service to interact with my Public Workout Plans API.
 */
const usePublicPlanServices = () => {
    const axiosPrivate = useAxiosPrivate();
    const endpointUrl = 'publicPlans/';

    /**
     * Fetch public plans.
     *
     * @returns {Promise<Object>} The fetched public plans data.
     */
    const fetchPublicPlans = async () => {
        return handleRequest(() => axiosPrivate.get(endpointUrl));
    };

    /**
     * Add a new public plan.
     *
     * @param {string} plan - The ID of the plan to add.
     * @returns {Promise<Integer>} The response from the server after adding the plan.
     */
    const addPublicPlan = async (plan) => {
        return handleRequest(() => axiosPrivate.post(endpointUrl, { plan_id: plan }));
    };

    /**
     * Rate a public plan.
     *
     * @param {string} id - The ID of the public plan to rate.
     * @param {number} rating - The rating to assign to the public plan.
     * @returns {Promise<Object>} The response from the server after rating the plan.
     */
    const ratePublicPlan = async (id, rating) => {
        const url = `${endpointUrl}rate`;
        return handleRequest(() => axiosPrivate.post(url, { public_id: id, rating }));
    };

    /**
     * Copy public plan.
     *
     * @param {string} plan - The ID of the plan to add.
     * @returns {Promise<Object>} The response from the server after copying the plan.
     */
    const copyPublicPlan = async (plan_id) => {
        const url = `${endpointUrl}/copy/${plan_id}`;
        return handleRequest(() => axiosPrivate.post(url));
    };

    /**
     * Delete a public plan by ID.
     *
     * @param {string} id - The ID of the public plan to delete.
     * @returns {Promise<Integer>} The response from the server after deleting the plan.
     */
    const deletePublicPlan = async (id) => {
        const url = `${endpointUrl}${id}`;
        return handleRequest(() => axiosPrivate.delete(url));
    };

    return {
        fetchPublicPlans,
        addPublicPlan,
        ratePublicPlan,
        deletePublicPlan,
        copyPublicPlan
    };
};

export default usePublicPlanServices;