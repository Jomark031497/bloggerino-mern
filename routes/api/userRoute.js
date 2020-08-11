const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    checkTokenValidity,
    authenticateUser,
    getUserInfo,
    userList
} = require('../../controllers/userController');

const auth = require('../../middlewares/verifyToken');

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
// DESC:    GET ALL USER
// ACCESS:  PRIVATE
router.get("/list", auth, userList);



// METHOD:  GET
// DESC:    GET SINGLE USER INFO
// ACCESS:  PRIVATE
router.get("/:id", auth, getUserInfo);


module.exports = router;
