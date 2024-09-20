import axios from 'axios';
const BASE_WORKOUT_URL = 'http://localhost:5000/api/';
const BASE_EXERCISE_URL = 'https://exercisedb.p.rapidapi.com';
//const BASE_EXERCISE_GIF_URL = 'https://exercise-gif-api-989b2a8bed95.herokuapp.com';
const BASE_EXERCISE_GIF_URL = 'http://localhost:3001';


export default axios.create({
    baseURL: BASE_WORKOUT_URL
});

export const axiosExerciseGif = axios.create({
    baseURL: BASE_EXERCISE_GIF_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_WORKOUT_URL,
    withCredentials: true
});

export const axiosExerciseDB = axios.create({
    baseURL: BASE_EXERCISE_URL,
    headers: {
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_EXERCISE_API_KEY
    }
});