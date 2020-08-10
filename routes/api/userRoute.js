const express = require('express');
const router = express.Router();
const { registerUser, loginUser, checkTokenValidity, authenticateUser, getUsersList } = require('../../controllers/userController');
const auth = require('../../middlewares/verifyToken');

const User = require('../../models/UserModel');

// METHOD:  POST
// DESC:    REGISTER A NEW USER
// ACCESS:  PUBLIC
router.post('/register', registerUser);

// METHOD:  POST
// DESC:    LOGIN A USER
// ACCESS:  PUBLIC
router.post('/login', loginUser);


// METHOD:  POST
// DESC:    CHECK TOKEN OF USER
// ACCESS:  PUBLIC
router.post('/isTokenValid', checkTokenValidity);

// METHOD:  GET
// DESC:    AUTHENTICATE LOGGED IN USER
// ACCESS:  PRIVATE
router.get("/", auth, authenticateUser);

// METHOD:  GET
// DESC:    GET USER LISTS
// ACCESS:  PRIVATE
router.get("/user-list", auth, getUsersList)

module.exports = router;
