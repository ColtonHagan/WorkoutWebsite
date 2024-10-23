import axios from '../APIs/axios';
import { handleRequest } from './util/handleRequest';

/**
 * Service to fetch API keys from the backend.
 */
const useApiKeyService = () => {
    const endpointUrl = "keys/";

    /**
     * Fetches the OpenAI API key from the backend.
     *
     * @returns {Promise<string>} The OpenAI API key.
     */
    const getOpenAiKey = async () => {
        const url = `${endpointUrl}openaiKey`;
        const response = await handleRequest(() => axios.get(url));
        return response?.key;
    };

    /**
     * Fetches the Exercise API key from the backend.
     *
     * @returns {Promise<string>} The Exercise API key.
     */
    const getExerciseApiKey = async () => {
        const url = `${endpointUrl}exerciseKey`;
        const response = await handleRequest(() => axios.get(url));
        return response?.key;
    };

    return {
        getOpenAiKey,
        getExerciseApiKey,
    };
};

export default useApiKeyService;