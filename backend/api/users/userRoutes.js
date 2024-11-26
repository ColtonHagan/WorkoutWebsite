const express = require('express');
const { register, login, refresh, logout } = require('./userController');

const router = express.Router();

// Route to register a new user
router.post('/register', register);

// Route to login an existing user
router.post('/login', login);

// Route to refresh access token
router.get('/refresh', refresh);

// Route to log out a user
router.post('/logout', logout);

module.exports = router;
