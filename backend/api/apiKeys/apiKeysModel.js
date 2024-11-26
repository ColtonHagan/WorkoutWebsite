// Gets penAi key
const getOpenAiAPIKey = () => {
    return process.env.CHATGPT_API_KEY;
};

// Gets external Exercise Api Key
const getExerciseAPIKey = () => {
    return process.env.EXERCISE_API_KEY;
};

module.exports = {
    getOpenAiAPIKey,
    getExerciseAPIKey
};