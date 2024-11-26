import axios from 'axios';

/**
 * Centralized axios instance configuration for different API services.
 * It handles requests to the workout API, external exercise API, and OpenAI API.
 */
const BASE_WORKOUT_URL = 'https://bytebrawn-f10e2791a888.herokuapp.com/';
const BASE_EXERCISE_URL = 'https://exercisedb.p.rapidapi.com';
const BASE_OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

/**
 * Create a default axios instance for workout API requests.
 * This instance can be used for non-authenticated requests to custom backend.
 */
export default axios.create({
    baseURL: BASE_WORKOUT_URL
});

/**
 * Create an axios instance for private, authenticated requests to the workout API.
 * This instance can be used for authenticated requests to custom backend.
 */
const axiosPrivate = axios.create({
    baseURL: BASE_WORKOUT_URL,
    withCredentials: true,
});

/**
 * Create an axios instance for the external exercise database API.
 */
const axiosExerciseDB = (() => {
    return axios.create({
        baseURL: BASE_EXERCISE_URL,
        headers: {
            'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
        },
    });
})();

/**
 * Create an axios instance for OpenAI API requests (ChatGPT).
 */
const axiosOpenAI = (() => {
    return axios.create({
        baseURL: BASE_OPENAI_URL,
        headers: {
            'Content-Type': 'application/json',
        },
    });
})();

export { axiosPrivate, axiosExerciseDB, axiosOpenAI };