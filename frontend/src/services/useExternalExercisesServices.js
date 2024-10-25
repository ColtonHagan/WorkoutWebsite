import { handleRequest } from './util/handleRequest';
import useAxiosExercise from '../hooks/useAxiosExercise';

/**
 * Service to interact with the external exercise API.
 */
const useExternalExercisesServices = () => {
    const endpointUrl = '/exercises';
    const axiosExerciseDB = useAxiosExercise();

    /**
     * Fetch exercises with pagination.
     *
     * @param {number} limit - The maximum number of exercises to fetch.
     * @param {number} offset - The number of exercises to skip.
     * @returns {Promise<Object>} The fetched exercises data.
     */
    const fetchExercises = async (limit, offset) => {
        const url = `${endpointUrl}?limit=${limit}&offset=${offset}`;
        return handleRequest(() => axiosExerciseDB.get(url));
    };

    /**
     * Fetch body parts for exercises.
     *
     * @returns {Promise<Array<Strings>>} The fetched body parts data.
     */
    const fetchBodyParts = async () => {
        const url = `${endpointUrl}/bodyPartList`;
        return handleRequest(() => axiosExerciseDB.get(url));
    };

    return {
        fetchExercises,
        fetchBodyParts,
    };
};

export default useExternalExercisesServices;
