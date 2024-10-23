import { useEffect } from 'react';
import { axiosOpenAI } from '../APIs/axios';
import useApiKeyService from '../services/useApiKeyService';

/**
 * Custom hook to create an Axios instance for OpenAI requests.
 * 
 * This hook manages Axios interceptors to dynamically set the authorization
 * header using the OpenAI API key fetched from hook.
 *
 * @returns {Object} The configured Axios instance for OpenAI requests.
 */
const useAxiosOpenAI = () => {
    const { getOpenAiKey } = useApiKeyService();

    useEffect(() => {
        const requestIntercept = axiosOpenAI.interceptors.request.use(
            async (config) => {
                const key = await getOpenAiKey();
                if (key) {
                    config.headers['Authorization'] = `Bearer ${key}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Cleanup function
        return () => {
            axiosOpenAI.interceptors.request.eject(requestIntercept);
        };
    }, [getOpenAiKey]);

    return axiosOpenAI;
};

export default useAxiosOpenAI;
