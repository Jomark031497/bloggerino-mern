const express = require('express');

const router = express.Router();
const { registerUser, loginUser, checkTokenValidity } = require('../../controllers/userController');

// METHOD: POST
// DESC: Register a user
// auth: false
router.post('/register', registerUser);

// METHOD: POST
// DESC: Login a user
// auth: true
router.post('/login', loginUser);


// METHOD: POST
// DESC: Check token of user
// auth: true
router.post('/isTokenValid', checkTokenValidity);

module.exports = router;
