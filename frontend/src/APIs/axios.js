import axios from 'axios';

/**
 * Centralized axios instance configuration for different API services.
 * It handles requests to the workout API, external exercise API, and OpenAI API.
 */
const BASE_WORKOUT_URL = 'http://localhost:5000/api/';
const BASE_EXERCISE_URL = 'https://exercisedb.p.rapidapi.com';
const BASE_OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

/**
 * Create a default axios instance for workout API requests.
 * This instance can be used for non-authenticated requests.
 */
export default axios.create({
    baseURL: BASE_WORKOUT_URL
});

/**
 * Create an axios instance for private, authenticated requests to the workout API.
 * This instance ensures credentials (cookies) are sent with each request.
 */
const axiosPrivate = axios.create({
    baseURL: BASE_WORKOUT_URL,
    withCredentials: true, // Automatically send cookies for authentication
});

/**
 * Create an axios instance to interact with the external exercise database API.
 */
const axiosExerciseDB = (() => {
    if (!process.env.REACT_APP_EXERCISE_API_KEY) {
        console.error('Missing Exercise API key! Please check your .env file.');
    }

    return axios.create({
        baseURL: BASE_EXERCISE_URL,
        headers: {
            'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
            'x-rapidapi-key': process.env.REACT_APP_EXERCISE_API_KEY,
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