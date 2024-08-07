const express = require('express');
const { register, login, refresh, logout } = require('./userController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/refresh', refresh);
router.post('/logout', logout);

module.exports = router;
