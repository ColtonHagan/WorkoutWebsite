import { useEffect } from 'react';
import { axiosExerciseDB } from '../APIs/axios';
import useApiKeyService from '../services/useApiKeyService';

/**
 * Custom hook to create an Axios instance for External Exercise API requests.
 * 
 * This hook manages Axios interceptors to dynamically set the authorization
 * header using the External Exercise API key fetched from hook.
 *
 * @returns {Object} The configured Axios instance for external exercise api requests.
 */
const useAxiosExercise = () => {
    const { getExerciseApiKey } = useApiKeyService();

    useEffect(() => {
        const requestIntercept = axiosExerciseDB.interceptors.request.use(
            async (config) => {
                const key = await getExerciseApiKey();
                if (key) {
                    config.headers['x-rapidapi-key'] = key;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Cleanup function
        return () => {
            axiosExerciseDB.interceptors.request.eject(requestIntercept);
        };
    }, [getExerciseApiKey]);

    return axiosExerciseDB;
};

export default useAxiosExercise;
