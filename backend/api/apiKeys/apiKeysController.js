const { createApiError } = require('../../middleware/errorHandler');
const { getOpenAiAPIKey, getExerciseAPIKey } = require('./apiKeysModel');

// Gets OpenAi API key
const getOpenAiKey = (req, res) => {
    const openAiAPIKey = getOpenAiAPIKey();
    if (!openAiAPIKey) {
        throw createApiError('OpenAi API key not found', 404);
    }

    return res.status(200).json({ key: openAiAPIKey });
};

// Gets Exercise API key
const getExerciseKey = (req, res) => {
    const exerciseApiKey = getExerciseAPIKey();
    if (!exerciseApiKey) {
        throw createApiError('Exercise API not found', 404);
    }

    return res.status(200).json({ key: exerciseApiKey });
};

module.exports = { getOpenAiKey, getExerciseKey };