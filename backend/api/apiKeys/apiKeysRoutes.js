const express = require('express');
const { getOpenAiKey, getExerciseKey } = require('./apiKeysController');

const router = express.Router();

// Route to get OpenAi API key
router.get('/openaiKey', getOpenAiKey);

// Route to get Exercise API key
router.get('/exerciseKey', getExerciseKey);

module.exports = router;