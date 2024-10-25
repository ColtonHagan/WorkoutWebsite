import { handleRequest } from './util/handleRequest';
import useAxiosOpenAI from '../hooks/useAxiosOpenAi';

const MODEL = 'gpt-3.5-turbo';
const ROLE = 'user';
const MAX_TOKENS = 10;

/**
 * Service to interact with the ChatGPT API.
 */
const useChatGPTService = () => {
    const axiosOpenAI = useAxiosOpenAI();
    
    /**
     * Retrieves a nickname based on the exercise name by querying the ChatGPT model.
     *
     * @param {string} exerciseName - The name of the exercise to generate a nickname for.
     * @returns {Promise<string>} The generated nickname.
     */
    const getNickname = async (exerciseName) => {
        const requestPayload = {
            model: MODEL,
            messages: [
                {
                    role: ROLE,
                    content: `Just return your response, no explanation. Provide shortest functional name for "${exerciseName}". Remove filler words like barbell or dumbbell. Limit 3 words (but use less if possible).`
                }
            ],
            max_tokens: MAX_TOKENS
        };

        const requestFunc = () => axiosOpenAI.post('', requestPayload);
        return handleRequest(requestFunc);
    };

    return {
        getNickname,
    };
};

export default useChatGPTService;
